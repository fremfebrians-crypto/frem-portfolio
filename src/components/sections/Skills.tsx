const skills = [
  ['Financial Reporting', 95],
  ['Data Entry Accuracy', 95],
  ['General Administration', 92],
  ['Microsoft Excel', 90],
  ['Account Reconciliation', 90],
  ['Cost Controlling', 90],
  ['Document Management', 90],
  ['Bookkeeping', 88],
  ['Accounts Payable/Receivable', 85]
] as const;

export default function Skills() {
  return (
    <div className="skills-block">
      <div className="section-head compact-head">
        <div>
          <p className="section-kicker">SKILLS</p>
          <h3>My Skills</h3>
        </div>
      </div>
      <div className="skills-grid">
        {skills.map(([label, value]) => (
          <div key={label} className="skill-item">
            <div className="skill-meta"><span>{label}</span><strong>{value}%</strong></div>
            <div className="skill-bar"><span style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
