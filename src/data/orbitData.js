export const ORBIT_NODES = [
  {
    id: 'documentation',
    nodeId: 'NODE / 0281',
    label: 'DOCUMENTATION',
    url: 'example.com/docs',
    type: 'DOCUMENTATION',
    lastChange: '02:41:08',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'pricing field modified in section 4.2',
    connectedNodeIds: ['api', 'product', 'release_notes'],
    // Desktop SVG Canvas Coordinates (1000 x 560)
    coords: { x: 260, y: 160 },
    // Mobile SVG Canvas Coordinates (380 x 640)
    mobileCoords: { x: 120, y: 160 }
  },
  {
    id: 'api',
    nodeId: 'NODE / 0282',
    label: 'API',
    url: 'api.example.com/v2',
    type: 'API REFERENCE',
    lastChange: '01:15:30',
    status: 'STABLE',
    badgeClass: 'muted',
    notes: 'endpoint spec snapshot created',
    connectedNodeIds: ['documentation', 'database'],
    coords: { x: 500, y: 120 },
    mobileCoords: { x: 120, y: 260 }
  },
  {
    id: 'release_notes',
    nodeId: 'NODE / 0283',
    label: 'RELEASE NOTES',
    url: 'example.com/changelog',
    type: 'RELEASE LOG',
    lastChange: '04:12:00',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'version bump 2.4.0 published',
    connectedNodeIds: ['documentation', 'blog'],
    coords: { x: 740, y: 180 },
    mobileCoords: { x: 120, y: 360 }
  },
  {
    id: 'database',
    nodeId: 'NODE / 0284',
    label: 'DATABASE',
    url: 'db-internal.example.org',
    type: 'SCHEMA SNAPSHOT',
    lastChange: '00:45:12',
    status: 'STABLE',
    badgeClass: 'muted',
    notes: 'column type migration verified',
    connectedNodeIds: ['api', 'product'],
    coords: { x: 300, y: 400 },
    mobileCoords: { x: 120, y: 460 }
  },
  {
    id: 'blog',
    nodeId: 'NODE / 0285',
    label: 'BLOG',
    url: 'blog.example.com/posts',
    type: 'PUBLIC ANNOUNCEMENT',
    lastChange: '12:08:44',
    status: 'STABLE',
    badgeClass: 'muted',
    notes: 'feature announcement draft saved',
    connectedNodeIds: ['release_notes'],
    coords: { x: 720, y: 420 },
    mobileCoords: { x: 120, y: 560 }
  },
  {
    id: 'product',
    nodeId: 'NODE / 0286',
    label: 'PRODUCT',
    url: 'app.example.com',
    type: 'APPLICATION GRAPH',
    lastChange: '03:30:19',
    status: 'CHANGE DETECTED',
    badgeClass: 'accent',
    notes: 'UI feature flag toggled',
    connectedNodeIds: ['documentation', 'database'],
    coords: { x: 500, y: 340 },
    mobileCoords: { x: 260, y: 340 }
  }
];

export const INGESTION_PIPELINE = [
  { step: '01', name: 'SOURCE', desc: 'Configured data stream' },
  { step: '02', name: 'FETCH', desc: 'Resilient network retrieval' },
  { step: '03', name: 'SNAPSHOT', desc: 'Immutable version marker' },
  { step: '04', name: 'STORE', desc: 'Snapshot history archive' },
  { step: '05', name: 'COMPARE', desc: 'Diff engine calculation' },
  { step: '06', name: 'CHANGE DETECTION', desc: 'Semantic diff classification' },
  { step: '07', name: 'RELATIONSHIP GRAPH', desc: 'Source dependency mapping' },
  { step: '08', name: 'VISUALIZATION', desc: 'Interactive trajectory canvas' }
];

export const DEMO_PATH_SEQUENCE = {
  source: 'SOURCE / DOCUMENTATION',
  snapshot: 'SNAPSHOT / 08.18.26',
  change: 'CHANGE DETECTED / PRICING FIELD MODIFIED',
  related: 'RELATED / API REFERENCE',
  destination: 'DESTINATION / APPLICATION GRAPH'
};
