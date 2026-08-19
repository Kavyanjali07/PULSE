import React, { useState } from 'react';
import SectionIntro from './components/SectionIntro';
import SectionKinetic from './components/SectionKinetic';
import SectionMap from './components/SectionMap';
import SectionEditorial from './components/SectionEditorial';
import SectionFinalCTA from './components/SectionFinalCTA';
import WorkspaceModal from './components/WorkspaceModal';
import './App.css';

export default function App() {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  return (
    <div className="page-container">
      {/* Top Bar Fixed Navigation Overlay (Awwwards Style) */}
      <header className="site-nav-overlay">
        <div className="brand-tag" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }}></span>
          <span>PULSE / CAREER NAVIGATION</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="date-tag">08.19.26</span>
          <button 
            onClick={() => setIsWorkspaceOpen(true)}
            className="btn-ghost"
            style={{ padding: '6px 14px', fontSize: '11px' }}
            id="nav-enter-workspace-btn"
          >
            ENTER WORKSPACE →
          </button>
        </div>
      </header>

      {/* SECTION 1 — INTRO */}
      <SectionIntro />

      {/* SECTION 2 — KINETIC TYPOGRAPHY */}
      <SectionKinetic />

      {/* SECTION 3 & 4 — PRODUCT REVEAL & INTERACTIVE CAREER MAP */}
      <SectionMap onOpenWorkspaceModal={() => setIsWorkspaceOpen(true)} />

      {/* SECTION 5 — PRODUCT MESSAGE */}
      <SectionEditorial />

      {/* SECTION 6 — FINAL CTA & FOOTER */}
      <SectionFinalCTA onOpenWorkspaceModal={() => setIsWorkspaceOpen(true)} />

      {/* INTERACTIVE WORKSPACE DEMO OVERLAY */}
      <WorkspaceModal 
        isOpen={isWorkspaceOpen} 
        onClose={() => setIsWorkspaceOpen(false)} 
      />
    </div>
  );
}
