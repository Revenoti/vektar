/**
 * A deliberately bounded, deterministic invoice workflow.
 * No network, storage, clocks, randomness, AI claims or real-world actions.
 * The only "execution" is an entry in this reducer's in-memory demo ledger.
 */
export const WORKFLOW_POLICY = Object.freeze({
  id: 'AP-DEMO-01',
  label: 'Sandbox payment policy · v1',
  currency: 'USD',
  maxAmount: 5000,
  vendor: 'Northline Studio',
  purchaseOrder: 'PO-8402',
})

export const WORKFLOW_SCENARIOS = Object.freeze([
  Object.freeze({ id: 'standard', label: 'Within policy', description: 'A complete invoice, ready for your review.', invoiceId: 'INV-1042', amount: '2400', purchaseOrder: 'PO-8402' }),
  Object.freeze({ id: 'over_limit', label: 'Over policy limit', description: 'An invoice above the $5,000 sandbox limit.', invoiceId: 'INV-1043', amount: '6800', purchaseOrder: 'PO-8402' }),
  Object.freeze({ id: 'missing_data', label: 'Missing purchase order', description: 'An invoice with no purchase-order reference.', invoiceId: 'INV-1044', amount: '2400', purchaseOrder: '' }),
])

function invoiceForScenario(id) {
  const scenario = WORKFLOW_SCENARIOS.find((item) => item.id === id) || WORKFLOW_SCENARIOS[0]
  return {
    scenarioId: scenario.id,
    invoiceId: scenario.invoiceId,
    vendor: WORKFLOW_POLICY.vendor,
    currency: WORKFLOW_POLICY.currency,
    amount: scenario.amount,
    purchaseOrder: scenario.purchaseOrder,
  }
}

export function invoiceKey(invoice) {
  return `${invoice.vendor.trim().toLowerCase()}::${invoice.invoiceId.trim().toLowerCase()}`
}

function snapshotKey(invoice) {
  return JSON.stringify([invoiceKey(invoice), invoice.amount, invoice.currency, invoice.purchaseOrder])
}

/** Parse decimal currency exactly. Reject exponent notation, blanks and >2 decimals. */
export function amountInCents(value) {
  const input = String(value).trim()
  if (!/^\d+(?:\.\d{1,2})?$/.test(input)) return null
  const [whole, fraction = ''] = input.split('.')
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null
}

export function validateInvoice(invoice, ledger = []) {
  const amountCents = amountInCents(invoice.amount)
  const duplicate = ledger.some((entry) => entry.invoiceKey === invoiceKey(invoice))
  const sourceMatches = Boolean(invoice.invoiceId.trim())
    && invoice.vendor === WORKFLOW_POLICY.vendor
    && invoice.purchaseOrder.trim() === WORKFLOW_POLICY.purchaseOrder
  const amountPasses = amountCents !== null
    && amountCents <= WORKFLOW_POLICY.maxAmount * 100
    && invoice.currency === WORKFLOW_POLICY.currency

  const checks = [
    {
      id: 'source',
      label: 'Match the source',
      passed: sourceMatches,
      source: 'Synthetic invoice + demo PO register',
      summary: sourceMatches
        ? `${invoice.invoiceId} matches verified vendor Northline Studio and PO-8402.`
        : !invoice.purchaseOrder.trim()
          ? 'The purchase-order reference is missing. Add PO-8402 to the fixture, then run again.'
          : 'The invoice must match Northline Studio and the demo purchase order PO-8402.',
    },
    {
      id: 'policy',
      label: 'Apply the policy',
      passed: amountPasses,
      source: 'AP-DEMO-01 · USD · maximum $5,000',
      summary: amountPasses
        ? 'The amount is valid and within the $5,000 sandbox limit. Human approval is still required.'
        : amountCents === null
          ? 'Enter a positive amount with no more than two decimal places.'
          : 'This invoice exceeds the $5,000 sandbox limit or uses an unsupported currency. No action is proposed.',
    },
    {
      id: 'duplicate',
      label: 'Prevent duplicates',
      passed: !duplicate,
      source: 'This session’s simulated ledger',
      summary: duplicate
        ? `${invoice.invoiceId} already has a simulated entry. A second entry is blocked, even if the amount changes.`
        : 'No entry exists for this vendor and invoice ID in the session ledger.',
    },
  ]
  return { checks, duplicate, valid: checks.every((check) => check.passed), amountCents }
}

