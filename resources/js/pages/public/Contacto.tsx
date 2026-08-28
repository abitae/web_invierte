/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { getContactFormBySlug } from "../../config/siteDefaults";
import { formatProjectInterestLabel } from "../../utils/projects";
import type { CorporateChannel } from "../../types";
import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { collapseHeight } from "../../utils/motion";

function channelIcon(type: CorporateChannel["channelType"]) {
  if (type === "phone" || type === "whatsapp") return Phone;
  if (type === "email") return Mail;
  return MapPin;
}

export const Contacto: React.FC = () => {
  const { projects, addInquiry, contactForms, channels, faqs } = useApp();
  const contactForm = getContactFormBySlug(contactForms, "contact_consulta");
  const activeChannels = channels.filter((c) => c.isActive);
  const activeFaqs = faqs.filter((f) => f.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  const whatsappChannel = activeChannels.find((c) => c.channelType === "whatsapp");
  const listChannels = activeChannels.filter((c) => c.channelType !== "whatsapp");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

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

      setTimeout(() => setFormSuccess(false), 5000);
    } catch {
      /* error handled globally */
    }
  };

  const handleFaqToggle = (idx: number) => {
    setActiveFaqIdx(activeFaqIdx === idx ? null : idx);
  };

  return (
    <div id="contacto-page" className="ie-page-shell text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-12 space-y-3">
          <span className="ie-eyebrow">Canales de atención</span>
          <h1 className="ie-heading text-3xl sm:text-4xl">Habla con nuestros asesores</h1>
          <p className="text-[var(--text-s)] text-sm max-w-2xl">
            Agenda tu visita guiada y recibe asesoría personalizada para elegir el lote ideal.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <main className="lg:col-span-7 ie-card p-6 sm:p-10">
            <h2 className="ie-heading text-xl mb-2">{contactForm.formTitle}</h2>
            <p className="text-xs text-[var(--text-s)] mb-8">{contactForm.formSubtitle}</p>

            <AnimatePresence mode="wait">
            {formSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="ie-success-box space-y-4"
              >
                <div className="ie-success-box__icon">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm uppercase tracking-wide">{contactForm.successTitle}</h3>
                  <p className="text-xs max-w-sm mx-auto leading-relaxed text-[var(--text-s)]">{contactForm.successMessage}</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleFormSubmit}
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <label className="ie-form-label">Nombres completos</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez Ramos"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="ie-form-input"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="ie-form-label">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="987654321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="ie-form-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="ie-form-label">Correo electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="tucorreo@outlook.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="ie-form-input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="ie-form-label">Proyecto de interés</label>
                  <select
                    value={projectInterest}
                    onChange={(e) => setProjectInterest(e.target.value)}
                    className="ie-form-input"
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
                  <label className="ie-form-label">Mensaje</label>
                  <textarea
                    rows={4}
                    placeholder="Escriba su consulta..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="ie-form-input resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="ie-btn-primary w-full text-xs uppercase tracking-wider py-3.5"
                >
                  <Send className="w-4 h-4" />
                  {contactForm.submitLabel}
                </motion.button>
              </motion.form>
            )}
            </AnimatePresence>
          </main>

          <aside className="lg:col-span-5 space-y-8 flex flex-col justify-start">
            <div className="ie-aside-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="space-y-1 text-left">
                <span className="ie-eyebrow">Canales corporativos</span>
                <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                  Atención inmediata
                </h3>
              </div>
              <div className="space-y-4">
                {listChannels.map((ch) => {
                  const Icon = channelIcon(ch.channelType);
                  const href =
                    ch.channelType === "phone"
                      ? `tel:${ch.value.replace(/\s/g, "")}`
                      : ch.channelType === "email"
                        ? `mailto:${ch.value}`
                        : undefined;
                  return (
                    <div key={ch.id} className="flex gap-4 items-start text-left text-xs sm:text-sm text-white/90">
                      <Icon className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-on-dark-subtle">{ch.label}</strong>
                        {href ? (
                          <a href={href} className="text-on-dark-muted hover:text-white hover:underline block">
                            {ch.value}
                            {ch.extraInfo ? ` (${ch.extraInfo})` : ""}
                          </a>
                        ) : (
                          <span className="text-on-dark-muted">{ch.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {whatsappChannel && (
                <div className="pt-4 border-t border-on-dark">
                  <a
                    href={`https://wa.me/${whatsappChannel.value}?text=${encodeURIComponent(whatsappChannel.extraInfo ?? "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ie-btn-primary w-full text-xs uppercase tracking-wider py-3"
                  >
                    <MessageSquare className="w-4 h-4 text-[var(--gold)] shrink-0" />
                    {whatsappChannel.label}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-4 text-left">
              <h3 className="ie-heading text-sm uppercase tracking-wider flex items-center gap-1.5 pl-1">
                <HelpCircle className="w-4 h-4 text-[var(--gold)] shrink-0" />
                Preguntas frecuentes
              </h3>
              <div className="space-y-2.5">
                {activeFaqs.map((faq, idx) => {
                  const isOpen = activeFaqIdx === idx;
                  return (
                    <article key={faq.id} className="ie-faq-item">
                      <button type="button" onClick={() => handleFaqToggle(idx)} className="ie-faq-trigger">
                        <span className="pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={collapseHeight}
                            className="overflow-hidden"
                          >
                            <div className="ie-faq-answer">{faq.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
