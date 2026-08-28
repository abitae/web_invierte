/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Compass, Users, CircleHelp, Sun, Moon, PhoneCall } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_SITE_SETTINGS } from "../../config/siteDefaults";
import { BrandLogo } from "../BrandLogo";
import { collapseHeight, EASE_OUT } from "../../utils/motion";

const MotionLink = motion.create(Link);

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/catalog", label: "Proyectos", end: false },
  { to: "/about", label: "Nosotros", end: false },
  { to: "/contact", label: "Contacto", end: false },
] as const;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, siteSettings } = useApp();
  const settings = siteSettings ?? DEFAULT_SITE_SETTINGS;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-[var(--brand-green)] via-[var(--brand-navy)] to-[var(--brand-green)]" aria-hidden />

      <motion.nav
        id="public-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--card-bg)]/95 border-b border-[var(--border)] shadow-[var(--shadow-card)] py-2"
            : "bg-[var(--card-bg)]/70 border-b border-transparent py-3"
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="min-w-0 shrink max-w-[58%] sm:max-w-none">
              <BrandLogo settings={settings} variant="navbar" />
            </Link>

            <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[var(--bg-subtle)]/80 border border-[var(--border)]">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `ie-nav-pill ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full border border-[var(--border)] text-[var(--text-s)] hover:text-[var(--text-p)] hover:bg-[var(--bg-subtle)] transition-all"
                title={theme === "light" ? "Modo oscuro" : "Modo claro"}
                aria-label="Cambiar tema"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[var(--gold)]" />}
              </button>

              <MotionLink
                to="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="ie-btn-primary !py-2.5 !px-5 !text-xs"
              >
                <PhoneCall className="w-4 h-4" />
                Agendar visita
              </MotionLink>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-[var(--border)] text-[var(--text-s)]"
                aria-label="Cambiar tema"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full border border-[var(--border)] text-[var(--text-p)]"
                aria-label="Abrir menú"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={collapseHeight}
              className="lg:hidden border-t border-[var(--border)] bg-[var(--card-bg)] shadow-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text-s)] hover:bg-[var(--bg-subtle)]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <MotionLink
                  to="/contact"
                  whileTap={{ scale: 0.97 }}
                  className="ie-btn-primary w-full mt-3 !text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  Agendar visita
                </MotionLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