function withAudit(state, status, message, details = {}) {
  const sequence = state.audit.length + 1
  return {
    ...state,
    ...details,
    status,
    notice: message,
    audit: [...state.audit, { sequence, status, message }],
  }
}

export function createInitialState() {
  return {
    invoice: invoiceForScenario('standard'),
    status: 'ready',
    checks: [],
    proposal: null,
    ledger: [],
    audit: [{ sequence: 1, status: 'ready', message: 'Synthetic invoice loaded. No systems connected.' }],
    notice: 'Sandbox ready. Review the synthetic invoice and run validation.',
  }
}

export function workflowReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SCENARIO': {
      if (!WORKFLOW_SCENARIOS.some((scenario) => scenario.id === action.id)) return state
      const invoice = invoiceForScenario(action.id)
      return withAudit(state, 'ready', `${invoice.invoiceId} fixture loaded. Run validation to continue.`, { invoice, checks: [], proposal: null })
    }
    case 'EDIT_FIELD': {
      if (!['amount', 'purchaseOrder'].includes(action.field)) return state
      if (typeof action.value !== 'string' || action.value.length > 80) return state
      if (state.invoice[action.field] === action.value) return state
      return {
        ...state,
        invoice: { ...state.invoice, [action.field]: action.value },
        status: 'ready',
        proposal: null,
        checks: [],
        notice: 'Fixture changed. Previous validation is cleared; run again before approval.',
      }
    }
    case 'CORRECT_FIXTURE': {
      return withAudit(state, 'ready', 'Fixture corrected to $2,400 and PO-8402. Run validation again.', {
        invoice: { ...state.invoice, amount: '2400', purchaseOrder: WORKFLOW_POLICY.purchaseOrder },
        checks: [],
        proposal: null,
      })
    }
    case 'RUN': {
      const result = validateInvoice(state.invoice, state.ledger)
      if (result.duplicate) {
        return withAudit(state, 'duplicate', 'Duplicate blocked. The existing simulated ledger entry is unchanged.', { checks: result.checks, proposal: null })
      }
      if (!result.valid) {
        return withAudit(state, 'blocked', 'Validation stopped. Correct the flagged fixture data, then run again.', { checks: result.checks, proposal: null })
      }
      return withAudit(state, 'awaiting_approval', 'Checks passed. Review the proposed entry; nothing is recorded until you approve.', {
        checks: result.checks,
        proposal: {
          snapshot: snapshotKey(state.invoice),
          invoiceKey: invoiceKey(state.invoice),
          invoiceId: state.invoice.invoiceId,
          vendor: state.invoice.vendor,
          amountCents: result.amountCents,
          currency: state.invoice.currency,
          purchaseOrder: state.invoice.purchaseOrder.trim(),
        },
      })
    }
    case 'APPROVE': {
      if (state.status !== 'awaiting_approval' || !state.proposal) return state
      const result = validateInvoice(state.invoice, state.ledger)
      if (result.duplicate) {
        return withAudit(state, 'duplicate', 'Duplicate blocked at approval. The existing simulated entry is unchanged.', { checks: result.checks, proposal: null })
      }
      if (!result.valid || state.proposal.snapshot !== snapshotKey(state.invoice)) {
        return withAudit(state, 'blocked', 'The invoice changed after review. Validate it again before approval.', { checks: result.checks, proposal: null })
      }
      const entry = {
        id: `SIM-${String(state.ledger.length + 1).padStart(3, '0')}`,
        invoiceKey: invoiceKey(state.invoice),
        invoiceId: state.invoice.invoiceId,
        vendor: state.invoice.vendor,
        amountCents: result.amountCents,
        currency: state.invoice.currency,
        purchaseOrder: state.invoice.purchaseOrder.trim(),
        approval: 'Explicit sandbox approval',
      }
      return withAudit(state, 'recorded', `${entry.id} recorded in this session’s simulated ledger. No payment was made.`, { ledger: [...state.ledger, entry], proposal: null })
    }
    case 'REJECT':
      if (state.status !== 'awaiting_approval') return state
      return withAudit(state, 'rejected', 'Proposal rejected. No entry was recorded; you can edit the fixture and run again.', { proposal: null })
    case 'CANCEL':
      if (state.status !== 'awaiting_approval' && state.status !== 'blocked') return state
      return withAudit(state, 'cancelled', 'Run cancelled. No entry was recorded.', { proposal: null })
    case 'RESET':
      return createInitialState()
    default:
      return state
  }
}
