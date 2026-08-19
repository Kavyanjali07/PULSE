import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SceneDestination({ onOpenWorkspaceDrawer }) {
  return (
    <>
      <section className="scene-destination paper-grid-bg" id="explore">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '20px' }}>
          // SCENE 05 — UNDERSTAND & DESTINATION
        </div>

        <h2 className="destination-headline">
          NOW YOU KNOW<br />
          <span style={{ color: 'var(--accent)' }}>WHAT CHANGED.</span>
        </h2>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '22px', color: 'var(--text-secondary)', marginBottom: '36px' }}>
          "Follow the signal. Understand the system."
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn-orbit"
            onClick={onOpenWorkspaceDrawer}
            id="destination-cta-btn"
          >
            <span>EXPLORE ORBIT</span>
            <ArrowRight size={18} />
          </button>
          
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            DEMO EXPERIENCE
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="orbit-footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">ORBIT</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Information Intelligence Platform
            </div>
          </div>

          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '12px' }}>NAVIGATION</div>
              <a href="#hero" className="footer-link" style={{ display: 'block', color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '8px', fontSize: '14px' }}>Hero Overview</a>
              <a href="#what-is-orbit" className="footer-link" style={{ display: 'block', color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '8px', fontSize: '14px' }}>What is Orbit?</a>
              <a href="#discover" className="footer-link" style={{ display: 'block', color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '8px', fontSize: '14px' }}>3D Interactive World</a>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '12px' }}>DATA SYSTEM</div>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenWorkspaceDrawer(); }} style={{ display: 'block', color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '8px', fontSize: '14px' }}>Demo Workspace</a>
              <span className="status-badge accent" style={{ fontSize: '8px' }}>DEMO SOURCE DATA</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1300px', margin: '20px auto 0 auto', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div>© 2026 ORBIT. ALL DISPLAYED DATA IS DEMO INFORMATION.</div>
          <div>EVERYTHING IS CONNECTED.</div>
        </div>
      </footer>
    </>
  );
}
