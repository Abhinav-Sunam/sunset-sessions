import React from 'react';
import { getAllEvents } from '@/data/events';
import { isPastEvent } from '@/lib/dates';
import { Hero } from '@/components/Hero';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import { EventTimeline } from '@/components/EventTimeline';
import { Gallery } from '@/components/Gallery';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';

export default function HomePage() {
  const allEvents = getAllEvents();

  // Find upcoming events to feature
  const upcomingEvents = allEvents.filter((e) => !isPastEvent(e.date));
  const featuredEvent = upcomingEvents[0] || allEvents[allEvents.length - 1];

  return (
    <>
      <Hero featuredEvent={featuredEvent} />
      <UpcomingEvents events={upcomingEvents} />
      <EventTimeline events={allEvents} />
      <Gallery events={allEvents} limit={6} showViewMore={true} />
      <WhatsAppCTA />
    </>
  );
}
