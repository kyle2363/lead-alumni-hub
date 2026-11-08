import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock, Moon, Sun, Leaf, Snowflake, Sprout } from 'lucide-react';
import { events, type AlumniEvent } from '../data';
import { Dialog, EventDetails } from '../components';
import { DEMO_DATE, eventDate } from '../utils';

// Design C — "Reimagined". Built around the empathy-interview findings: alumni want
// flexible, optional ways in (time picker), a predictable yearly rhythm (seasons),
// real ways to give back, and connections beyond CAFE staff (hosts, alumni, 1954 Project).
type TimeKey = 'minutes' | 'evening' | 'season';
const timeOptions: { key: TimeKey; label: string; icon: typeof Clock; items: { title: string; copy: string; to: string }[] }[] = [
  { key: 'minutes', label: '5 minutes', icon: Clock, items: [
    { title: 'Read the monthly digest', copy: 'Events, roles, and alumni news picked for your interests.', to: '/newsletter' },
    { title: 'Answer a two-question pulse', copy: 'Tell us what you would actually show up for.', to: '/give-back' },
    { title: 'Browse open roles', copy: 'Fellowships and jobs shared by alumni and hosts.', to: '/opportunities' },
  ] },
  { key: 'evening', label: 'An evening', icon: Moon, items: [
    { title: 'Join a virtual networking night', copy: 'Small breakout rooms, grouped by industry.', to: '/events' },
    { title: 'Coffee chat with an alum in your field', copy: 'Opt-in introductions across cohorts and cities.', to: '/community' },
    { title: 'Talk with this summer’s interns', copy: 'Thirty minutes that someone will remember for years.', to: '/give-back' },
  ] },
  { key: 'season', label: 'A season', icon: Sun, items: [
    { title: 'Mentor a summer intern', copy: 'Ten weeks, every other week, matched by interest.', to: '/give-back' },
    { title: 'Join the advisory circle', copy: 'Quarterly input that shapes what LEAD does next.', to: '/give-back' },
    { title: 'Start a meetup in your city', copy: 'Staff send the invites and cover a small budget.', to: '/give-back' },
  ] },
];

type SeasonKey = 'Summer' | 'Fall' | 'Winter' | 'Spring';
const seasons: { key: SeasonKey; months: string; title: string; icon: typeof Sun; items: string[] }[] = [
  { key: 'Fall', months: 'Sep – Nov', title: 'Back to campus', icon: Leaf, items: ['Cohort reunions on Zoom', 'Resume reviews by alumni', 'Industry interest groups kick off'] },
  { key: 'Winter', months: 'Dec – Feb', title: 'Homecoming', icon: Snowflake, items: ['Winter-break homecoming in Chicago', 'Alumni-hosted meetups in other cities', 'Alumni spotlight issue'] },
  { key: 'Spring', months: 'Mar – May', title: 'Get ready', icon: Sprout, items: ['Career clinics and mock interviews', 'Mentor matching for the summer', 'Advisory circle sets summer priorities'] },
  { key: 'Summer', months: 'Jun – Aug', title: 'The new cohort arrives', icon: Sun, items: ['Alumni mentor current interns', 'Alumni speak at workshops', 'Summer social with both cohorts'] },
];
function seasonFor(date: Date): SeasonKey {
  const m = date.getMonth();
  return m >= 5 && m <= 7 ? 'Summer' : m >= 8 && m <= 10 ? 'Fall' : m >= 2 && m <= 4 ? 'Spring' : 'Winter';
}

