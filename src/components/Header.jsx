import React from 'react';

export default function Header({ onOpenWorkspace }) {
  return (
    <header className="site-header">
      <a href="#" className="brand-logo" aria-label="PULSE Home">
        <span className="logo-dot"></span>
        <span className="logo-text">PULSE</span>
      </a>

      <div className="header-meta">
        <div className="header-status-indicator">
          <span className="status-dot-active"></span>
          <span>SYS.ACTIVE // 4 PATHS</span>
        </div>
        <span style={{ color: 'var(--border-dark)' }}>|</span>
        <span>LAT 37.7749</span>
        <span style={{ color: 'var(--border-dark)' }}>|</span>
        <span>08.19.26</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="#how-it-works" className="btn-secondary" style={{ border: 'none', padding: '6px 12px' }}>
          How it works
        </a>
        <button 
          onClick={onOpenWorkspace}
          className="btn-secondary"
          id="header-workspace-btn"
        >
          <span className="status-badge interview" style={{ padding: '2px 6px', fontSize: '9px' }}>DEMO</span>
          Enter Workspace →
        </button>
      </div>
    </header>
  );
}
