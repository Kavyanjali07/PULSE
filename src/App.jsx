import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SceneHero from './components/SceneHero';
import SceneWhatIsOrbit from './components/SceneWhatIsOrbit';
import SceneStory3DContainer from './components/SceneStory3DContainer';
import SceneDestination from './components/SceneDestination';
import WorkspaceDrawer from './components/WorkspaceDrawer';
import './App.css';

export default function App() {
  const [activeScene, setActiveScene] = useState('discover');
  const [activeNodeId, setActiveNodeId] = useState('api');
  const [activeConcept, setActiveConcept] = useState(0);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sceneIds = ['discover', 'understand', 'trace', 'explore'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveScene(sceneIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectConcept = (index) => {
    setActiveConcept(index);
    const nodeMap = ['documentation', 'api', 'product'];
    setActiveNodeId(nodeMap[index] || 'api');

    const el = document.getElementById('discover-3d-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('what-is-orbit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="orbit-page-wrapper" id="discover">
      {/* Navigation Header & 4 Instrument Controls */}
      <Navigation 
        activeScene={activeScene}
        onSelectScene={setActiveScene}
        onOpenWorkspace={() => setIsWorkspaceOpen(true)}
      />

      {/* HERO — UNAMBIGUOUS PRODUCT CLARITY */}
      <SceneHero 
        onOpenWorkspace={() => setIsWorkspaceOpen(true)}
        onScrollToHowItWorks={handleScrollToHowItWorks}
      />

      {/* MANDATORY "WHAT IS ORBIT?" SECTION */}
      <div id="understand">
        <SceneWhatIsOrbit 
          activeConcept={activeConcept}
          onSelectConcept={handleSelectConcept}
          onOpenWorkspace={() => setIsWorkspaceOpen(true)}
        />
      </div>

      {/* PERSISTENT 3D SCROLL STORYWORLD (5 SCROLL STATES) */}
      <div id="trace">
        <SceneStory3DContainer 
          activeNodeId={activeNodeId}
          onSelectNode={setActiveNodeId}
          onOpenWorkspaceDrawer={() => setIsWorkspaceOpen(true)}
        />
      </div>

      {/* SCENE 05 — UNDERSTAND & DESTINATION */}
      <SceneDestination 
        onOpenWorkspaceDrawer={() => setIsWorkspaceOpen(true)}
      />

      {/* DEMO WORKSPACE INSPECTOR DRAWER OVERLAY */}
      <WorkspaceDrawer 
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
      />
    </div>
  );
}
