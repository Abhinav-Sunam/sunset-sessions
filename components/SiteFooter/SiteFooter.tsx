'use client';

import React from 'react';
import Link from 'next/link';
import { buildWhatsAppLink, buildGeneralInquiryMessage } from '@/server/whatsapp';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const waLink = buildWhatsAppLink(buildGeneralInquiryMessage());

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Cursor-aware radial ripple handler identical to Zuro & Blush Studio */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <footer className={styles.footer} id="footer" aria-label="Site Footer">
      <div className={styles.footerInner}>
        {/* ── Top Center Logo ── */}
        <div className={styles.topLogoContainer}>
          <Link href="/" className={styles.logoLink} aria-label="Sunset Sessions Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Sunset Sessions"
              className={styles.footerLogoMark}
            />
          </Link>
        </div>

        {/* ── Main Footer Grid Layout (Zuro & Blush Studio Architecture) ── */}
        <div className={styles.mainGrid}>
          {/* Left Column: Big Display Headline & Radial Interactive CTA Button */}
          <div className={styles.leftCol}>
            <h2 className={styles.headline}>
              Golden hour sounds <br />
              <span className={styles.accentText}>from dusk onward.</span>
            </h2>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              onMouseEnter={handleMouseMove}
              onMouseMove={handleMouseMove}
            >
              <span>Join Circle on WhatsApp</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right Column: 2 Clean Link Columns */}
          <div className={styles.rightGrid}>
            {/* Link Column 1: Navigation */}
            <div className={styles.linkCol}>
              <span className={styles.colTitle}>Navigation</span>
              <Link href="/#upcoming" className={styles.linkItem}>
                Upcoming Sessions
              </Link>
              <Link href="/#timeline" className={styles.linkItem}>
                Chronicles Timeline
              </Link>
              <Link href="/gallery" className={styles.linkItem}>
                Archive Gallery
              </Link>
              <Link href="/events/dasailing-26" className={styles.linkItem}>
                Next Gathering Passes
              </Link>
            </div>

            {/* Link Column 2: Connect */}
            <div className={styles.linkCol}>
              <span className={styles.colTitle}>Connect</span>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                WhatsApp Community
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                Host or Collaborate
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                Instagram
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                className={styles.backToTopItem}
              >
                Back to Top &uarr;
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Meta Row ── */}
        <div className={styles.bottomBar}>
          <span className={styles.copyText}>
            &copy; {new Date().getFullYear()} Sunset Sessions. Darjeeling &bull; Gangtok.
          </span>

          <div className={styles.developerCredit}>
            <span>Developed by</span>
            <a
              href="https://zuro.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.zuroButton}
              title="Visit Zuro Dev"
              onMouseEnter={handleMouseMove}
              onMouseMove={handleMouseMove}
            >
              <span>zuro.dev</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
