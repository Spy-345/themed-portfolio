'use client';

import { ToolIcons } from './TechIcon';
import { motion } from 'motion/react';
import useMotionPreference from './useMotionPreference';
import { useEffect, useRef, useState } from 'react';

type Step = { title: string; tool: string; detail: string; signal: string };
const journeys: Record<string, { mission: string; steps: Step[]; result: string; source: string }> = {
  '01': { mission: 'Turn a research request into structured content', source: 'Architecture overview · Based on professional experience', result: 'Structured research content returned to the application.', steps: [
    { title: 'Request', tool: 'Bubble.io', detail: 'The application requests market research content from a REST API.', signal: 'Research brief → API request' },
    { title: 'Compose', tool: 'Node.js + Express', detail: 'The backend applies prompt engineering to shape a request for the language model.', signal: 'Brief → structured prompt' },
    { title: 'Generate', tool: 'Amazon Bedrock', detail: 'An integrated Bedrock language model generates market research text from the prompt.', signal: 'Prompt → generated text' },
    { title: 'Deliver', tool: 'REST response', detail: 'The API returns structured content for the Bubble.io application to consume.', signal: 'Content → application' },
  ] },
  '02': { mission: 'Build the path from discovery to checkout', source: 'Build overview · Based on professional experience', result: 'A full-stack report-selling experience, from UI to payments.', steps: [
    { title: 'Discover', tool: 'Next.js', detail: 'Server-rendered and statically generated pages present market research reports with SEO in mind.', signal: 'Report catalogue → discovery' },
    { title: 'Interact', tool: 'React + TypeScript', detail: 'Responsive interfaces and reusable components bring the browsing and checkout experience together.', signal: 'Report → checkout interface' },
    { title: 'Process', tool: 'Server Actions', detail: 'Server-side data handling connects the interface to the commerce backend.', signal: 'Interface → server logic' },
    { title: 'Pay', tool: 'Payment gateways', detail: 'Payment integrations include PayPal, Razorpay, PayGlocal and CCAvenue to support global transactions.', signal: 'Checkout → payment provider' },
  ] },
  '03': { mission: 'Follow a wallet transfer through the backend', source: 'Source: backend/routes/acounts.js · Public repository', result: 'The transaction commits and the API returns transfer success.', steps: [
    { title: 'Authorize', tool: 'Express middleware', detail: 'The transfer endpoint uses authentication middleware to identify the sender.', signal: 'POST /transfer → authenticated user' },
    { title: 'Check', tool: 'MongoDB + Mongoose', detail: 'A database session starts a transaction. The route checks the recipient account and the sender’s available balance.', signal: 'Accounts → balance check' },
    { title: 'Update', tool: 'Database transaction', detail: 'The receiver is credited and the sender debited inside the same session. Amounts are stored in hundredths.', signal: 'Receiver + amount / sender − amount' },
    { title: 'Commit', tool: 'REST response', detail: 'The transaction commits before returning success. Invalid accounts or insufficient funds abort the transaction.', signal: 'Commit → success response' },
  ] },
};
export default function ProjectJourney({ id }: { id: string }) {
  const journey = journeys[id];
  const reducedMotion = useMotionPreference();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => { if (document.hidden || query.matches) setPlaying(false); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setPlaying(false); });
    if (root.current) observer.observe(root.current);
    query.addEventListener('change', stop); document.addEventListener('visibilitychange', stop);
    return () => { observer.disconnect(); query.removeEventListener('change', stop); document.removeEventListener('visibilitychange', stop); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => { if (step < journey.steps.length - 1) setStep(step + 1); else setPlaying(false); }, 2500);
    return () => window.clearTimeout(timer);
  }, [playing, step, journey.steps.length]);
  const current = journey.steps[step];
  return <div ref={root} className={'journey journey-' + id}>
    <div className="journey-head"><span>ARCHITECTURE / {id}</span><span>{String(step + 1).padStart(2, '0')} / 04</span></div>
    <h4>{journey.mission}</h4>
    <div className="journey-progress" role="progressbar" aria-label="Walkthrough progress" aria-valuemin={0} aria-valuemax={4} aria-valuenow={step + 1}><span style={{ width: `${(step + 1) * 25}%` }}/></div>
    <ol className="flow-nodes" aria-label="Build stages">{journey.steps.map((item, index) => <li key={item.title} className={index <= step ? 'reached' : ''}><button type="button" aria-pressed={index === step} onClick={() => { setPlaying(false); setStep(index); }}><span className="node-icon"><ToolIcons tool={item.tool}/><span className="node-number">{index < step ? '✓' : index + 1}</span></span><span>{item.title}</span></button></li>)}</ol>
    <motion.div key={step} initial={reducedMotion !== false ? false : { opacity: 0.6, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion !== false ? 0 : 0.2 }} className={'step-detail' + (playing ? ' is-playing' : '')} aria-live="polite" aria-atomic="true"><span className="step-tool"><ToolIcons tool={current.tool}/>{current.tool}</span><p>{current.detail}</p><div className="signal" key={step}><span aria-hidden="true">↳</span> {current.signal}</div></motion.div>
    {step === 3 && <div className="flow-result"><span aria-hidden="true">✳</span> {journey.result}</div>}
    <div className="journey-controls"><button type="button" className="run-flow" onClick={() => { if (!playing && step === 3) setStep(0); setPlaying(!playing); }}>{playing ? 'Ⅱ Pause' : step === 3 ? '↻ Replay flow' : '▷ Play flow'}</button><button type="button" disabled={step === 0} onClick={() => { setPlaying(false); setStep(step - 1); }} aria-label="Previous build stage">←</button><button type="button" disabled={step === 3} onClick={() => { setPlaying(false); setStep(step + 1); }} aria-label="Next build stage">→</button></div>
    <small className="journey-source">{journey.source}</small>
  </div>;
}
