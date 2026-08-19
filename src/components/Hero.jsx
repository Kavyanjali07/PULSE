import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function Hero({ onOpenWorkspace }) {
  return (
    <section className="hero-section">
      <div className="hero-meta-tag">
        <Compass size={14} />
        <span>CAREER NAVIGATION SYSTEM</span>
      </div>

      <h1 className="hero-headline">
        Your career isn't a list.
        <span className="gradient-text">It's a trajectory.</span>
      </h1>

      <p className="hero-subhead">
        Pulse turns every application into a visible path forward.
      </p>

      <div className="hero-cta-group">
        <button 
          className="btn-primary" 
          onClick={onOpenWorkspace}
          id="hero-primary-cta"
        >
          <span>Enter your workspace</span>
          <ArrowRight size={18} />
        </button>
        <span className="hero-demo-label">Demo workspace</span>
      </div>
    </section>
  );
}
