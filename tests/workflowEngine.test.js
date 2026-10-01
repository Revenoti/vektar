import test from 'node:test'
import assert from 'node:assert/strict'
import {
  amountInCents,
  createInitialState,
  invoiceKey,
  validateInvoice,
  workflowReducer,
  WORKFLOW_POLICY,
} from '../src/lib/workflowEngine.js'

const reduce = (state, type, values = {}) => workflowReducer(state, { type, ...values })
const scenario = (id) => reduce(createInitialState(), 'SELECT_SCENARIO', { id })
const approved = () => reduce(reduce(createInitialState(), 'RUN'), 'APPROVE')

function deepFreeze(value) {
  if (value && typeof value === 'object') {
    Object.freeze(value)
    Object.values(value).forEach(deepFreeze)
  }
  return value
}

test('initial fixture is synthetic, ready and has no ledger entries or proposal', () => {
  const state = createInitialState()
  assert.equal(state.status, 'ready')
  assert.equal(state.invoice.invoiceId, 'INV-1042')
  assert.equal(state.invoice.vendor, 'Northline Studio')
  assert.equal(state.proposal, null)
  assert.deepEqual(state.ledger, [])
  assert.equal(state.audit.length, 1)
})

test('amount parser uses exact cents and rejects invalid or ambiguous amounts', () => {
  for (const [input, expected] of [['2400', 240000], ['0.01', 1], ['12.5', 1250], ['5000.00', 500000], [' 42.42 ', 4242]]) {
    assert.equal(amountInCents(input), expected)
  }
  for (const input of ['', ' ', '-1', '0', '0.00', '1.001', '1e3', 'Infinity', 'NaN', '2,400', '3.', '.5', '999999999999999999999999']) {
    assert.equal(amountInCents(input), null, `must reject ${JSON.stringify(input)}`)
  }
})

test('running validation proposes but never records an entry', () => {
  const state = reduce(createInitialState(), 'RUN')
  assert.equal(state.status, 'awaiting_approval')
  assert.equal(state.checks.length, 3)
  assert.ok(state.checks.every((check) => check.passed && check.source))
  assert.equal(state.proposal.amountCents, 240000)
  assert.equal(state.ledger.length, 0)
  assert.equal(state.audit.at(-1).status, 'awaiting_approval')
})

test('only explicit approval from a validated proposal records an entry', () => {
  const ready = createInitialState()
  assert.equal(reduce(ready, 'APPROVE'), ready)
  const state = approved()
  assert.equal(state.status, 'recorded')
  assert.equal(state.ledger.length, 1)
  assert.deepEqual(state.ledger[0], {
    id: 'SIM-001',
    invoiceKey: invoiceKey(state.invoice),
    invoiceId: 'INV-1042',
    vendor: 'Northline Studio',
    amountCents: 240000,
    currency: 'USD',
    purchaseOrder: 'PO-8402',
    approval: 'Explicit sandbox approval',
  })
  assert.match(state.notice, /No payment was made/)
  assert.equal(state.proposal, null)
})

test('repeated approval is idempotent and duplicate runs cannot create a second entry', () => {
  const first = approved()
  assert.equal(reduce(first, 'APPROVE'), first)
  const duplicate = reduce(first, 'RUN')
  assert.equal(duplicate.status, 'duplicate')
  assert.equal(duplicate.ledger.length, 1)
  assert.equal(duplicate.proposal, null)
  assert.equal(duplicate.checks.find((check) => check.id === 'duplicate').passed, false)
  assert.equal(reduce(duplicate, 'APPROVE').ledger.length, 1)
  assert.equal(reduce(duplicate, 'RUN').ledger.length, 1)
})

test('duplicate protection uses invoice identity, even after amount or PO edits', () => {
  let state = approved()
  state = reduce(state, 'EDIT_FIELD', { field: 'amount', value: '100' })
  state = reduce(state, 'RUN')
  assert.equal(state.status, 'duplicate')
  assert.equal(state.ledger[0].amountCents, 240000)
  assert.equal(state.ledger.length, 1)
  assert.equal(invoiceKey({ ...state.invoice, vendor: ' Northline Studio ', invoiceId: ' inv-1042 ' }), state.ledger[0].invoiceKey)
})

test('over-limit invoice stops before approval and can be corrected and retried', () => {
  let state = reduce(scenario('over_limit'), 'RUN')
  assert.equal(state.status, 'blocked')
  assert.equal(state.checks.find((check) => check.id === 'policy').passed, false)
  assert.equal(state.proposal, null)
  assert.equal(reduce(state, 'APPROVE'), state)
  state = reduce(state, 'CORRECT_FIXTURE')
  assert.equal(state.status, 'ready')
  assert.equal(state.invoice.amount, '2400')
  assert.equal(state.invoice.invoiceId, 'INV-1043')
  assert.equal(state.checks.length, 0)
  assert.equal(state.proposal, null)
  state = reduce(reduce(state, 'RUN'), 'APPROVE')
  assert.equal(state.status, 'recorded')
  assert.equal(state.ledger.length, 1)
})

test('policy boundary includes exactly $5,000 and rejects one cent above it', () => {
  const invoice = createInitialState().invoice
  assert.equal(validateInvoice({ ...invoice, amount: String(WORKFLOW_POLICY.maxAmount) }).valid, true)
  assert.equal(validateInvoice({ ...invoice, amount: '5000.01' }).valid, false)
  assert.equal(validateInvoice({ ...invoice, currency: 'EUR' }).valid, false)
})

