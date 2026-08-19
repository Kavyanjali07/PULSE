import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

export default function Navigation({ activeScene, onSelectScene, onOpenWorkspace }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scenes = [
    { id: 'origin', label: '01 / ORIGIN' },
    { id: 'signal', label: '02 / SIGNAL' },
    { id: 'path', label: '03 / PATH' },
    { id: 'trace', label: '04 / TRACE' },
    { id: 'destination', label: '05 / DESTINATION' }
  ];

  return (
    <>
      {/* Top Bar Navigation */}
      <header className="orbit-top-nav">
        <a href="#origin" className="orbit-brand" aria-label="ORBIT Home">
          <span className="brand-dot animate-pulse-dot"></span>
          <span>ORBIT</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onOpenWorkspace}
            className="btn-orbit-secondary"
            style={{ fontSize: '11px', padding: '6px 12px' }}
            id="nav-workspace-trigger"
          >
            <span className="status-badge accent" style={{ fontSize: '8px', padding: '2px 4px' }}>DEMO</span>
            <span>EXPLORE DATA →</span>
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-trigger"
            id="nav-menu-trigger"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? 'CLOSE [X]' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Persistent Instrument Control Navigation (Bottom-Right) */}
      <nav className="orbit-instrument-nav" aria-label="Section Instrument Controls">
        {scenes.map((scene) => (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectScene(scene.id);
              const el = document.getElementById(scene.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`nav-item ${activeScene === scene.id ? 'active' : ''}`}
          >
            <span className="nav-indicator"></span>
            <span>{scene.label}</span>
          </a>
        ))}
      </nav>

      {/* Menu Instrument Overlay Drawer */}
      {isMenuOpen && (
        <div 
          className="workspace-drawer-overlay"
          onClick={() => setIsMenuOpen(false)}
          style={{ zIndex: 120 }}
        >
          <div className="workspace-drawer-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', letterSpacing: '0.08em' }}>
                ORBIT CONTROL SYSTEM
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                  // SYSTEM SCENES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {scenes.map(s => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        onSelectScene(s.id);
                        const el = document.getElementById(s.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-orbit-secondary"
                      style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                    >
                      <span>{s.label}</span>
                      <ChevronRight size={14} />
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  SYSTEM ARCHITECTURE // METADATA
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                  STATUS: ONLINE<br />
                  INGESTION LATENCY: 02.4ms<br />
                  ACTIVE NODES: 06 DEMO SOURCES<br />
                  SNAPSHOT ENGINE: v3.4.1
                </div>
              </div>

              <button 
                onClick={() => { setIsMenuOpen(false); onOpenWorkspace(); }}
                className="btn-orbit"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                OPEN DEMO WORKSPACE →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
