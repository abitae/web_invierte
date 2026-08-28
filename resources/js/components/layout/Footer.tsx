/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Shield } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_SITE_SETTINGS } from "../../config/siteDefaults";
import { BrandLogo } from "../BrandLogo";
import type { CorporateChannel } from "../../types";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils/motion";

function channelIcon(type: CorporateChannel["channelType"]) {
  if (type === "phone" || type === "whatsapp") return Phone;
  if (type === "email") return Mail;
  return MapPin;
}

function channelHref(ch: CorporateChannel): string | undefined {
  if (ch.channelType === "phone") return `tel:${ch.value.replace(/\s/g, "")}`;
  if (ch.channelType === "email") return `mailto:${ch.value}`;
  return undefined;
}

export const Footer: React.FC = () => {
  const { siteSettings, channels } = useApp();
  const settings = siteSettings ?? DEFAULT_SITE_SETTINGS;
  const activeChannels = channels.filter((c) => c.isActive && c.channelType !== "whatsapp");

  return (
    <footer id="public-footer" className="ie-footer select-none font-sans mt-auto">
      <div className="border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <span className="flex items-center gap-2 text-[#E2E8F0]">
            <Shield className="w-4 h-4 text-[var(--brand-green)] shrink-0" />
            Lotes con título inscrito en SUNARP
          </span>
          <span className="text-xs text-[#94A3B8]">
            R.U.C. N° 20600000000 · Invierte Xpress S.A.C.
          </span>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div variants={fadeUp} className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-flex">
              <BrandLogo settings={settings} variant="footer" />
            </Link>
            {settings.footerDescription?.trim() && (
              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
                {settings.footerDescription}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="ie-footer-heading">Navegación</h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li><Link to="/" className="hover:text-[var(--brand-green)] transition-colors">Inicio</Link></li>
              <li><Link to="/catalog" className="hover:text-[var(--brand-green)] transition-colors">Catálogo de lotes</Link></li>
              <li><Link to="/about" className="hover:text-[var(--brand-green)] transition-colors">Quiénes somos</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--brand-green)] transition-colors">Contacto</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="ie-footer-heading">Tipos de lote</h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li><Link to="/catalog?type=Playero" className="hover:text-white transition-colors">Playeros</Link></li>
              <li><Link to="/catalog?type=Campestre" className="hover:text-white transition-colors">Campestres</Link></li>
              <li><Link to="/catalog?type=Urbano" className="hover:text-white transition-colors">Urbanos</Link></li>
              <li><Link to="/catalog?type=Industrial" className="hover:text-white transition-colors">Industriales</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="ie-footer-heading">Contáctanos</h3>
            <ul className="space-y-3 text-sm text-[#CBD5E0]">
              {activeChannels.length > 0 ? (
                activeChannels.map((ch) => {
                  const Icon = channelIcon(ch.channelType);
                  const href = channelHref(ch);
                  return (
                    <li key={ch.id} className="flex items-start gap-2.5">
                      <Icon className="w-4 h-4 text-[var(--brand-green)] shrink-0 mt-0.5" />
                      {href ? (
                        <a href={href} className="hover:text-white transition-colors">
                          {ch.value}
                        </a>
                      ) : (
                        <span>{ch.value}</span>
                      )}
                    </li>
                  );
                })
              ) : (
                <>
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[var(--brand-green)] shrink-0 mt-0.5" />
                    <span>Av. Javier Prado Este 488, San Isidro, Lima</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[var(--brand-green)] shrink-0" />
                    <a href="mailto:informes@invierteexpress.pe" className="hover:text-white">
                      informes@invierteexpress.pe
                    </a>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-12 pt-8 border-t border-white/10 text-center md:text-left text-xs text-[#64748B]"
        >
          © {new Date().getFullYear()}{" "}
          {settings.siteName?.trim() || "Invierte Xpress"}. Todos los derechos reservados.
        </motion.div>
      </motion.div>
    </footer>
  );
};
