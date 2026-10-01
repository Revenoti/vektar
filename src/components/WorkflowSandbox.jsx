import { useEffect, useReducer, useRef } from 'react'
import { createInitialState, workflowReducer, WORKFLOW_SCENARIOS } from '../lib/workflowEngine'
import './WorkflowSandbox.css'

const money = (cents) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(cents / 100)

const statusContent = {
  ready: { label: 'Ready to run', title: 'Start with a real decision.' },
  awaiting_approval: { label: 'Your approval required', title: 'Checked. Proposed. Your call.' },
  blocked: { label: 'Stopped at a guardrail', title: 'An exception needs attention.' },
  recorded: { label: 'Simulated entry recorded', title: 'Approved by you. Recorded locally.' },
  duplicate: { label: 'Duplicate prevented', title: 'One invoice. One ledger entry.' },
  rejected: { label: 'Proposal rejected', title: 'Your decision is the boundary.' },
  cancelled: { label: 'Run cancelled', title: 'Stopped. Nothing recorded.' },
}

function Symbol({ type = 'arrow' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === 'check' ? <path d="m5 12 4 4L19 6" /> : type === 'lock' ? <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></> : type === 'alert' ? <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></> : <path d="M5 12h14m-5-5 5 5-5 5" />}
    </svg>
  )
}

