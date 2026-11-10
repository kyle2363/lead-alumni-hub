import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageIntro, SectionHeading } from '../components';

// The staff-side view (designs B and C). It answers the constraint CAFE staff raised
// most often: a small team, busiest in summer. Hours and sample values are the capstone
// team's estimates to check with staff, not measurements.
const roles = [
  { who: 'CAFE staff', time: 'About 2 hours a month', does: ['Approve the monthly digest the council drafts', 'Forward asks to the right alumni by name', 'Glance at the scorecard once a quarter'], not: 'Not planning every event or writing every email.' },
  { who: 'Alumni council', time: '6 to 8 volunteers, one-year terms', does: ['Plan the reunions, homecoming, and city meetups', 'Draft the digest and alumni spotlights', 'Recruit cohort captains and city hosts'], not: 'Staff give a small budget and a yes or no.' },
  { who: 'Host organizations', time: 'A few emails a year', does: ['Invite their former interns back to speak or apply', 'Send open roles for the digest', 'Join the summer social with their current intern'], not: 'They already know these alumni personally.' },
];
const year = [
  { season: 'Fall', what: 'Cohort reunions on Zoom, resume reviews, city meetups', lead: 'Alumni council', staff: 'Light' },
  { season: 'Winter', what: 'Winter homecoming, practical workshops, spotlight issue', lead: 'Alumni council', staff: 'Light' },
  { season: 'Spring', what: 'Mentor matching and speaker sign-ups for summer, career clinics', lead: 'Staff with the council', staff: 'Heaviest (planned)' },
  { season: 'Summer', what: 'Alumni mentor and speak; summer social with the new cohort', lead: 'Alumni volunteers', staff: 'Near zero for alumni work' },
];
const tools = [
  { need: 'Who alumni are and what they want', tool: 'Salesforce', note: 'Already being cleaned up. Add three fields: interests, time available, city.' },
  { need: 'The monthly digest', tool: 'CAFE’s current email tool', note: 'The site already has a newsletter sign-up. Segment by the interest field.' },
  { need: 'Jobs and quick announcements', tool: 'A LinkedIn group', note: 'Alumni post roles themselves, as the peer programs below do.' },
  { need: 'Raising a hand, pulse checks', tool: 'One short form', note: 'Two questions, sent with the digest. Answers land in Salesforce.' },
  { need: 'Reunions and networking nights', tool: 'Zoom breakout rooms', note: 'One call, a room per cohort or field.' },
  { need: 'Cohort group chats', tool: 'Whatever each cohort already uses', note: 'Captains share an opt-in link. Nothing new to adopt.' },
];
const measures = [
  { name: 'Reach', asks: 'How many alumni had at least one touch this year (opened a digest, came to something, raised a hand)?', source: 'Email tool + sign-in sheets', sample: '41% of ~380' },
  { name: 'Breadth', asks: 'Are older cohorts and alumni outside Chicago showing up, or only recent local ones?', source: 'Cohort and city on each RSVP', sample: '8 of 9 cohorts, 6 cities' },
  { name: 'Giving back', asks: 'How many asks were filled by alumni, and how many alumni filled them?', source: 'The raise-my-hand form', sample: '24 asks filled by 19 alumni' },
  { name: 'Connection', asks: 'How many introductions and alumni-led gatherings happened without staff running them?', source: 'Council’s quarterly note', sample: '31 intros, 5 alumni-led events' },
  { name: 'Voice', asks: 'Do alumni answer when asked what they want, and did anything change because of it?', source: 'Pulse check response rate', sample: '35% (the 2026 survey reached about 27%)' },
  { name: 'Staff load', asks: 'Is this still about two hours a month for staff?', source: 'A quick self-estimate each quarter', sample: '2.5 hours a month' },
];
const peers = [
  { name: 'The Opportunity Network', href: 'https://opportunitynetwork.org/alumni-leadership-council/', does: 'A volunteer Alumni Leadership Council acts as the link between alumni and staff, publishes a quarterly newsletter with alumni profiles, and points alumni to a LinkedIn group for job postings.' },
  { name: 'SEO (Sponsors for Educational Opportunity)', href: 'https://www.seo-usa.org/', does: 'Runs its alumni network through LinkedIn, and gives alumni a standing way to mentor and be mentored instead of one-off events.' },
  { name: 'LEAD’s own program page', href: 'https://www.thecafe.org/programs/lead', does: 'Already describes LEAD as building a network of alumni mentors and partner organizations that lasts beyond one cohort. This plan is one way to do that.' },
];
const pilot = ['Send one two-question pulse with the next newsletter.', 'Invite six alumni, from different cohorts and cities, to form the first council.', 'Hold one fall cohort reunion on Zoom with a breakout room per year.', 'Ask three host managers to each invite one former intern back.'];

