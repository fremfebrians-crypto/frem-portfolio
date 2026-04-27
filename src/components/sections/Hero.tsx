'use client';

import { useEffect, useRef, useState } from 'react';
import type { SiteProfile } from '@/types/profile';

export default function Hero({ profile }: { profile: SiteProfile | null }) {
  const [animSeed, setAnimSeed] = useState(0);
  const hasLeftTop = useRef(false);

  useEffect(() => {
    const start = setTimeout(() => {
      setAnimSeed((v) => v + 1);
    }, 120);

    function handleScroll() {
      const y = window.scrollY;

      if (y > 140) {
        hasLeftTop.current = true;
      }

      if (y <= 40 && hasLeftTop.current) {
        setAnimSeed((v) => v + 1);
        hasLeftTop.current = false;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(start);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const heroPhoto = profile?.heroPhotoPath
  ? profile.heroPhotoPath.startsWith('/images/')
    ? profile.heroPhotoPath
    : `/api/profile?asset=${encodeURIComponent(profile.heroPhotoPath)}`
  : '/images/hero/frem-hero.png';

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div key={`hero-left-${animSeed}`} className="hero-left hero-anim-left">
          <p className="hero-tagline">{profile?.tagline || 'GENERAL ACCOUNTING'}</p>

          <h1 className="hero-title">
            {profile?.heroTitle1 || 'Frem Pebrianta'}
            <br />
            {profile?.heroTitle2 || 'Tarigan'}
          </h1>

          <div className="hero-actions">
            <a href="#about" className="btn btn-primary">
              MORE ABOUT ME
            </a>
            <a href="#contact" className="btn btn-secondary">
              HIRE ME
            </a>
          </div>
        </div>

        <div key={`hero-right-${animSeed}`} className="hero-right hero-anim-right">
          <div className="hero-photo-wrap">
            <img
              src={heroPhoto}
              alt={profile?.fullName || 'Hero'}
              className="hero-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}