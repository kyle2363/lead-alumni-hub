import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowUpRight, HeartHandshake, MapPin } from 'lucide-react';
import { alumni, cityHosts, cohortCaptains, events, type AlumniProfile } from '../data';
import { Dialog, EmptyState, PageIntro, SelectFilter, SectionHeading } from '../components';
import { hasFeatures, useDesign } from '../design';
import { eventDate, filterAlumni, shortTitle, unique } from '../utils';

const cohortYears = unique(alumni.map(p => String(p.cohort)));
// City clusters come straight from the directory, largest first.
const cities = unique(alumni.map(p => p.region))
  .map(region => ({ region, count: alumni.filter(p => p.region === region).length }))
  .sort((a, b) => b.count - a.count || a.region.localeCompare(b.region));
const byDate = events.slice().sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));

// Designs B and C: start from "my cohort" and "my city" instead of a directory of strangers.
// Both pickers drive the same filters as the directory below.
function CohortAndCity({ cohort, setCohort, region, setRegion }: { cohort: string; setCohort: (s: string) => void; region: string; setRegion: (s: string) => void }) {
  const members = alumni.filter(p => String(p.cohort) === cohort);
  const captain = cohortCaptains[Number(cohort)];
  const nextForCohort = byDate.find(e => e.cohorts.includes(Number(cohort)));
  const reunion = byDate.find(e => e.id === 'event-cohort-reunions-2027');
  const cityHost = cityHosts[region];
  const cityCount = cities.find(c => c.region === region)?.count ?? 0;
  return <section className="container section co-section" aria-label="Your cohort and your city">
    <div className="co-grid">
      <div className="co-panel">
        <p className="section-kicker">YOUR COHORT</p>
        <h2 className="co-title">Start with the people from your summer.</h2>
        <div className="co-years" role="group" aria-label="Choose your cohort">
          {cohortYears.map(y => <button key={y} type="button" aria-pressed={cohort === y} onClick={() => setCohort(cohort === y ? '' : y)}>{y}</button>)}
        </div>
        <div aria-live="polite">{cohort ? <ul className="co-facts">
          <li><b>{members.length} in the sample directory</b><span>{members.map(p => p.name).join(', ')}</span></li>
          <li><b>Cohort captain</b><span>{captain ? `${captain}, an alumni volunteer who keeps the cohort in touch` : <>Open role. <Link to="/give-back">Raise your hand</Link></>}</span></li>
          {nextForCohort && <li><b>Your cohort is going to</b><span>{shortTitle(nextForCohort)}, {eventDate(nextForCohort, { month: 'short', day: 'numeric' })}</span></li>}
          {reunion && <li><b>Next cohort reunion</b><span>{eventDate(reunion, { month: 'long', day: 'numeric' })} on Zoom, with a breakout room for {cohort}</span></li>}
          <li><b>Group chat</b><span>An opt-in link to the chat your cohort already uses. Nothing new to download.</span></li>
        </ul> : <p className="co-empty">Pick your year to see who is in the directory, who your cohort captain is, and what your cohort is going to next.</p>}</div>
      </div>
      <div className="co-panel">
        <p className="section-kicker">ALUMNI NEAR YOU</p>
        <h2 className="co-title">Or with the alumni in your city now.</h2>
        <ul className="co-cities">
          {cities.map(c => <li key={c.region}><button type="button" aria-pressed={region === c.region} onClick={() => setRegion(region === c.region ? '' : c.region)}>
            <MapPin size={16}/><b>{c.region}</b><span>{c.count} {c.count === 1 ? 'alum' : 'alumni'}</span>
          </button></li>)}
        </ul>
        <p className="co-empty" aria-live="polite">{region
          ? cityHost ? `${cityHost} hosts the ${region.split(',')[0]} meetups as an alumni volunteer.`
            : cityCount > 1 ? <>No city host in {region.split(',')[0]} yet, and there are enough alumni for a meetup. <Link to="/give-back">Offer to host one</Link></>
            : <>You may be the first in {region.split(',')[0]}. Virtual gatherings are built for you, and you can <Link to="/give-back">start a meetup</Link> when others arrive.</>
          : 'Counts are from the fictional sample directory. A city with two or more alumni can hold its own meetup.'}</p>
      </div>
    </div>
    {(cohort || region) && <p className="co-status" role="status">The directory below is showing {[cohort && `cohort ${cohort}`, region].filter(Boolean).join(' in ')}.</p>}
  </section>;
}