test('missing purchase order stops, exposes a specific correction, and supports manual retry', () => {
  let state = reduce(scenario('missing_data'), 'RUN')
  assert.equal(state.status, 'blocked')
  const source = state.checks.find((check) => check.id === 'source')
  assert.equal(source.passed, false)
  assert.match(source.summary, /missing/)
  assert.match(source.summary, /PO-8402/)
  state = reduce(state, 'EDIT_FIELD', { field: 'purchaseOrder', value: 'PO-8402' })
  assert.equal(state.status, 'ready')
  state = reduce(state, 'RUN')
  assert.equal(state.status, 'awaiting_approval')
  assert.equal(state.ledger.length, 0)
})

test('invalid or unknown purchase order, vendor and invoice ID are rejected', () => {
  const invoice = createInitialState().invoice
  for (const input of [{ ...invoice, purchaseOrder: 'PO-9999' }, { ...invoice, vendor: 'Unknown vendor' }, { ...invoice, invoiceId: '' }]) {
    assert.equal(validateInvoice(input).valid, false)
  }
})

test('editing an approved-to-review proposal invalidates it before any approval', () => {
  let state = reduce(createInitialState(), 'RUN')
  state = reduce(state, 'EDIT_FIELD', { field: 'amount', value: '4000' })
  assert.equal(state.status, 'ready')
  assert.equal(state.proposal, null)
  assert.equal(state.checks.length, 0)
  assert.equal(reduce(state, 'APPROVE').ledger.length, 0)
  state = reduce(reduce(state, 'RUN'), 'APPROVE')
  assert.equal(state.ledger[0].amountCents, 400000)
})

test('approval revalidates a stale snapshot rather than trusting a displayed proposal', () => {
  const state = reduce(createInitialState(), 'RUN')
  const stale = { ...state, invoice: { ...state.invoice, amount: '1000' } }
  const next = reduce(stale, 'APPROVE')
  assert.equal(next.status, 'blocked')
  assert.equal(next.proposal, null)
  assert.equal(next.ledger.length, 0)
})

test('approval checks for duplicates again at the commit boundary', () => {
  const awaiting = reduce(createInitialState(), 'RUN')
  const injected = { ...awaiting, ledger: approved().ledger }
  const next = reduce(injected, 'APPROVE')
  assert.equal(next.status, 'duplicate')
  assert.equal(next.ledger.length, 1)
  assert.equal(next.proposal, null)
})

test('rejection and cancellation record decisions without changing the ledger', () => {
  for (const [action, status] of [['REJECT', 'rejected'], ['CANCEL', 'cancelled']]) {
    const next = reduce(reduce(createInitialState(), 'RUN'), action)
    assert.equal(next.status, status)
    assert.equal(next.proposal, null)
    assert.equal(next.ledger.length, 0)
    assert.equal(next.audit.at(-1).status, status)
    assert.equal(reduce(next, 'APPROVE'), next)
    assert.equal(reduce(next, 'RUN').status, 'awaiting_approval')
  }
  const blocked = reduce(scenario('missing_data'), 'RUN')
  assert.equal(reduce(blocked, 'CANCEL').status, 'cancelled')
})

test('switching scenarios preserves the session ledger and clears review state', () => {
  let state = reduce(approved(), 'SELECT_SCENARIO', { id: 'missing_data' })
  assert.equal(state.status, 'ready')
  assert.equal(state.invoice.invoiceId, 'INV-1044')
  assert.equal(state.ledger.length, 1)
  assert.equal(state.proposal, null)
  state = reduce(state, 'CORRECT_FIXTURE')
  state = reduce(reduce(state, 'RUN'), 'APPROVE')
  assert.equal(state.ledger.length, 2)
  assert.equal(state.ledger[1].id, 'SIM-002')
  state = reduce(state, 'SELECT_SCENARIO', { id: 'standard' })
  assert.equal(reduce(state, 'RUN').status, 'duplicate')
})

test('reset explicitly clears all simulated ledger entries and audit events', () => {
  assert.deepEqual(reduce(approved(), 'RESET'), createInitialState())
})

test('unrecognized actions, fields and scenarios are safe no-ops', () => {
  const state = createInitialState()
  assert.equal(reduce(state, 'NETWORK_REQUEST'), state)
  assert.equal(reduce(state, 'SELECT_SCENARIO', { id: 'unknown' }), state)
  assert.equal(reduce(state, 'EDIT_FIELD', { field: 'vendor', value: 'Changed vendor' }), state)
  assert.equal(reduce(state, 'EDIT_FIELD', { field: 'amount', value: 123 }), state)
  assert.equal(reduce(state, 'EDIT_FIELD', { field: 'amount', value: '1'.repeat(81) }), state)
  assert.equal(reduce(state, 'REJECT'), state)
  assert.equal(reduce(state, 'CANCEL'), state)
})

test('reducer is deterministic and does not mutate frozen inputs', () => {
  const state = deepFreeze(createInitialState())
  const action = deepFreeze({ type: 'RUN' })
  const next = reduce(state, 'RUN')
  assert.deepEqual(workflowReducer(state, action), next)
  assert.equal(state.status, 'ready')
  assert.equal(state.audit.length, 1)
  deepFreeze(next)
  const complete = reduce(next, 'APPROVE')
  assert.equal(next.ledger.length, 0)
  assert.equal(complete.ledger.length, 1)
  assert.deepEqual(reduce(next, 'APPROVE'), complete)
})

test('every workflow outcome appends consecutive, readable audit events', () => {
  let state = scenario('missing_data')
  for (const action of ['RUN', 'CORRECT_FIXTURE', 'RUN', 'APPROVE', 'RUN']) state = reduce(state, action)
  assert.deepEqual(state.audit.map((event) => event.sequence), [1, 2, 3, 4, 5, 6, 7])
  assert.ok(state.audit.every((event) => typeof event.message === 'string' && event.message.length > 0))
})
