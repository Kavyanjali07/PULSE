import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { DEMO_APPLICATIONS } from '../data/demoData';

export default function WorkspaceModal({ isOpen, onClose }) {
  const [nodes, setNodes] = useState(DEMO_APPLICATIONS);
  const [selectedId, setSelectedId] = useState('google');
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const selectedNode = nodes.find(n => n.id === selectedId) || nodes[0];

  const handleUpdateStage = (id, newStage) => {
    const badgeMap = {
      'INTERVIEW': 'interview',
      'FOLLOW UP': 'followup',
      'APPLIED': 'applied',
      'CLOSED': 'closed'
    };
    setNodes(nodes.map(n => n.id === id ? { ...n, stage: newStage, badgeClass: badgeMap[newStage] } : n));
  };

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;
    const newNode = {
      id: `node-${Date.now()}`,
      company: newCompany.toUpperCase(),
      role: newRole,
      stage: 'APPLIED',
      badgeClass: 'applied',
      eventTime: 'Just now',
      details: 'Added in Demo Workspace session',
      hasTracer: false,
      companyCoords: { x: 500, y: 460 },
      stageCoords: { x: 500, y: 520 },
      mobileCompanyCoords: { x: 120, y: 640 },
      mobileStageCoords: { x: 270, y: 640 }
    };
    setNodes([newNode, ...nodes]);
    setSelectedId(newNode.id);
    setNewCompany('');
    setNewRole('');
    setIsAdding(false);
  };

  return (
    <div className="workspace-overlay" onClick={onClose}>
      <div className="workspace-modal" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#07090f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }} className="animate-pulse-ring"></span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: '#ffffff' }}>PULSE WORKSPACE</span>
            <span className="status-badge interview" style={{ fontSize: '9px' }}>DEMO SESSION</span>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
            id="close-workspace-modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '480px' }}>
          
          {/* Left Column: Applications List */}
          <div style={{ borderRight: '1px solid var(--border-dark)', background: '#080a11', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                ACTIVE PATHS ({nodes.length})
              </span>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="btn-ghost" 
                style={{ padding: '4px 8px', fontSize: '10px' }}
              >
                <Plus size={12} />
                <span>NEW NODE</span>
              </button>
            </div>

            {isAdding && (
              <form onSubmit={handleAddNode} style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent)', padding: '12px', borderRadius: '2px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="text"
                  placeholder="Company (e.g. OpenAI)"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  style={{ background: '#05070a', border: '1px solid var(--border-dark)', color: '#fff', padding: '8px', fontSize: '12px', fontFamily: 'var(--font-sans)' }}
                  required
                />
                <input 
                  type="text"
                  placeholder="Role (e.g. AI Engineer)"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  style={{ background: '#05070a', border: '1px solid var(--border-dark)', color: '#fff', padding: '8px', fontSize: '12px', fontFamily: 'var(--font-sans)' }}
                  required
                />
                <button type="submit" className="btn-pulse" style={{ padding: '8px', fontSize: '11px', justifyContent: 'center' }}>
                  ADD TRAJECTORY NODE
                </button>
              </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '360px' }}>
              {nodes.map(n => (
                <div 
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  style={{
                    padding: '12px 14px',
                    border: `1px solid ${selectedId === n.id ? 'var(--accent)' : 'var(--border-dark)'}`,
                    background: selectedId === n.id ? 'var(--accent-dim)' : 'transparent',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', color: '#fff' }}>{n.company}</span>
                    <span className={`status-badge ${n.badgeClass}`} style={{ fontSize: '8px' }}>{n.stage}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-secondary)' }}>{n.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Node Details & State Controller */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-surface)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="tech-coordinate-label">TRAJECTORY NODE // {selectedNode.id.toUpperCase()}</span>
                <span className={`status-badge ${selectedNode.badgeClass}`}>{selectedNode.stage}</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                {selectedNode.company}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {selectedNode.role}
              </p>

              <div style={{ background: '#07090f', border: '1px solid var(--border-dark)', padding: '16px', borderRadius: '2px', marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  UPDATE TRAJECTORY STAGE
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['APPLIED', 'INTERVIEW', 'FOLLOW UP', 'CLOSED'].map(stg => (
                    <button
                      key={stg}
                      onClick={() => handleUpdateStage(selectedNode.id, stg)}
                      className="btn-ghost"
                      style={{
                        padding: '6px 12px',
                        fontSize: '11px',
                        borderColor: selectedNode.stage === stg ? 'var(--accent)' : 'var(--border-dark)',
                        color: selectedNode.stage === stg ? 'var(--accent)' : 'var(--text-secondary)',
                        background: selectedNode.stage === stg ? 'var(--accent-dim)' : 'transparent'
                      }}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>MILESTONE TIMELINE</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)', marginTop: '4px' }}>{selectedNode.eventTime}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LOG DETAILS</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedNode.details}</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                * CHANGES PERSISTED IN LIVE DEMO STATE
              </span>
              <button onClick={onClose} className="btn-pulse" style={{ padding: '10px 20px', fontSize: '12px' }}>
                DONE EXPLORING →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
