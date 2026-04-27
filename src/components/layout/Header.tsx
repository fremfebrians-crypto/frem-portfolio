'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Experiences', '#experiences'],
  ['Works', '#works'],
  ['Blog', '#blog'],
  ['Contact', '#contact'],
] as const;

export default function Header({ logoText }: { logoText: string }) {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      setScrolled(currentY > 10);

      if (currentY <= 10) {
        setShowHeader(true);
      } else if (currentY > lastScrollY.current) {
        setShowHeader(false);
        setOpen(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`site-header ${showHeader ? 'is-visible' : 'is-hidden'} ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="container header-row">
        <Link href="#home" className="brand-link">
          <span className="brand-mark">FF</span>
          <span className="brand-text">{logoText}</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? '✕' : '☰'}</span>
        </button>

        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}

          <Link href="/admin/login" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}