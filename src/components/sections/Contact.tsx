import type { SiteProfile } from '@/types/profile';

export default function Contact({ profile }: { profile: SiteProfile | null }) {
  const email = profile?.email || 'fremfebrians@gmail.com';
  const phone = profile?.phone || '085857538258';
  const linkedin =
    profile?.linkedinUrl || 'linkedin.com/in/frem-pebrianta-tarigan-037940278';
  const base =
    profile?.baseLocation || 'Jimbaran, Kuta Selatan, Badung, Bali, Indonesia';

  return (
    <section id="contact" className="contact-pro section">
      <div className="container">
        <div className="contact-pro-grid">
          <div className="contact-pro-left">
            <p className="contact-pro-kicker">CONTACT</p>

            <h2 className="contact-pro-title">
              Open to Cost Control,
              <br />
              Bookkeeping, and General
              <br />
              Accounting opportunities
            </h2>

            <p className="contact-pro-description">
              Currently open to work for roles related to cost control,
              bookkeeping, general accounting, reporting support, and
              reconciliation in hospitality or broader business operations.
            </p>

            <div className="contact-pro-actions">
              <a className="btn btn-primary" href={`mailto:${email}`}>
                Send email
              </a>

              <a
                className="btn btn-secondary"
                href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-pro-right">
            <div className="contact-pro-card">
              <span>EMAIL</span>
              <p>{email}</p>
            </div>

            <div className="contact-pro-card">
              <span>WHATSAPP</span>
              <p>{phone}</p>
            </div>

            <div className="contact-pro-card">
              <span>LINKEDIN</span>
              <p>{linkedin}</p>
            </div>

            <div className="contact-pro-card">
              <span>BASE</span>
              <p>{base}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}