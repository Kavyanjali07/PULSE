import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ORBIT_NODES } from '../data/orbitData';

export default function SceneTrace({ onOpenWorkspaceDrawer }) {
  const [hoveredNodeId, setHoveredNodeId] = useState('documentation'); // Default active on documentation node
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeNode = ORBIT_NODES.find(n => n.id === hoveredNodeId) || ORBIT_NODES[0];

  return (
    <section className="scene-trace" id="trace">
      <div className="trace-canvas-card paper-grid-bg">
        
        {/* Technical Header Bar */}
        <div className="trace-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="brand-dot animate-pulse-dot"></span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)' }}>SCENE 04 // TRACE THE GRAPH</span>
          </div>

          <div style={{ color: 'var(--text-secondary)' }}>
            <span>6 DEMO SOURCES MONITORED</span>
            <span style={{ margin: '0 8px', color: 'var(--border-subtle)' }}>|</span>
            <span className="status-badge accent" style={{ fontSize: '9px' }}>DEMO DATA</span>
          </div>
        </div>

        {/* SVG Interactive Network Canvas */}
        <div className="trace-svg-wrapper">
          <svg 
            viewBox={isMobile ? "0 0 380 640" : "0 0 1000 560"} 
            style={{ width: '100%', height: '100%', display: 'block' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background Grid Crosshairs */}
            {!isMobile && (
              <g opacity="0.15">
                <line x1="500" y1="0" x2="500" y2="560" stroke="#85858a" strokeDasharray="4 8" strokeWidth="0.8" />
                <line x1="0" y1="280" x2="1000" y2="280" stroke="#85858a" strokeDasharray="4 8" strokeWidth="0.8" />
                <circle cx="500" cy="280" r="180" fill="none" stroke="#85858a" strokeWidth="0.5" strokeDasharray="2 6" />
                <text x="520" y="30" fill="#85858a" fontSize="9" fontFamily="JetBrains Mono">RELATIONSHIP_GRAPH_MATRIX</text>
              </g>
            )}

            {/* Mobile Vertical Spine */}
            {isMobile && (
              <line x1="120" y1="60" x2="120" y2="560" stroke="var(--border-subtle)" strokeWidth="1.5" strokeDasharray="4 4" />
            )}

            {/* CONNECTION LINES BETWEEN NODES */}
            {ORBIT_NODES.map(node => {
              const nodeCoords = isMobile ? node.mobileCoords : node.coords;
              const isSelected = hoveredNodeId === node.id;

              return node.connectedNodeIds.map(targetId => {
                const targetNode = ORBIT_NODES.find(n => n.id === targetId);
                if (!targetNode) return null;
                const targetCoords = isMobile ? targetNode.mobileCoords : targetNode.coords;

                const isConnectedToSelected = isSelected || hoveredNodeId === targetId;

                const linePath = isMobile
                  ? `M ${nodeCoords.x} ${nodeCoords.y} L ${targetCoords.x} ${targetCoords.y}`
                  : `M ${nodeCoords.x} ${nodeCoords.y} L ${targetCoords.x} ${targetCoords.y}`;

                return (
                  <path 
                    key={`line-${node.id}-${targetId}`}
                    d={linePath}
                    stroke={isConnectedToSelected ? "#ff4500" : "#d6d3c9"}
                    strokeWidth={isConnectedToSelected ? "2.5" : "1"}
                    strokeDasharray={isConnectedToSelected ? "none" : "3 3"}
                    opacity={hoveredNodeId && !isConnectedToSelected ? 0.2 : 0.8}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                );
              });
            })}

            {/* INTERACTIVE NODES */}
            {ORBIT_NODES.map(node => {
              const coords = isMobile ? node.mobileCoords : node.coords;
              const isSelected = hoveredNodeId === node.id;
              const isConnected = activeNode.connectedNodeIds.includes(node.id) || node.id === activeNode.id;

              return (
                <g 
                  key={`node-${node.id}`}
                  transform={`translate(${coords.x}, ${coords.y})`}
                  onClick={() => setHoveredNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease', opacity: hoveredNodeId && !isConnected ? 0.25 : 1 }}
                  tabIndex="0"
                  role="button"
                  aria-label={`Inspect ${node.label} node`}
                >
                  {/* Subtle expansion ring on selected node */}
                  {isSelected && (
                    <circle r="26" fill="none" stroke="#ff4500" strokeWidth="1.5" className="animate-pulse-dot" />
                  )}

                  <circle 
                    r={isSelected ? "18" : "14"} 
                    fill={isSelected ? "var(--accent-dim)" : "var(--bg-paper)"} 
                    stroke={isSelected ? "#ff4500" : "var(--text-primary)"} 
                    strokeWidth={isSelected ? "2.5" : "1.5"} 
                  />
                  <circle r="4" fill={isSelected ? "#ff4500" : "var(--text-secondary)"} />

                  <text 
                    x={isMobile ? "24" : "0"} 
                    y={isMobile ? "4" : "-24"} 
                    textAnchor={isMobile ? "start" : "middle"}
                    fill={isSelected ? "#ff4500" : "var(--text-primary)"}
                    fontSize="11" 
                    fontWeight="700" 
                    fontFamily="JetBrains Mono"
                    letterSpacing="0.06em"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* INTEGRATED INFORMATION PANEL (NOT browser tooltip!) */}
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div 
                key={activeNode.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="integrated-info-panel"
                style={
                  isMobile 
                    ? {} 
                    : {
                        top: `${Math.min(activeNode.coords.y + 15, 260)}px`,
                        left: activeNode.coords.x > 500 
                          ? `${activeNode.coords.x - 340}px` 
                          : `${activeNode.coords.x + 30}px`
                      }
                }
                id="orbit-node-info-panel"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.12em' }}>
                    {activeNode.nodeId}
                  </span>
                  <span className={`status-badge ${activeNode.badgeClass}`}>
                    {activeNode.status}
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {activeNode.label}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {activeNode.url}
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '10px 0', margin: '10px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>TYPE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)' }}>{activeNode.type}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>LAST CHANGE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>{activeNode.lastChange}</div>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.4' }}>
                  {activeNode.notes}
                </p>

                <button 
                  onClick={onOpenWorkspaceDrawer}
                  className="btn-orbit-secondary"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                  id="trace-panel-action"
                >
                  <span>TRACE →</span>
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Footer Metadata */}
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-paper)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div>* HOVER OR TAP NODE TO TRACE SOURCE GRAPH RELATIONSHIPS</div>
          <div>ORBIT SNAPSHOT ENGINE v3.4</div>
        </div>
      </div>
    </section>
  );
}
