/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { DEFAULT_GUARANTEES, getContactFormBySlug } from "../../config/siteDefaults";
import { ProjectsCarousel } from "../../components/ProjectsCarousel";
import { HomeAlertModal } from "../../components/HomeAlertModal";
import { formatProjectInterestLabel } from "../../utils/projects";
import { GuaranteeIcon, renderInlineBold } from "../../utils/siteContent";
import {
  Compass,
  ArrowRight,
  CheckCircle,
  ArrowBigLeft,
  ArrowBigRight,
  Sparkles,
  PhoneCall,
  UserCheck
} from "lucide-react";

export const Home: React.FC = () => {
  const { banners, projects, testimonials, addInquiry, guarantees, contactForms } = useApp();
  const guaranteeData = guarantees ?? DEFAULT_GUARANTEES;
  const contactForm = getContactFormBySlug(contactForms, "contact_consulta");
  const activeGuaranteeItems = guaranteeData.items.filter((i) => i.isActive);

  const catalogCarouselProjects = projects;

  // Active Banners Slider State
  const activeBanners = banners.filter((b) => b.isActive);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Auto rotate banners if multiple are active
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners]);

  const handleBannerNext = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handleBannerPrev = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    try {
      await addInquiry({
        fullName,
        phone,
        email,
        projectInterest: projectInterest || contactForm.defaultProjectInterest,
        message: message || contactForm.defaultMessage,
      });

      setFormSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setProjectInterest("");
      setMessage("");

      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch {
      // El error global se muestra en PublicLayout si aplica
    }
  };

  const activeBanner = activeBanners[currentBannerIndex] || {
    title: "Invierta en el Futuro del Perú con Seguridad",
    subtitle: "Lotes de campo, playa y urbanos inscritos en Registros Públicos con plusvalía garantizada.",
    buttonText: "Explorar catálogo",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
    badgeText: "Ventas 2026",
  };

  return (
    <div id="home-page" className="-mt-[4.25rem]">
      <HomeAlertModal />
      {/* 1. HERO CAROUSEL */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 transition-all duration-1000 select-none">
          <img
            src={activeBanner.imageUrl}
            alt=""
            aria-hidden
            className="hero-banner-bg-image w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/85 to-[var(--bg)]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-2xl lg:max-w-3xl hero-banner-content-panel p-8 sm:p-10 space-y-6">
            {activeBanner.badgeText && (
              <div className="hero-banner-badge inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden />
                {activeBanner.badgeText}
              </div>
            )}

            <h1 className="hero-banner-title text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
              {activeBanner.title}
            </h1>

            <p className="hero-banner-subtitle text-base sm:text-lg leading-relaxed max-w-xl">
              {activeBanner.subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/catalog" className="ie-btn-primary">
                <Compass className="w-4 h-4" />
                {activeBanner.buttonText === "Explorar catálogo" ? "Explorar proyectos" : activeBanner.buttonText}
              </Link>
              <Link to="/contact" className="ie-btn-secondary">
                <PhoneCall className="w-4 h-4 text-[var(--accent)]" />
                Solicitar asesoría
              </Link>
            </div>
          </div>
        </div>

        {activeBanners.length > 1 && (
          <div className="hero-banner-controls absolute bottom-8 right-6 sm:right-10 flex items-center gap-2 z-10 px-3 py-2 rounded-full border border-[var(--border)]">
            <button
              onClick={handleBannerPrev}
              className="p-1.5 rounded-md bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Banner anterior"
            >
              <ArrowBigLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-semibold text-[var(--text-p)] tabular-nums min-w-[2.5rem] text-center">
              {currentBannerIndex + 1} / {activeBanners.length}
            </span>
            <button
              onClick={handleBannerNext}
              className="p-1.5 rounded-md bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Siguiente banner"
            >
              <ArrowBigRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-10 mb-4">
        <div className="ie-stat-bar grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 sm:px-10">
          <div className="text-center space-y-1">
            <div className="ie-stat-value">98%</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Clientes satisfechos</div>
          </div>
          <div className="text-center space-y-1">
            <div className="ie-stat-value">S/. 50M+</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Capital invertido</div>
          </div>
          <div className="text-center space-y-1">
            <div className="ie-stat-value">1,200+</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Lotes vendidos</div>
          </div>
          <div className="text-center space-y-1">
            <div className="ie-stat-value">30+</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">Visitas guiadas al mes</div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-subtle)] to-[var(--bg)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="ie-eyebrow">
                <Compass className="w-3.5 h-3.5" />
                Catálogo destacado
              </span>
              <h2 className="ie-heading text-3xl md:text-4xl">
                Proyectos para tu próxima inversión
              </h2>
              <p className="text-[var(--text-s)] text-sm leading-relaxed">
                Terrenos con respaldo SUNARP, ubicaciones estratégicas y financiamiento directo.
              </p>
            </div>
            <Link to="/catalog" className="ie-btn-primary shrink-0 !text-sm">
              Ver catálogo completo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {catalogCarouselProjects.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg)] px-6 py-14 text-center space-y-4">
              <Compass className="w-10 h-10 text-[var(--accent-text)] mx-auto opacity-80" />
              <p className="text-[var(--text-s)] text-sm font-light max-w-md mx-auto">
                Pronto publicaremos nuevos proyectos. Mientras tanto, explora el catálogo completo.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-1.5 text-[var(--accent-text)] font-semibold text-sm border-b-2 border-[var(--accent-text)]/40 hover:border-[var(--accent-text)] pb-0.5 transition-colors"
              >
                Ir al catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <ProjectsCarousel projects={catalogCarouselProjects} visibleColumns={3} />
        )}
      </section>

      <section className="home-guarantees-section relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none">
          <img
            src={guaranteeData.section.backgroundImageUrl}
            alt=""
            aria-hidden
            className="w-full h-full object-cover brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C356A]/95 via-[#0A2A4A]/92 to-[#061A30]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="ie-eyebrow justify-center">{guaranteeData.section.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              {guaranteeData.section.heading}
            </h2>
            <p className="text-blue-100/90 text-sm md:text-base leading-relaxed">
              {guaranteeData.section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {activeGuaranteeItems.map((item) => (
              <div
                key={item.id}
                className="home-guarantees-card p-8 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="home-guarantees-icon w-14 h-14 rounded-2xl flex items-center justify-center">
                  <GuaranteeIcon name={item.icon} className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-blue-100/85 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="ie-eyebrow justify-center">Historias de éxito</span>
          <h2 className="ie-heading text-3xl md:text-4xl">
            Inversionistas que confían en Invierte Xpress
          </h2>
          <p className="text-[var(--text-s)] text-sm">
            Familias y emprendedores que ya dieron el paso hacia su patrimonio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="ie-card p-8 relative flex flex-col justify-between hover:shadow-[var(--shadow-soft)] transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[var(--gold)] text-lg">
                  {[...Array(test.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--text-s)] italic leading-relaxed">
                  "{test.quote}"
                </blockquote>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-[var(--border)]">
                <img
                  src={test.avatarUrl}
                  alt={test.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--gold)]/30 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-semibold text-sm text-[var(--text-p)]">{test.name}</h4>
                  <span className="text-xs text-[var(--text-muted)] block">{test.role}</span>
                  <span className="inline-block mt-1 text-[10px] font-medium text-[var(--accent)] bg-[var(--accent)]/8 px-2 py-0.5 rounded-full">
                    {test.projectPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTEXT LEAD INQUIRY FORM */}
      <section className="home-contact-section py-20 md:py-28 relative overflow-hidden">
        <div className="home-contact-section__base" aria-hidden />
        <div
          className="home-contact-section__photo"
          aria-hidden
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="home-contact-section__glow home-contact-section__glow--left" aria-hidden />
        <div className="home-contact-section__glow home-contact-section__glow--right" aria-hidden />
        <div className="home-contact-section__glow home-contact-section__glow--center" aria-hidden />
        <div className="home-contact-section__mesh" aria-hidden />
        <div className="home-contact-section__grid" aria-hidden />
        <div className="home-contact-section__shine" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Informative column */}
            <div className="space-y-6 text-white">
              <span className="ie-eyebrow">{contactForm.sectionEyebrow}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-white">
                {contactForm.sectionHeading}
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-lg">
                {contactForm.sectionDescription}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/15">
                {(contactForm.bullets ?? []).map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-white/95">
                    <CheckCircle className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden />
                    <span className="leading-relaxed">{renderInlineBold(bullet.text)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card column */}
            <div className="home-contact-form-card p-7 sm:p-10 rounded-2xl text-stone-900 overflow-hidden">
              <div className="home-contact-form-card__header-accent" aria-hidden />
              <div className="mb-7 pb-6 border-b border-[var(--border)] relative">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-p)] mb-2">
                  {contactForm.formTitle}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {contactForm.formSubtitle}
                </p>
              </div>

              {formSuccess ? (
                <div className="bg-[var(--accent)]/8 border-2 border-[var(--accent)]/20 text-[var(--accent)] rounded-2xl p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto text-[var(--accent)]">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <h4 className="font-sans font-extrabold text-base uppercase tracking-wide">
                    {contactForm.successTitle}
                  </h4>
                  <p className="text-sm font-normal text-[var(--accent-text)] leading-relaxed">
                    {contactForm.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                      Nombres Completos
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez Ramos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="home-form-input w-full rounded-xl p-3 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="987 654 321"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="home-form-input w-full rounded-xl p-3 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tucorreo@outlook.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="home-form-input w-full rounded-xl p-3 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                      Proyecto de Interés
                    </label>
                    <select
                      value={projectInterest}
                      onChange={(e) => setProjectInterest(e.target.value)}
                      className="home-form-input w-full rounded-xl p-3 text-sm"
                    >
                      <option value="">Seleccione un proyecto...</option>
                      {projects.map((p) => {
                        const label = formatProjectInterestLabel(p);
                        return (
                          <option key={p.id} value={label}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Cuéntanos qué tipo de lote buscas o cuándo prefieres la visita..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="home-form-input w-full rounded-xl p-3 text-sm resize-none min-h-[7rem]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="home-contact-submit w-full text-white font-sans font-extrabold text-sm py-4 px-6 rounded-xl transition-all uppercase tracking-wider mt-2"
                  >
                    {contactForm.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
