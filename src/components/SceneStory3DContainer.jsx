import React, { useState, useEffect } from 'react';
import OrbitCanvas3D from './OrbitCanvas3D';

export default function SceneStory3DContainer({ activeNodeId, onSelectNode, onOpenWorkspaceDrawer }) {
  const [scrollState, setScrollState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('discover-3d-section');
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);

      if (progress < 0.2) {
        setScrollState(0); // STATE 01: DISCOVER
      } else if (progress < 0.4) {
        setScrollState(1); // STATE 02: DETECT
      } else if (progress < 0.6) {
        setScrollState(2); // STATE 03: CONNECT
      } else if (progress < 0.8) {
        setScrollState(3); // STATE 04: TRACE
      } else {
        setScrollState(4); // STATE 05: UNDERSTAND
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storyStatesInfo = [
    {
      state: '01 / DISCOVER',
      headline: 'SEE THE SYSTEM.',
      editorialText: "THE WEB ISN'T STATIC.",
      subText: 'Configured sources orbit the central Orbit intelligence graph.'
    },
    {
      state: '02 / DETECT',
      headline: 'SOURCES CHANGE.',
      editorialText: 'DIFFERENTIALS EMERGE.',
      subText: 'A remote pricing endpoint is modified. Orbit detects the version delta.'
    },
    {
      state: '03 / CONNECT',
      headline: 'CONTEXT CHANGES.',
      editorialText: 'RELATIONSHIPS PROPAGATE.',
      subText: 'Changed signals flow into connected documentation and application nodes.'
    },
    {
      state: '04 / TRACE',
      headline: 'FOLLOW THE SIGNAL.',
      editorialText: 'VECTOR TRAJECTORY.',
      subText: 'Highlighting the dependency trajectory from API -> Documentation -> Product.'
    },
    {
      state: '05 / UNDERSTAND',
      headline: 'NOW YOU KNOW WHAT CHANGED.',
      editorialText: 'ORBIT WATCHES.',
      subText: 'The network stabilizes into an immutable, traceable snapshot graph.'
    }
  ];

  const currentStateInfo = storyStatesInfo[scrollState];

  return (
    <section className="paper-grid-bg" id="discover-3d-section" style={{ position: 'relative', minHeight: '350vh' }}>
      
      {/* Sticky 3D Canvas Viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', zIndex: 10 }}>
        
        {/* 3D Canvas */}
        <OrbitCanvas3D 
          scrollState={scrollState}
          onSelectNode={onSelectNode}
          activeNodeId={activeNodeId}
          onOpenWorkspaceDrawer={onOpenWorkspaceDrawer}
        />

        {/* Top HUD State Overlay */}
        <div style={{ position: 'absolute', top: '90px', left: '40px', pointerEvents: 'none', zIndex: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: '4px' }}>
            // 3D INTERACTIVE SYSTEM STATE // {currentStateInfo.state}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            {currentStateInfo.headline}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '420px', marginTop: '6px' }}>
            {currentStateInfo.subText}
          </p>
        </div>

        {/* Bottom Editorial Banner Overlay */}
        <div style={{ position: 'absolute', bottom: '30px', right: '40px', textAlign: 'right', pointerEvents: 'none', zIndex: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800, color: 'rgba(13, 13, 14, 0.15)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            {currentStateInfo.editorialText}
          </div>
        </div>

      </div>

    </section>
  );
}
