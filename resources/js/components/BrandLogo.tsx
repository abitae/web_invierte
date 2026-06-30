/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Building2 } from "lucide-react";
import type { SiteSettings } from "../types";

type BrandVariant = "navbar" | "footer";

interface BrandLogoProps {
  settings: SiteSettings;
  variant?: BrandVariant;
  className?: string;
}

export function BrandLogo({ settings, variant = "navbar", className = "" }: BrandLogoProps) {
  const siteName = settings.siteName?.trim() ?? "";
  const tagline =
    variant === "navbar"
      ? settings.siteTagline?.trim() ?? ""
      : settings.footerTagline?.trim() ?? "";
  const hasText = Boolean(siteName || tagline);
  const hasLogo = Boolean(settings.logoUrl?.trim());
  const altText = siteName || settings.browserTitle || "Inicio";
  const isFooter = variant === "footer";

  const logoOnlyClasses = isFooter
    ? "h-12 w-auto max-w-[min(280px,100%)] object-contain object-left bg-white rounded-lg px-2 py-1"
    : "h-12 sm:h-14 w-auto max-w-[min(300px,100%)] object-contain object-left";

  const logoWithTextClasses = "h-9 w-auto max-w-[130px] object-contain shrink-0";

  if (hasLogo && !hasText) {
    return (
      <div className={`flex items-center min-w-0 ${className}`}>
        <img src={settings.logoUrl!} alt={altText} className={logoOnlyClasses} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 min-w-0 ${className}`}>
      {hasLogo ? (
        <img
          src={settings.logoUrl!}
          alt={siteName ? "" : altText}
          aria-hidden={Boolean(siteName)}
          className={logoWithTextClasses}
        />
      ) : (
        <div
          className={`shrink-0 flex items-center justify-center rounded-xl ${
            isFooter
              ? "p-2 bg-white/10 border border-white/20"
              : "p-2 bg-[var(--bg-subtle)] border border-[var(--border)]"
          }`}
        >
          <Building2 className={`w-5 h-5 ${isFooter ? "text-[var(--brand-green)]" : "text-[var(--brand-green)]"}`} />
        </div>
      )}

      {hasText && (
        <div className="flex flex-col min-w-0 leading-tight">
          {siteName && (
            <span
              className={`font-display font-bold tracking-tight truncate ${
                isFooter ? "text-base text-white" : "text-base sm:text-lg text-[var(--text-p)]"
              }`}
            >
              {siteName}
            </span>
          )}
          {tagline && (
            <span
              className={`text-[10px] sm:text-xs font-medium truncate ${
                isFooter ? "text-[var(--brand-green)] mt-0.5" : "text-[var(--brand-navy)] mt-0.5"
              }`}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
