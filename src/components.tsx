import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowUpRight, CalendarDays, MapPin, X, Bookmark, Check, Users } from 'lucide-react';
import { hasFeatures, useDesign } from './design';
import { Link } from 'react-router-dom';
import type { AlumniEvent, Opportunity } from './data';
import { eventDate, eventSchedule, whoIsGoing } from './utils';

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <div className="page-intro"><div className="container"><p className="eyebrow">{eyebrow}</p><h1 className="page-title">{title}</h1><p className="page-description">{children}</p></div></div>;
}
// Labeled stand-in for an approved photograph. No CAFE imagery is bundled with the prototype.
// A photo from public/images, with alt text. Slots without a photo yet stay labeled placeholders.
export function Photo({ src, alt, className = '', position }: { src: string; alt: string; className?: string; position?: string }) {
  return <div className={`photo-slot has-photo ${className}`}><img src={`${import.meta.env.BASE_URL}images/${src}`} alt={alt} loading="lazy" style={position ? { objectPosition: position } : undefined}/></div>;
}
export function PhotoSlot({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`photo-slot ${className}`} role="img" aria-label={`Photo placeholder: ${label}`}><span className="photo-slot-label">Photo placeholder · {label}</span></div>;
}
export function SectionHeading({ kicker, title, link, to }: { kicker: string; title: string; link?: string; to?: string }) {
  return <div className="section-heading"><div><p className="section-kicker">{kicker}</p><h2 className="section-title">{title}</h2></div>{link && to && <Link className="section-link" to={to}>{link}<ArrowUpRight size={18}/></Link>}</div>;
}
export function SelectFilter({ label, value, onChange, options, all = 'All' }: { label: string; value: string; onChange: (s:string)=>void; options: string[]; all?: string }) {
  return <label className="filter-field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}><option value="">{all}</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>;
}
export function EmptyState({ onReset }: { onReset: ()=>void }) {
  return <div className="empty-state"><h2>No matches just yet.</h2><p>Try a different search or clear your filters to explore all examples.</p><button className="button secondary" onClick={onReset}>Clear filters</button></div>;
}
export function EventCard({ event, onOpen }: { event: AlumniEvent; onOpen: ()=>void }) {
  const features=hasFeatures(useDesign());
  return<article className="event-card"><div className="event-top"><div className="event-date"><span className="date-month">{eventDate(event,{month:'short'})}</span><span className="date-day">{eventDate(event,{day:'2-digit'})}</span></div><span className="badge">{event.format}</span></div><div className="card-body"><p className="section-kicker">{features&&event.luminary?'1954 Project Luminary':'Sample event'} · {event.topic}</p><h3 className="card-title">{event.title.replace('Example Event: ', '')}</h3><p className="card-description">{event.description}</p><p className="card-meta"><CalendarDays size={15}/>{eventDate(event,{hour:'numeric',minute:'2-digit',timeZoneName:'short'})} · 2027</p><p className="card-meta"><MapPin size={15}/>{event.location.replace(/ \(example.*\)/,'')}</p>{features&&<p className="card-meta going-line"><Users size={15}/>{whoIsGoing(event)}</p>}</div><div className="card-footer"><button className="text-button" onClick={onOpen}>Explore event<ArrowUpRight size={18}/></button></div></article>;
}
export function OpportunityCard({ opportunity, saved, onOpen, onSave }: { opportunity: Opportunity; saved:boolean; onOpen:()=>void; onSave:()=>void }) {
  const features=hasFeatures(useDesign());
  return <article className="opportunity-card"><div className="event-top"><div className="opportunity-symbol"><ArrowUpRight size={25}/></div><span className="badge">{opportunity.type}</span></div><div className="card-body"><p className="section-kicker">{features&&opportunity.luminary?'1954 Project Luminary org':'Sample organization'} · {opportunity.industry}</p><h3 className="card-title">{opportunity.title.replace(/^Example [^:]+: /,'')}</h3><p className="card-description">{opportunity.summary}</p><p className="card-meta"><MapPin size={15}/>{opportunity.location}</p></div><div className="card-footer"><button className="text-button" onClick={onOpen}>View details<ArrowUpRight size={17}/></button><button className={`save-button ${saved?'saved':''}`} onClick={onSave} aria-pressed={saved} aria-label={`${saved?'Unsave':'Save'} ${opportunity.title}`}>{saved?<Check size={18}/>:<Bookmark size={18}/>}</button></div></article>;
}
export function Dialog({ title, children, onClose }: { title: string; children:ReactNode; onClose:()=>void }) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const el=ref.current!; const previous=document.activeElement as HTMLElement|null; el.showModal(); return ()=>{el.close(); previous?.focus();};},[]);
  return <dialog ref={ref} className="detail-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget){ const r=e.currentTarget.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose(); }}}><div className="dialog-header"><p className="eyebrow">Capstone demonstration</p><button className="dialog-close" aria-label="Close details" onClick={onClose} autoFocus><X size={22}/></button></div><div className="dialog-body"><h2 id="dialog-title">{title}</h2>{children}</div></dialog>;
}
export function EventDetails({ event, onRsvp, confirmed }: { event: AlumniEvent; onRsvp:()=>void; confirmed:boolean }) {
  const features=hasFeatures(useDesign());
  return <><p className="notice">Fictional sample event. This is not scheduled CAFE programming.</p><p className="detail-meta">{eventSchedule(event)}</p><p className="detail-meta">{event.format} · {event.location}</p>{features&&<p className="detail-meta going-line"><Users size={15}/>{whoIsGoing(event)} (made-up figures)</p>}<p className="detail-description">{event.description}</p><h3>Who it's for</h3><p>{event.audience}</p><h3>The conversation</h3><ul className="agenda">{event.agenda.map(a=><li key={a}>{a}</li>)}</ul><p className="card-meta">Access needs would be confirmed with organizers in a real event.</p><div className="dialog-actions"><button className="button primary" onClick={onRsvp} disabled={confirmed}>{confirmed?<><Check size={18}/>Demo interest recorded</>:'Demo RSVP'}{!confirmed&&<ArrowUpRight size={18}/>}</button></div>{confirmed&&<p role="status" className="notice">Demo confirmation only — no registration was submitted.</p>}</>;
}
