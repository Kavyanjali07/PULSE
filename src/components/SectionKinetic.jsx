import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionKinetic() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kinetic movement along horizontal axis
  const xTranslate = useTransform(scrollYProgress, [0.1, 0.8], [-120, 120]);
  const opacityProgress = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.3, 1, 0.8]);

  return (
    <section className="section-kinetic tech-grid-bg" ref={containerRef}>
      <div className="kinetic-label">// VECTOR TRANSITION</div>
      
      <div className="kinetic-subhead">IT'S A</div>

      <motion.div 
        className="kinetic-trajectory-word"
        style={{ 
          x: xTranslate,
          opacity: opacityProgress 
        }}
      >
        TRAJECTORY.
      </motion.div>

      <div className="kinetic-vector-line"></div>
    </section>
  );
}