export function StudioHomePage() {
  const [time, setTime] = useState<TimeKey>('evening');
  const now = seasonFor(new Date(DEMO_DATE));
  const [season, setSeason] = useState<SeasonKey>(now);
  const [event, setEvent] = useState<AlumniEvent | null>(null);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  const active = timeOptions.find(t => t.key === time)!;
  const activeSeason = seasons.find(s => s.key === season)!;
  const upcoming = events.slice().sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)).slice(0, 4);
  return <>
    <section className="st-hero">
      <div className="container st-hero-grid">
        <div className="st-hero-copy">
          <p className="st-eyebrow">LEAD alumni network</p>
          <h1>Your summer ended.<br/><em>Your LEAD didn’t.</em></h1>
          <p>Come back for a conversation, a reunion, or a whole season of mentoring. Show up when it fits, and skip when it doesn’t. The door stays open.</p>
          <div className="st-hero-actions"><Link className="button primary" to="/give-back">Find a way to give back<ArrowRight size={18}/></Link><Link className="button st-link-light" to="/events">See gatherings</Link></div>
        </div>
        <div className="st-picker" aria-labelledby="picker-title">
          <p className="st-picker-kicker">Start here</p>
          <h2 id="picker-title">How much time do you have?</h2>
          <div className="st-picker-tabs" role="group" aria-label="Time available">
            {timeOptions.map(t => <button key={t.key} type="button" aria-pressed={time === t.key} onClick={() => setTime(t.key)}><t.icon size={16}/>{t.label}</button>)}
          </div>
          <ul className="st-picker-list" aria-live="polite">
            {active.items.map(i => <li key={i.title}><Link to={i.to}><span><b>{i.title}</b><small>{i.copy}</small></span><ArrowUpRight size={18}/></Link></li>)}
          </ul>
        </div>
      </div>
      <div className="container st-stats">
        <p><b>~380</b><span>alumni since the first cohort in 2018</span></p>
        <p><b>88.5%</b><span>of surveyed alumni want to stay connected¹</span></p>
        <p><b>4</b><span>seasons, each with a reason to come back</span></p>
      </div>
    </section>

    <section className="container st-section">
      <div className="st-heading"><p className="st-eyebrow">The LEAD year</p><h2>A rhythm you can count on, <em>not a calendar you have to keep.</em></h2></div>
      <div className="st-seasons">
        <div className="st-season-tabs" role="group" aria-label="Choose a season">
          {seasons.map(s => <button key={s.key} type="button" aria-pressed={season === s.key} onClick={() => setSeason(s.key)} className={`st-season-tab st-season-${s.key.toLowerCase()}`}>
            <s.icon size={20}/><span><b>{s.key}</b><small>{s.months}</small></span>{s.key === now && <i className="st-now">Now</i>}
          </button>)}
        </div>
        <div className={`st-season-panel st-season-${season.toLowerCase()}`} aria-live="polite">
          <p className="st-eyebrow">{activeSeason.months}{season === now && ' · happening now in the sample calendar'}</p>
          <h3>{activeSeason.title}</h3>
          <ul>{activeSeason.items.map(i => <li key={i}>{i}</li>)}</ul>
          {season === 'Summer' && <p className="st-note">Summer is the busiest time for staff, so summer asks are lined up in the spring and run by alumni volunteers.</p>}
        </div>
      </div>
    </section>

    <section className="st-quote-band">
      <div className="container st-quote-grid">
        <blockquote><p>“We want to come back and we want to give back.”</p><footer>LEAD 2025 alum, capstone empathy interview</footer></blockquote>
        <div className="st-quote-cta">
          <p>Alumni aren’t only an audience. Mentoring, speaking, hosting, and shaping the program are the reasons many will come back.</p>
          <Link className="button dark" to="/give-back">See this season’s asks<ArrowRight size={18}/></Link>
        </div>
      </div>
    </section>

    <section className="container st-section">
      <div className="st-heading st-heading-row"><div><p className="st-eyebrow">Coming up</p><h2>Gatherings <em>near you or online</em></h2></div><Link className="section-link" to="/events">All gatherings<ArrowUpRight size={18}/></Link></div>
      <ol className="st-event-list">
        {upcoming.map(e => <li key={e.id}><button type="button" onClick={() => setEvent(e)}>
          <span className="st-event-date"><small>{eventDate(e, { month: 'short' })}</small>{eventDate(e, { day: 'numeric' })}</span>
          <span className="st-event-main"><b>{e.title.replace('Example Event: ', '')}</b><small>{e.topic} · {e.location.replace(/ \(example.*\)/, '')}</small></span>
          <span className={`st-format st-format-${e.format.replace(' ', '-').toLowerCase()}`}>{e.format}</span>
          <ArrowUpRight size={20} className="st-event-arrow"/>
        </button></li>)}
      </ol>
      <p className="st-footnote">Fictional sample events for 2027.</p>
    </section>

    <section className="container st-section st-beyond">
      <div className="st-heading"><p className="st-eyebrow">Beyond the CAFE staff</p><h2>More people in your corner. <em>Less work for a small team.</em></h2></div>
      <div className="st-beyond-grid">
        <article className="st-tile st-tile-lilac"><p className="st-tag">Alumni-led</p><h3>An alumni council</h3><p>A rotating group of alumni plans reunions and city meetups with staff support, so the network can grow without needing more staff.</p></article>
        <article className="st-tile st-tile-mint"><p className="st-tag">Host organizations</p><h3>The people who hired you</h3><p>Former managers invite their interns back to speak, mentor, or apply. A personal invitation lands differently than a mass email.</p></article>
        <article className="st-tile st-tile-sky"><p className="st-tag">Concept to explore</p><h3>The 1954 Project network</h3><p>Conversations with leaders in CAFE’s wider network, including in the cities where alumni now study and work.</p></article>
      </div>
    </section>

    <section className="container st-signup">
      <div><p className="st-eyebrow">Low effort, high signal</p><h2>One email a month, at most. <em>Only what you picked.</em></h2></div>
      <Link className="button dark" to="/newsletter">Build your digest<ArrowRight size={18}/></Link>
    </section>
    <p className="container st-source">¹ From the capstone team’s review of CAFE’s 2026 alumni outreach survey (about 80 responses). Everything else on this site is fictional.</p>

    {event && <Dialog title={event.title.replace('Example Event: ', '')} onClose={() => setEvent(null)}><EventDetails event={event} confirmed={rsvps.has(event.id)} onRsvp={() => setRsvps(new Set(rsvps).add(event.id))}/></Dialog>}
  </>;
}
