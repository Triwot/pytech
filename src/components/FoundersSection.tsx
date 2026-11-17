import { Check, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { CLIENT_TESTIMONIAL, FOUNDERS } from '../data/consultancyData';
import {
  EASE_OUT_EXPO,
  RevealBlock,
  TrainText,
  VIEWPORT_CONFIG,
} from './MotionPrimitives';

export function FoundersSection() {
  return (
    <section id="fundadores" className="scroll-mt-20 py-20 lg:py-28 border-b border-zinc-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-end">
          <div className="lg:col-span-7">
            <RevealBlock y={10}>
              <p className="text-sm font-medium text-[#2563EB] mb-3">
                Liderazgo técnico y de producto
              </p>
            </RevealBlock>
            <TrainText
              as="h2"
              text="Dos fundadores involucrados directamente en cada línea de código."
              delay={0.08}
              stagger={0.055}
              duration={0.5}
              className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950"
              style={{ textWrap: 'balance' }}
            />
          </div>
          <RevealBlock delay={0.28} y={12} className="lg:col-span-5">
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
              En pytech trabajas directamente con quienes diseñan la arquitectura y programan tu
              producto. Nuestra experiencia abarca proyectos personalizados para logística,
              fintech, salud, comercio y servicios profesionales.
            </p>
          </RevealBlock>
        </div>

        {/* Founders 2-column profile grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {FOUNDERS.map((founder, index) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.5, delay: 0.08 + index * 0.12, ease: EASE_OUT_EXPO }}
              className="p-7 lg:p-8 rounded-2xl border border-zinc-200 bg-[#FAFAFA] flex flex-col justify-between"
            >
              <div>
                <div className="mb-6">
                  <h3 className="font-display text-xl lg:text-2xl font-bold tracking-tight text-zinc-950">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-[#2563EB] mt-0.5">
                    {founder.role}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">{founder.specialty}</p>
                </div>

                <p className="text-sm lg:text-base text-zinc-600 leading-relaxed mb-6">
                  {founder.bio}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200/80">
                <p className="text-xs font-semibold text-zinc-900 mb-3">
                  Experiencia clave
                </p>
                <ul className="space-y-2">
                  {founder.experienceHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-zinc-700"
                    >
                      <Check
                        className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Adjacent social proof testimonial (clean hairline container, no left thick border) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="p-7 lg:p-10 rounded-2xl border border-zinc-200 bg-zinc-950 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <Quote className="w-6 h-6 text-[#60A5FA] mb-4" strokeWidth={1.75} />
              <blockquote className="text-base lg:text-lg text-zinc-100 leading-relaxed font-normal">
                “{CLIENT_TESTIMONIAL.quote}”
              </blockquote>
            </div>
            <div className="lg:col-span-4 lg:text-right border-t lg:border-t-0 lg:border-l border-zinc-800 pt-4 lg:pt-0 lg:pl-6">
              <p className="font-display text-base font-semibold text-white">
                {CLIENT_TESTIMONIAL.author}
              </p>
              <p className="text-sm text-zinc-400 mt-1">{CLIENT_TESTIMONIAL.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
