'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { SunsetEvent } from '@/data/events';
import { isPastEvent } from '@/lib/dates';
import { EventCard } from '../EventCard';
import styles from './EventTimeline.module.css';

interface EventTimelineProps {
  events: SunsetEvent[];
  onSelectPastEvent?: (eventId: string) => void;
}

export function EventTimeline({ events, onSelectPastEvent }: EventTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayMarkerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Separate into past and upcoming based on event date
  const pastEvents = events.filter((e) => isPastEvent(e.date));
  const upcomingEvents = events.filter((e) => !isPastEvent(e.date));

  // Center or scroll slightly toward upcoming sessions on initial load
  useEffect(() => {
    if (todayMarkerRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const marker = todayMarkerRef.current;
      const targetScroll = marker.offsetLeft - container.clientWidth / 2 + marker.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }, []);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="timeline" ref={sectionRef} className={styles.section} aria-label="Sessions Timeline">
      <div className={styles.headerContainer}>
        <div className={styles.titleColumn}>
          <span className={styles.sectionBadge}>Timeline</span>
          <h2 className={styles.sectionTitle}>The Sessions</h2>
          <p className={styles.sectionSubtitle}>
            Every gathering from the opening session to what is coming next on the calendar.
          </p>
        </div>

        {/* Scroll Controls */}
        <div className={styles.controls} aria-hidden="true">
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => scrollByAmount('left')}
            aria-label="Scroll timeline backward"
          >
            &larr;
          </button>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => scrollByAmount('right')}
            aria-label="Scroll timeline forward"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Horizontal Strip */}
      <div className={styles.scrollWrapper}>
        <motion.div
          ref={scrollRef}
          className={styles.stripContainer}
          initial={{ opacity: 0, transform: 'translateY(16px)' }}
          animate={isInView ? { opacity: 1, transform: 'translateY(0px)' } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Past Events */}
          <div className={styles.eventsGroup}>
            {pastEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isPast={true}
                onSelectPastEvent={onSelectPastEvent}
              />
            ))}
          </div>

          {/* Today Divider Marker */}
          <div ref={todayMarkerRef} className={styles.todayMarker} role="separator" aria-label="Today Marker">
            <div className={styles.todayLine} />
            <div className={styles.todayBadge}>
              <span className={styles.todayDot} />
              <span className={styles.todayText}>Today</span>
            </div>
            <div className={styles.todayLine} />
          </div>

          {/* Upcoming Events */}
          <div className={styles.eventsGroup}>
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isPast={false}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
