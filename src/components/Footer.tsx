import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data/consultancyData';
import { EASE_OUT_EXPO, VIEWPORT_CONFIG } from './MotionPrimitives';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <a
            href="#inicio"
            className="font-display text-lg font-bold tracking-tight text-zinc-950"
          >
            pytech
          </a>
          <p className="text-xs text-zinc-500 mt-1.5">
            Consultoría tecnológica fundada por Gerson Flores y Daniela Rojas.
          </p>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
          aria-label="Enlaces de pie de página"
          className="flex flex-wrap items-center gap-6 text-sm text-zinc-600"
        >
          <a href="#servicios" className="hover:text-zinc-950 transition-colors">
            Servicios
          </a>
          <a href="#proyectos" className="hover:text-zinc-950 transition-colors">
            Proyectos
          </a>
          <a href="#fundadores" className="hover:text-zinc-950 transition-colors">
            Fundadores
          </a>
          <a href="#contacto" className="hover:text-zinc-950 transition-colors">
            Contacto
          </a>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.45, delay: 0.16, ease: EASE_OUT_EXPO }}
          className="text-xs text-zinc-500 md:text-right"
        >
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="font-medium text-zinc-800 hover:text-[#2563EB] transition-colors block"
          >
            {CONTACT_INFO.email}
          </a>
          <p className="mt-1">© 2026 pytech. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}
