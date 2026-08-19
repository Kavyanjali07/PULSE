import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SectionFinalCTA({ onOpenWorkspaceModal }) {
  return (
    <>
      <section className="section-final-cta tech-grid-bg">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          color: 'var(--accent)',
          marginBottom: '24px',
          textTransform: 'uppercase'
        }}>
          // INITIALIZE TRAJECTORY
        </div>

        <h2 className="final-headline">
          STOP MANAGING APPLICATIONS.<br />
          <span style={{ color: 'var(--accent)' }}>START NAVIGATING THEM.</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn-pulse"
            onClick={onOpenWorkspaceModal}
            id="final-enter-pulse-btn"
          >
            <span>ENTER PULSE</span>
            <ArrowRight size={18} />
          </button>
          
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
          }}>
            DEMO WORKSPACE
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <div>
            <div className="footer-brand-title">PULSE</div>
            <div className="footer-sub">Career navigation for your job search.</div>
          </div>

          <div className="footer-links-group">
            <div>
              <div className="footer-col-title">NAVIGATION</div>
              <a href="#interactive-map" className="footer-link-item">Product</a>
              <a href="#product-editorial" className="footer-link-item">How it works</a>
            </div>

            <div>
              <div className="footer-col-title">SYSTEM</div>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenWorkspaceModal(); }} className="footer-link-item">Demo Workspace</a>
              <a href="#" className="footer-link-item">v3.0 Spec</a>
            </div>
          </div>
        </div>

        <div className="footer-legal-bar">
          <div>© 2026 Pulse. All rights reserved.</div>
          <div>PERSONAL CAREER NAVIGATION SYSTEM</div>
        </div>
      </footer>
    </>
  );
}
