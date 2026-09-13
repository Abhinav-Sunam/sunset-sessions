'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { SunsetEvent } from '@/data/events';
import { formatDateLong, formatDateShort } from '@/lib/dates';
import { TicketTiers } from '@/components/TicketTiers';
import { FaqAccordion, FaqItem } from '@/components/FaqAccordion';
import styles from './EventDetail.module.css';

interface EventDetailProps {
  event: SunsetEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const toneClass = styles[`tone_${event.tone}`] || styles.tone_gold;

  // Tailored FAQ items per event
  const faqItems: FaqItem[] = [
    {
      question: 'Entry & Timing',
      answer: `Doors open at ${event.time.replace(' onward', '')}. Carry a valid government photo ID. Wristbands will be issued at the desk for all-night re-entry.`
    },
    {
      question: 'Getting to the Venue',
      answer: `The session takes place at ${event.venue} in ${event.city}. Local shared cabs run from the central town point until late. Check the WhatsApp community channel to pool rides with fellow attendees.`
    },
    {
      question: 'Refund & Transfer Policy',
      answer: 'Tickets are non-refundable but fully transferable. If your plans change, message the team on WhatsApp at least 4 hours before doors to transfer your ticket to a friend.'
    },
    {
      question: 'Atmosphere & Dress Code',
      answer: 'Dress comfortably for hill weather as terrace temperatures drop after sundown. Respectful and considerate energy is expected from everyone on the floor.'
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Navigation Breadcrumb */}
        <div className={styles.navRow}>
          <Link href="/#timeline" className={styles.backButton}>
            <span className={styles.backArrow}>&larr;</span>
            <span>All Sessions</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Shared-Element Poster Hero */}
          <div className={styles.posterColumn}>
            <motion.div
              layoutId={`event-poster-${event.id}`}
              className={clsx(styles.posterCard, toneClass)}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            >
              {event.poster && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={event.poster}
                  alt={event.name}
                  className={styles.posterImg}
                />
              )}
              <div className={styles.posterSun} />
              <div className={styles.posterAura} />

              <div className={styles.posterContent}>
                <div className={styles.posterHeader}>
                  <span className={styles.dateBadge}>{formatDateShort(event.date)}</span>
                  <div className={styles.posterHeaderRight}>
                    {event.exclusive && (
                      <span className={styles.exclusiveBadge}>Members Only</span>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.png"
                      alt="Sunset Sessions"
                      className={styles.posterLogo}
                    />
                  </div>
                </div>

                <div className={styles.posterMiddle}>
                  <span className={styles.posterTitleText}>{event.name}</span>
                  <span className={styles.posterVenueText}>
                    {event.venue} &bull; {event.city}
                  </span>
                </div>

                <div className={styles.posterFooter}>
                  <span className={styles.posterTimeText}>{event.time}</span>
                </div>
              </div>
            </motion.div>

            {event.mapUrl && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <span>View venue location on Google Maps</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>

          {/* Right Column: Event Info, Ticketing, FAQ */}
          <div className={styles.infoColumn}>
            <div className={styles.headerBlock}>
              <div className={styles.tagGroup}>
                <span className={styles.cityBadge}>{event.city}</span>
              </div>

              <h1 className={styles.title}>{event.name}</h1>

              <div className={styles.factsList}>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>When</span>
                  <span className={styles.factValue}>{formatDateLong(event.date)}</span>
                  <span className={styles.factSub}>{event.time}</span>
                </div>

                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Where</span>
                  <span className={styles.factValue}>{event.venue}</span>
                  <span className={styles.factSub}>{event.city}</span>
                </div>
              </div>

              {event.blurb && (
                <p className={styles.blurb}>{event.blurb}</p>
              )}
            </div>

            {/* Ticket Tiers or Exclusive Invite Request */}
            <TicketTiers
              tiers={event.tiers}
              isExclusive={event.exclusive}
              eventName={event.name}
              eventDate={formatDateShort(event.date)}
            />

            {/* Event FAQ Accordion */}
            <div className={styles.sectionDivider} />

            <FaqAccordion items={faqItems} title="Session Information" />
          </div>
        </div>
      </div>
    </div>
  );
}
