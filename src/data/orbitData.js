export const ORBIT_NODES = [
  {
    id: 'documentation',
    nodeId: 'NODE / 0281',
    label: 'DOCUMENTATION',
    url: 'example.com/docs',
    type: 'DOCUMENTATION',
    lastChange: '08.19.26',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'pricing field modified in section 4.2',
    connectedNodeIds: ['api', 'product', 'release_notes'],
    // 3D Orbital Coordinates
    orbitRadius: 6.5,
    orbitAngle: 0,
    heightY: 0.8,
    // 2D Canvas Coordinates
    coords: { x: 260, y: 160 },
    mobileCoords: { x: 120, y: 160 }
  },
  {
    id: 'api',
    nodeId: 'NODE / 0282',
    label: 'API',
    url: 'api.example.com/v2',
    type: 'API REFERENCE',
    lastChange: '08.19.26',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'endpoint spec snapshot created & pricing field diffed',
    connectedNodeIds: ['documentation', 'database'],
    orbitRadius: 7.2,
    orbitAngle: 1.05,
    heightY: -0.5,
    coords: { x: 500, y: 120 },
    mobileCoords: { x: 120, y: 260 }
  },
  {
    id: 'release_notes',
    nodeId: 'NODE / 0283',
    label: 'RELEASE NOTES',
    url: 'example.com/changelog',
    type: 'RELEASE LOG',
    lastChange: '08.18.26',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'version bump 2.4.0 published',
    connectedNodeIds: ['documentation', 'blog'],
    orbitRadius: 6.0,
    orbitAngle: 2.1,
    heightY: 1.2,
    coords: { x: 740, y: 180 },
    mobileCoords: { x: 120, y: 360 }
  },
  {
    id: 'database',
    nodeId: 'NODE / 0284',
    label: 'DATABASE',
    url: 'db-internal.example.org',
    type: 'SCHEMA SNAPSHOT',
    lastChange: '08.17.26',
    status: 'STABLE',
    badgeClass: 'muted',
    notes: 'column type migration verified',
    connectedNodeIds: ['api', 'product'],
    orbitRadius: 7.5,
    orbitAngle: 3.15,
    heightY: -1.0,
    coords: { x: 300, y: 400 },
    mobileCoords: { x: 120, y: 460 }
  },
  {
    id: 'blog',
    nodeId: 'NODE / 0285',
    label: 'BLOG',
    url: 'blog.example.com/posts',
    type: 'PUBLIC ANNOUNCEMENT',
    lastChange: '08.16.26',
    status: 'STABLE',
    badgeClass: 'muted',
    notes: 'feature announcement draft saved',
    connectedNodeIds: ['release_notes'],
    orbitRadius: 6.8,
    orbitAngle: 4.2,
    heightY: 0.5,
    coords: { x: 720, y: 420 },
    mobileCoords: { x: 120, y: 560 }
  },
  {
    id: 'product',
    nodeId: 'NODE / 0286',
    label: 'PRODUCT',
    url: 'app.example.com',
    type: 'APPLICATION GRAPH',
    lastChange: '08.19.26',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'UI feature flag toggled',
    connectedNodeIds: ['documentation', 'database'],
    orbitRadius: 6.2,
    orbitAngle: 5.25,
    heightY: -0.8,
    coords: { x: 500, y: 340 },
    mobileCoords: { x: 260, y: 340 }
  }
];

export const INGESTION_PIPELINE = [
  { step: '01', name: 'SOURCE', desc: 'Configured data stream' },
  { step: '02', name: 'FETCH', desc: 'Resilient network retrieval' },
  { step: '03', name: 'SNAPSHOT', desc: 'Immutable version marker' },
  { step: '04', name: 'COMPARE', desc: 'Diff engine calculation' },
  { step: '05', name: 'CHANGE', desc: 'Semantic diff classification' },
  { step: '06', name: 'RELATIONSHIP', desc: 'Source dependency mapping' },
  { step: '07', name: 'ORBIT', desc: 'Interactive trajectory canvas' }
];

export const DEMO_PATH_SEQUENCE = {
  source: 'SOURCE / DOCUMENTATION',
  snapshot: 'SNAPSHOT / 08.19.26',
  change: 'CHANGE DETECTED / PRICING FIELD MODIFIED',
  related: 'RELATED / API REFERENCE',
  destination: 'DESTINATION / APPLICATION GRAPH'
};
