'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import clsx from 'clsx';
import { TicketTier } from '@/data/events';
import { buildWhatsAppLink, buildInviteMessage, buildTicketInquiryMessage } from '@/server/whatsapp';
import styles from './TicketTiers.module.css';

interface TicketTiersProps {
  tiers?: TicketTier[];
  isExclusive?: boolean;
  eventName: string;
  eventDate: string;
}

export function TicketTiers({ tiers = [], isExclusive = false, eventName, eventDate }: TicketTiersProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  if (isExclusive) {
    const inviteLink = buildWhatsAppLink(buildInviteMessage(eventName, eventDate));
    return (
      <div className={styles.exclusiveCard}>
        <div className={styles.exclusiveTextGroup}>
          <span className={styles.exclusiveLabel}>Private Guest List</span>
          <p className={styles.exclusiveText}>
            Invites released via WhatsApp to members and verified guests.
          </p>
        </div>
        <a
          href={inviteLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.compactInviteButton}
        >
          Request Invite
        </a>
      </div>
    );
  }

  const handleCheckoutClick = () => {
    const selectedTier = tiers[selectedTierIndex] || tiers[0];
    toast.success(`Selected ${selectedTier.name} (${selectedTier.price})`, {
      description: 'Proceeding to WhatsApp verification and QR ticket issuance.'
    });
  };

  const selectedTier = tiers[selectedTierIndex] || tiers[0];
  const ticketInquiryLink = buildWhatsAppLink(
    buildTicketInquiryMessage(`${eventName} - ${selectedTier?.name || 'General'}`)
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Select Ticket Tier</h3>
        <span className={styles.subtitle}>Instant confirmation delivered via WhatsApp</span>
      </div>

      <div className={styles.tierList} role="radiogroup" aria-label="Ticket options">
        {tiers.map((tier, idx) => {
          const isSelected = selectedTierIndex === idx;
          return (
            <div
              key={tier.name}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              className={clsx(styles.tierCard, { [styles.tierCardSelected]: isSelected })}
              onClick={() => setSelectedTierIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setSelectedTierIndex(idx);
                }
              }}
            >
              {/* Active animated spring border */}
              {isSelected && (
                <motion.div
                  layoutId="active-tier-glow"
                  className={styles.activeTierIndicator}
                  transition={{ type: 'spring', bounce: 0.1, duration: 0.25 }}
                />
              )}

              <div className={styles.tierContent}>
                <div className={styles.tierLeft}>
                  <div className={styles.tierNameRow}>
                    <span className={styles.radioCircle}>
                      {isSelected && <span className={styles.radioDot} />}
                    </span>
                    <span className={styles.tierName}>{tier.name}</span>
                    {tier.left != null && (
                      <span className={styles.leftPill}>{tier.left} left</span>
                    )}
                  </div>
                  <span className={styles.tierNote}>{tier.note}</span>
                </div>

                <div className={styles.tierPrice}>{tier.price}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actionBlock}>
        <a
          href={ticketInquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryActionButton}
          onClick={handleCheckoutClick}
        >
          Get Tickets &bull; {selectedTier ? selectedTier.price : ''}
        </a>
        <p className={styles.helperNote}>
          Ticket arrives on WhatsApp with a verifiable QR code. Show it at the door.
        </p>
      </div>
    </div>
  );
}
