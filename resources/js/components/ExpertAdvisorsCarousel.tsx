/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import { motion } from "motion/react";
import type { ExpertAdvisor } from "../types";

const CARD_WIDTH = 300;
const GAP = 32;

/** Duplica la secuencia para bucle infinito sin salto (animación al -50%). */
function buildInfiniteTrack(advisors: ExpertAdvisor[]): ExpertAdvisor[] {
  if (advisors.length === 0) return [];
  return [...advisors, ...advisors];
}

export const ExpertAdvisorsCarousel: React.FC<{ advisors: ExpertAdvisor[] }> = ({ advisors }) => {
  const loopItems = useMemo(() => buildInfiniteTrack(advisors), [advisors]);

  const durationSec = useMemo(() => {
    const base = advisors.length * 6;
    return Math.max(28, Math.min(90, base));
  }, [advisors.length]);

  if (advisors.length === 0) {
    return (
      <p className="text-center text-[var(--text-muted)] text-xs py-8">
        Próximamente publicaremos el equipo de asesores expertos.
      </p>
    );
  }

  const sequenceWidth =
    advisors.length * CARD_WIDTH + Math.max(0, advisors.length - 1) * GAP;

  return (
    <div
      id="expert-advisors-carousel"
      className="relative w-full overflow-hidden"
      aria-label="Carrusel de asesores expertos"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[var(--bg-subtle)] via-[var(--bg-subtle)]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-[var(--bg-subtle)] via-[var(--bg-subtle)]/80 to-transparent" />

      <div
        className="expert-advisors-marquee-track flex w-max gap-8 py-2"
        style={
          {
            "--marquee-duration": `${durationSec}s`,
            "--marquee-shift": `${sequenceWidth}px`,
          } as React.CSSProperties
        }
      >
        {loopItems.map((advisor, index) => (
          <motion.article
            key={`${advisor.id}-${index}`}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 w-[300px] ie-card overflow-hidden text-left group"
          >
            <div className="h-64 bg-[var(--bg-subtle)] overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--gold)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={advisor.imageUrl}
                alt={advisor.name}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="p-5 space-y-1">
              <h3 className="font-display font-semibold text-sm text-[var(--text-p)]">{advisor.name}</h3>
              <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest block">
                {advisor.role}
              </span>
              <p className="text-[var(--text-s)] text-xs leading-relaxed pt-2 line-clamp-4">{advisor.bio}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
