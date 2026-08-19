import React from 'react';
import { INGESTION_PIPELINE } from '../data/orbitData';

export default function ScenePath() {
  return (
    <section className="scene-path paper-grid-bg" id="path">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: '16px' }}>
        // SCENE 03 — PATH TRAJECTORY
      </div>

      <h2 className="scene-path-heading">
        INFORMATION<br />
        <span style={{ color: 'var(--accent)' }}>TRAJECTORY.</span>
      </h2>

      {/* SVG Active Trajectory Flow with Traveling Particle */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '24px', margin: '32px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <span>ACTIVE DEMO PATH // SAMPLE SNAPSHOT</span>
          <span>INGESTION STATUS: ACTIVE</span>
        </div>

        <svg viewBox="0 0 900 120" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="pathGradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d0d0e" />
              <stop offset="50%" stopColor="#ff4500" />
              <stop offset="100%" stopColor="#0d0d0e" />
            </linearGradient>
          </defs>

          {/* Spine Path Line */}
          <path id="activePathLine" d="M 50 60 L 230 60 L 410 60 L 610 60 L 850 60" fill="none" stroke="url(#pathGradientLine)" strokeWidth="2" strokeDasharray="6 4" className="animate-path-dash" />

          {/* Travelling Laser Particle */}
          <circle r="5" fill="#ff4500">
            <animateMotion path="M 50 60 L 230 60 L 410 60 L 610 60 L 850 60" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Node Points & Labels */}
          {[
            { x: 50, label: 'SOURCE', sub: 'DOCUMENTATION' },
            { x: 230, label: 'SNAPSHOT', sub: '08.18.26' },
            { x: 410, label: 'CHANGE', sub: 'pricing field modified' },
            { x: 610, label: 'RELATED', sub: 'API reference' },
            { x: 850, label: 'DESTINATION', sub: 'APPLICATION GRAPH' }
          ].map((pt, idx) => (
            <g key={idx} transform={`translate(${pt.x}, 60)`}>
              <circle r="10" fill="#f5f4f0" stroke={idx === 2 ? "#ff4500" : "#0d0d0e"} strokeWidth="2" />
              <circle r="3" fill={idx === 2 ? "#ff4500" : "#0d0d0e"} />
              <text y="-18" textAnchor="middle" fill="#0d0d0e" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">{pt.label}</text>
              <text y="24" textAnchor="middle" fill={idx === 2 ? "#ff4500" : "#55555a"} fontSize="9" fontFamily="JetBrains Mono">{pt.sub}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Conceptual Ingestion Pipeline HUD */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.12em', marginTop: '20px' }}>
          // INGESTION PIPELINE ARCHITECTURE (SNAPSHOT DRIVEN)
        </div>

        <div className="pipeline-hud-grid">
          {INGESTION_PIPELINE.map((st) => (
            <div key={st.step} className="pipeline-step-card">
              <div className="pipeline-step-num">{st.step}</div>
              <div className="pipeline-step-name">{st.name}</div>
              <div className="pipeline-step-desc">{st.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
