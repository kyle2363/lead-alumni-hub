import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Moon, Sun, Leaf, Snowflake, Sprout } from 'lucide-react';
import { events, givingAsks, opportunities, seasons, timeOptions, SUMMER_NOTE, type AlumniEvent, type Opportunity, type SeasonKey, type TimeKey } from '../data';
import { Photo, Dialog, EventCard, EventDetails, OpportunityCard, PhotoSlot } from '../components';
import { DEMO_SEASON, eventDate, eventSeason, shortTitle } from '../utils';

// Design B — the CAFE look from design A (same hero, type, peach panels, navy band)
// carrying the research-driven features from design C: the time picker, the seasonal
// LEAD year, right-sized give-back asks, cohort and city views, and roles beyond staff.
const timeIcons: Record<TimeKey, typeof Clock> = { minutes: Clock, evening: Moon, season: Sun };
const seasonIcons: Record<SeasonKey, typeof Sun> = { Fall: Leaf, Winter: Snowflake, Spring: Sprout, Summer: Sun };
const beyond = [
  { tag: 'ALUMNI-LED', title: 'An alumni council', copy: 'A rotating group of alumni plans reunions and city meetups with staff support, so the network can grow without needing more staff.' },
  { tag: 'HOST ORGANIZATIONS', title: 'The people who hired you', copy: 'Former managers invite their interns back to speak, mentor, or apply. A personal invitation lands differently than a mass email.' },
  { tag: 'CONCEPT TO EXPLORE', title: 'The 1954 Project', copy: 'CAFE’s 1954 Project gives unrestricted funding to Black leaders in education, called Luminaries. Alumni could hear from Luminaries and find roles at their organizations.' },
];
// From LEAD to Luminary: where LEAD sits on CAFE's path from intern to funded education leader.
export const luminaryPath = [
  { step: 'LEAD intern', copy: 'A summer placement in philanthropy and social impact.' },
  { step: 'LEAD alum', copy: 'Stay connected, mentor the next cohort, and give back.' },
  { step: 'Education leader', copy: 'Build and lead work that changes outcomes for students.' },
  { step: '1954 Project Luminary', copy: 'CAFE’s 1954 Project funds Black leaders in education with unrestricted grants.' },
];

