import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_MEDIA, KEY_METRICS } from '../data/consultancyData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onStartProject: () => void;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ onStartProject }: HeroSectionProps) {
  return (
    <section id="inicio" className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Value proposition & single primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <p className="text-sm font-medium text-[#2563EB] mb-4">
                Consultoría web · Sistemas a medida · Apps móviles
              </p>

              <h1
                className="font-display font-bold tracking-tight text-zinc-950 leading-[1.08] mb-6"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                  textWrap: 'balance',
                }}
              >
                Convertimos ideas complejas en software elegante y escalable.
              </h1>

              <p className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl mb-8">
                En <span className="font-semibold text-zinc-950">pytech</span>, Gerson Flores y
                Daniela Rojas diseñamos y desarrollamos páginas web de alto impacto, sistemas
                empresariales y aplicaciones móviles personalizadas para negocios que buscan
                innovación real y resultados medibles.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onStartProject}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-zinc-950 hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                >
                  Iniciar proyecto
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href="#proyectos"
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-950 border-b border-zinc-300 hover:border-zinc-950 pb-0.5 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Explorar proyectos
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-200/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
              <span>Fundado por Gerson Flores &amp; Daniela Rojas</span>
              <span aria-hidden="true">·</span>
              <span>Desarrollo 100% personalizado</span>
              <span aria-hidden="true">·</span>
              <span>Atención directa sin intermediarios</span>
            </div>
          </motion.div>

          {/* Right column: Full-height 16:9 studio visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 flex"
          >
            <div className="w-full rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-100 aspect-video lg:aspect-auto lg:h-full min-h-[280px]">
              <ResilientImage
                src={HERO_MEDIA.imageUrl}
                alt={HERO_MEDIA.imageAlt}
                fallbackTitle="pytech — Estudio de Ingeniería Digital"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-column metrics strip below split */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: EASE_OUT_EXPO }}
          className="mt-14 pt-10 border-t border-zinc-200/80 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {KEY_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <p className="font-mono-nums text-2xl lg:text-3xl font-medium tracking-tight text-zinc-950">
                {metric.value}
              </p>
              <p className="text-sm font-semibold text-zinc-900">{metric.label}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{metric.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
