import React from 'react';
import { motion } from 'framer-motion';

export default function SectionIntro() {
  return (
    <section className="section-intro tech-grid-bg">
      <div className="intro-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: 'var(--accent)',
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            [ SYSTEM CONCEPT 01 ]
          </div>

          <h1 className="intro-headline">
            <span className="intro-headline-line">YOUR CAREER</span>
            <span className="intro-headline-line" style={{ color: 'var(--accent)' }}>ISN'T A LIST.</span>
          </h1>
        </motion.div>
      </div>

      <div className="intro-bottom-meta">
        <div>ORBIT // CAREER TRAJECTORY tracker</div>
        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
