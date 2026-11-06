export type AlumniEvent = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  timeZone: string;
  format: 'Virtual' | 'In person' | 'Hybrid';
  location: string;
  topic: string;
  industry: string;
  audience: string;
  agenda: string[];
};

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  type: 'Job' | 'Internship' | 'Fellowship' | 'Resource' | 'Mentorship' | 'Volunteer';
  industry: string;
  location: string;
  remote: boolean;
  summary: string;
  description: string;
};

export type AlumniProfile = {
  id: string;
  name: string;
  initials: string;
  cohort: number;
  industry: string;
  region: string;
  interests: string[];
  mentor: boolean;
  bio: string;
};

// Fictional sample records for the LEAD Alumni Hub prototype. All times use
// explicit America/Chicago UTC offsets so the displayed dates are unambiguous.
export const events: AlumniEvent[] = [
  {
    id: 'event-impact-investing-2027',
    title: 'Example Event: Capital for Community Impact',
    description: 'A practical conversation about aligning investment decisions with equitable outcomes in underserved communities.',
    startsAt: '2027-01-21T17:30:00-06:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Impact investing',
    industry: 'Finance',
    audience: 'Alumni and emerging leaders',
    agenda: ['Welcome and community context', 'Impact investing case discussion', 'Peer questions and next steps'],
  },
  {
    id: 'event-public-interest-leadership-2027',
    title: 'Example Event: Leading for the Public Good',
    description: 'Alumni share approaches to building trust, developing teams, and advancing equitable outcomes in public service.',
    startsAt: '2027-02-18T18:00:00-06:00',
    timeZone: 'America/Chicago',
    format: 'Hybrid',
    location: 'Chicago, IL / Online (example venue)',
    topic: 'Leadership',
    industry: 'Public service',
    audience: 'Alumni, fellows, and invited community partners',
    agenda: ['Opening reflection', 'Leadership stories from the field', 'Small-group action planning'],
  },
  {
    id: 'event-equity-data-2027',
    title: 'Example Event: Using Data to Advance Equity',
    description: 'Explore how mission-driven teams can use community-informed data responsibly to identify gaps and measure progress.',
    startsAt: '2027-03-25T12:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Equity and data',
    industry: 'Social impact',
    audience: 'Alumni practitioners and nonprofit leaders',
    agenda: ['Shared language for equity measures', 'Example project walkthrough', 'Discussion and resource exchange'],
  },
  {
    id: 'event-social-enterprise-2027',
    title: 'Example Event: Building Sustainable Social Enterprises',
    description: 'A peer workshop on balancing financial durability with an organization’s community mission.',
    startsAt: '2027-04-22T17:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'In person',
    location: 'Chicago, IL (example venue)',
    topic: 'Social enterprise',
    industry: 'Entrepreneurship',
    audience: 'Alumni founders and aspiring social entrepreneurs',
    agenda: ['Mission and model mapping', 'Peer feedback circles', 'Commitments and connections'],
  },
  {
    id: 'event-education-access-2027',
    title: 'Example Event: Expanding Access in Education',
    description: 'Educators and community leaders consider practical ways to widen opportunity and support student belonging.',
    startsAt: '2027-05-20T18:30:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Hybrid',
    location: 'Chicago, IL / Online (example venue)',
    topic: 'Education access',
    industry: 'Education',
    audience: 'Alumni, educators, and community advocates',
    agenda: ['Community-centered design prompt', 'Alumni examples', 'Resource and partnership exchange'],
  },
  {
    id: 'event-climate-justice-2027',
    title: 'Example Event: Local Leadership for Climate Justice',
    description: 'Connect local climate resilience efforts with equity, public health, and community-led leadership.',
    startsAt: '2027-06-17T17:30:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Climate justice',
    industry: 'Environment',
    audience: 'Alumni and emerging social impact leaders',
    agenda: ['Community resilience overview', 'Leadership panel', 'Ideas for local action'],
  },
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-community-finance-fellowship',
    title: 'Example Fellowship: Community Finance Associate',
    organization: 'Example Community Capital Collaborative',
    type: 'Fellowship',
    industry: 'Finance',
    location: 'Chicago, IL',
    remote: false,
    summary: 'Support equitable access to responsible capital for neighborhood businesses.',
    description: 'A fictional, prototype fellowship focused on community lending research, borrower support, and inclusive finance practices. This is sample content, not a live opening.',
  },
  {
    id: 'opp-youth-program-job',
    title: 'Example Role: Youth Programs Coordinator',
    organization: 'Example Learning Futures Network',
    type: 'Job',
    industry: 'Education',
    location: 'Remote, United States',
    remote: true,
    summary: 'Coordinate programs that help young people access leadership opportunities.',
    description: 'A fictional sample role supporting partner coordination, program logistics, and youth-centered evaluation. This is sample content, not a live opening.',
  },
  {
    id: 'opp-policy-internship',
    title: 'Example Internship: Equity Policy Research',
    organization: 'Example Civic Equity Lab',
    type: 'Internship',
    industry: 'Public service',
    location: 'Chicago, IL / Hybrid',
    remote: false,
    summary: 'Contribute research on equitable access to local public services.',
    description: 'A fictional, prototype internship for a student or early-career researcher interested in community-engaged policy work. This is sample content, not a live opening.',
  },
  {
    id: 'opp-mentor-finance',
    title: 'Example Mentorship: Mission-Driven Finance',
    organization: 'LEAD Alumni Hub Example Program',
    type: 'Mentorship',
    industry: 'Finance',
    location: 'Virtual',
    remote: true,
    summary: 'Meet with a volunteer alumni mentor to explore a career in inclusive finance.',
    description: 'A fictional matching fixture for the prototype. The sample finance mentor is Jordan Ellis, who has opted into mentoring; no contact details are included.',
  },
  {
    id: 'opp-volunteer-food-access',
    title: 'Example Volunteer Project: Food Access Mapping',
    organization: 'Example Neighborhood Resource Coalition',
    type: 'Volunteer',
    industry: 'Social impact',
    location: 'Chicago, IL',
    remote: false,
    summary: 'Help community partners map local food access resources.',
    description: 'A fictional volunteer opportunity involving resource mapping and community review. This is sample content and does not represent an active placement.',
  },
  {
    id: 'opp-leadership-toolkit',
    title: 'Example Resource: Inclusive Team Leadership Toolkit',
    organization: 'LEAD Alumni Hub Example Library',
    type: 'Resource',
    industry: 'Leadership',
    location: 'Online',
    remote: true,
    summary: 'A starter guide for building more inclusive and accountable teams.',
    description: 'A fictional resource card representing sample reflection prompts, meeting practices, and team agreements for mission-driven leaders.',
  },
  {
    id: 'opp-climate-fellowship',
    title: 'Example Fellowship: Community Climate Resilience',
    organization: 'Example Resilient Communities Initiative',
    type: 'Fellowship',
    industry: 'Environment',
    location: 'Detroit, MI / Hybrid',
    remote: false,
    summary: 'Partner with residents on locally led climate resilience projects.',
    description: 'A fictional, prototype fellowship centered on community priorities, equitable planning, and climate adaptation. This is sample content, not a live opening.',
  },
  {
    id: 'opp-social-enterprise-mentor',
    title: 'Example Mentorship: Social Enterprise Design',
    organization: 'LEAD Alumni Hub Example Program',
    type: 'Mentorship',
    industry: 'Entrepreneurship',
    location: 'Virtual',
    remote: true,
    summary: 'Get peer guidance on testing a mission-centered business idea.',
    description: 'A fictional mentorship listing for alumni exploring sustainable social enterprise models. Matching and availability shown in the prototype are illustrative only.',
  },
];

