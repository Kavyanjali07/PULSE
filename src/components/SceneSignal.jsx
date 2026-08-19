import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SceneSignal() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textTranslateX = useTransform(scrollYProgress, [0.1, 0.7], [-40, 40]);

  return (
    <section className="scene-signal paper-grid-bg" id="signal" ref={ref}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: '16px' }}>
        // SCENE 02 — SIGNAL DISCOVERY
      </div>

      <motion.h2 
        className="scene-signal-headline"
        style={{ x: textTranslateX }}
      >
        FIND<br />
        THE<br />
        <span style={{ color: 'var(--accent)' }}>SIGNAL.</span>
      </motion.h2>

      {/* Abstract SVG Information Network Vector */}
      <div style={{ width: '100%', minHeight: '380px', position: 'relative' }}>
        <svg viewBox="0 0 1000 380" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#111113" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ff4500" stopOpacity="1" />
              <stop offset="100%" stopColor="#111113" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Grid Background Coordinate Ticks */}
          <g opacity="0.2">
            <line x1="0" y1="190" x2="1000" y2="190" stroke="#85858a" strokeDasharray="4 8" strokeWidth="1" />
            <line x1="500" y1="0" x2="500" y2="380" stroke="#85858a" strokeDasharray="4 8" strokeWidth="1" />
            <text x="520" y="30" fill="#85858a" fontSize="10" fontFamily="JetBrains Mono">SIGNAL_VECTOR_AXIS</text>
            <text x="520" y="360" fill="#85858a" fontSize="10" fontFamily="JetBrains Mono">LAT 37.7749 // LON -122.4194</text>
          </g>

          {/* Interconnecting Lines */}
          <path d="M 100 190 L 320 80 L 500 240 L 720 100 L 900 220" fill="none" stroke="#d6d3c9" strokeWidth="1.5" />
          <path d="M 320 80 L 720 100" fill="none" stroke="#d6d3c9" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 100 190 L 500 240 L 900 220" fill="none" stroke="url(#signalGradient)" strokeWidth="2" className="animate-path-dash" />

          {/* Nodes */}
          {[
            { x: 100, y: 190, label: 'RAW DATASTREAM 01' },
            { x: 320, y: 80, label: 'SOURCE FILTER' },
            { x: 500, y: 240, label: 'SNAPSHOT MATRIX' },
            { x: 720, y: 100, label: 'DIFF DETECTOR' },
            { x: 900, y: 220, label: 'SIGNAL OUT' }
          ].map((n, idx) => (
            <g key={idx} transform={`translate(${n.x}, ${n.y})`}>
              <circle r="12" fill="#f5f4f0" stroke={idx === 2 ? "#ff4500" : "#0d0d0e"} strokeWidth="2" />
              <circle r="4" fill={idx === 2 ? "#ff4500" : "#55555a"} />
              <text y="28" textAnchor="middle" fill="#55555a" fontSize="10" fontFamily="JetBrains Mono">{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
