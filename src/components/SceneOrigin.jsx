import React from 'react';
import { motion } from 'framer-motion';

export default function SceneOrigin() {
  return (
    <section className="scene-origin paper-grid-bg" id="origin">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="scene-origin-meta"
        >
          <span className="status-badge accent">SYSTEM / 001</span>
          <span>ORBIT INFORMATION PLATFORM</span>
        </motion.div>

        <motion.h1 
          className="scene-origin-headline"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          EVERYTHING<br />
          IS<br />
          <span style={{ color: 'var(--accent)' }}>CONNECTED.</span>
        </motion.h1>
      </div>

      <div className="scene-origin-bottom">
        <div>ORBIT // INFORMATION INTELLIGENCE SYSTEM</div>
        <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }} className="animate-pulse-dot">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
