import { useState } from 'react';
import { Search } from 'lucide-react';
import { events, type AlumniEvent } from '../data';
import { PageBand, Dialog, EmptyState, EventCard, EventDetails, PageIntro, SelectFilter } from '../components';
import { filterEvents, unique } from '../utils';
import { hasFeatures, useDesign } from '../design';

export function EventsPage() {
  const [query,setQuery]=useState(''),[format,setFormat]=useState(''),[topic,setTopic]=useState(''),[location,setLocation]=useState('');
  const [upcoming,setUpcoming]=useState(false),[selected,setSelected]=useState<AlumniEvent|null>(null),[rsvps,setRsvps]=useState<Set<string>>(new Set());
  const features=hasFeatures(useDesign()),[luminary,setLuminary]=useState(false);
  // The 1954 Project samples show only in designs B and C; design A mirrors thecafe.org.
  const pool=features?events:events.filter(e=>!e.luminary);
  const results=filterEvents(pool,query,format,topic,location,upcoming).filter(e=>!luminary||e.luminary);
  const reset=()=>{setQuery('');setFormat('');setTopic('');setLocation('');setUpcoming(false);setLuminary(false);};
  return <><PageIntro eyebrow="COME TOGETHER. KEEP GROWING." title="Find a reason to reconnect.">Big ideas, shared experiences, and conversations that stay with you. Explore a sample calendar built around our community.</PageIntro><PageBand src="reunion.avif" alt="Four LEAD alumni standing together at a CAFE Group event" position="center 18%"/><section className="container section listing-section" aria-label="Explore events"><div className="notice">Fictional 2027 sample schedule · “Upcoming” is relative to January 1, 2027, so this demonstration stays consistent.</div><div className="filters"><label className="search-field"><span className="sr-only">Search events</span><Search size={20}/><input placeholder="Search events, interests, or industries" value={query} onChange={e=>setQuery(e.target.value)}/></label><SelectFilter label="Format" value={format} onChange={setFormat} options={['Virtual','In person','Hybrid']} all="All formats"/><SelectFilter label="Topic" value={topic} onChange={setTopic} options={unique(pool.map(e=>e.topic))} all="All topics"/><SelectFilter label="Location" value={location} onChange={setLocation} options={['Online','Chicago']} all="Everywhere"/><div className="filter-actions"><label className="checkbox-label"><input type="checkbox" checked={upcoming} onChange={e=>setUpcoming(e.target.checked)}/>Upcoming in sample schedule</label>{features&&<label className="checkbox-label"><input type="checkbox" checked={luminary} onChange={e=>setLuminary(e.target.checked)}/>1954 Project Luminary events</label>}<button className="text-button" onClick={reset}>Clear filters</button></div></div><div className="results-bar"><p role="status">{results.length} sample {results.length===1?'event':'events'}</p><span>Sorted by date · Times shown in Chicago time</span></div><h2 className="sr-only">Events</h2>{results.length?<div className="card-grid">{results.map(e=><EventCard key={e.id} event={e} onOpen={()=>setSelected(e)}/>)}</div>:<EmptyState onReset={reset}/>}</section>{selected&&<Dialog title={selected.title.replace('Example Event: ','')} onClose={()=>setSelected(null)}><EventDetails event={selected} confirmed={rsvps.has(selected.id)} onRsvp={()=>setRsvps(new Set(rsvps).add(selected.id))}/></Dialog>}</>;
}
