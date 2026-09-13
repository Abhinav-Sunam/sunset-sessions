import React from 'react';
import type { Metadata } from 'next';
import { getAllEvents } from '@/data/events';
import { Gallery } from '@/components/Gallery';

export const metadata: Metadata = {
  title: 'Archive Gallery | Sunset Sessions',
  description: 'Unfiltered moments, golden hour terrace sets, and hillside memories from past Sunset Sessions in Darjeeling and Gangtok.',
  openGraph: {
    title: 'Archive Gallery | Sunset Sessions',
    description: 'Explore the full visual archive from past Sunset Sessions gatherings.',
    url: 'https://sunsetsessions.in/gallery',
    type: 'website',
  },
};

export default function GalleryPage() {
  const allEvents = getAllEvents();

  return (
    <div style={{ paddingTop: 'calc(var(--space-16) + 20px)' }}>
      <Gallery
        events={allEvents}
        isArchivePage={true}
      />
    </div>
  );
}
