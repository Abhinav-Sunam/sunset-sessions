'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { SunsetEvent } from '@/data/events';
import { formatDateShort } from '@/lib/dates';
import { buildWhatsAppLink, buildGeneralInquiryMessage } from '@/server/whatsapp';
import styles from './Hero.module.css';

interface HeroProps {
  featuredEvent?: SunsetEvent;
}

export function Hero({ featuredEvent }: HeroProps) {
  const waLink = buildWhatsAppLink(buildGeneralInquiryMessage());

  // Apple-grade critically damped spring configuration
  const springConfig = {
    type: 'spring' as const,
    bounce: 0,
    duration: 0.6
  };

  return (
    <section className={styles.hero} aria-label="Sunset Sessions Hero">
      {/* Background Visual Container */}
      <div className={styles.visualWrapper}>
        <motion.div
          className={styles.visualMediaContainer}
          initial={{ opacity: 0, transform: 'scale(0.98)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Sized by height on desktop, width on mobile */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/sunset-hero.gif"
            alt="Sunset Sessions ambient horizon"
            className={styles.sunsetGif}
          />
        </motion.div>
        {/* Soft bottom legibility gradient without dulling the sun */}
        <div className={styles.legibilityGradient} />
      </div>

      {/* Hero Content Stack */}
      <div className={styles.contentContainer}>
        <div className={styles.contentStack}>
          {/* Staged entrance 1: Pure editorial eyebrow (no pills) */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(14px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...springConfig, delay: 0.12 }}
            className={styles.eyebrowWrapper}
          >


          </motion.div>

          {/* Staged entrance 2: Display Title */}
          <motion.h1
            initial={{ opacity: 0, transform: 'translateY(18px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...springConfig, delay: 0.22 }}
            className={styles.title}
          >
            Sunset Sessions
          </motion.h1>

          {/* Staged entrance 3: Subtitle / Ethos */}
          <motion.p
            initial={{ opacity: 0, transform: 'translateY(14px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...springConfig, delay: 0.32 }}
            className={styles.subtitle}
          >
            Intimate music gatherings across the hills. Curated sounds, golden hour terrace sets, and good company from dusk onward.
          </motion.p>

          {/* Staged entrance 4: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ ...springConfig, delay: 0.42 }}
            className={styles.buttonGroup}
          >
            <Link href="#upcoming" className={styles.primaryButton}>
              Book Upcoming Sessions
            </Link>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              Get Community Updates
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
