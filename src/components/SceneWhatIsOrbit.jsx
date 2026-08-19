import React from 'react';

export default function SceneWhatIsOrbit({ activeConcept, onSelectConcept, onOpenWorkspace }) {
  const concepts = [
    {
      num: '01',
      title: 'OBSERVE',
      desc: 'Monitor configured sources at scheduled intervals and generate immutable versioned snapshots.',
      actionLabel: 'HIGHLIGHT SOURCE NODES'
    },
    {
      num: '02',
      title: 'DETECT',
      desc: 'Compare incoming snapshots against previous verified states to isolate semantic field differentials.',
      actionLabel: 'HIGHLIGHT CHANGED NODE'
    },
    {
      num: '03',
      title: 'TRACE',
      desc: 'Follow structural relationships and dependency vectors across sources to understand downstream impact.',
      actionLabel: 'HIGHLIGHT CONNECTION PATH'
    }
  ];

  return (
    <section className="scene-path paper-grid-bg" id="what-is-orbit" style={{ minHeight: '80vh', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: '16px' }}>
          // PRODUCT CLARITY SYSTEM
        </div>

        <h2 className="scene-path-heading" style={{ marginBottom: '16px' }}>
          WHAT IS <span style={{ color: 'var(--accent)' }}>ORBIT?</span>
        </h2>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '22px', color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '48px', lineHeight: '1.4' }}>
          "A system for observing change across connected information sources."
        </p>

        {/* 3 Interactive Concepts linked to 3D World */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {concepts.map((concept, index) => {
            const isSelected = activeConcept === index;
            return (
              <div 
                key={concept.num}
                onClick={() => onSelectConcept(index)}
                style={{
                  background: isSelected ? 'var(--accent-dim)' : 'var(--bg-surface)',
                  border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  padding: '28px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
                id={`concept-card-${index}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', fontWeight: 700 }}>
                    {concept.num} /
                  </span>
                  <span className={`status-badge ${isSelected ? 'accent' : 'muted'}`} style={{ fontSize: '9px' }}>
                    {concept.actionLabel}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {concept.title}
                </h3>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                  {concept.desc}
                </p>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: isSelected ? 'var(--accent)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{isSelected ? 'ACTIVE 3D PERSPECTIVE' : 'CLICK TO REORIENT 3D WORLD →'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Ingestion Resilience Note */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.1em' }}>RESILIENT INGESTION PIPELINE MODEL</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              SOURCE → FETCH → SNAPSHOT → COMPARE → CHANGE → RELATIONSHIP → ORBIT
            </div>
          </div>

          <button onClick={onOpenWorkspace} className="btn-orbit-secondary" style={{ padding: '8px 16px', fontSize: '11px' }}>
            INSPECT DEMO PIPELINE →
          </button>
        </div>

      </div>
    </section>
  );
}
