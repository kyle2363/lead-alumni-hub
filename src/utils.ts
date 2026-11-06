import type { AlumniEvent, AlumniProfile, Opportunity } from './data';

// A fixed reference keeps the fictional 2027 schedule useful in future demos.
export const DEMO_DATE = '2027-01-01T00:00:00-06:00';
export const includesQuery = (query: string, fields: string[]) =>
  fields.join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());

export function filterEvents(items: AlumniEvent[], query: string, format: string, topic: string, location: string, upcoming: boolean) {
  return items.filter(e => includesQuery(query, [e.title, e.description, e.topic, e.industry])
    && (!format || e.format === format) && (!topic || e.topic === topic)
    && (!location || (location === 'Online' ? e.format !== 'In person' : e.location.includes(location)))
    && (!upcoming || new Date(e.startsAt).getTime() >= new Date(DEMO_DATE).getTime()))
    .sort((a,b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}
export function filterOpportunities(items: Opportunity[], query: string, type: string, industry: string, remote: boolean, savedOnly: boolean, saved: Set<string>) {
  return items.filter(o => includesQuery(query, [o.title, o.summary, o.description, o.industry])
    && (!type || o.type === type) && (!industry || o.industry === industry)
    && (!remote || o.remote) && (!savedOnly || saved.has(o.id)));
}
export function filterAlumni(items: AlumniProfile[], query: string, industry: string, region: string, cohort: string, mentor: boolean) {
  return items.filter(p => includesQuery(query, [p.name, p.industry, ...p.interests])
    && (!industry || p.industry === industry) && (!region || p.region === region)
    && (!cohort || p.cohort === Number(cohort)) && (!mentor || p.mentor));
}
export function eventDate(e: AlumniEvent, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: e.timeZone }).format(new Date(e.startsAt));
}
export function eventSchedule(e: AlumniEvent) {
  return eventDate(e, { weekday:'long', month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit', timeZoneName:'short' });
}
export const unique = (values: string[]) => [...new Set(values)].sort();
