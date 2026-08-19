import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onOpenWorkspace }) {
  return (
    <section className="final-cta-section tech-grid-bg">
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.14em',
        color: 'var(--accent)',
        marginBottom: '20px',
        textTransform: 'uppercase'
      }}>
        // READY TO INITIALIZE
      </div>

      <h2 className="final-cta-headline">
        Stop managing applications.
        {'\n'}Start navigating them.
      </h2>

      <button 
        className="btn-primary" 
        onClick={onOpenWorkspace}
        style={{ fontSize: '16px', padding: '16px 36px' }}
        id="final-cta-btn"
      >
        <span>Enter Pulse</span>
        <ArrowRight size={18} />
      </button>

      <div style={{
        marginTop: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-dark-muted)'
      }}>
        NO SPREADSHEETS · NO CLUTTER · DIRECT CAREER TRAJECTORY
      </div>
    </section>
  );
}
