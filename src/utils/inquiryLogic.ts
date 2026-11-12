export type ProjectCategory =
  | 'Todos'
  | 'Sistemas Web'
  | 'Apps Móviles'
  | 'Web Corporativa';

export type ServiceId =
  | 'web-corporativa'
  | 'sistema-web'
  | 'app-movil'
  | 'arquitectura-cloud';

export interface ProjectSummary {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  client: string;
  year: string;
  impactMetric: string;
  summary: string;
  challenge: string;
  solution: string;
  stack: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  service: ServiceId;
  budget: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

export interface ScopeEstimate {
  label: string;
  estimatedWeeks: string;
  deliverables: string[];
}

export function filterProjectsByCategory(
  projects: ProjectSummary[],
  category: ProjectCategory
): ProjectSummary[] {
  if (category === 'Todos') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function estimateProjectScope(
  service: ServiceId,
  budget: string
): ScopeEstimate {
  const isEnterpriseBudget =
    budget === '$15,000+ USD' || budget === '$8,000 – $15,000 USD';

  switch (service) {
    case 'web-corporativa':
      return {
        label: 'Web Corporativa & Conversión',
        estimatedWeeks: isEnterpriseBudget ? '3 – 5 semanas' : '2 – 4 semanas',
        deliverables: [
          'Diseño UI/UX editorial a medida',
          'Desarrollo rápido optimizado para SEO técnico',
          'Integración de formularios, analítica y CMS',
        ],
      };
    case 'sistema-web':
      return {
        label: 'Sistema Web / Plataforma SaaS',
        estimatedWeeks: isEnterpriseBudget ? '8 – 14 semanas' : '6 – 10 semanas',
        deliverables: [
          'Arquitectura de base de datos y roles de usuario',
          'Panel operativo en tiempo real y reportes',
          'APIs seguras, pruebas automatizadas y despliegue cloud',
        ],
      };
    case 'app-movil':
      return {
        label: 'Aplicación Móvil iOS & Android',
        estimatedWeeks: isEnterpriseBudget ? '10 – 16 semanas' : '8 – 12 semanas',
        deliverables: [
          'Prototipo interactivo y experiencia táctil fluida',
          'App multiplataforma con sincronización offline',
          'Publicación en App Store y Google Play Store',
        ],
      };
    case 'arquitectura-cloud':
      return {
        label: 'APIs, Automatización & Cloud',
        estimatedWeeks: isEnterpriseBudget ? '4 – 8 semanas' : '3 – 6 semanas',
        deliverables: [
          'Integración de pasarelas de pago, ERP y CRM',
          'Microservicios escalables y observabilidad',
          'Auditoría de rendimiento y seguridad',
        ],
      };
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(
  input: ContactFormInput
): { valid: boolean; errors: ContactFormErrors } {
  const errors: ContactFormErrors = {};

  const trimmedName = input.name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Ingresa tu nombre completo (mínimo 2 caracteres).';
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Ingresa un correo electrónico de contacto.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'El formato del correo electrónico no es válido.';
  }

  if (!input.service) {
    errors.service = 'Selecciona el tipo de solución que necesitas.';
  }

  if (!input.budget) {
    errors.budget = 'Selecciona un rango de inversión estimado.';
  }

  const trimmedMessage = input.message.trim();
  if (trimmedMessage.length < 15) {
    errors.message =
      'Cuéntanos brevemente tu objetivo o requerimientos (mínimo 15 caracteres).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
