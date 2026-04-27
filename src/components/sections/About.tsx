import type { SiteProfile } from '@/types/profile';
import type { CommentItem } from '@/types/comment';
import Skills from './Skills';
import Comments from './Comments';

const boxes = [
  ['01', 'Financial Reporting'],
  ['02', 'Account Reconciliation'],
  ['03', 'Bookkeeping Support'],
  ['04', 'Administrative Accuracy']
] as const;

export default function About({
  profile,
  comments,
}: {
  profile: SiteProfile | null;
  comments: CommentItem[];
}) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-breadcrumb">ABOUT ME</p>
            <h2>About Me</h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-box-grid">
            {boxes.map(([num, title]) => (
              <div key={num} className="about-box card">
                <span>{num}</span>
                <h3>{title}</h3>
              </div>
            ))}
          </div>

          <div className="about-copy card">
            <p className="section-kicker">ABOUT ME</p>
            <p className="about-description">{profile?.aboutText}</p>

            <div className="about-details">
              <div><strong>Name</strong><span>{profile?.fullName}</span></div>
              <div><strong>Date of birth</strong><span>{profile?.birthDate}</span></div>
              <div><strong>Address</strong><span>{profile?.address}</span></div>
              <div><strong>Zip code</strong><span>{profile?.zipCode || ''}</span></div>
              <div><strong>Email</strong><span>{profile?.email}</span></div>
              <div><strong>Phone</strong><span>{profile?.phone}</span></div>
            </div>

            <div className="hero-actions">
              <a className="btn btn-primary" href="/api/profile?download=cv">
                DOWNLOAD CV
              </a>
            </div>
          </div>
        </div>

        <Skills />
        <Comments comments={comments} />
      </div>
    </section>
  );
}