export const DEMO_APPLICATIONS = [
  {
    id: 'google',
    company: 'GOOGLE',
    role: 'Software Engineer',
    stage: 'INTERVIEW',
    badgeClass: 'interview',
    eventTime: 'Tomorrow · 10:30',
    details: 'System Design & Distributed Systems Loop',
    hasTracer: true, // The ONE active path with animated movement!
    // Desktop Coordinates
    companyCoords: { x: 310, y: 150 },
    stageCoords: { x: 130, y: 75 },
    // Mobile Coordinates
    mobileCompanyCoords: { x: 120, y: 160 },
    mobileStageCoords: { x: 270, y: 160 }
  },
  {
    id: 'microsoft',
    company: 'MICROSOFT',
    role: 'Senior Systems Architect',
    stage: 'FOLLOW UP',
    badgeClass: 'followup',
    eventTime: 'Sent 2 days ago',
    details: 'Awaiting team allocation response',
    hasTracer: false,
    companyCoords: { x: 690, y: 140 },
    stageCoords: { x: 860, y: 65 },
    mobileCompanyCoords: { x: 120, y: 280 },
    mobileStageCoords: { x: 270, y: 280 }
  },
  {
    id: 'acme',
    company: 'ACME',
    role: 'Lead Frontend Engineer',
    stage: 'APPLIED',
    badgeClass: 'applied',
    eventTime: 'Submitted Aug 14',
    details: 'Resume screening in progress',
    hasTracer: false,
    companyCoords: { x: 710, y: 390 },
    stageCoords: { x: 880, y: 465 },
    mobileCompanyCoords: { x: 120, y: 400 },
    mobileStageCoords: { x: 270, y: 400 }
  },
  {
    id: 'startup',
    company: 'STARTUP',
    role: 'Founding Dev',
    stage: 'CLOSED',
    badgeClass: 'closed',
    eventTime: 'Archived Aug 01',
    details: 'Internal position filled',
    hasTracer: false,
    companyCoords: { x: 290, y: 400 },
    stageCoords: { x: 120, y: 475 },
    mobileCompanyCoords: { x: 120, y: 520 },
    mobileStageCoords: { x: 270, y: 520 }
  }
];

export const INITIAL_NODES = DEMO_APPLICATIONS;
