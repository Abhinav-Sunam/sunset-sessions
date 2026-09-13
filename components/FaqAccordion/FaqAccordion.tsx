'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import styles from './FaqAccordion.module.css';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqAccordion({ items, title = 'Essential Information' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.list}>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={item.question}
              className={clsx(styles.item, { [styles.itemOpen]: isOpen })}
            >
              <button
                type="button"
                className={styles.trigger}
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span
                  className={clsx(styles.chevron, { [styles.chevronOpen]: isOpen })}
                  aria-hidden="true"
                >
                  &darr;
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
                      opacity: { duration: 0.18, ease: [0.23, 1, 0.32, 1] }
                    }}
                    className={styles.contentWrapper}
                  >
                    <div className={styles.answerText}>
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
