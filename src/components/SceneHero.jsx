import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SceneHero({ onOpenWorkspace, onScrollToHowItWorks }) {
  return (
    <section className="scene-origin paper-grid-bg" id="hero" style={{ minHeight: '92vh', paddingTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="scene-origin-meta"
        >
          <span className="status-badge accent">ORBIT / INFORMATION INTELLIGENCE</span>
          <span className="status-badge muted" style={{ fontSize: '9px' }}>DEMO EXPERIENCE</span>
        </motion.div>

        {/* Oversized Editorial Main Headline */}
        <motion.h1 
          className="scene-origin-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          UNDERSTAND<br />
          <span style={{ color: 'var(--accent)' }}>WHAT CHANGES.</span>
        </motion.h1>

        {/* Unambiguous Product Explanation Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '22px',
            lineHeight: '1.4',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            marginBottom: '36px',
            fontWeight: 400
          }}
        >
          "ORBIT monitors your chosen information sources, detects meaningful changes, and maps how those changes connect."
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}
        >
          <button 
            onClick={onOpenWorkspace}
            className="btn-orbit"
            id="hero-explore-system-btn"
          >
            <span>EXPLORE THE SYSTEM</span>
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={onScrollToHowItWorks}
            className="btn-orbit-secondary"
            style={{ padding: '16px 24px', fontSize: '13px' }}
            id="hero-see-how-it-works-btn"
          >
            <span>SEE HOW IT WORKS</span>
            <ChevronDown size={16} />
          </button>
        </motion.div>

      </div>

      {/* Bottom Metadata & Instruction */}
      <div className="scene-origin-bottom" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div>ORBIT // IMMUTABLE SNAPSHOT ENGINE v3.4</div>
        <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }} className="animate-pulse-dot">
          <span>SCROLL TO DISCOVER 3D WORLD</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
