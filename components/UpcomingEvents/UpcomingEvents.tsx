import React from 'react';
import { SunsetEvent } from '@/data/events';
import { EventCard } from '@/components/EventCard';
import styles from './UpcomingEvents.module.css';

interface UpcomingEventsProps {
  events: SunsetEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section id="upcoming" className={styles.section} aria-label="Upcoming Sessions">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Upcoming</span>
          <h2 className={styles.title}>Book Next Sessions</h2>
          <p className={styles.subtitle}>
            Select a session below to view tickets, venue details, and reserve your entry.
          </p>
        </div>

        <div className={styles.cardsRow}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} isPast={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