export const alumni: AlumniProfile[] = [
  {
    id: 'alumni-jordan-ellis',
    name: 'Jordan Ellis',
    initials: 'JE',
    cohort: 2016,
    industry: 'Finance',
    region: 'Chicago, IL',
    interests: ['Inclusive finance', 'Community development', 'Career coaching'],
    mentor: true,
    bio: 'Fictional LEAD alum working in community finance and interested in helping emerging leaders explore equitable financial systems.',
  },
  {
    id: 'alumni-maya-brooks',
    name: 'Maya Brooks',
    initials: 'MB',
    cohort: 2019,
    industry: 'Education',
    region: 'Detroit, MI',
    interests: ['Youth leadership', 'Education access', 'Program design'],
    mentor: true,
    bio: 'Fictional alum focused on widening access to learning and supporting youth-led community projects.',
  },
  {
    id: 'alumni-devon-price',
    name: 'Devon Price',
    initials: 'DP',
    cohort: 2014,
    industry: 'Public service',
    region: 'Washington, DC',
    interests: ['Civic innovation', 'Policy equity', 'Team leadership'],
    mentor: false,
    bio: 'Fictional public service leader who works on making local systems more accessible and responsive to residents.',
  },
  {
    id: 'alumni-samira-patel',
    name: 'Samira Patel',
    initials: 'SP',
    cohort: 2021,
    industry: 'Social impact',
    region: 'Atlanta, GA',
    interests: ['Community partnerships', 'Impact measurement', 'Food access'],
    mentor: true,
    bio: 'Fictional nonprofit strategist who enjoys connecting community priorities with practical program evaluation.',
  },
  {
    id: 'alumni-alexis-chen',
    name: 'Alexis Chen',
    initials: 'AC',
    cohort: 2017,
    industry: 'Environment',
    region: 'Minneapolis, MN',
    interests: ['Climate justice', 'Urban resilience', 'Coalition building'],
    mentor: false,
    bio: 'Fictional climate justice advocate working alongside communities on locally grounded resilience efforts.',
  },
  {
    id: 'alumni-omar-jackson',
    name: 'Omar Jackson',
    initials: 'OJ',
    cohort: 2020,
    industry: 'Entrepreneurship',
    region: 'Philadelphia, PA',
    interests: ['Social enterprise', 'Small business', 'Inclusive leadership'],
    mentor: true,
    bio: 'Fictional social entrepreneur interested in helping mission-led founders build durable, community-accountable organizations.',
  },
];