export default function WorkflowSandbox() {
  const [state, dispatch] = useReducer(workflowReducer, undefined, createInitialState)
  const resultHeading = useRef(null)
  const previousStatus = useRef('ready')
  const { invoice, status, checks, proposal, ledger, audit } = state
  const content = statusContent[status]
  const scenario = WORKFLOW_SCENARIOS.find((item) => item.id === invoice.scenarioId)
  const activeStep = status === 'ready' ? 0 : status === 'blocked' || status === 'duplicate' || status === 'cancelled' ? 1 : status === 'recorded' ? 3 : 2
  const isAttention = status === 'blocked' || status === 'duplicate'

  useEffect(() => {
    if (status !== 'ready' && status !== previousStatus.current) resultHeading.current?.focus()
    previousStatus.current = status
  }, [status])

  return (
    <section id="sandbox" className="sandbox-section container" aria-labelledby="sandbox-title">
      <div className="sandbox-heading">
        <div>
          <p className="sandbox-eyebrow"><span /> TRY THE WORKFLOW</p>
          <h2 id="sandbox-title">See the work.<br /><span>Keep the control.</span></h2>
        </div>
        <p className="sandbox-intro">Give a bounded agent a job. Inspect the checks, catch an exception, and decide what happens next.</p>
      </div>

      <div className="sandbox-console">
        <div className="sandbox-console-bar">
          <div className="sandbox-badges"><span className="sandbox-badge">SANDBOX</span><span className="sandbox-connection"><span /> No connected systems</span></div>
          <button type="button" className="sandbox-reset" onClick={() => dispatch({ type: 'RESET' })}>Reset sandbox <span aria-hidden="true">↺</span></button>
        </div>
        <div className="sandbox-scope"><Symbol type="lock" /><p>Synthetic data. Deterministic local rules. No AI model, API calls, or real payments. Entries last only in this session.</p></div>

        <ol className="sandbox-steps" aria-label="Workflow stages">
          {['Read the input', 'Check the rules', 'Human review', 'Record the result'].map((step, index) => (
            <li key={step} className={`${index === activeStep ? 'sandbox-step-current' : ''} ${index < activeStep ? 'sandbox-step-visited' : ''}`} aria-current={index === activeStep ? 'step' : undefined}><span className="sandbox-step-number">0{index + 1}</span><span>{step}</span>{index < 3 && <span className="sandbox-step-arrow" aria-hidden="true">→</span>}</li>
          ))}
        </ol>

        <div className="sandbox-workspace">
          <div className="sandbox-input-panel">
            <p className="sandbox-panel-label">01 / THE REQUEST</p>
            <h3>Review this invoice for payment.</h3>
            <p className="sandbox-panel-description">Match the source, check the policy, then prepare an entry for my approval.</p>

            <label className="sandbox-field-label" htmlFor="sandbox-scenario">Choose a scenario</label>
            <div className="sandbox-select-wrap">
              <select id="sandbox-scenario" value={invoice.scenarioId} onChange={(event) => dispatch({ type: 'SELECT_SCENARIO', id: event.target.value })}>
                {WORKFLOW_SCENARIOS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
              <span aria-hidden="true">⌄</span>
            </div>
            <p className="sandbox-scenario-description">{scenario.description}</p>

            <div className="sandbox-invoice">
              <div className="sandbox-invoice-top"><span className="sandbox-document-mark" aria-hidden="true">N.</span><span>INVOICE FIXTURE</span></div>
              <h4>{invoice.vendor}</h4>
              <div className="sandbox-invoice-meta"><span>{invoice.invoiceId}</span><span>USD</span></div>
              <div className="sandbox-invoice-fields">
                <div>
                  <label htmlFor="sandbox-amount">Amount (USD)</label>
                  <input id="sandbox-amount" type="text" inputMode="decimal" maxLength={16} autoComplete="off" value={invoice.amount} onChange={(event) => dispatch({ type: 'EDIT_FIELD', field: 'amount', value: event.target.value })} aria-describedby={checks.some((check) => check.id === 'policy' && !check.passed) ? 'sandbox-fixture-note sandbox-policy-feedback' : 'sandbox-fixture-note'} aria-invalid={checks.some((check) => check.id === 'policy' && !check.passed)} />
                </div>
                <div>
                  <label htmlFor="sandbox-po">Purchase order</label>
                  <input id="sandbox-po" type="text" maxLength={24} autoComplete="off" value={invoice.purchaseOrder} placeholder="Missing reference" onChange={(event) => dispatch({ type: 'EDIT_FIELD', field: 'purchaseOrder', value: event.target.value })} aria-describedby={checks.some((check) => check.id === 'source' && !check.passed) ? 'sandbox-fixture-note sandbox-source-feedback' : 'sandbox-fixture-note'} aria-invalid={checks.some((check) => check.id === 'source' && !check.passed)} />
                </div>
              </div>
              <p id="sandbox-fixture-note" className="sandbox-fixture-note">Editable test data · Approved PO: PO-8402 · Limit: $5,000</p>
            </div>

            <button type="button" className="sandbox-button sandbox-button-run" onClick={() => dispatch({ type: 'RUN' })}>
              {status === 'recorded' || status === 'duplicate' ? 'Run duplicate check' : checks.length ? 'Run validation again' : 'Run validation'}<Symbol />
            </button>
            <p className="sandbox-run-note">Runs instantly in your browser. Approval is always a separate step.</p>
          </div>

          <div className="sandbox-result-panel">
            <div className="sandbox-result-top"><p className="sandbox-panel-label">02 / THE DECISION</p><span className={`sandbox-state ${isAttention ? 'sandbox-state-attention' : ''}`}><span />{content.label}</span></div>
            <h3 ref={resultHeading} tabIndex={-1}>{content.title}</h3>

            {status === 'ready' && <div className="sandbox-ready-content">
              <p className="sandbox-panel-description">A small workflow with explicit boundaries. Here’s what happens when you run it.</p>
              <div className="sandbox-ready-check"><span>01</span><div><h4>Read the evidence</h4><p>Match the invoice against a synthetic purchase-order register.</p></div></div>
              <div className="sandbox-ready-check"><span>02</span><div><h4>Apply a known policy</h4><p>Validate required data, the $5,000 limit, and duplicate protection.</p></div></div>
              <div className="sandbox-ready-check"><span>03</span><div><h4>Ask before acting</h4><p>Present the proposed entry. Wait for your explicit approval.</p></div></div>
              <div className="sandbox-local-note"><Symbol type="lock" /><p>Capability stays inside the boundary you set.</p></div>
            </div>}

            {checks.length > 0 && <div className="sandbox-checks" aria-label="Validation results">
              {checks.map((check) => <div className={`sandbox-check ${check.passed ? 'sandbox-check-pass' : 'sandbox-check-fail'}`} key={check.id}>
                <span className="sandbox-check-icon"><Symbol type={check.passed ? 'check' : 'alert'} /></span>
                <div><div className="sandbox-check-heading"><h4>{check.label}</h4><span>{check.passed ? 'Passed' : 'Stopped'}</span></div><p id={`sandbox-${check.id}-feedback`}>{check.summary}</p><span className="sandbox-check-source">Source: {check.source}</span></div>
              </div>)}
            </div>}

            {proposal && <div className="sandbox-proposal">
              <p className="sandbox-proposal-label"><Symbol type="lock" /> HUMAN APPROVAL REQUIRED</p>
              <div className="sandbox-proposal-summary"><div><h4>Record a simulated payable</h4><p>{proposal.invoiceId} · {proposal.vendor}</p></div><strong>{money(proposal.amountCents)}</strong></div>
              <p className="sandbox-proposal-scope">Approval adds one entry to the in-memory demo ledger. It does not schedule or send a payment.</p>
              <button type="button" className="sandbox-button sandbox-button-approve" onClick={() => dispatch({ type: 'APPROVE' })}>Approve simulated entry<Symbol type="check" /></button>
              <div className="sandbox-decision-alternatives"><button type="button" onClick={() => dispatch({ type: 'REJECT' })}>Reject proposal</button><button type="button" onClick={() => dispatch({ type: 'CANCEL' })}>Cancel run</button></div>
            </div>}

            {status === 'blocked' && <div className="sandbox-recovery"><h4>The guardrail is working.</h4><p>Edit the flagged fields on the left, or use a corrected synthetic fixture: $2,400 against PO-8402. Then run validation again.</p><div><button type="button" className="sandbox-button sandbox-button-secondary" onClick={() => dispatch({ type: 'CORRECT_FIXTURE' })}>Use corrected fixture<Symbol /></button><button type="button" className="sandbox-text-button" onClick={() => dispatch({ type: 'CANCEL' })}>Cancel run</button></div></div>}

            {['recorded', 'duplicate', 'rejected', 'cancelled'].includes(status) && <div className={`sandbox-outcome ${status === 'recorded' ? 'sandbox-outcome-success' : ''}`}><Symbol type={status === 'recorded' ? 'check' : 'lock'} /><p>{state.notice}</p></div>}
          </div>
        </div>

        <div className="sandbox-records">
          <div className="sandbox-audit"><div className="sandbox-record-heading"><h3>Visible audit trail</h3><span>{audit.length} {audit.length === 1 ? 'event' : 'events'}</span></div><ol aria-label="Recent workflow events">{audit.slice(-5).reverse().map((event) => <li key={event.sequence}><span>{String(event.sequence).padStart(2, '0')}</span><p>{event.message}</p></li>)}</ol>{audit.length > 5 && <p className="sandbox-audit-note">Showing the latest 5 events.</p>}</div>
          <div className="sandbox-ledger"><div className="sandbox-record-heading"><h3>Simulated ledger</h3><span>{ledger.length} {ledger.length === 1 ? 'entry' : 'entries'}</span></div>{ledger.length === 0 ? <div className="sandbox-ledger-empty"><span aria-hidden="true">—</span><p>No entries yet.<br />Nothing happens without your approval.</p></div> : <ul>{ledger.map((entry) => <li key={entry.id}><div><strong>{entry.id}</strong><span>{entry.invoiceId} · Approved in sandbox</span></div><b>{money(entry.amountCents)}</b></li>)}</ul>}</div>
        </div>
      </div>
      <p className="sandbox-sr-only" role="status" aria-live="polite" aria-atomic="true">{state.notice}</p>
    </section>
  )
}
