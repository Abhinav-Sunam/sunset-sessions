'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { SunsetEvent, MediaItem } from '@/data/events';
import styles from './Gallery.module.css';

interface GalleryProps {
  events: SunsetEvent[];
  selectedEventId?: string | null;
  limit?: number;
  showViewMore?: boolean;
  isArchivePage?: boolean;
}

type FilterCategory = 'all' | 'golden-hour' | 'night' | 'crowd';

interface EnrichedMediaItem extends MediaItem {
  id: string;
  eventName: string;
  eventDate: string;
  category: 'golden-hour' | 'night' | 'crowd';
  accentGradient: string;
}

export function Gallery({
  events,
  selectedEventId,
  limit,
  showViewMore,
  isArchivePage
}: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeModalItem, setActiveModalItem] = useState<EnrichedMediaItem | null>(null);

  // Compile all past event media items
  const allMedia = useMemo(() => {
    const list: EnrichedMediaItem[] = [];
    let counter = 0;

    const targetEvents = selectedEventId
      ? events.filter((e) => e.id === selectedEventId)
      : events;

    targetEvents.forEach((ev) => {
      if (!ev.media) return;
      ev.media.forEach((item, idx) => {
        counter++;
        // Categorize based on caption keywords
        const captionLower = item.caption.toLowerCase();
        let cat: 'golden-hour' | 'night' | 'crowd' = 'golden-hour';
        if (captionLower.includes('night') || captionLower.includes('closing') || captionLower.includes('drop') || captionLower.includes('encore') || captionLower.includes('after')) {
          cat = 'night';
        } else if (captionLower.includes('crowd') || captionLower.includes('floor') || captionLower.includes('fits') || captionLower.includes('crew')) {
          cat = 'crowd';
        }

        // Distinct atmospheric dusk & warm gradients for media placeholders
        const hue1 = (counter * 37) % 360;
        const hue2 = (hue1 + 40) % 360;
        const gradient = `linear-gradient(135deg, hsl(${hue1}, 65%, 22%), hsl(${hue2}, 70%, 12%))`;

        list.push({
          ...item,
          id: `${ev.id}-media-${idx}`,
          eventName: ev.name,
          eventDate: ev.date,
          category: cat,
          accentGradient: gradient
        });
      });
    });

    return list;
  }, [events, selectedEventId]);

  const filteredMedia = useMemo(() => {
    if (activeFilter === 'all') return allMedia;
    return allMedia.filter((item) => item.category === activeFilter);
  }, [allMedia, activeFilter]);

  const displayedMedia = useMemo(() => {
    if (limit && limit > 0) {
      return filteredMedia.slice(0, limit);
    }
    return filteredMedia;
  }, [filteredMedia, limit]);

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Archive' },
    { id: 'golden-hour', label: 'Golden Hour' },
    { id: 'night', label: 'Night Sets' },
    { id: 'crowd', label: 'Crowd & Crew' }
  ];

  return (
    <section id="gallery" className={styles.section} aria-label="Archive Gallery">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.sectionBadge}>
              {isArchivePage ? 'Complete Archive' : 'Archive'}
            </span>
            <h2 className={styles.sectionTitle}>
              {isArchivePage ? 'All Moments & Captures' : 'Moments Caught'}
            </h2>
            <p className={styles.sectionSubtitle}>
              {isArchivePage
                ? 'Every unfiltered capture, sunset terrace memory, and late-night floor across Darjeeling & Gangtok.'
                : 'Unfiltered captures from previous terraces, living rooms, and dance floors.'}
            </p>
          </div>

          {/* Filter Tabs with shared layout spring pill indicator */}
          <div className={styles.tabsWrapper} role="tablist" aria-label="Gallery categories">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={clsx(styles.tabButton, { [styles.tabButtonActive]: isActive })}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="gallery-active-tab"
                      className={styles.activeTabBackground}
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                    />
                  )}
                  <span className={styles.tabLabel}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Layout-Animated Media Grid */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {displayedMedia.map((item, idx) => {
              const isVideo = item.type === 'video';
              const isWide = idx % 5 === 0;

              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, transform: 'scale(0.96)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0.96)' }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className={clsx(styles.tile, { [styles.tileWide]: isWide })}
                  onClick={() => setActiveModalItem(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.caption} at ${item.eventName}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalItem(item);
                    }
                  }}
                >
                  {/* Photo Container */}
                  <div className={styles.tileImageWrapper}>
                    {item.src && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.src}
                        alt={item.caption}
                        className={styles.tileMedia}
                        loading="lazy"
                      />
                    )}
                    {/* White Brand Logo Watermark on top of image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.png"
                      alt="Sunset Sessions"
                      className={styles.imageWatermark}
                    />
                  </div>

                  {/* Clean Solid White Metadata Bar */}
                  <div className={styles.tileWhiteBar}>
                    <div className={styles.tileTextGroup}>
                      <span className={styles.tileCaption}>{item.caption}</span>
                      <span className={styles.tileMeta}>{item.eventName}</span>
                    </div>
                    <span className={styles.tileDateBadge}>
                      {item.eventDate.split('-')[0]}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More CTA for homepage */}
        {showViewMore && (
          <div className={styles.viewMoreContainer}>
            <Link href="/gallery" className={styles.viewMoreButton}>
              <span>Explore Full Archive ({allMedia.length} Captures)</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox / Focused Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className={styles.modalBackdrop} onClick={() => setActiveModalItem(null)}>
            <motion.div
              className={styles.modalContent}
              initial={{ opacity: 0, transform: 'scale(0.96)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0.96)' }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={activeModalItem.caption}
            >
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => setActiveModalItem(null)}
                aria-label="Close preview"
              >
                &times;
              </button>

              {/* Media Area with Enlarged Blurred Background of the Same Image */}
              <div className={styles.modalMediaArea}>
                {activeModalItem.src && (
                  <>
                    {/* Background: Zoomed & Blurred Duplicate of the Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeModalItem.src}
                      alt=""
                      aria-hidden="true"
                      className={styles.modalBgBlur}
                    />
                    {/* Foreground: Sharp, Perfectly Contained Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeModalItem.src}
                      alt={activeModalItem.caption}
                      className={styles.modalSharpImg}
                    />
                    {/* White Brand Logo Watermark in Modal */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.png"
                      alt="Sunset Sessions"
                      className={styles.modalImageWatermark}
                    />
                  </>
                )}
              </div>

              {/* Solid White Bar with Captions and Done Action */}
              <div className={styles.modalDetails}>
                <div className={styles.modalTitleBlock}>
                  <h3 className={styles.modalCaption}>{activeModalItem.caption}</h3>
                  <p className={styles.modalSub}>
                    {activeModalItem.eventName} &bull; {activeModalItem.eventDate}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.modalDoneButton}
                  onClick={() => setActiveModalItem(null)}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
