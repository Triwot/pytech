import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/consultancyData';
import {
  filterProjectsByCategory,
  type ProjectCategory,
  type ProjectSummary,
} from '../utils/inquiryLogic';
import { ResilientImage } from './ResilientImage';

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectSummary) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'Todos',
  'Sistemas Web',
  'Apps Móviles',
  'Web Corporativa',
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  const filteredProjects = filterProjectsByCategory(PROJECTS, activeCategory);

  return (
    <section id="proyectos" className="scroll-mt-20 py-20 lg:py-28 border-b border-zinc-200/80 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#2563EB] mb-3">
              Casos de éxito
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950"
              style={{ textWrap: 'balance' }}
            >
              Proyectos construidos con impacto medible.
            </h2>
          </div>

          {/* Interactive category filter control */}
          <div
            role="group"
            aria-label="Filtrar proyectos por categoría"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-200/70 rounded-xl self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    active
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center border border-zinc-200 rounded-2xl bg-white">
            <p className="text-sm text-zinc-600">
              No hay proyectos disponibles en esta categoría por el momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={`${activeCategory}-${project.id}`}
                initial={{ opacity: 0.7, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, delay: index * 0.03, ease: EASE_OUT_EXPO }}
                className="group flex flex-col justify-between bg-white border border-zinc-200/90 rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors duration-150"
              >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 border-b border-zinc-200/70">
                      <ResilientImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-3">
                        <span className="font-medium text-zinc-700">
                          {project.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.client}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-nums">{project.year}</span>
                      </div>

                      <h3 className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-zinc-950 mb-2.5">
                        {project.title}
                      </h3>

                      <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                        {project.summary}
                      </p>

                      <p className="font-mono-nums text-sm font-semibold text-[#2563EB]">
                        {project.impactMetric}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 py-4 border-t border-zinc-100 flex items-center justify-between gap-4 bg-zinc-50/60">
                    <span className="text-xs text-zinc-500 truncate">
                      {project.stack.join(' · ')}
                    </span>

                    <button
                      type="button"
                      onClick={() => onOpenProject(project)}
                      aria-label={`Ver caso de estudio de ${project.title}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                    >
                      Ver caso
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
