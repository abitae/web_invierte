/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_ABOUT } from "../../config/siteDefaults";
import { GuaranteeIcon } from "../../utils/siteContent";
import { ExpertAdvisorsCarousel } from "../../components/ExpertAdvisorsCarousel";

export const Nosotros: React.FC = () => {
  const { about } = useApp();
  const data = about ?? DEFAULT_ABOUT;
  const p = data.page;
  const values = data.values.filter((v) => v.isActive);
  const advisors = data.advisors.filter((a) => a.isActive);

  return (
    <div id="nosotros-page" className="ie-page-shell">
      <section className="relative min-h-[52vh] md:min-h-[58vh] flex items-center border-b border-stone-200/50 overflow-hidden">
        <div className="absolute inset-0 select-none" aria-hidden>
          <img
            src={p.heroBackgroundImageUrl}
            alt=""
            className="hero-banner-bg-image w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 about-hero-scrim" />
          <div className="absolute inset-0 hero-banner-scrim-vertical" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="hero-banner-content-panel rounded-2xl p-6 sm:p-10 space-y-4">
            <span className="ie-eyebrow justify-center block">{p.heroEyebrow}</span>
            <h1 className="hero-banner-title text-3xl sm:text-4xl lg:text-5xl">
              {p.heroHeading}
            </h1>
            <p className="hero-banner-subtitle text-xs sm:text-sm lg:text-base leading-relaxed font-light max-w-2xl mx-auto">
              {p.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-4 ie-card p-8 text-left">
            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center text-[var(--accent)]">
              <Landmark className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-[var(--text-p)]">{p.missionHeading}</h2>
            <p className="text-[var(--text-s)] text-sm leading-relaxed">{p.missionDescription}</p>
          </div>

          <div className="space-y-4 ie-card p-8 text-left">
            <div className="w-12 h-12 bg-[var(--brand-navy)]/10 rounded-2xl flex items-center justify-center text-[var(--brand-navy)]">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-[var(--text-p)]">{p.visionHeading}</h2>
            <p className="text-[var(--text-s)] text-sm leading-relaxed">{p.visionDescription}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="ie-eyebrow justify-center block">{p.valuesEyebrow}</span>
            <h2 className="ie-heading text-2xl sm:text-3xl">{p.valuesHeading}</h2>
            <p className="text-[var(--text-s)] text-sm">{p.valuesDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {values.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                  <GuaranteeIcon name={item.icon} className="w-4 h-4 text-[var(--brand-green)] shrink-0" />
                  {item.title}
                </div>
                <p className="text-[var(--text-s)] text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 overflow-hidden bg-[var(--bg-subtle)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="ie-eyebrow justify-center block">{p.advisorsEyebrow}</span>
            <h2 className="ie-heading text-2xl sm:text-3xl">{p.advisorsHeading}</h2>
            <p className="text-[var(--text-s)] text-xs md:text-sm">{p.advisorsDescription}</p>
          </div>
        </div>

        <ExpertAdvisorsCarousel advisors={advisors} />
      </section>
    </div>
  );
};
