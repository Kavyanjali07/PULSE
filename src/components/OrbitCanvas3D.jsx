import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ORBIT_NODES } from '../data/orbitData';

export default function OrbitCanvas3D({ 
  scrollState = 0, 
  onSelectNode, 
  activeNodeId, 
  onOpenWorkspaceDrawer 
}) {
  const mountRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [nodeScreenPos, setNodeScreenPos] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // References for animation loop & callbacks
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const nodesMeshMapRef = useRef(new Map());
  const linesMapRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());

  // Store props in refs cleanly in useEffect to avoid render-phase mutation
  const scrollStateRef = useRef(scrollState);
  const activeNodeIdRef = useRef(activeNodeId);
  const hoveredNodeRef = useRef(hoveredNode);
  const onSelectNodeRef = useRef(onSelectNode);

  useEffect(() => {
    scrollStateRef.current = scrollState;
  }, [scrollState]);

  useEffect(() => {
    activeNodeIdRef.current = activeNodeId;
  }, [activeNodeId]);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  useEffect(() => {
    onSelectNodeRef.current = onSelectNode;
  }, [onSelectNode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 16);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff4500, 2, 20);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 5. CENTRAL ORBIT CORE
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Matte Core
    const innerMatteGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const innerMatteMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      roughness: 0.4,
      metalness: 0.8
    });
    const innerMatteCore = new THREE.Mesh(innerMatteGeo, innerMatteMat);
    coreGroup.add(innerMatteCore);

    // Outer Wireframe Orbital Core
    const outerWireGeo = new THREE.IcosahedronGeometry(2.5, 2);
    const outerWireMat = new THREE.MeshBasicMaterial({
      color: 0x55555a,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerWireCore = new THREE.Mesh(outerWireGeo, outerWireMat);
    coreGroup.add(outerWireCore);

    // Signal Core Pulse Ring
    const pulseRingGeo = new THREE.RingGeometry(2.8, 2.85, 64);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0xff4500,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pulseRing.rotation.x = Math.PI / 2;
    coreGroup.add(pulseRing);

    // Concentric Orbital Rings
    [5.0, 6.5, 8.0].forEach((r) => {
      const ringGeo = new THREE.RingGeometry(r, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd6d3c9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    });

    // 6. ATMOSPHERIC PARTICLE DUST FIELD
    const particleCount = isMobile ? 120 : 300;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 30;
      particlePos[i + 1] = (Math.random() - 0.5) * 20;
      particlePos[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x85858a,
      size: 0.08,
      transparent: true,
      opacity: 0.5
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. ORBITING SOURCE NODES & CONNECTION LINES
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);
    nodesMeshMapRef.current.clear();
    linesMapRef.current = [];

    ORBIT_NODES.forEach((nodeData) => {
      const nodeObjGroup = new THREE.Group();

      // Node Sphere
      const sphereGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: nodeData.badgeClass === 'accent' ? 0xff4500 : 0x0d0d0e,
        roughness: 0.3,
        metalness: 0.6
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { id: nodeData.id, label: nodeData.label, nodeData };
      nodeObjGroup.add(sphereMesh);

      // Node Signal Halo Ring
      const haloGeo = new THREE.RingGeometry(0.5, 0.54, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xff4500,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.name = 'halo';
      nodeObjGroup.add(haloMesh);

      // Set initial 3D orbital position
      const x = Math.cos(nodeData.orbitAngle) * nodeData.orbitRadius;
      const z = Math.sin(nodeData.orbitAngle) * nodeData.orbitRadius;
      const y = nodeData.heightY;
      nodeObjGroup.position.set(x, y, z);

      nodesGroup.add(nodeObjGroup);
      nodesMeshMapRef.current.set(nodeData.id, {
        group: nodeObjGroup,
        mesh: sphereMesh,
        halo: haloMesh,
        baseAngle: nodeData.orbitAngle,
        radius: nodeData.orbitRadius,
        baseY: nodeData.heightY,
        data: nodeData
      });

      // Line to central core
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xd6d3c9,
        transparent: true,
        opacity: 0.3
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      scene.add(lineMesh);
      linesMapRef.current.push({ sourceId: nodeData.id, lineMesh, lineMat, lineGeo });
    });

    // Mouse Move Event Listener for Parallax & Raycasting
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      mouseRef.current.targetX = x * 1.2;
      mouseRef.current.targetY = y * 0.8;

      pointerRef.current.x = x;
      pointerRef.current.y = y;
    };

    const handleClick = () => {
      if (hoveredNodeRef.current) {
        onSelectNodeRef.current(hoveredNodeRef.current.id);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // 8. ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate Central Core
      outerWireCore.rotation.y = elapsedTime * 0.15;
      outerWireCore.rotation.x = elapsedTime * 0.08;
      innerMatteCore.rotation.y = -elapsedTime * 0.1;
      pulseRing.rotation.z = elapsedTime * 0.2;

      // Rotate Atmospheric Particles
      particleSystem.rotation.y = elapsedTime * 0.02;

      // Orbit Source Nodes
      nodesMeshMapRef.current.forEach((nodeItem) => {
        const currentAngle = nodeItem.baseAngle + elapsedTime * 0.05;
        const x = Math.cos(currentAngle) * nodeItem.radius;
        const z = Math.sin(currentAngle) * nodeItem.radius;
        const y = nodeItem.baseY + Math.sin(elapsedTime * 0.5 + nodeItem.baseAngle) * 0.2;

        nodeItem.group.position.set(x, y, z);
        nodeItem.halo.lookAt(camera.position);

        // Update connected line position
        const lineObj = linesMapRef.current.find(l => l.sourceId === nodeItem.data.id);
        if (lineObj) {
          const positions = lineObj.lineGeo.attributes.position.array;
          positions[3] = x;
          positions[4] = y;
          positions[5] = z;
          lineObj.lineGeo.attributes.position.needsUpdate = true;
        }
      });

      // Raycasting for node hover selection
      raycasterRef.current.setFromCamera(pointerRef.current, camera);
      const nodeMeshes = Array.from(nodesMeshMapRef.current.values()).map(n => n.mesh);
      const intersects = raycasterRef.current.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const hitId = hitMesh.userData.id;

        if (hoveredNodeRef.current?.id !== hitId) {
          const nodeData = ORBIT_NODES.find(n => n.id === hitId);
          setHoveredNode(nodeData);
        }
      } else if (hoveredNodeRef.current && !activeNodeIdRef.current) {
        setHoveredNode(null);
      }

      // Update Node Visual Highlight States
      nodesMeshMapRef.current.forEach((nodeItem, id) => {
        const isHoveredOrActive = (hoveredNodeRef.current?.id === id) || (activeNodeIdRef.current === id);

        if (isHoveredOrActive) {
          nodeItem.mesh.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.1);
          nodeItem.mesh.material.color.setHex(0xff4500);
          nodeItem.halo.material.opacity = 0.8;
        } else {
          nodeItem.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          nodeItem.mesh.material.color.setHex(nodeItem.data.badgeClass === 'accent' ? 0xff4500 : 0x0d0d0e);
          nodeItem.halo.material.opacity = 0;
        }

        // Highlight connected line
        const lineObj = linesMapRef.current.find(l => l.sourceId === id);
        if (lineObj) {
          if (isHoveredOrActive) {
            lineObj.lineMat.color.setHex(0xff4500);
            lineObj.lineMat.opacity = 0.9;
          } else {
            lineObj.lineMat.color.setHex(0xd6d3c9);
            lineObj.lineMat.opacity = 0.25;
          }
        }
      });

      // Calculate 2D Screen Projection for active/hovered node
      const currentSelected = hoveredNodeRef.current || ORBIT_NODES.find(n => n.id === activeNodeIdRef.current);
      if (currentSelected) {
        const targetNodeItem = nodesMeshMapRef.current.get(currentSelected.id);
        if (targetNodeItem) {
          const worldVec = new THREE.Vector3();
          targetNodeItem.group.getWorldPosition(worldVec);
          worldVec.project(camera);

          const screenX = ((worldVec.x + 1) * container.clientWidth) / 2;
          const screenY = ((-worldVec.y + 1) * container.clientHeight) / 2;

          setNodeScreenPos({ x: screenX, y: screenY });
        }
      }

      // Camera Scroll State Blending & Position Interpolation
      const targetCamPos = new THREE.Vector3(0, 4, 16);
      const targetLookAt = new THREE.Vector3(0, 0, 0);
      const currentScrollState = scrollStateRef.current;

      if (currentScrollState === 0) { // DISCOVER
        targetCamPos.set(0, 4 + mouseRef.current.y * 2, 16 + mouseRef.current.x * 2);
      } else if (currentScrollState === 1) { // DETECT
        targetCamPos.set(2, 2.5, 11);
        targetLookAt.set(1.5, -0.5, 2);
      } else if (currentScrollState === 2) { // CONNECT
        targetCamPos.set(-3, 3.5, 12);
        targetLookAt.set(0, 0, 0);
      } else if (currentScrollState === 3) { // TRACE
        targetCamPos.set(0, 1.5, 9.5);
        targetLookAt.set(0, 0.5, 0);
      } else if (currentScrollState === 4) { // UNDERSTAND
        targetCamPos.set(0, 5, 15);
        targetLookAt.set(0, 0, 0);
      }

      // Smooth camera position & orientation transition
      camera.position.lerp(targetCamPos, 0.04);
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResizeWindow = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResizeWindow);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMobile]);

  const activeData = hoveredNode || ORBIT_NODES.find(n => n.id === activeNodeId) || ORBIT_NODES[0];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px' }}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />

      {/* 2D Projected Spatial Information Card */}
      {activeData && nodeScreenPos.x !== undefined && (
        <div
          className="integrated-info-panel"
          style={
            isMobile
              ? { position: 'fixed', bottom: '16px', left: '16px', right: '16px', width: 'auto' }
              : {
                  position: 'absolute',
                  top: `${Math.min(Math.max(nodeScreenPos.y - 120, 20), 320)}px`,
                  left: nodeScreenPos.x > 500 
                    ? `${Math.max(nodeScreenPos.x - 340, 20)}px` 
                    : `${Math.min(nodeScreenPos.x + 20, 680)}px`,
                  pointerEvents: 'auto',
                  transition: 'top 0.1s ease-out, left 0.1s ease-out'
                }
          }
          id="orbit-3d-node-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.12em' }}>
              {activeData.nodeId}
            </span>
            <span className={`status-badge ${activeData.badgeClass}`}>
              {activeData.status}
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '2px' }}>
            {activeData.label}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            URL: {activeData.url}
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '8px 0', margin: '8px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>TYPE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-primary)' }}>{activeData.type}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>LAST SNAPSHOT</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>{activeData.lastChange}</div>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
            "{activeData.notes}"
          </p>

          <button
            onClick={onOpenWorkspaceDrawer}
            className="btn-orbit-secondary"
            style={{ width: '100%', justifyContent: 'space-between', padding: '6px 12px', fontSize: '11px' }}
            id="orbit-3d-trace-btn"
          >
            <span>TRACE CHANGE →</span>
          </button>
        </div>
      )}

      {/* Subtle Canvas Interaction Helper Label */}
      <div style={{ position: 'absolute', bottom: '16px', left: '24px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', pointerEvents: 'none' }}>
        * HOVER & CLICK 3D SOURCE NODES TO REORIENT CAMERA & TRACE SNAPSHOTS
      </div>
    </div>
  );
}
