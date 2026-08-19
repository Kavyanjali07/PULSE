import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { INITIAL_NODES } from '../data/demoData';

export default function CareerMap({ onOpenWorkspaceModal }) {
  const [hoveredNodeId, setHoveredNodeId] = useState('microsoft');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const centralNode = isMobile 
    ? { x: 190, y: 50 } 
    : { x: 500, y: 270 };

  const filteredNodes = INITIAL_NODES.filter(node => {
    if (selectedFilter === 'INTERVIEW') return node.stage === 'INTERVIEW';
    if (selectedFilter === 'ACTIVE') return node.stage !== 'CLOSED';
    return true;
  });

  const activeNodeData = INITIAL_NODES.find(n => n.id === hoveredNodeId) || INITIAL_NODES[0];

  return (
    <section className="map-container-section" id="career-map-section">
      <div className="map-wrapper tech-grid-bg">
        
        {/* Technical Header Bar */}
        <div className="map-header-bar">
          <div className="map-title-group">
            <span className="map-indicator-dot animate-pulse-ring"></span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>CAREER MAP</span>
            <span style={{ color: 'var(--border-dark)' }}>//</span>
            <span style={{ color: 'var(--accent)' }}>LIVE TRAJECTORY</span>
          </div>

          <div className="map-labels-group">
            <span className="tech-coordinate-label">08.19.26</span>
            <span className="tech-coordinate-label">4 ACTIVE PATHS</span>
            <span className="status-badge interview" style={{ fontSize: '9px' }}>DEMO WORKSPACE</span>
          </div>

          <div className="map-controls-bar">
            <button 
              className={`filter-btn ${selectedFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('ALL')}
            >
              ALL PATHS
            </button>
            <button 
              className={`filter-btn ${selectedFilter === 'INTERVIEW' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('INTERVIEW')}
            >
              INTERVIEWS (1)
            </button>
          </div>
        </div>

        {/* SVG Canvas Area */}
        <div className="svg-canvas-wrapper">
          <svg 
            className="career-svg" 
            viewBox={isMobile ? "0 0 380 620" : "0 0 1000 540"}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="tracerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
              </linearGradient>

              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* CONNECTION LINES */}
            {filteredNodes.map(node => {
              const compCoords = isMobile ? node.mobileCompanyCoords : node.companyCoords;
              const stageCoords = isMobile ? node.mobileStageCoords : node.stageCoords;
              const isHovered = hoveredNodeId === node.id;

              const line1Path = isMobile
                ? `M ${centralNode.x} ${centralNode.y} L 120 ${centralNode.y} L 120 ${compCoords.y}`
                : `M ${centralNode.x} ${centralNode.y} L ${compCoords.x} ${compCoords.y}`;

              const line2Path = `M ${compCoords.x} ${compCoords.y} L ${stageCoords.x} ${stageCoords.y}`;

              return (
                <g key={`lines-${node.id}`}>
                  <path d={line1Path} className={`connection-line ${isHovered ? 'highlighted' : ''}`} />
                  <path d={line2Path} className={`connection-line ${isHovered ? 'highlighted' : ''}`} />
                </g>
              );
            })}

            {/* CENTRAL ORIGIN NODE: YOU */}
            <g transform={`translate(${centralNode.x}, ${centralNode.y})`} className="node-group">
              <circle r={isMobile ? 28 : 42} fill="url(#centralGlow)" className="animate-pulse-ring" />
              <circle r={isMobile ? 14 : 20} fill="#0a0d16" stroke="#00f0ff" strokeWidth="2.5" filter="url(#cyanGlow)" />
              <circle r="5" fill="#ffffff" />
              <text y={isMobile ? 32 : 44} textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800" fontFamily="Syne">YOU</text>
            </g>

            {/* APPLICATION NODES */}
            {filteredNodes.map(node => {
              const compCoords = isMobile ? node.mobileCompanyCoords : node.companyCoords;
              const isHovered = hoveredNodeId === node.id;

              return (
                <g key={`nodes-${node.id}`} transform={`translate(${compCoords.x}, ${compCoords.y})`} className="node-group" onMouseEnter={() => setHoveredNodeId(node.id)}>
                  <circle r={isHovered ? "18" : "15"} className="node-circle-base" />
                  <circle r="4" fill={isHovered ? "#00f0ff" : "#8c9ba5"} />
                  <text y="-24" textAnchor="middle" className="node-label-title" style={{ fill: isHovered ? '#00f0ff' : '#ffffff' }}>{node.company}</text>
                </g>
              );
            })}
          </svg>

          {/* INSPECTOR PANEL */}
          {activeNodeData && (
            <div className="inspector-panel" id="node-inspector-card">
              <div className="inspector-header">
                <div>
                  <div className="inspector-company">{activeNodeData.company}</div>
                  <div className="inspector-role">{activeNodeData.role}</div>
                </div>
                <span className={`status-badge ${activeNodeData.badgeClass}`}>{activeNodeData.stage}</span>
              </div>
              <button onClick={onOpenWorkspaceModal} className="inspector-action-btn">
                <span>View application details</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
