import { describe, expect, it } from 'vitest';
import { alumni, cityHosts, cohortCaptains, events, opportunities } from './data';
import {
  DEMO_DATE,
  DEMO_SEASON,
  eventSeason,
  eventSchedule,
  filterAlumni,
  filterEvents,
  filterOpportunities,
} from './utils';

describe('event filters', () => {
  it('combines query, format, topic, location, and upcoming filters', () => {
    const results = filterEvents(events, 'finance', 'Virtual', 'Business & finance', 'Online', true);
    expect(results.map(event => event.id)).toEqual(['event-impact-investing-2027']);
  });

  it('finds the finance event by searching its industry', () => {
    expect(filterEvents(events, ' finance ', '', '', '', false).map(event => event.id))
      .toContain('event-impact-investing-2027');
  });

  it('treats Online as virtual or hybrid, but not in person', () => {
    const results = filterEvents(events, '', '', '', 'Online', false);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(event => event.format !== 'In person')).toBe(true);
    expect(results.some(event => event.format === 'Hybrid')).toBe(true);
  });

  it('sorts matching events chronologically regardless of input order', () => {
    const results = filterEvents([...events].reverse(), '', '', '', '', false);
    expect(results.map(event => event.startsAt)).toEqual(
      [...events].map(event => event.startsAt).sort((a, b) => Date.parse(a) - Date.parse(b)),
    );
  });

  it('uses the fixed demo date when selecting upcoming events', () => {
    expect(DEMO_DATE).toBe('2027-01-01T00:00:00-06:00');
    const pastExample = { ...events[0], startsAt: '2026-12-31T23:59:00-06:00' };
    const results = filterEvents([pastExample, ...events], '', '', '', '', true);
    expect(results).not.toContainEqual(pastExample);
    expect(results).toHaveLength(events.length);
  });

  it('formats winter and summer schedules using the Chicago time zone', () => {
    const winter = eventSchedule(events[0]);
    const summer = eventSchedule(events.find(event => event.startsAt.includes('06-17'))!);
    expect(winter).toContain('CST');
    expect(summer).toContain('CDT');
  });
});

describe('opportunity filters', () => {
  it('combines remote, type, and saved-only filters by saved IDs', () => {
    const saved = new Set(['opp-mentor-finance', 'opp-youth-program-job', 'opp-community-finance-fellowship']);
    const results = filterOpportunities(opportunities, '', 'Mentorship', '', true, true, saved);
    expect(results.map(item => item.id)).toEqual(['opp-mentor-finance']);
  });

  it('has an available finance mentor matching fixture', () => {
    const financeMentors = filterAlumni(alumni, '', 'Finance', '', '', true);
    const matchingOpportunity = opportunities.find(item => item.id === 'opp-mentor-finance');
    expect(financeMentors.some(person => person.name === 'Jordan Ellis')).toBe(true);
    expect(matchingOpportunity).toMatchObject({ type: 'Mentorship', industry: 'Finance', remote: true });
    expect(matchingOpportunity?.description).toContain('Jordan Ellis');
  });

  it('returns no results when filters cannot match', () => {
    expect(filterOpportunities(opportunities, 'nonexistent', '', '', false, false, new Set())).toEqual([]);
  });
});

describe('fixtures match the research', () => {
  it('keeps every profile and RSVP cohort inside LEAD’s real range (first cohort 2018)', () => {
    const years = [...alumni.map(person => person.cohort), ...events.flatMap(event => event.cohorts)];
    expect(Math.min(...years)).toBeGreaterThanOrEqual(2018);
    expect(Math.max(...years)).toBeLessThanOrEqual(2026);
  });

  it('has sample events in all four seasons', () => {
    expect(new Set(events.map(eventSeason))).toEqual(new Set(['Winter', 'Spring', 'Summer', 'Fall']));
    expect(DEMO_SEASON).toBe('Winter');
  });

  it('names cohort captains and city hosts who exist in the directory', () => {
    const names = alumni.map(person => person.name);
    for (const name of [...Object.values(cohortCaptains), ...Object.values(cityHosts)]) expect(names).toContain(name);
  });
});

describe('alumni search', () => {
  it('matches search case-insensitively and trims surrounding whitespace', () => {
    expect(filterAlumni(alumni, '  INCLUSIVE FINANCE  ', '', '', '', false).map(person => person.id))
      .toContain('alumni-jordan-ellis');
  });
});
