import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SceneOrigin from './components/SceneOrigin';
import SceneSignal from './components/SceneSignal';
import ScenePath from './components/ScenePath';
import SceneTrace from './components/SceneTrace';
import SceneDestination from './components/SceneDestination';
import WorkspaceDrawer from './components/WorkspaceDrawer';
import './App.css';

export default function App() {
  const [activeScene, setActiveScene] = useState('origin');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sceneIds = ['origin', 'signal', 'path', 'trace', 'destination'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveScene(sceneIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="orbit-page-wrapper">
      {/* Navigation Header & Section Instrument Controls */}
      <Navigation 
        activeScene={activeScene}
        onSelectScene={setActiveScene}
        onOpenWorkspace={() => setIsWorkspaceOpen(true)}
      />

      {/* SCENE 01 — ORIGIN */}
      <SceneOrigin />

      {/* SCENE 02 — SIGNAL */}
      <SceneSignal />

      {/* SCENE 03 — PATH */}
      <ScenePath />

      {/* SCENE 04 — TRACE (INTERACTIVE PRODUCT MOMENT) */}
      <SceneTrace onOpenWorkspaceDrawer={() => setIsWorkspaceOpen(true)} />

      {/* SCENE 05 — DESTINATION & FOOTER */}
      <SceneDestination onOpenWorkspaceDrawer={() => setIsWorkspaceOpen(true)} />

      {/* INTERACTIVE DEMO WORKSPACE DRAWER OVERLAY */}
      <WorkspaceDrawer 
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
      />
    </div>
  );
}
