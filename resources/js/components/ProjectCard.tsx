/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "../types";
import { formatProjectLocation } from "../utils/projects";

export type ProjectCardLayout = "grid" | "list";
export type ProjectCardVariant = "home" | "catalog";

type ProjectCardProps = {
  project: Project;
  layout?: ProjectCardLayout;
  variant?: ProjectCardVariant;
};

function statusBadgeClass(status: Project["status"]): string {
  const base = "text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md";
  if (status === "Pre-venta") {
    return `${base} bg-[var(--brand-green-light)]/95 text-[var(--brand-green-dark)] border border-[var(--brand-green)]/40`;
  }
  if (status === "Inmediata") {
    return `${base} bg-white/95 text-[var(--brand-navy)] border border-[var(--brand-navy)]/25`;
  }
  return `${base} bg-white/90 text-[var(--text-p)] border border-[var(--border)]`;
}

export function ProjectCard({ project, layout = "grid", variant = "catalog" }: ProjectCardProps) {
  const locationLabel = formatProjectLocation(project);
  const isGrid = layout === "grid";
  const isHome = variant === "home";
  const detailUrl = `/catalog/${project.id}`;

  const shellClass = [
    "project-card group",
    isHome ? "project-card--home" : "project-card--catalog",
    "ie-card overflow-hidden",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
  ].join(" ");

  const layoutClass = isGrid ? "flex-col" : "flex-row h-44 sm:h-48";

  const imageWrapClass = isGrid
    ? isHome
      ? "h-52 sm:h-56 w-full"
      : "h-44 w-full"
    : "h-full w-40 sm:w-44 shrink-0";

  return (
    <Link
      to={detailUrl}
      className={`${shellClass} ${layoutClass} flex cursor-pointer text-left no-underline relative`}
      aria-label={`Ver detalle de ${project.title}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-navy)] opacity-0 group-hover:opacity-100 transition-opacity z-10" />

      <div className={`relative bg-[var(--bg-subtle)] shrink-0 overflow-hidden ${imageWrapClass}`}>
        <img
          src={project.imageUrl}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)]/70 via-transparent to-transparent opacity-80" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={statusBadgeClass(project.status)}>{project.status}</span>
        </div>
        {project.availableLots > 0 && (
          <div className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wide shadow-lg px-2.5 py-1 rounded-full bg-[var(--brand-green)] text-white">
            {project.availableLots} lote{project.availableLots !== 1 ? "s" : ""} disponible
            {project.availableLots !== 1 ? "s" : ""}
          </div>
        )}
        {project.surface != null && project.surface > 0 && isGrid && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-white font-medium">
            {project.surface} m²
          </div>
        )}
      </div>

      <div className={`flex-1 flex flex-col justify-between min-w-0 ${isHome ? "p-5 sm:p-6 gap-4" : "p-4 gap-2"}`}>
        <div className="space-y-2">
          {locationLabel && (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] line-clamp-1">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--brand-green)]" />
              <span>{locationLabel}</span>
            </div>
          )}
          <h3 className="font-sans font-bold text-lg text-[var(--brand-navy)] group-hover:text-[var(--brand-green)] leading-snug transition-colors line-clamp-2">
            {project.title}
          </h3>
          {project.description && isGrid && (
            <p className="line-clamp-2 leading-relaxed text-[var(--text-s)] text-xs">
              {project.description}
            </p>
          )}
        </div>

        <div className={`flex items-end justify-between gap-3 ${isHome ? "pt-4 border-t border-[var(--border)]" : "pt-2 border-t border-[var(--border)]/60 mt-auto"}`}>
          <div className="flex flex-col min-w-0">
            {isHome && (
              <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">Desde</span>
            )}
            <span className="font-sans text-xl font-extrabold text-[var(--brand-green)] truncate">
              {project.priceSoles > 0 ? `S/. ${project.priceSoles.toLocaleString()}` : "Consultar"}
            </span>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-navy)] group-hover:text-[var(--brand-green)] transition-colors">
            Ver detalle
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
