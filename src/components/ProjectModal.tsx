import { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { ProjectSummary, ServiceId } from '../utils/inquiryLogic';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectSummary | null;
  onClose: () => void;
  onQuoteSimilar: (serviceId: ServiceId) => void;
}

function mapCategoryToService(category: ProjectSummary['category']): ServiceId {
  switch (category) {
    case 'Apps Móviles':
      return 'app-movil';
    case 'Web Corporativa':
      return 'web-corporativa';
    case 'Sistemas Web':
    default:
      return 'sistema-web';
  }
}

export function ProjectModal({
  project,
  onClose,
  onQuoteSimilar,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-2xl shadow-xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-zinc-200/80">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-medium text-zinc-800">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-nums">{project.year}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar caso de estudio"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-[16/9] w-full bg-zinc-100 border-b border-zinc-200/80 overflow-hidden">
          <ResilientImage
            src={project.imageUrl}
            alt={project.imageAlt}
            fallbackTitle={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3
              id="project-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3"
            >
              {project.title}
            </h3>
            <p className="font-mono-nums text-base font-semibold text-[#2563EB]">
              {project.impactMetric}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-200/80">
            <div>
              <h4 className="text-sm font-semibold text-zinc-950 mb-2">
                El desafío del cliente
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-950 mb-2">
                Solución desarrollada por pytech
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1">
                Arquitectura y tecnologías
              </p>
              <p className="text-sm font-medium text-zinc-800">
                {project.stack.join(' · ')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onQuoteSimilar(mapCategoryToService(project.category));
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-zinc-950 hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              Cotizar solución similar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
