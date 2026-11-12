import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Copy, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BUDGET_OPTIONS,
  CONTACT_INFO,
  SERVICES,
} from '../data/consultancyData';
import {
  estimateProjectScope,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormInput,
  type ServiceId,
} from '../utils/inquiryLogic';

interface ContactSectionProps {
  selectedService: ServiceId;
  onServiceChange: (service: ServiceId) => void;
}

export function ContactSection({
  selectedService,
  onServiceChange,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedInquiry, setSubmittedInquiry] =
    useState<ContactFormInput | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scopeEstimate = estimateProjectScope(selectedService, budget);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: ContactFormInput = {
      name,
      email,
      service: selectedService,
      budget,
      message,
    };

    const validation = validateContactForm(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedInquiry(payload);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setSubmittedInquiry(null);
  };

  return (
    <section id="contacto" className="scroll-mt-20 py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left column: Direct contact + Live Scope Estimator */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-sm font-medium text-[#2563EB] mb-3">
                Contacto directo
              </p>
              <h2
                className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 mb-4"
                style={{ textWrap: 'balance' }}
              >
                Cuéntanos qué necesitas construir.
              </h2>
              <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
                Agenda una conversación técnica con Gerson Flores y Daniela Rojas. Analizamos tu
                idea y te enviamos una propuesta clara con alcance, tiempos e inversión.
              </p>
            </div>

            {/* Live Scope Estimator Summary */}
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white space-y-4">
              <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-zinc-100">
                <span className="text-xs font-semibold text-zinc-500">
                  Estimación referencial
                </span>
                <span className="font-mono-nums text-sm font-semibold text-[#2563EB]">
                  {scopeEstimate.estimatedWeeks}
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-950 mb-2">
                  {scopeEstimate.label}
                </p>
                <ul className="space-y-2">
                  {scopeEstimate.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-zinc-600"
                    >
                      <Check
                        className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-zinc-200 bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500">Correo directo</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm font-medium text-zinc-950 hover:text-[#2563EB] transition-colors truncate block"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copiar correo electrónico"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-start gap-3 px-1 text-xs text-zinc-500">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-700">{CONTACT_INFO.location}</p>
                  <p className="mt-0.5">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Validated Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl border border-zinc-200 bg-white">
              {submittedInquiry ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="py-6 space-y-6"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                    <Check className="w-5 h-5" strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-zinc-950 mb-2">
                      Solicitud recibida correctamente
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Gracias, <span className="font-semibold text-zinc-900">{submittedInquiry.name}</span>.
                      Gerson Flores y Daniela Rojas revisarán tu propuesta y te responderán a{' '}
                      <span className="font-semibold text-zinc-900">{submittedInquiry.email}</span>{' '}
                      en menos de 24 horas hábiles.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2 text-sm">
                    <p className="text-zinc-500 text-xs font-medium">
                      Resumen enviado
                    </p>
                    <p className="text-zinc-900">
                      <span className="font-semibold">Solución:</span>{' '}
                      {SERVICES.find((s) => s.id === submittedInquiry.service)?.title}
                    </p>
                    <p className="text-zinc-900">
                      <span className="font-semibold">Inversión estimada:</span>{' '}
                      <span className="font-mono-nums">{submittedInquiry.budget}</span>
                    </p>
                    <p className="text-zinc-700 pt-1 border-t border-zinc-200/70">
                      {submittedInquiry.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-zinc-950 border border-zinc-300 hover:border-zinc-950 rounded-lg transition-colors cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-zinc-900 mb-1.5"
                      >
                        Nombre completo
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Ej. Andrea Paredes"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                          errors.name ? 'border-red-600' : 'border-zinc-300'
                        }`}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-600 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-zinc-900 mb-1.5"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="nombre@empresa.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                          errors.email ? 'border-red-600' : 'border-zinc-300'
                        }`}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-red-600 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-sm font-medium text-zinc-900 mb-1.5"
                      >
                        Tipo de proyecto
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={selectedService}
                        onChange={(e) => onServiceChange(e.target.value as ServiceId)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white text-zinc-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      >
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-sm font-medium text-zinc-900 mb-1.5"
                      >
                        Inversión estimada
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white text-zinc-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      >
                        {BUDGET_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-zinc-900 mb-1.5"
                    >
                      Cuéntanos sobre tu proyecto
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Describe qué deseas resolver, qué plataformas necesitas (web, sistema interno o app móvil) y tu fecha objetivo..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                        errors.message ? 'border-red-600' : 'border-zinc-300'
                      }`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-600 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                      Respuesta garantizada en menos de 24 horas hábiles.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-zinc-950 hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                    >
                      Enviar solicitud
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
