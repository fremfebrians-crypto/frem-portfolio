const services = [
  ['Financial Reporting', 'Prepare daily and monthly financial reports, revenue summaries, and expense analysis.'],
  ['Cost Control', 'Monitor operational spending, verify documents, and support budget control processes.'],
  ['Reconciliation', 'Assist with bank reconciliation, invoice checking, and financial record accuracy.'],
  ['Excel & Data Analysis', 'Create reporting templates and analyze financial data using Excel tools.'],
  ['Budget Analysis', 'Support budget planning, monitor budget variance, and evaluate financial efficiency.'],
  ['Administrative Support', 'Manage financial documents, maintain filing accuracy, and support daily administrative tasks.']
] as const;

export default function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <div className="section-head center-text">
          <div>
            <p className="section-breadcrumb">SERVICES</p>
            <h2>What I Do?</h2>
          </div>
        </div>
        <div className="services-grid">
          {services.map(([title, text]) => (
            <article key={title} className="service-card card">
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
