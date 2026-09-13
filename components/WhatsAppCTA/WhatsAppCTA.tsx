'use client';

import React from 'react';
import { buildWhatsAppLink, buildGeneralInquiryMessage } from '@/server/whatsapp';
import styles from './WhatsAppCTA.module.css';

interface WhatsAppCTAProps {
  showSection?: boolean;
}

export function WhatsAppCTA({ showSection = true }: WhatsAppCTAProps) {
  const waLink = buildWhatsAppLink(buildGeneralInquiryMessage());

  if (!showSection) return null;

  return (
    <section id="contact" className={styles.section} aria-label="Community WhatsApp Section">
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Full Sunset GIF Background */}
          <div className={styles.gifBackgroundWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/sunset-hero.gif"
              alt=""
              aria-hidden="true"
              className={styles.sunsetGifBg}
            />
            <div className={styles.gifOverlay} />
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.badge}>Community</span>
              <h2 className={styles.title}>Join the Circle</h2>
              <p className={styles.description}>
                Session drops, secret terrace locations, and early ticket allocations go to the WhatsApp channel first. No spam, only session bulletins.
              </p>
            </div>

            <div className={styles.actionGroup}>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                Join Us on WhatsApp
              </a>
              <span className={styles.disclaimer}>
                Darjeeling &bull; Gangtok community bulletins
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