export function StaffPage() {
  return <>
    <PageIntro eyebrow="FOR CAFE STAFF" title="Built to run on about two hours a month.">Alumni engagement can’t depend on a small team finding spare time in the summer. This is how the work is shared, which tools it uses, and how you would know it is working.</PageIntro>
    <section className="container section listing-section">
      <div className="notice">A proposal from the capstone team. Hours, roles, and sample numbers are estimates to check with CAFE staff, not measurements.</div>
      <SectionHeading kicker="WHO DOES WHAT" title="Three groups share the work."/>
      <div className="hw-roles">{roles.map(r => <article key={r.who}><p className="hw-time">{r.time}</p><h3>{r.who}</h3><ul>{r.does.map(d => <li key={d}>{d}</li>)}</ul><p className="hw-not">{r.not}</p></article>)}</div>
    </section>

    <section className="container section">
      <SectionHeading kicker="THE STAFF YEAR" title="The busy season is planned around, not through."/>
      <div className="hw-table-wrap"><table className="hw-table">
        <thead><tr><th scope="col">Season</th><th scope="col">What happens</th><th scope="col">Who leads</th><th scope="col">Staff effort</th></tr></thead>
        <tbody>{year.map(y => <tr key={y.season}><th scope="row">{y.season}</th><td>{y.what}</td><td>{y.lead}</td><td>{y.staff}</td></tr>)}</tbody>
      </table></div>
      <p className="hw-caption">Everything alumni do in the summer is arranged in the spring, so the internship season adds almost nothing to staff workload.</p>
    </section>

    <section className="container section">
      <SectionHeading kicker="TOOLS YOU ALREADY HAVE" title="No new platform to buy or learn."/>
      <div className="hw-table-wrap"><table className="hw-table">
        <thead><tr><th scope="col">The need</th><th scope="col">The tool</th><th scope="col">What changes</th></tr></thead>
        <tbody>{tools.map(t => <tr key={t.need}><th scope="row">{t.need}</th><td>{t.tool}</td><td>{t.note}</td></tr>)}</tbody>
      </table></div>
      <p className="hw-caption">This site is a picture of the alumni experience. In practice it could be one alumni page on thecafe.org that links to these tools.</p>
    </section>

    <section className="container section">
      <SectionHeading kicker="KNOWING IT WORKS" title="Six measures, none of them attendance alone."/>
      <p className="section-description">Staff told us success is not every alum at every event. It is the door being open for the ones who want it. These measures check the door, not the headcount.</p>
      <div className="hw-measures">{measures.map(m => <article key={m.name}><h3>{m.name}</h3><p>{m.asks}</p><dl><div><dt>Comes from</dt><dd>{m.source}</dd></div><div><dt>Sample value</dt><dd>{m.sample}</dd></div></dl></article>)}</div>
      <p className="hw-caption">Sample values are invented to show the format. The only real baselines are the 2026 survey’s response rate (about 80 of 300) and the 88.5% of respondents who want to stay connected.</p>
    </section>

    <section className="container section">
      <SectionHeading kicker="WHAT SIMILAR PROGRAMS DO" title="Each piece is already working somewhere."/>
      <div className="hw-roles">{peers.map(p => <article key={p.name}><h3>{p.name}</h3><p className="hw-peer">{p.does}</p><a className="text-button" href={p.href}>Source<ArrowUpRight size={16}/></a></article>)}</div>
    </section>

    <section className="container section gb-how">
      <p className="section-kicker">START SMALL</p>
      <h2 className="section-title">A first 90 days.</h2>
      <ol className="gb-steps hw-pilot">{pilot.map(p => <li key={p}><span>{p}</span></li>)}</ol>
      <Link className="button primary" to="/give-back">See the asks alumni would get<ArrowRight size={18}/></Link>
    </section>
  </>;
}
