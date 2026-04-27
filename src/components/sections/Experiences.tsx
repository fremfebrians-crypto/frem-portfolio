 const experiences = [
  {
    date: 'February 2025 – Present',
    title: 'General Accounting',
    company: 'Nakula Management',
    summary:
      'Responsible for financial reporting, expense monitoring, and supporting daily accounting operations.',
    points: [
      'Prepare daily and monthly financial reports',
      'Analyze revenue and expenses',
      'Monitor operational costs against budget',
      'Verify invoices, reimbursements, and supporting documents',
      'Coordinate with operational teams for financial compliance',
    ],
  },
  {
    date: 'July 2024 – February 2025',
    title: 'Accounting Clerk (Daily Worker)',
    company: 'Nihi Sumba',
    summary:
      'Supported daily accounting processes, receivables monitoring, and documentation control.',
    points: [
      'Assisted in daily accounting operations',
      'Managed accounts receivable and outstanding balances',
      'Supported supplier payment preparation',
      'Assisted in bank reconciliation',
      'Maintained financial documentation and filing system',
    ],
  },
  {
    date: 'August 2023 – February 2024',
    title: 'Purchasing Trainee',
    company: 'Alila Villa Uluwatu',
    summary:
      'Supported purchasing activities, vendor coordination, and procurement documentation.',
    points: [
      'Assisted PR and PO processing',
      'Monitored supplier pricing and vendor comparisons',
      'Coordinated deliveries and vendor documents',
      'Supported procurement and cost control reporting',
    ],
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="section">
      <div className="container">
        <div className="section-head center-text">
          <div>
            <p className="section-breadcrumb">EXPERIENCES</p>
            <h2>Experiences</h2>
          </div>
        </div>

        <div className="experiences-grid">
          {experiences.map((item) => (
            <article key={item.title} className="experience-card card">
              <p className="section-kicker">{item.date}</p>
              <h3>{item.title}</h3>
              <strong className="experience-company">{item.company}</strong>
              <p>{item.summary}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}