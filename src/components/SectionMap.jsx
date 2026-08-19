import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_APPLICATIONS } from '../data/demoData';

export default function SectionMap({ onOpenWorkspaceModal }) {
  const [activeNodeId, setActiveNodeId] = useState('google'); // Default active on Google
  const [filterMode, setFilterMode] = useState('ALL');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const centralNode = isMobile ? { x: 190, y: 50 } : { x: 500, y: 270 };

  const displayedNodes = DEMO_APPLICATIONS.filter(node => {
    if (filterMode === 'INTERVIEWS') return node.stage === 'INTERVIEW';
    if (filterMode === 'ACTIVE') return node.stage !== 'CLOSED';
    return true;
  });

  const currentNode = DEMO_APPLICATIONS.find(n => n.id === activeNodeId) || DEMO_APPLICATIONS[0];

  return (
    <section className="section-map" id="interactive-map">
      <div className="map-card-wrapper tech-grid-bg">
        
        {/* Map Technical Top Bar */}
        <div className="map-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="animate-pulse-ring" style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></span>
            <span style={{ color: '#ffffff', fontWeight: 800 }}>CAREER MAP</span>
            <span style={{ color: 'var(--border-dark)' }}>//</span>
            <span style={{ color: 'var(--accent)' }}>TRAJECTORY SYSTEM</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-secondary)' }}>
            <span>08.19.26</span>
            <span>4 ACTIVE PATHS</span>
            <span className="status-badge interview" style={{ fontSize: '9px' }}>DEMO WORKSPACE</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`btn-ghost ${filterMode === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterMode('ALL')}
              style={filterMode === 'ALL' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
            >
              ALL PATHS
            </button>
            <button 
              className={`btn-ghost ${filterMode === 'INTERVIEWS' ? 'active' : ''}`}
              onClick={() => setFilterMode('INTERVIEWS')}
              style={filterMode === 'INTERVIEWS' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
            >
              INTERVIEWS (1)
            </button>
          </div>
        </div>

        {/* SVG Network Canvas */}
        <div className="map-canvas-container">
          <svg 
            className="career-svg"
            viewBox={isMobile ? "0 0 380 620" : "0 0 1000 540"}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="tracerGradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </linearGradient>

              <filter id="cyanFilterGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Grid Coordinates (Desktop) */}
            {!isMobile && (
              <g opacity="0.12">
                <line x1="500" y1="0" x2="500" y2="540" stroke="#00f0ff" strokeDasharray="4 8" strokeWidth="0.8" />
                <line x1="0" y1="270" x2="1000" y2="270" stroke="#00f0ff" strokeDasharray="4 8" strokeWidth="0.8" />
                <circle cx="500" cy="270" r="170" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 6" />
                <circle cx="500" cy="270" r="300" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 8" />
                <text x="520" y="30" fill="#00f0ff" fontSize="9" fontFamily="JetBrains Mono">ORBIT_CORE_300px</text>
              </g>
            )}

            {/* Mobile Vertical Spine */}
            {isMobile && (
              <line 
                x1="120" y1="50" x2="120" y2="520" 
                stroke="var(--border-dark)" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
            )}

            {/* CONNECTION LINES */}
            {displayedNodes.map(node => {
              const compCoords = isMobile ? node.mobileCompanyCoords : node.companyCoords;
              const stageCoords = isMobile ? node.mobileStageCoords : node.stageCoords;
              const isHovered = activeNodeId === node.id;

              const line1 = isMobile
                ? `M ${centralNode.x} ${centralNode.y} L 120 ${centralNode.y} L 120 ${compCoords.y}`
                : `M ${centralNode.x} ${centralNode.y} L ${compCoords.x} ${compCoords.y}`;

              const line2 = `M ${compCoords.x} ${compCoords.y} L ${stageCoords.x} ${stageCoords.y}`;

              return (
                <g key={`lines-${node.id}`}>
                  <path 
                    d={line1} 
                    className={`connection-line ${isHovered ? 'highlighted' : ''}`}
                  />
                  <path 
                    d={line2} 
                    className={`connection-line ${isHovered ? 'highlighted' : ''}`}
                  />

                  {/* Animated Tracer Line for ONE active path (Google -> Interview) */}
                  {node.hasTracer && (
                    <>
                      <path 
                        d={line1} 
                        stroke="url(#tracerGradientLine)" 
                        strokeWidth="2.5" 
                        fill="none" 
                        className="animate-line-flow" 
                        filter="url(#cyanFilterGlow)"
                      />
                      <path 
                        d={line2} 
                        stroke="url(#tracerGradientLine)" 
                        strokeWidth="2.5" 
                        fill="none" 
                        className="animate-line-flow" 
                        filter="url(#cyanFilterGlow)"
                      />
                      <circle r="4" fill="#00f0ff" filter="url(#cyanFilterGlow)">
                        <animateMotion path={`${line1} ${line2}`} dur="3s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}

            {/* CENTRAL NODE: YOU */}
            <g transform={`translate(${centralNode.x}, ${centralNode.y})`} className="node-group">
              <circle r={isMobile ? 26 : 38} fill="url(#nodeGlow)" className="animate-pulse-ring" />
              <circle r={isMobile ? 18 : 28} fill="#06070a" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle r={isMobile ? 12 : 18} fill="#0a0c12" stroke="#00f0ff" strokeWidth="2" filter="url(#cyanFilterGlow)" />
              <circle r="4" fill="#ffffff" />

              <text 
                y={isMobile ? 32 : 44} 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize={isMobile ? "12" : "14"} 
                fontWeight="800"
                fontFamily="Syne"
                letterSpacing="0.1em"
              >
                YOU
              </text>
            </g>

            {/* JOB APPLICATION NODES & STATES */}
            {displayedNodes.map(node => {
              const compCoords = isMobile ? node.mobileCompanyCoords : node.companyCoords;
              const stageCoords = isMobile ? node.mobileStageCoords : node.stageCoords;
              const isHovered = activeNodeId === node.id;

              return (
                <g key={`nodes-${node.id}`}>
                  {/* JOB NODE */}
                  <g 
                    transform={`translate(${compCoords.x}, ${compCoords.y})`}
                    className={`node-group ${isHovered ? 'active' : ''}`}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onClick={() => setActiveNodeId(node.id)}
                    tabIndex="0"
                    role="button"
                    aria-label={`Inspect ${node.company}`}
                  >
                    {isHovered && (
                      <circle r="24" fill="none" stroke="#00f0ff" strokeWidth="1.5" className="animate-pulse-ring" />
                    )}

                    <circle r={isHovered ? "18" : "14"} className="node-circle-base" />
                    <circle r="4" fill={isHovered ? "#00f0ff" : "#8592a3"} />

                    <text 
                      x={isMobile ? "24" : "0"} 
                      y={isMobile ? "4" : "-24"} 
                      textAnchor={isMobile ? "start" : "middle"}
                      className="node-label-title"
                      style={{ fill: isHovered ? '#00f0ff' : '#ffffff', transition: 'fill 0.2s ease' }}
                    >
                      {node.company}
                    </text>
                  </g>

                  {/* STAGE NODE */}
                  <g 
                    transform={`translate(${stageCoords.x}, ${stageCoords.y})`}
                    className={`node-group ${isHovered ? 'active' : ''}`}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onClick={() => setActiveNodeId(node.id)}
                    tabIndex="0"
                    role="button"
                  >
                    <rect 
                      x="-42" y="-14" 
                      width="84" height="28" 
                      rx="2" 
                      fill="#0a0c12" 
                      stroke={isHovered ? "#00f0ff" : "var(--border-dark)"} 
                      strokeWidth={isHovered ? "2" : "1"}
                    />
                    <text 
                      x="0" y="4" 
                      textAnchor="middle" 
                      fill={isHovered ? "#00f0ff" : "#8592a3"} 
                      fontSize="10" 
                      fontWeight="700" 
                      fontFamily="JetBrains Mono"
                      letterSpacing="0.08em"
                    >
                      {node.stage}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* SECTION 4 MICROINTERACTION: FLOATING INSPECTOR PANEL */}
          <AnimatePresence mode="wait">
            {currentNode && (
              <motion.div 
                key={currentNode.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inspector-card-float"
                style={
                  isMobile 
                    ? {} 
                    : {
                        top: `${Math.min(currentNode.companyCoords.y + 15, 250)}px`,
                        left: currentNode.companyCoords.x > 500 
                          ? `${currentNode.companyCoords.x - 340}px` 
                          : `${currentNode.companyCoords.x + 30}px`
                      }
                }
                id="interactive-inspector-panel"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#ffffff' }}>
                    {currentNode.company}
                  </div>
                  <span className={`status-badge ${currentNode.badgeClass}`}>
                    {currentNode.stage}
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {currentNode.role}
                </div>

                <div style={{ borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)', padding: '10px 0', margin: '12px 0' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
                    NEXT EVENT
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>
                    {currentNode.eventTime}
                  </div>
                </div>

                <button 
                  onClick={onOpenWorkspaceModal}
                  className="btn-ghost"
                  style={{ width: '100%', justifyContent: 'space-between', marginTop: '4px' }}
                  id="view-application-link"
                >
                  <span>View application</span>
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Map Bottom Metadata */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--border-dark)',
          background: '#06070a',
          display: 'flex',
          justify: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)'
        }}>
          <div>* HOVER NODES TO EXPAND APPLICATION VECTOR</div>
          <div>PULSE CAREER MAP v3.0</div>
        </div>
      </div>
    </section>
  );
}