export function CommunityPage({ notify }: { notify: (s: string) => void }) {
  const features = hasFeatures(useDesign());
  const [params, setParams] = useSearchParams();
  const mentor = params.get('mentor') === 'true';
  const setMentor = (value: boolean) => setParams(current => { const next = new URLSearchParams(current); if (value) next.set('mentor', 'true'); else next.delete('mentor'); return next; }, { replace: true });
  const [query, setQuery] = useState(''), [industry, setIndustry] = useState(''), [region, setRegion] = useState(''), [cohort, setCohort] = useState('');
  const [selected, setSelected] = useState<AlumniProfile | null>(null), [requested, setRequested] = useState<Set<string>>(new Set());
  const results = filterAlumni(alumni, query, industry, region, cohort, mentor);
  const reset = () => { setQuery(''); setIndustry(''); setRegion(''); setCohort(''); setMentor(false); };
  return <>
    <PageIntro eyebrow="SHARED ROOTS. NEW CONNECTIONS." title="A community that grows with you.">Find a familiar perspective or a new one. Imagine the connections that could grow across cohorts, cities, and careers.</PageIntro>
    {features && <CohortAndCity cohort={cohort} setCohort={setCohort} region={region} setRegion={setRegion}/>}
    <section className="container section listing-section" aria-label="Sample alumni directory">
      <div className="notice">Fictional example profiles. A real directory would require verified alumni access and opt-in consent. No contact details are shown.</div>
      <div className="filters">
        <label className="search-field"><span className="sr-only">Search alumni</span><Search size={20}/><input placeholder="Search names, fields, or interests" value={query} onChange={e => setQuery(e.target.value)}/></label>
        <SelectFilter label="Industry" value={industry} onChange={setIndustry} options={unique(alumni.map(p => p.industry))} all="All industries"/>
        <SelectFilter label="Region" value={region} onChange={setRegion} options={unique(alumni.map(p => p.region))} all="All regions"/>
        <SelectFilter label="Cohort" value={cohort} onChange={setCohort} options={cohortYears} all="All cohorts"/>
        <div className="filter-actions"><label className="checkbox-label"><input type="checkbox" checked={mentor} onChange={e => setMentor(e.target.checked)}/>Available to mentor</label><button className="text-button" onClick={reset}>Clear filters</button></div>
      </div>
      <div className="results-bar"><p role="status">{results.length} fictional {results.length === 1 ? 'profile' : 'profiles'}</p><span>Illustrative connections, real possibilities</span></div>
      {results.length ? <div className="card-grid">{results.map(p => <article className="profile-card" key={p.id}>
        <div className="profile-heading"><div className="avatar">{p.initials}</div>{p.mentor && <span className="badge mentor-badge"><HeartHandshake size={14}/>Open to mentor</span>}</div>
        <p className="section-kicker">Fictional alum · Cohort {p.cohort}</p>
        <h2 className="profile-name">{p.name}</h2>
        <p className="profile-subtitle">{p.industry} · {p.region}</p>
        <div className="interest-tags">{p.interests.map(i => <span className="tag" key={i}>{i}</span>)}</div>
        <button className="text-button" onClick={() => setSelected(p)}>Meet {p.name.split(' ')[0]}<ArrowUpRight size={18}/></button>
      </article>)}</div> : <EmptyState onReset={reset}/>}
    </section>
    <section className="container section">
      <SectionHeading kicker="KEEP THE CIRCLE GROWING" title="Make your experience count."/>
      <div className="giveback-options">{[{ title: 'Be a mentor', copy: 'Offer perspective to someone finding their path.' }, { title: 'Share your story', copy: 'Spark a conversation at a future alumni gathering.' }, { title: 'Help shape the community', copy: 'Suggest ideas, welcome alumni, or help organize.' }].map(o => <article key={o.title}><h3>{o.title}</h3><p>{o.copy}</p><button className="text-button" onClick={() => notify(`Demo interest in “${o.title}” recorded on screen only. Nothing was submitted.`)}>Show demo interest<span className="sr-only">: {o.title}</span><ArrowUpRight size={18}/></button></article>)}</div>
    </section>
    {selected && <Dialog title={selected.name} onClose={() => setSelected(null)}>
      <p className="notice">Fictional example profile. No real person will be contacted.</p>
      <div className="avatar">{selected.initials}</div>
      <p className="detail-meta">Cohort {selected.cohort} · {selected.industry} · {selected.region}</p>
      <p>{selected.bio}</p>
      <div className="interest-tags">{selected.interests.map(i => <span className="tag" key={i}>{i}</span>)}</div>
      <p>{selected.mentor ? 'This example alum is available for mentoring.' : 'This example alum is open to peer connections; mentoring is not currently shown as available.'}</p>
      <div className="dialog-actions"><button className="button primary" disabled={requested.has(selected.id)} onClick={() => setRequested(new Set(requested).add(selected.id))}>{requested.has(selected.id) ? 'Demo introduction requested' : 'Request introduction — demo'}<ArrowUpRight size={18}/></button></div>
      {requested.has(selected.id) && <p className="notice" role="status">Demo confirmation only — no introduction request or email was sent.</p>}
    </Dialog>}
  </>;
}
