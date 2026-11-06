import { useEffect, useState } from 'react';
import { NavLink, Link, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Flame, ArrowRight } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { CommunityPage } from './pages/CommunityPage';
import { NewsletterPage } from './pages/NewsletterPage';

export default function App() {
  const [menu,setMenu]=useState(false);
  const [saved,setSaved]=useState<Set<string>>(new Set());
  const [interests,setInterests]=useState<string[]>(['Events','Career opportunities']);
  const [cadence,setCadence]=useState('Monthly');
  const [toast,setToast]=useState('');
  const location=useLocation();
  useEffect(()=>{
    setMenu(false); window.scrollTo(0,0);
    const titles:Record<string,string>={'/':'Your community continues','/events':'Events','/opportunities':'Opportunities','/community':'Community','/newsletter':'Stay connected'};
    document.title=`LEAD Alumni — ${titles[location.pathname]??'Page not found'}`;
    document.getElementById('main-content')?.focus({preventScroll:true});
  },[location.pathname]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),6500);return()=>clearTimeout(timer);},[toast]);
  const toggleSave=(id:string)=>{setSaved(current=>{const next=new Set(current);if(next.has(id))next.delete(id);else next.add(id);return next;});};
  return <><a href="#main-content" className="skip-link" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus();}}>Skip to content</a><div className="demo-banner"><span className="demo-dot"/>Capstone concept · Fictional demonstration data · Not an official CAFE Group service</div><header className="site-header"><div className="header-inner"><Link to="/" className="brand" aria-label="LEAD Alumni home"><Flame size={38} strokeWidth={1.6}/><span>LEAD<span>THE ALUMNI COMMUNITY</span></span></Link><button className="menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><nav id="main-nav" className={menu?'open':''} aria-label="Main navigation">{[['/','Home'],['/events','Events'],['/opportunities','Opportunities'],['/community','Community'],['/newsletter','Stay connected']].map(([to,label])=><NavLink key={to} className="nav-link" end={to==='/'} to={to}>{label}</NavLink>)}<a href="https://www.thecafe.org/programs/lead" className="nav-external">The CAFE Group<ArrowUpRight size={15}/></a></nav></div></header><main id="main-content" tabIndex={-1}><Routes><Route path="/" element={<HomePage saved={saved} toggleSave={toggleSave}/>}/><Route path="/events" element={<EventsPage/>}/><Route path="/opportunities" element={<OpportunitiesPage saved={saved} toggleSave={toggleSave}/>}/><Route path="/community" element={<CommunityPage notify={setToast}/>}/><Route path="/newsletter" element={<NewsletterPage interests={interests} setInterests={setInterests} cadence={cadence} setCadence={setCadence}/>}/><Route path="*" element={<section className="container section"><h1>Let's get you reconnected.</h1><p>We couldn't find that page.</p><Link className="button primary" to="/">Back to home<ArrowRight size={18}/></Link></section>}/></Routes></main><footer className="site-footer"><div className="container"><div className="footer-inner"><div className="footer-brand"><Link className="brand" to="/"><Flame size={32}/><span>LEAD<span>YOUR COMMUNITY CONTINUES.</span></span></Link><p>Keep growing. Stay connected. Give back.</p></div><div className="footer-links"><Link to="/events">Explore events</Link><Link to="/community">Meet the community</Link><Link to="/newsletter">Stay connected</Link><a href="https://www.thecafe.org/programs/lead">Official LEAD program<ArrowUpRight size={15}/></a></div></div><div className="footer-note"><p>An independent educational capstone concept inspired by The CAFE Group's LEAD program. All people, events, and opportunities shown are fictional.</p><p>No registrations, introductions, or subscriptions are sent. Demo choices reset when you refresh.</p></div></div></footer><div className="toast-region" role="status" aria-live="polite">{toast&&<div className="toast">{toast}<button onClick={()=>setToast('')} aria-label="Dismiss message"><X size={16}/></button></div>}</div></>;
}
