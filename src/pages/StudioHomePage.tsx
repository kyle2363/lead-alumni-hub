import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock, Moon, Sun, Leaf, Snowflake, Sprout } from 'lucide-react';
import { events, seasons, timeOptions, SUMMER_NOTE, type AlumniEvent, type SeasonKey, type TimeKey } from '../data';
import { Dialog, EventDetails } from '../components';
import { luminaryPath } from './HomePage';
import { DEMO_SEASON, eventDate, eventSeason, shortTitle } from '../utils';

// Design C — "Reimagined". Built around the empathy-interview findings: alumni want
// flexible, optional ways in (time picker), a predictable yearly rhythm (seasons),
// real ways to give back, and connections beyond CAFE staff (hosts, alumni, 1954 Project).
const timeIcons: Record<TimeKey, typeof Clock> = { minutes: Clock, evening: Moon, season: Sun };
const seasonIcons: Record<SeasonKey, typeof Sun> = { Fall: Leaf, Winter: Snowflake, Spring: Sprout, Summer: Sun };

export function StudioHomePage() {
  const [time, setTime] = useState<TimeKey>('evening');
  const now = DEMO_SEASON;
  const [season, setSeason] = useState<SeasonKey>(now);
  const [event, setEvent] = useState<AlumniEvent | null>(null);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  const active = timeOptions.find(t => t.key === time)!;
  const activeSeason = seasons.find(s => s.key === season)!;
  const sorted = events.slice().sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const upcoming = sorted.slice(0, 4);
  const seasonEvents = sorted.filter(e => eventSeason(e) === season);
  return <>
    <section className="st-hero">
      <div className="container st-hero-grid">
        <div className="st-hero-copy">
          <p className="st-eyebrow">LEAD alumni network</p>
          <h1>Your summer ended.<br/><em>Your LEAD didn’t.</em></h1>
          <p>Come back for a conversation, a reunion, or a whole semester of mentoring. Show up when it fits, and skip when it doesn’t. The door stays open.</p>
          <div className="st-hero-actions"><Link className="button primary" to="/give-back">Find a way to give back<ArrowRight size={18}/></Link><Link className="button st-link-light" to="/events">See gatherings</Link></div>
        </div>
        <div className="st-picker" aria-labelledby="picker-title">
          <p className="st-picker-kicker">Start here</p>
          <h2 id="picker-title">How much time do you have?</h2>
          <div className="st-picker-tabs" role="group" aria-label="Time available">
            {timeOptions.map(t => { const Icon = timeIcons[t.key]; return <button key={t.key} type="button" aria-pressed={time === t.key} onClick={() => setTime(t.key)}><Icon size={16}/>{t.label}</button>; })}
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
          {seasons.map(s => { const Icon = seasonIcons[s.key]; return <button key={s.key} type="button" aria-pressed={season === s.key} onClick={() => setSeason(s.key)} className={`st-season-tab st-season-${s.key.toLowerCase()}`}>
            <Icon size={20}/><span><b>{s.key}</b><small>{s.months}</small></span>{s.key === now && <i className="st-now">Now</i>}
          </button>; })}
        </div>
        <div className={`st-season-panel st-season-${season.toLowerCase()}`} aria-live="polite">
          <p className="st-eyebrow">{activeSeason.months}{season === now && ' · happening now in the sample calendar'}</p>
          <h3>{activeSeason.title}</h3>
          <ul>{activeSeason.items.map(i => <li key={i}>{i}</li>)}</ul>
          {seasonEvents.length > 0 && <p className="st-season-events">On the sample calendar: {seasonEvents.map((e, i) => <span key={e.id}>{i > 0 && ' · '}<b>{shortTitle(e)}</b> ({eventDate(e, { month: 'short', day: 'numeric' })})</span>)}</p>}
          {season === 'Summer' && <p className="st-note">{SUMMER_NOTE}</p>}
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

    <section className="container st-section st-path" aria-labelledby="st-path-title">
      <div className="st-heading"><p className="st-eyebrow">From LEAD to Luminary</p><h2 id="st-path-title">Your summer is the first step <em>on a longer path.</em></h2></div>
      <ol className="st-path-steps">{luminaryPath.map((p, i) => <li key={p.step}><span>{String(i + 1).padStart(2, '0')}</span><b>{p.step}</b><small>{p.copy}</small></li>)}</ol>
      <p className="st-footnote">A concept to explore with CAFE. Sample <Link className="st-inline-link" to="/events">Luminary events</Link> and <Link className="st-inline-link" to="/opportunities">Luminary organization roles</Link> are fictional. Not an offer of funding.</p>
    </section>

    <section className="container st-section st-beyond">
      <div className="st-heading"><p className="st-eyebrow">Beyond the CAFE staff</p><h2>More people in your corner. <em>Less work for a small team.</em></h2></div>
      <div className="st-beyond-grid">
        <article className="st-tile st-tile-lilac"><p className="st-tag">Alumni-led</p><h3>An alumni council</h3><p>A rotating group of alumni plans reunions and city meetups with staff support, so the network can grow without needing more staff.</p></article>
        <article className="st-tile st-tile-mint"><p className="st-tag">Host organizations</p><h3>The people who hired you</h3><p>Former managers invite their interns back to speak, mentor, or apply. A personal invitation lands differently than a mass email.</p></article>
        <article className="st-tile st-tile-sky"><p className="st-tag">Concept to explore</p><h3>The 1954 Project</h3><p>CAFE’s 1954 Project gives unrestricted funding to Black leaders in education, called Luminaries. Alumni could hear from Luminaries and find roles at their organizations.</p></article>
      </div>
      <p className="st-footnote">Wondering how a small team keeps this going? <Link className="st-inline-link" to="/how-it-runs">See the plan for staff</Link>, or <Link className="st-inline-link" to="/community">find your cohort and your city</Link>.</p>
    </section>

    <section className="container st-signup">
      <div><p className="st-eyebrow">Low effort, high signal</p><h2>One email a month, at most. <em>Only what you picked.</em></h2></div>
      <Link className="button dark" to="/newsletter">Build your digest<ArrowRight size={18}/></Link>
    </section>
    <p className="container st-source">¹ From the capstone team’s review of CAFE’s 2026 alumni outreach survey (about 80 responses). Everything else on this site is fictional.</p>

    {event && <Dialog title={event.title.replace('Example Event: ', '')} onClose={() => setEvent(null)}><EventDetails event={event} confirmed={rsvps.has(event.id)} onRsvp={() => setRsvps(new Set(rsvps).add(event.id))}/></Dialog>}
  </>;
}
