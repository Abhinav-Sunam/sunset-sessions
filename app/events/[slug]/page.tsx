import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllEvents, getEventById } from '@/data/events';
import { formatDateShort } from '@/lib/dates';
import { EventDetail } from '@/components/EventDetail';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventById(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Sunset Sessions',
    };
  }

  return {
    title: `${event.name} (${formatDateShort(event.date)}) | Sunset Sessions`,
    description: event.blurb || `${event.name} at ${event.venue}, ${event.city} on ${formatDateShort(event.date)}. Curated sounds from dusk onward.`,
    openGraph: {
      title: `${event.name} | Sunset Sessions`,
      description: event.blurb || `${event.name} at ${event.venue}, ${event.city}.`,
      type: 'website',
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventById(slug);

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
