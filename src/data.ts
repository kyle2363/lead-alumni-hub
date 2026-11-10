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
  going: number;
  cohorts: number[];
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
// The calendar covers all four seasons, and the topics follow what alumni asked for in
// CAFE's outreach survey: business and finance, entrepreneurship, community organizing,
// advocacy, mentorship, practical "how to adult" workshops, and casual reunions.
// `going` and `cohorts` are made-up RSVP figures used for the "who's going" line.
export const events: AlumniEvent[] = [
  {
    id: 'event-winter-homecoming-2027',
    title: 'Example Event: Winter Homecoming',
    description: 'A relaxed evening for alumni who are home for winter break. Food, an icebreaker run by the alumni council, and time to catch up with your cohort.',
    startsAt: '2027-01-07T18:00:00-06:00',
    timeZone: 'America/Chicago',
    format: 'In person',
    location: 'Chicago, IL (example venue)',
    topic: 'Reunion',
    industry: 'All fields',
    audience: 'All LEAD alumni, every cohort',
    agenda: ['Doors open and dinner', 'Cohort tables and an icebreaker', 'Open social time'],
    going: 46,
    cohorts: [2019, 2022, 2024, 2025, 2026],
  },
  {
    id: 'event-impact-investing-2027',
    title: 'Example Event: Capital for Community Impact',
    description: 'Alumni working in banking and finance talk about their paths and how investment decisions can serve underserved communities.',
    startsAt: '2027-01-21T17:30:00-06:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Business & finance',
    industry: 'Finance',
    audience: 'Alumni in or curious about finance',
    agenda: ['Welcome and introductions', 'Alumni panel: three paths into finance', 'Breakout rooms by career stage'],
    going: 23,
    cohorts: [2018, 2021, 2023, 2024],
  },
  {
    id: 'event-adulting-money-2027',
    title: 'Example Event: How to Adult: Taxes, Budgets, and Your First Offer',
    description: 'A practical session on reading an offer letter, building a first budget, and filing taxes, led by alumni who have done it recently.',
    startsAt: '2027-02-18T18:00:00-06:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Life skills',
    industry: 'All fields',
    audience: 'Students and alumni in their first few years of work',
    agenda: ['Reading an offer letter', 'A first budget that holds up', 'Open questions'],
    going: 31,
    cohorts: [2023, 2024, 2025, 2026],
  },
  {
    id: 'event-career-clinic-2027',
    title: 'Example Event: Resume and Mock Interview Clinic',
    description: 'Short one-on-one sessions with alumni volunteers ahead of spring recruiting. Bring a resume or a job posting you are aiming for.',
    startsAt: '2027-03-25T12:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Career prep',
    industry: 'All fields',
    audience: 'Alumni who are job or internship hunting',
    agenda: ['Quick tips from alumni reviewers', 'Twenty-minute one-on-one sessions', 'Shared resources and follow-ups'],
    going: 18,
    cohorts: [2022, 2024, 2025, 2026],
  },
  {
    id: 'event-founders-night-2027',
    title: 'Example Event: Alumni Founders Night',
    description: 'Alumni who have started a business or a nonprofit share what worked, what did not, and what they would do differently.',
    startsAt: '2027-04-22T17:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Hybrid',
    location: 'Chicago, IL / Online (example venue)',
    topic: 'Entrepreneurship',
    industry: 'Entrepreneurship',
    audience: 'Alumni founders and anyone with an idea',
    agenda: ['Three founder stories', 'Peer feedback circles', 'Connections and next steps'],
    going: 27,
    cohorts: [2018, 2020, 2021, 2023],
  },
  {
    id: 'event-summer-social-2027',
    title: 'Example Event: Summer Social: Alumni Meet the 2027 Cohort',
    description: 'Alumni and this summer’s interns in one room. Mentor pairs meet in person, and everyone else gets to welcome the new cohort.',
    startsAt: '2027-06-17T17:30:00-05:00',
    timeZone: 'America/Chicago',
    format: 'In person',
    location: 'Chicago, IL (example venue)',
    topic: 'Mentorship',
    industry: 'All fields',
    audience: 'Alumni, current LEAD interns, and host managers',
    agenda: ['Welcome from the alumni council', 'Mentor and intern introductions', 'Open social time'],
    going: 52,
    cohorts: [2019, 2021, 2022, 2025, 2026],
  },
  {
    id: 'event-advocacy-panel-2027',
    title: 'Example Event: Advocacy and Government Relations: Alumni Panel',
    description: 'Alumni in policy and public service explain how advocacy work gets done, for this summer’s interns and for alumni thinking about the field.',
    startsAt: '2027-07-22T12:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Hybrid',
    location: 'Chicago, IL / Online (example venue)',
    topic: 'Advocacy & government',
    industry: 'Public service',
    audience: 'Current LEAD interns and alumni',
    agenda: ['Alumni panel', 'Questions from interns', 'Small-group conversations'],
    going: 34,
    cohorts: [2020, 2021, 2024],
  },
  {
    id: 'event-cohort-reunions-2027',
    title: 'Example Event: Fall Cohort Reunions on Zoom',
    description: 'One call, a breakout room for every cohort. Catch up with the people from your summer, then meet alumni from other years.',
    startsAt: '2027-09-23T19:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Reunion',
    industry: 'All fields',
    audience: 'All LEAD alumni, every cohort',
    agenda: ['Welcome from cohort captains', 'Cohort breakout rooms', 'Mixed rooms by city and field'],
    going: 64,
    cohorts: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  },
  {
    id: 'event-organizing-2027',
    title: 'Example Event: Community Organizing Where You Live',
    description: 'A working session on getting involved in the city you live in now, with alumni organizers from three different cities.',
    startsAt: '2027-10-21T18:00:00-05:00',
    timeZone: 'America/Chicago',
    format: 'Virtual',
    location: 'Online (example event)',
    topic: 'Community engagement',
    industry: 'Nonprofit & philanthropy',
    audience: 'Alumni interested in organizing and community work',
    agenda: ['Three alumni organizers share their work', 'Map your own community', 'One commitment for the month'],
    going: 21,
    cohorts: [2019, 2021, 2022, 2025],
  },
  {
    id: 'event-city-meetups-2027',
    title: 'Example Event: City Meetup Weekend',
    description: 'Alumni-hosted meetups on the same weekend in three cities, for everyone who cannot make it back to Chicago.',
    startsAt: '2027-11-13T12:00:00-06:00',
    timeZone: 'America/Chicago',
    format: 'In person',
    location: 'New York, NY · Washington, DC · Atlanta, GA (example venues)',
    topic: 'Reunion',
    industry: 'All fields',
    audience: 'Alumni living outside Chicago',
    agenda: ['Lunch hosted by a local alum', 'Introductions across cohorts', 'A group photo for the newsletter'],
    going: 29,
    cohorts: [2020, 2021, 2023, 2024],
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

// LEAD's first cohort was 2018, so fictional profiles span 2018–2026. Fields follow the
// range CAFE's survey found: philanthropy and nonprofits, finance, engineering, the arts,
// public service, education, and entrepreneurship. Cities are clustered on purpose so the
// "alumni near you" view has something to show outside Chicago.
export const alumni: AlumniProfile[] = [
  { id: 'alumni-jordan-ellis', name: 'Jordan Ellis', initials: 'JE', cohort: 2018, industry: 'Finance', region: 'Chicago, IL', interests: ['Inclusive finance', 'Community development', 'Career coaching'], mentor: true, bio: 'Fictional LEAD alum from the first cohort, now working in community finance and glad to help newer alumni explore the field.' },
  { id: 'alumni-maya-brooks', name: 'Maya Brooks', initials: 'MB', cohort: 2019, industry: 'Education', region: 'Detroit, MI', interests: ['Youth leadership', 'Education access', 'Program design'], mentor: true, bio: 'Fictional alum focused on widening access to learning and supporting youth-led community projects.' },
  { id: 'alumni-devon-price', name: 'Devon Price', initials: 'DP', cohort: 2020, industry: 'Public service', region: 'Washington, DC', interests: ['Civic innovation', 'Policy equity', 'Advocacy'], mentor: false, bio: 'Fictional alum working in local government on making public systems easier for residents to use.' },
  { id: 'alumni-omar-jackson', name: 'Omar Jackson', initials: 'OJ', cohort: 2020, industry: 'Entrepreneurship', region: 'Chicago, IL', interests: ['Social enterprise', 'Small business', 'Inclusive leadership'], mentor: true, bio: 'Fictional alum who started a small business after LEAD and likes helping other founders test their ideas.' },
  { id: 'alumni-samira-patel', name: 'Samira Patel', initials: 'SP', cohort: 2021, industry: 'Nonprofit & philanthropy', region: 'Atlanta, GA', interests: ['Community partnerships', 'Grantmaking', 'Food access'], mentor: true, bio: 'Fictional program officer who connects community priorities with funding and hosts the Atlanta alumni meetup.' },
  { id: 'alumni-marcus-hill', name: 'Marcus Hill', initials: 'MH', cohort: 2021, industry: 'Public service', region: 'Washington, DC', interests: ['Government relations', 'Advocacy', 'Housing policy'], mentor: true, bio: 'Fictional alum in government relations who speaks with summer interns about careers in advocacy.' },
  { id: 'alumni-alexis-chen', name: 'Alexis Chen', initials: 'AC', cohort: 2022, industry: 'Engineering', region: 'Minneapolis, MN', interests: ['Civil engineering', 'Urban resilience', 'Volunteering'], mentor: false, bio: 'Fictional civil engineer who brings what LEAD taught about community voice into infrastructure projects.' },
  { id: 'alumni-priya-nair', name: 'Priya Nair', initials: 'PN', cohort: 2022, industry: 'Engineering', region: 'San Francisco Bay Area, CA', interests: ['Software', 'Tech for nonprofits', 'Career switching'], mentor: true, bio: 'Fictional software engineer who volunteers her skills with nonprofits and mentors alumni moving into tech.' },
  { id: 'alumni-nia-thompson', name: 'Nia Thompson', initials: 'NT', cohort: 2023, industry: 'Arts & media', region: 'New York, NY', interests: ['Theater', 'Arts funding', 'Storytelling'], mentor: false, bio: 'Fictional theater artist and arts administrator who still uses the storytelling workshop from her LEAD summer.' },
  { id: 'alumni-sofia-reyes', name: 'Sofia Reyes', initials: 'SR', cohort: 2023, industry: 'Entrepreneurship', region: 'Chicago, IL', interests: ['Social enterprise', 'Marketing', 'Alumni council'], mentor: true, bio: 'Fictional alum on the alumni council who helps plan the winter homecoming and fall reunions.' },
  { id: 'alumni-luis-ramirez', name: 'Luis Ramirez', initials: 'LR', cohort: 2024, industry: 'Finance', region: 'New York, NY', interests: ['Banking', 'First-generation professionals', 'Budgeting'], mentor: false, bio: 'Fictional first-year banking analyst who is happy to compare notes with alumni starting out in finance.' },
  { id: 'alumni-tiana-wells', name: 'Tiana Wells', initials: 'TW', cohort: 2024, industry: 'Education', region: 'Atlanta, GA', interests: ['Teaching', 'College access', 'Mentoring'], mentor: false, bio: 'Fictional first-year teacher who is interested in college access programs for her students.' },
  { id: 'alumni-aaliyah-carter', name: 'Aaliyah Carter', initials: 'AC', cohort: 2025, industry: 'Nonprofit & philanthropy', region: 'Chicago, IL', interests: ['Fundraising', 'Community organizing', 'Events'], mentor: false, bio: 'Fictional college senior who returned to her host organization part-time and wants to meet alumni from earlier cohorts.' },
  { id: 'alumni-elijah-morris', name: 'Elijah Morris', initials: 'EM', cohort: 2026, industry: 'Finance', region: 'Chicago, IL', interests: ['Business', 'Internships', 'Networking'], mentor: false, bio: 'Fictional college junior from the most recent cohort who is looking for a finance internship and a mentor.' },
];

export type GivingAsk = {
  id: string;
  title: string;
  commitment: 'Under an hour' | 'A few hours' | 'Ongoing';
  season: 'Summer' | 'Fall' | 'Winter' | 'Spring' | 'Any time';
  format: 'Virtual' | 'In person' | 'Either';
  askedBy: string;
  description: string;
};

// Fictional "asks" for the Give Back page (design C). They illustrate the research
// finding that alumni want to contribute, not only attend, at a level that fits their life.
export const givingAsks: GivingAsk[] = [
  { id: 'ask-coffee-chat', title: 'Host a 30-minute coffee chat with a summer intern', commitment: 'Under an hour', season: 'Summer', format: 'Virtual', askedBy: 'LEAD staff', description: 'Answer questions about your path, your field, and life after LEAD for one current intern.' },
  { id: 'ask-storytelling', title: 'Speak at the storytelling workshop', commitment: 'A few hours', season: 'Summer', format: 'In person', askedBy: 'LEAD staff', description: 'Share your own story and help interns practice theirs during a summer professional-development session.' },
  { id: 'ask-mentor', title: 'Mentor a summer intern', commitment: 'Ongoing', season: 'Summer', format: 'Either', askedBy: 'LEAD staff', description: 'Meet every other week for ten weeks with an intern whose interests match yours. Matching happens in the spring.' },
  { id: 'ask-resume', title: 'Review resumes before recruiting season', commitment: 'A few hours', season: 'Fall', format: 'Virtual', askedBy: 'Alumni council', description: 'Give feedback on two or three resumes from recent alumni heading into fall recruiting.' },
  { id: 'ask-host-panel', title: 'Return to your host organization for a panel', commitment: 'A few hours', season: 'Spring', format: 'In person', askedBy: 'Host organization', description: 'Your former manager invites you back to talk with their team about what LEAD interns bring to the work.' },
  { id: 'ask-city-meetup', title: 'Organize a meetup in your city', commitment: 'A few hours', season: 'Any time', format: 'In person', askedBy: 'Alumni council', description: 'Not in Chicago? Pick a spot, and staff will send the invite to alumni near you and cover a small budget.' },
  { id: 'ask-homecoming', title: 'Co-host the winter homecoming', commitment: 'A few hours', season: 'Winter', format: 'In person', askedBy: 'Alumni council', description: 'Help welcome alumni home over winter break: greet people, run an icebreaker, or introduce a speaker.' },
  { id: 'ask-advisory', title: 'Join the alumni advisory circle', commitment: 'Ongoing', season: 'Any time', format: 'Virtual', askedBy: 'LEAD staff', description: 'Meet once a quarter to give feedback on LEAD programming and help shape what the alumni network becomes.' },
  { id: 'ask-story', title: 'Share your story for the newsletter', commitment: 'Under an hour', season: 'Any time', format: 'Virtual', askedBy: 'LEAD staff', description: 'Answer five short questions about where you are now. Your spotlight helps other alumni see what is possible.' },
  { id: 'ask-pulse', title: 'Answer a two-question pulse check', commitment: 'Under an hour', season: 'Any time', format: 'Virtual', askedBy: 'LEAD staff', description: 'Tell us what kinds of gatherings you would actually show up for this year.' },
];

// Shared by designs B and C. The "How much time do you have?" picker sorts every way
// of taking part by the time it costs, because alumni said weekly asks are too much.
export type TimeKey = 'minutes' | 'evening' | 'season';
export const timeOptions: { key: TimeKey; label: string; items: { title: string; copy: string; to: string }[] }[] = [
  { key: 'minutes', label: '5 minutes', items: [
    { title: 'Read the monthly digest', copy: 'Events, roles, and alumni news picked for your interests.', to: '/newsletter' },
    { title: 'Answer a two-question pulse', copy: 'Tell us what you would actually show up for.', to: '/give-back' },
    { title: 'Find your cohort and your city', copy: 'See who from your summer is nearby.', to: '/community' },
  ] },
  { key: 'evening', label: 'An evening', items: [
    { title: 'Join a virtual networking night', copy: 'Small breakout rooms, grouped by industry.', to: '/events' },
    { title: 'Coffee chat with an alum in your field', copy: 'Opt-in introductions across cohorts and cities.', to: '/community' },
    { title: 'Talk with this summer’s interns', copy: 'Thirty minutes that someone will remember for years.', to: '/give-back' },
  ] },
  { key: 'season', label: 'A season', items: [
    { title: 'Mentor a summer intern', copy: 'Ten weeks, every other week, matched by interest.', to: '/give-back' },
    { title: 'Join the advisory circle', copy: 'Quarterly input that shapes what LEAD does next.', to: '/give-back' },
    { title: 'Start a meetup in your city', copy: 'Staff send the invites and cover a small budget.', to: '/give-back' },
  ] },
];

// The yearly rhythm: one predictable reason to come back each season, with the summer
// work arranged in spring so it does not land on staff during the internship.
export type SeasonKey = 'Summer' | 'Fall' | 'Winter' | 'Spring';
export const seasons: { key: SeasonKey; months: string; title: string; items: string[] }[] = [
  { key: 'Fall', months: 'Sep – Nov', title: 'Back to campus', items: ['Cohort reunions on Zoom', 'Resume reviews by alumni', 'Alumni-hosted meetups in other cities'] },
  { key: 'Winter', months: 'Dec – Feb', title: 'Homecoming', items: ['Winter-break homecoming in Chicago', 'Practical "how to adult" workshops', 'Alumni spotlight issue'] },
  { key: 'Spring', months: 'Mar – May', title: 'Get ready', items: ['Career clinics and mock interviews', 'Mentor matching for the summer', 'Advisory circle sets summer priorities'] },
  { key: 'Summer', months: 'Jun – Aug', title: 'The new cohort arrives', items: ['Alumni mentor current interns', 'Alumni speak at workshops', 'Summer social with both cohorts'] },
];
export const SUMMER_NOTE = 'Summer is the busiest time for staff, so summer asks are lined up in the spring and run by alumni volunteers.';

// Volunteer roles that keep cohorts and cities connected without adding staff work.
// Names match fictional profiles above.
export const cohortCaptains: Record<number, string> = { 2018: 'Jordan Ellis', 2020: 'Omar Jackson', 2021: 'Samira Patel', 2023: 'Sofia Reyes', 2025: 'Aaliyah Carter' };
export const cityHosts: Record<string, string> = { 'Chicago, IL': 'Sofia Reyes', 'Atlanta, GA': 'Samira Patel', 'Washington, DC': 'Marcus Hill' };
