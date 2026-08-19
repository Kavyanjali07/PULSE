import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { ORBIT_NODES } from '../data/orbitData';

export default function WorkspaceDrawer({ isOpen, onClose }) {
  const [nodes, setNodes] = useState(ORBIT_NODES);
  const [selectedId, setSelectedId] = useState('documentation');
  const [isFetching, setIsFetching] = useState(false);
  const [snapshotCount, setSnapshotCount] = useState(142);

  if (!isOpen) return null;

  const activeNode = nodes.find(n => n.id === selectedId) || nodes[0];

  const handleSimulateFetch = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setSnapshotCount(prev => prev + 1);
      setNodes(nodes.map(n => n.id === selectedId ? {
        ...n,
        lastChange: 'Just now',
        status: 'SNAPSHOT CREATED',
        notes: `New snapshot #${snapshotCount + 1} generated successfully`
      } : n));
    }, 1200);
  };

  return (
    <div className="workspace-drawer-overlay" onClick={onClose}>
      <div className="workspace-drawer-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="brand-dot animate-pulse-dot"></span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>ORBIT DATA INSPECTOR</span>
            <span className="status-badge accent" style={{ fontSize: '9px' }}>DEMO SESSION</span>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Node Selector Pills */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '10px' }}>
              SELECT DEMO SOURCE NODE ({nodes.length})
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {nodes.map(n => (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className="btn-orbit-secondary"
                  style={{
                    fontSize: '11px',
                    padding: '6px 12px',
                    borderColor: selectedId === n.id ? 'var(--accent)' : 'var(--border-subtle)',
                    color: selectedId === n.id ? 'var(--accent)' : 'var(--text-primary)',
                    background: selectedId === n.id ? 'var(--accent-dim)' : 'transparent'
                  }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Node Detail Card */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>{activeNode.nodeId}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{activeNode.label}</h3>
              </div>
              <span className={`status-badge ${activeNode.badgeClass}`}>{activeNode.status}</span>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              URL: {activeNode.url}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '12px 0', margin: '16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>SOURCE TYPE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-primary)' }}>{activeNode.type}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>LAST SNAPSHOT</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)' }}>{activeNode.lastChange}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>TOTAL SNAPSHOTS</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-primary)' }}>#{snapshotCount}</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>DETECTED DIFFERENTIAL (DIFF)</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-primary)', background: 'var(--bg-paper)', padding: '12px', borderLeft: '3px solid var(--accent)' }}>
                "{activeNode.notes}"
              </div>
            </div>

            <button 
              onClick={handleSimulateFetch}
              disabled={isFetching}
              className="btn-orbit"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '13px' }}
            >
              <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
              <span>{isFetching ? 'FETCHING NEW SNAPSHOT...' : 'TRIGGER SNAPSHOT FETCH'}</span>
            </button>
          </div>

          {/* Ingestion Architecture Resilience Explanation */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '8px' }}>
              // RESILIENT INGESTION PIPELINE PIPELINE
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              ORBIT operates on immutable snapshot storage. Ingestion failures or remote rate-limits do not corrupt existing relationship graphs. Failed sources automatically queue with exponential backoff while preserving the latest verified snapshot.
            </p>
          </div>

        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            * ALL DATA PRESENTED IS DEMO INFORMATION
          </span>
          <button onClick={onClose} className="btn-orbit-secondary" style={{ padding: '8px 16px', fontSize: '11px' }}>
            CLOSE INSPECTOR
          </button>
        </div>

      </div>
    </div>
  );
}
