import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { events, opportunities, type AlumniEvent, type Opportunity } from '../data';
import { Dialog, EventCard, EventDetails, OpportunityCard, PhotoSlot } from '../components';

// Design A — mirrors the structure of thecafe.org/programs/lead: photo hero, a long-form
// "about" block with a blue pull quote, peach feature cards, a split "why it matters"
// section, and a navy call-to-action band. Photos are labeled placeholders.
const experience = [
  { title: 'Gatherings', photo: 'alumni at a reunion', copy: 'Virtual coffee chats, themed networking sessions, and a yearly homecoming during winter break bring cohorts back together, wherever alumni live now.', to: '/events', link: 'Explore Events' },
  { title: 'Opportunities', photo: 'alum at work', copy: 'Fellowships, mission-driven roles, and career resources shared by staff, host organizations, and fellow alumni across the industries LEAD alumni work in.', to: '/opportunities', link: 'View Opportunities' },
  { title: 'Mentorship', photo: 'mentor and intern talking', copy: 'Alumni return to mentor summer interns, speak at workshops, and help the next cohort find its footing, on a schedule that fits their lives.', to: '/community?mentor=true', link: 'Meet Mentors' },
];

export function CafeHomePage({ saved, toggleSave }: { saved: Set<string>; toggleSave: (id: string) => void }) {
  const [event, setEvent] = useState<AlumniEvent | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  // Design A mirrors thecafe.org, so the 1954 Project samples (B and C only) stay out.
  const upcoming = events.filter(e => !e.luminary).slice().sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)).slice(0, 3);
  return <>
    <section className="cafe-hero">
      <PhotoSlot className="cafe-hero-photo" label="alumni reconnecting at a LEAD gathering"/>
      <div className="cafe-hero-inner container">
        <p className="cafe-hero-eyebrow">OUR PROGRAMS · LEAD</p>
        <h1>LEAD Alumni</h1>
        <p>Keeping emerging leaders connected after the summer through gatherings, opportunities, and relationships that keep growing with them.</p>
      </div>
    </section>

    <section className="container cafe-about">
      <p className="cafe-kicker">ABOUT THE NETWORK</p>
      <h2>Real relationships. Year-round connection. A network built to last.</h2>
      <p>Every summer, a new LEAD cohort builds community across host organizations in Chicagoland. Nearly 400 alumni later, those relationships now stretch across the country and into finance, nonprofits, engineering, the arts, public service, and more.</p>
      <p>The LEAD Alumni Network is how that community keeps going. Alumni can reconnect with their cohort, meet people from other years, find their next opportunity, and give back to the students coming up behind them.</p>
      <blockquote className="cafe-pullquote">We meet alumni where they are, whether that's one newsletter a quarter or mentoring a new cohort every summer.</blockquote>
      <div className="cafe-actions">
        <Link className="button primary" to="/events">Explore Alumni Events<ChevronRight size={18}/></Link>
        <Link className="button secondary" to="/newsletter">Stay Connected<ChevronRight size={18}/></Link>
      </div>
    </section>

    <div className="cafe-photo-strip"><PhotoSlot label="cohort group photo"/><PhotoSlot label="alumni panel at a workshop"/></div>

    <section className="container cafe-section">
      <p className="cafe-kicker">THE ALUMNI EXPERIENCE</p>
      <h2 className="cafe-h2">What staying connected looks like</h2>
      <div className="cafe-feature-grid">
        {experience.map(x => <article className="cafe-feature" key={x.title}>
          <PhotoSlot label={x.photo}/>
          <div><h3>{x.title}</h3><p>{x.copy}</p><Link className="cafe-text-link" to={x.to}>{x.link}<ChevronRight size={16}/></Link></div>
        </article>)}
      </div>
      <p className="cafe-lede">Participation is always optional. Success isn't every alum at every event. It's an open door whenever someone wants to walk back through it.</p>
    </section>

    <section className="container cafe-section">
      <div className="cafe-heading-row"><div><p className="cafe-kicker">UPCOMING</p><h2 className="cafe-h2">Alumni gatherings</h2></div><Link className="cafe-text-link" to="/events">All Events<ChevronRight size={16}/></Link></div>
      <p className="cafe-small">Fictional sample events for 2027.</p>
      <div className="card-grid">{upcoming.map(e => <EventCard key={e.id} event={e} onOpen={() => setEvent(e)}/>)}</div>
    </section>

    <section className="cafe-split">
      <div className="cafe-split-copy">
        <p className="cafe-kicker">WHY IT MATTERS</p>
        <h2>The relationships built in one summer can shape a whole career.</h2>
        <p>When the summer ends, interns return to campuses across the country. Without a shared structure, staying in touch depends on a group chat or a personal connection with staff, and many alumni drift away.</p>
        <p>An intentional alumni network turns one summer of community into lasting social capital. Alumni get peers and mentors to grow with, and the next cohort gets role models who once sat in the same seats.</p>
      </div>
      <PhotoSlot className="cafe-split-photo" label="alumni in conversation"/>
    </section>

    <section className="container cafe-section">
      <div className="cafe-heading-row"><div><p className="cafe-kicker">YOUR NEXT STEP</p><h2 className="cafe-h2">Opportunities for alumni</h2></div><Link className="cafe-text-link" to="/opportunities">All Opportunities<ChevronRight size={16}/></Link></div>
      <div className="card-grid">{opportunities.filter(o => !o.luminary).slice(0, 3).map(o => <OpportunityCard key={o.id} opportunity={o} saved={saved.has(o.id)} onSave={() => toggleSave(o.id)} onOpen={() => setOpportunity(o)}/>)}</div>
    </section>

    <section className="cafe-band">
      <div className="container">
        <p className="cafe-kicker">GIVE BACK</p>
        <h2>Someone's next chapter could start with you.</h2>
        <p>Mentor a summer intern, share your story at a workshop, or help shape what the alumni network becomes.</p>
        <div className="cafe-actions">
          <Link className="button primary" to="/community?mentor=true">Explore Mentoring<ChevronRight size={18}/></Link>
          <Link className="button ghost" to="/opportunities?type=Volunteer">Ways to Give Back<ChevronRight size={18}/></Link>
        </div>
      </div>
    </section>

    {event && <Dialog title={event.title.replace('Example Event: ', '')} onClose={() => setEvent(null)}><EventDetails event={event} confirmed={rsvps.has(event.id)} onRsvp={() => setRsvps(new Set(rsvps).add(event.id))}/></Dialog>}
    {opportunity && <Dialog title={opportunity.title.replace(/^Example [^:]+: /, '')} onClose={() => setOpportunity(null)}><p className="notice">Fictional opportunity · No applications are accepted.</p><p className="detail-meta">{opportunity.organization} · {opportunity.location}</p><p>{opportunity.description}</p><button className="button primary" aria-pressed={saved.has(opportunity.id)} onClick={() => toggleSave(opportunity.id)}>{saved.has(opportunity.id) ? 'Unsave opportunity' : 'Save for demo'}</button></Dialog>}
  </>;
}
