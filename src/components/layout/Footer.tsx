import type { SiteProfile } from '@/types/profile';

export default function Footer({ profile }: { profile: SiteProfile | null }) {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>{profile?.fullName || 'Frem Pebrianta Tarigan'}</p>
        <p>General Accounting Portfolio</p>
      </div>
    </footer>
  );
}