export function HomePage({ saved, toggleSave }: { saved: Set<string>; toggleSave: (id: string) => void }) {
  const [time, setTime] = useState<TimeKey>('evening');
  const [season, setSeason] = useState<SeasonKey>(DEMO_SEASON);
  const [event, setEvent] = useState<AlumniEvent | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  const active = timeOptions.find(t => t.key === time)!;
  const activeSeason = seasons.find(s => s.key === season)!;
  const sorted = events.slice().sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const seasonEvents = sorted.filter(e => eventSeason(e) === season);
  const asks = [...givingAsks.filter(a => a.season === DEMO_SEASON), ...givingAsks.filter(a => a.season === 'Any time')].slice(0, 3);
  return <>
    <section className="cafe-hero">
      <Photo className="cafe-hero-photo" src="gathering-group.avif" alt="A large group of LEAD alumni and CAFE Group staff posing together at a gathering" position="center 30%"/>
      <div className="cafe-hero-inner container">
        <p className="cafe-hero-eyebrow">OUR PROGRAMS · LEAD</p>
        <h1>LEAD Alumni</h1>
        <p>Your summer ended. Your LEAD didn’t. Come back for a conversation, a reunion, or a whole semester of mentoring, whenever it fits.</p>
      </div>
    </section>

    <section className="container bf-start">
      <div className="bf-start-copy">
        <p className="cafe-kicker">START WHERE YOU ARE</p>
        <h2 className="cafe-h2">Five minutes, an evening, or a semester. All of it counts.</h2>
        <p>Nearly 400 alumni now live across the country and work in finance, nonprofits, engineering, the arts, public service, and more. Nobody has time for everything, so every way of taking part here is sorted by the time it takes.</p>
        <blockquote className="cafe-pullquote">“We want to come back and we want to give back.”<footer>LEAD 2025 alum, capstone empathy interview</footer></blockquote>
      </div>
      <div className="bf-picker" aria-labelledby="picker-title">
        <h3 id="picker-title">How much time do you have?</h3>
        <div className="bf-tabs" role="group" aria-label="Time available">
          {timeOptions.map(t => { const Icon = timeIcons[t.key]; return <button key={t.key} type="button" aria-pressed={time === t.key} onClick={() => setTime(t.key)}><Icon size={16}/>{t.label}</button>; })}
        </div>
        <ul className="bf-picker-list" aria-live="polite">
          {active.items.map(i => <li key={i.title}><Link to={i.to}><span><b>{i.title}</b><small>{i.copy}</small></span><ChevronRight size={18}/></Link></li>)}
        </ul>
      </div>
    </section>

    <section className="bf-stats" aria-label="The network in numbers">
      <div className="container">
        <p><b>~380</b><span>alumni since the first cohort in 2018</span></p>
        <p><b>88.5%</b><span>of surveyed alumni want to stay connected¹</span></p>
        <p><b>4</b><span>seasons, each with a reason to come back</span></p>
      </div>
    </section>

    <section className="container cafe-section">
      <p className="cafe-kicker">THE LEAD YEAR</p>
      <h2 className="cafe-h2">A rhythm you can count on, not a calendar you have to keep</h2>
      <div className="bf-season-tabs" role="group" aria-label="Choose a season">
        {seasons.map(s => { const Icon = seasonIcons[s.key]; return <button key={s.key} type="button" aria-pressed={season === s.key} onClick={() => setSeason(s.key)}>
          <Icon size={20}/><span><b>{s.key}</b><small>{s.months}</small></span>{s.key === DEMO_SEASON && <i>Now</i>}
        </button>; })}
      </div>
      <div className="bf-season-panel" aria-live="polite">
        <div>
          <p className="cafe-kicker">{activeSeason.months}{season === DEMO_SEASON && ' · NOW IN THE SAMPLE CALENDAR'}</p>
          <h3>{activeSeason.title}</h3>
          <ul>{activeSeason.items.map(i => <li key={i}>{i}</li>)}</ul>
          {season === 'Summer' && <p className="bf-note">{SUMMER_NOTE}</p>}
        </div>
        <div>
          <p className="cafe-kicker">ON THE SAMPLE CALENDAR</p>
          <ul className="bf-season-events">{seasonEvents.map(e => <li key={e.id}><button type="button" onClick={() => setEvent(e)}><span>{eventDate(e, { month: 'short', day: 'numeric' })}</span><b>{shortTitle(e)}</b><small>{e.format}</small></button></li>)}</ul>
          <Link className="cafe-text-link" to="/events">All Events<ChevronRight size={16}/></Link>
        </div>
      </div>
    </section>

    <div className="cafe-photo-strip"><Photo src="cohort-group.avif" alt="Four LEAD interns smiling in front of a CAFE Group backdrop" position="center 25%"/><Photo src="roundtable.avif" alt="Alumni listening during a roundtable discussion"/></div>

    <section className="container cafe-section">
      <div className="cafe-heading-row"><div><p className="cafe-kicker">GIVE BACK</p><h2 className="cafe-h2">This season’s asks, sized to fit your life</h2></div><Link className="cafe-text-link" to="/give-back">All Ways to Give Back<ChevronRight size={16}/></Link></div>
      <p className="cafe-small">Fictional sample asks. Saying “not this time” keeps you on the list.</p>
      <div className="bf-ask-grid">
        {asks.map(a => <article className="bf-ask" key={a.id}>
          <p className="bf-ask-top"><span>{a.commitment}</span><span>{a.season}</span></p>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <p className="bf-ask-by">{a.format} · Asked by {a.askedBy}</p>
          <Link className="cafe-text-link" to="/give-back">Raise My Hand<ChevronRight size={16}/></Link>
        </article>)}
      </div>
    </section>

    <section className="container cafe-section">
      <div className="cafe-heading-row"><div><p className="cafe-kicker">UPCOMING</p><h2 className="cafe-h2">Alumni gatherings</h2></div><Link className="cafe-text-link" to="/events">All Events<ChevronRight size={16}/></Link></div>
      <p className="cafe-small">Fictional sample events for 2027. Each one shows who is going, so you can spot your cohort.</p>
      <div className="card-grid">{sorted.slice(0, 3).map(e => <EventCard key={e.id} event={e} onOpen={() => setEvent(e)}/>)}</div>
    </section>

    <section className="cafe-split">
      <div className="cafe-split-copy">
        <p className="cafe-kicker">YOUR COHORT, YOUR CITY</p>
        <h2>The people from your summer are still out there. Some are closer than you think.</h2>
        <p>Most alumni keep up with a handful of friends in a group chat and lose track of everyone else. The community page starts with your cohort and the alumni who live near you now, then opens up to every year and field.</p>
        <p>Cohort captains and city hosts are alumni volunteers, so a reunion in Atlanta or a meetup in Washington doesn’t wait on staff in Chicago.</p>
        <div className="cafe-actions"><Link className="button primary" to="/community">Find Your Cohort<ChevronRight size={18}/></Link></div>
      </div>
      <PhotoSlot className="cafe-split-photo" label="alumni meetup outside Chicago"/>
    </section>

    <section className="container cafe-section">
      <div className="cafe-heading-row"><div><p className="cafe-kicker">YOUR NEXT STEP</p><h2 className="cafe-h2">Opportunities for alumni</h2></div><Link className="cafe-text-link" to="/opportunities">All Opportunities<ChevronRight size={16}/></Link></div>
      <div className="card-grid">{opportunities.slice(0, 3).map(o => <OpportunityCard key={o.id} opportunity={o} saved={saved.has(o.id)} onSave={() => toggleSave(o.id)} onOpen={() => setOpportunity(o)}/>)}</div>
    </section>

    <section className="bf-path" aria-labelledby="path-title">
      <div className="container">
        <p className="cafe-kicker">FROM LEAD TO LUMINARY</p>
        <h2 id="path-title" className="cafe-h2">Your summer is the first step on a longer path.</h2>
        <figure className="path-figure"><img src={`${import.meta.env.BASE_URL}images/luminaries-2026.avif`} alt="The CAFE Group graphic announcing the 2026 1954 Project Luminaries" loading="lazy"/><figcaption>The 2026 1954 Project Luminaries. Image: The CAFE Group.</figcaption></figure>
        <ol className="bf-path-steps">{luminaryPath.map((p, i) => <li key={p.step}><span>{String(i + 1).padStart(2, '0')}</span><b>{p.step}</b><small>{p.copy}</small></li>)}</ol>
        <p className="cafe-small">A concept to explore with CAFE. Sample <Link to="/events">Luminary events</Link> and <Link to="/opportunities">Luminary organization roles</Link> are fictional. Not an offer of funding.</p>
      </div>
    </section>

    <section className="container cafe-section">
      <p className="cafe-kicker">BEYOND CAFE STAFF</p>
      <h2 className="cafe-h2">More people in your corner, less work for a small team</h2>
      <div className="bf-beyond-grid">{beyond.map(b => <article key={b.title}><p className="bf-tag">{b.tag}</p><h3>{b.title}</h3><p>{b.copy}</p></article>)}</div>
      <p className="cafe-lede">Curious how this runs without adding to staff workload? <Link className="cafe-text-link" to="/how-it-runs">See the Plan for Staff<ChevronRight size={16}/></Link></p>
    </section>

    <section className="cafe-band">
      <div className="container">
        <p className="cafe-kicker">STAY CONNECTED</p>
        <h2>One email a month, at most. Only what you picked.</h2>
        <p>Choose your topics once. Events, roles, and asks that match will find you, and you can change your mind anytime.</p>
        <div className="cafe-actions">
          <Link className="button primary" to="/newsletter">Build Your Digest<ChevronRight size={18}/></Link>
          <Link className="button ghost" to="/give-back">Ways to Give Back<ChevronRight size={18}/></Link>
        </div>
      </div>
    </section>
    <p className="container bf-source">¹ From the capstone team’s review of CAFE’s 2026 alumni outreach survey (about 80 responses). Everything else on this site is fictional.</p>

    {event && <Dialog title={shortTitle(event)} onClose={() => setEvent(null)}><EventDetails event={event} confirmed={rsvps.has(event.id)} onRsvp={() => setRsvps(new Set(rsvps).add(event.id))}/></Dialog>}
    {opportunity && <Dialog title={opportunity.title.replace(/^Example [^:]+: /, '')} onClose={() => setOpportunity(null)}><p className="notice">Fictional opportunity · No applications are accepted.</p><p className="detail-meta">{opportunity.organization} · {opportunity.location}</p><p>{opportunity.description}</p><button className="button primary" aria-pressed={saved.has(opportunity.id)} onClick={() => toggleSave(opportunity.id)}>{saved.has(opportunity.id) ? 'Unsave opportunity' : 'Save for demo'}</button></Dialog>}
  </>;
}
