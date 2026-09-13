'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { SunsetEvent } from '@/data/events';
import { formatDateShort, formatDateLong } from '@/lib/dates';
import styles from './EventCard.module.css';

interface EventCardProps {
  event: SunsetEvent;
  isPast: boolean;
  onSelectPastEvent?: (eventId: string) => void;
}

export function EventCard({ event, isPast, onSelectPastEvent }: EventCardProps) {
  const toneClass = styles[`tone_${event.tone}`] || styles.tone_gold;

  const cardContent = (
    <article
      className={clsx(styles.card, {
        [styles.cardPast]: isPast,
        [styles.cardUpcoming]: !isPast
      })}
    >
      {/* Poster / Tone Visual */}
      <div
        className={clsx(styles.posterContainer, toneClass)}
      >
        {event.poster && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.poster}
            alt={event.name}
            className={styles.posterImg}
            loading="lazy"
          />
        )}
        <div className={styles.posterSun} />
        <div className={styles.posterGradientLayer} />

        {/* Badges on Poster */}
        <div className={styles.posterHeader}>
          <div className={styles.posterHeaderLeft}>
            <span className={styles.dateBadge}>{formatDateShort(event.date)}</span>
            {event.exclusive && (
              <span className={styles.exclusiveBadge}>Members only</span>
            )}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Sunset Sessions"
            className={styles.posterLogo}
          />
        </div>

        <div className={styles.posterFooter}>
          <span className={styles.cityText}>{event.city}</span>
        </div>
      </div>

      {/* Solid White Metadata Bar */}
      <div className={styles.whiteBar}>
        <div className={styles.textGroup}>
          <h3 className={styles.eventName}>{event.name}</h3>
          <span className={styles.eventMeta}>
            {event.venue} &bull; {event.city} &bull; {event.time}
          </span>
        </div>
        <span className={styles.eventYear}>{event.date.split('-')[0]}</span>
      </div>
    </article>
  );

  if (isPast) {
    return (
      <button
        type="button"
        className={styles.cardButtonWrapper}
        onClick={() => {
          if (onSelectPastEvent) {
            onSelectPastEvent(event.id);
          } else {
            const el = document.getElementById('gallery');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label={`Open gallery for ${event.name}, ${formatDateLong(event.date)}`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      href={`/events/${event.id}`}
      className={styles.cardLinkWrapper}
      aria-label={`View details and tickets for ${event.name}, ${formatDateLong(event.date)}`}
    >
      {cardContent}
    </Link>
  );
}
