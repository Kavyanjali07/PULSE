import React from 'react';

export default function EditorialSection() {
  const steps = [
    {
      num: '01',
      title: 'APPLY',
      copy: 'Get the application into the map.',
      detail: 'Every application instantly forms a node and calculates your next follow-up trajectory.'
    },
    {
      num: '02',
      title: 'MOVE',
      copy: 'Know exactly what needs attention.',
      detail: 'Visual line paths illuminate active interviews, upcoming loops, and overdue recruiter follow-ups.'
    },
    {
      num: '03',
      title: 'ADVANCE',
      copy: 'Never lose track of the next step.',
      detail: 'Turn scattered job posts into a unified vector towards your ultimate career offer.'
    }
  ];

  return (
    <section className="light-editorial-section" id="how-it-works">
      <div className="light-section-inner">
        <div className="light-section-meta">
          <span>// OPERATIONAL METHODOLOGY</span>
          <span style={{ color: 'var(--border-light-strong)' }}>—</span>
          <span>SYSTEM ARCHITECTURE</span>
        </div>

        <h2 className="light-section-heading">
          See the next move.
        </h2>

        {/* Vertical Editorial Progression List (No generic cards!) */}
        <div className="editorial-progression-list">
          {steps.map((step) => (
            <div key={step.num} className="progression-item">
              <div className="progression-index">{step.num}</div>
              
              <div className="progression-title">
                <span>{step.title}</span>
                <span style={{ fontSize: '20px', color: 'var(--text-light-muted)' }}>—</span>
              </div>

              <div>
                <div className="progression-desc">{step.copy}</div>
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '13px', 
                  color: 'var(--text-light-muted)', 
                  marginTop: '8px',
                  lineHeight: '1.4' 
                }}>
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
