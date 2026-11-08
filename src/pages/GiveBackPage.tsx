import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hand, Check, ArrowRight } from 'lucide-react';
import { givingAsks, type GivingAsk } from '../data';
import { EmptyState, PageIntro } from '../components';

// Design C adds this page. It turns "alumni want to give back" into concrete,
// right-sized asks, and shows how personal invitations could work.
const commitments: GivingAsk['commitment'][] = ['Under an hour', 'A few hours', 'Ongoing'];
const seasonOptions: GivingAsk['season'][] = ['Fall', 'Winter', 'Spring', 'Summer', 'Any time'];

function Chips<T extends string>({ label, options, value, onChange }: { label: string; options: T[]; value: T | ''; onChange: (v: T | '') => void }) {
  return <div className="gb-chips" role="group" aria-label={label}>
    <span className="gb-chips-label">{label}</span>
    <button type="button" aria-pressed={value === ''} onClick={() => onChange('')}>Any</button>
    {options.map(o => <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>)}
  </div>;
}

export function GiveBackPage({ notify }: { notify: (s: string) => void }) {
  const [commitment, setCommitment] = useState<GivingAsk['commitment'] | ''>('');
  const [season, setSeason] = useState<GivingAsk['season'] | ''>('');
  const [raised, setRaised] = useState<Set<string>>(new Set());
  const results = givingAsks.filter(a => (!commitment || a.commitment === commitment) && (!season || a.season === season || a.season === 'Any time'));
  const toggle = (ask: GivingAsk) => {
    const next = new Set(raised);
    if (next.has(ask.id)) next.delete(ask.id);
    else { next.add(ask.id); notify(`Demo only: hand raised for “${ask.title}.” Nothing was sent.`); }
    setRaised(next);
  };
  const reset = () => { setCommitment(''); setSeason(''); };
  return <>
    <PageIntro eyebrow="YOU HAVE SOMETHING TO OFFER" title="Give back, your way.">Small asks and big ones, sized to fit your life. Raise your hand for anything that sounds right; “not this time” is always an answer.</PageIntro>
    <section className="container section listing-section" aria-label="Ways to give back">
      <div className="notice">Fictional sample asks. Raising your hand here records nothing and contacts no one.</div>
      <div className="gb-filters">
        <Chips label="Time" options={commitments} value={commitment} onChange={setCommitment}/>
        <Chips label="Season" options={seasonOptions} value={season} onChange={setSeason}/>
      </div>
      <div className="results-bar"><p role="status">{results.length} sample {results.length === 1 ? 'ask' : 'asks'}{raised.size > 0 && ` · hand raised on ${raised.size}`}</p><span>“Any time” asks appear in every season</span></div>
      {results.length ? <div className="card-grid gb-grid">{results.map(a => <article key={a.id} className={`gb-card ${raised.has(a.id) ? 'raised' : ''}`}>
        <div className="gb-card-top"><span className="badge">{a.commitment}</span><span className="gb-season">{a.season}</span></div>
        <h2 className="card-title">{a.title}</h2>
        <p className="card-description">{a.description}</p>
        <p className="card-meta">{a.format} · Asked by {a.askedBy}</p>
        <button type="button" className={`button ${raised.has(a.id) ? 'saved' : 'secondary'} small`} aria-pressed={raised.has(a.id)} onClick={() => toggle(a)}>{raised.has(a.id) ? <><Check size={16}/>Hand raised</> : <><Hand size={16}/>Raise my hand</>}</button>
      </article>)}</div> : <EmptyState onReset={reset}/>}
    </section>
    <section className="container section gb-how">
      <p className="section-kicker">HOW INVITATIONS COULD WORK</p>
      <h2 className="section-title">Personal, not mass email.</h2>
      <ol className="gb-steps">
        <li><b>Tell us what you’re open to</b><span>Pick topics, time, and season once. Change it anytime from the newsletter settings.</span></li>
        <li><b>Get asked by name</b><span>A staff member, your former host manager, or a fellow alum reaches out when something fits.</span></li>
        <li><b>Say yes, or not this time</b><span>Saying no keeps you on the list. Showing up sometimes still counts as being part of the community.</span></li>
      </ol>
      <Link className="button primary" to="/newsletter">Set your preferences<ArrowRight size={18}/></Link>
    </section>
  </>;
}
