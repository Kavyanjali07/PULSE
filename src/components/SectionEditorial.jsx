import React from 'react';

export default function SectionEditorial() {
  const typographicStates = [
    {
      num: '01',
      title: 'APPLY',
      desc: 'Instantly plot every application node into the active constellation vector.'
    },
    {
      num: '02',
      title: 'INTERVIEW',
      desc: 'Trace technical loops, onsite rounds, and upcoming schedule milestones.'
    },
    {
      num: '03',
      title: 'FOLLOW UP',
      desc: 'Automated trajectory alerts ensure no email or recruiter message goes dark.'
    }
  ];

  return (
    <section className="section-editorial-message" id="product-editorial">
      {/* Left Column: Stacked Giant Editorial Typography */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.16em',
          color: 'var(--accent)',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          // SYSTEM ADVANTAGE
        </div>

        <h2 className="editorial-giant-heading">
          SEE<br />
          WHAT<br />
          NEEDS<br />
          YOUR<br />
          <span style={{ color: 'var(--accent)' }}>ATTENTION.</span>
        </h2>
      </div>

      {/* Right Column: Copy & Typographic States (No cards!) */}
      <div className="editorial-right-col">
        <p className="editorial-copy">
          "Pulse turns a scattered job search into a clear next move."
        </p>

        <div className="typographic-states-list">
          {typographicStates.map((st) => (
            <div key={st.num} className="typographic-state-row">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span className="state-num">{st.num} /</span>
                <span className="state-name">{st.title}</span>
              </div>
              <div className="state-desc">{st.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
