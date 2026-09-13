'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { buildWhatsAppLink, buildGeneralInquiryMessage } from '@/server/whatsapp';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  currentRoute?: string;
}

export function SiteHeader({ currentRoute = 'home' }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waLink = buildWhatsAppLink(buildGeneralInquiryMessage());

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerScrolled]: isScrolled,
        [styles.headerNavOpen]: mobileNavOpen
      })}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink} onClick={() => setMobileNavOpen(false)} aria-label="Sunset Sessions Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Sunset Sessions"
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main Navigation">
          <Link
            href="/#upcoming"
            className={clsx(styles.navLink, { [styles.navLinkActive]: currentRoute === 'upcoming' })}
          >
            Upcoming
          </Link>
          <Link
            href="/#timeline"
            className={clsx(styles.navLink, { [styles.navLinkActive]: currentRoute === 'timeline' })}
          >
            Timeline
          </Link>
          <Link
            href="/gallery"
            className={clsx(styles.navLink, { [styles.navLinkActive]: currentRoute === 'gallery' })}
          >
            Gallery
          </Link>
          <Link
            href="/#contact"
            className={clsx(styles.navLink, { [styles.navLinkActive]: currentRoute === 'contact' })}
          >
            Contact
          </Link>
        </nav>

        <div className={styles.actions}>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Connect on WhatsApp"
          >
            Join WhatsApp
          </a>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-expanded={mobileNavOpen}
            aria-label="Toggle Navigation Menu"
          >
            <span className={clsx(styles.hamburgerLine, { [styles.lineTopOpen]: mobileNavOpen })} />
            <span className={clsx(styles.hamburgerLine, { [styles.lineBottomOpen]: mobileNavOpen })} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={clsx(styles.mobileMenu, { [styles.mobileMenuOpen]: mobileNavOpen })}
        aria-hidden={!mobileNavOpen}
      >
        <div className={styles.mobileMenuContent}>
          <Link
            href="/#upcoming"
            className={styles.mobileNavLink}
            onClick={() => setMobileNavOpen(false)}
          >
            Upcoming
          </Link>
          <Link
            href="/#timeline"
            className={styles.mobileNavLink}
            onClick={() => setMobileNavOpen(false)}
          >
            Timeline
          </Link>
          <Link
            href="/gallery"
            className={styles.mobileNavLink}
            onClick={() => setMobileNavOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="/#contact"
            className={styles.mobileNavLink}
            onClick={() => setMobileNavOpen(false)}
          >
            Contact
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCta}
            onClick={() => setMobileNavOpen(false)}
          >
            Connect on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
