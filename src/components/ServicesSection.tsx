import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, type ServiceItem } from '../data/consultancyData';
import type { ServiceId } from '../utils/inquiryLogic';

interface ServicesSectionProps {
  selectedService: ServiceId;
  onSelectServiceForQuote: (serviceId: ServiceId) => void;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function ServicesSection({
  selectedService,
  onSelectServiceForQuote,
}: ServicesSectionProps) {
  return (
    <section id="servicios" className="scroll-mt-20 py-20 lg:py-28 border-b border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] mb-3">
              Capacidades técnicas
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950"
              style={{ textWrap: 'balance' }}
            >
              Desde páginas web veloces hasta sistemas empresariales y apps móviles.
            </h2>
          </div>
          <p className="text-sm lg:text-base text-zinc-600 max-w-md leading-relaxed">
            No usamos plantillas genéricas. Cada arquitectura se diseña desde cero según los
            objetivos operativos y de crecimiento de tu negocio.
          </p>
        </div>

        {/* Asymmetric Bento Grid (Row 1: 2+1, Row 2: 1+2) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service: ServiceItem, index: number) => {
            const isSelected = selectedService === service.id;
            const colSpanClass =
              index === 0 || index === 3 ? 'lg:col-span-2' : 'lg:col-span-1';

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 1, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.25, delay: index * 0.03, ease: EASE_OUT_EXPO }}
                className={`${colSpanClass} flex flex-col justify-between p-7 lg:p-8 rounded-2xl border transition-colors duration-150 ${
                  isSelected
                    ? 'border-[#2563EB] bg-[#FAFAFA]'
                    : 'border-zinc-200 bg-[#FAFAFA] hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h3 className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-zinc-950">
                      <span className="font-mono-nums text-[#2563EB] mr-2.5 text-lg">
                        {service.index}
                      </span>
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm font-medium text-zinc-500 mb-3">
                    {service.subtitle}
                  </p>

                  <p className="text-sm lg:text-base text-zinc-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-700"
                      >
                        <Check
                          className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-medium text-zinc-500">
                    {service.stackLabel}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 hover:text-[#2563EB] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                  >
                    Solicitar propuesta
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
