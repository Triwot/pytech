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
  phone: string;
  service: ServiceId;
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

export function estimateProjectScope(service: ServiceId): ScopeEstimate {
  switch (service) {
    case 'web-corporativa':
      return {
        label: 'Web Corporativa & Conversión',
        estimatedWeeks: '1 – 2 semanas',
        deliverables: [
          'Diseño UI/UX editorial a medida',
          'Desarrollo rápido optimizado para SEO técnico',
          'Integración de formularios, analítica y CMS',
        ],
      };
    case 'sistema-web':
      return {
        label: 'Sistema Web / Plataforma SaaS',
        estimatedWeeks: '2 – 3 semanas',
        deliverables: [
          'Arquitectura de base de datos y roles de usuario',
          'Panel operativo en tiempo real y reportes',
          'APIs seguras, pruebas automatizadas y despliegue cloud',
        ],
      };
    case 'app-movil':
      return {
        label: 'Aplicación Móvil iOS & Android',
        estimatedWeeks: '3 – 4 semanas',
        deliverables: [
          'Prototipo interactivo y experiencia táctil fluida',
          'App multiplataforma con sincronización offline',
          'Publicación en App Store y Google Play Store',
        ],
      };
    case 'arquitectura-cloud':
      return {
        label: 'APIs, Automatización & Cloud',
        estimatedWeeks: '2 – 3 semanas',
        deliverables: [
          'Integración de pasarelas de pago, ERP y CRM',
          'Microservicios escalables y observabilidad',
          'Auditoría de rendimiento y seguridad',
        ],
      };
  }
}

const PHONE_FORMAT_REGEX = /^\+?[\d\s()-]{8,}$/;

export function validateContactForm(
  input: ContactFormInput
): { valid: boolean; errors: ContactFormErrors } {
  const errors: ContactFormErrors = {};

  const trimmedName = input.name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Ingresa tu nombre completo (mínimo 2 caracteres).';
  }

  const trimmedPhone = input.phone.trim();
  const digitsOnly = trimmedPhone.replace(/\D/g, '');
  const localDigits = digitsOnly.startsWith('591') ? digitsOnly.slice(3) : digitsOnly;
  if (!trimmedPhone || digitsOnly.length === 0 || (digitsOnly === '591')) {
    errors.phone = 'Ingresa tu número de celular (ej. +591 71234567).';
  } else if (
    !PHONE_FORMAT_REGEX.test(trimmedPhone) ||
    localDigits.length < 7 ||
    digitsOnly.length < 8 ||
    digitsOnly.length > 15
  ) {
    errors.phone = 'Ingresa un número de celular válido con código de país.';
  }

  if (!input.service) {
    errors.service = 'Selecciona el tipo de solución que necesitas.';
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

export function buildWhatsAppInquiryUrl(
  waNumber: string,
  input: ContactFormInput,
  serviceTitle: string
): string {
  const cleanTarget = waNumber.replace(/\D/g, '');
  const text = [
    'Hola equipo de pytech, me gustaría consultar por un proyecto:',
    '',
    `*Nombre:* ${input.name.trim()}`,
    `*Celular:* ${input.phone.trim()}`,
    `*Tipo de proyecto:* ${serviceTitle}`,
    `*Sobre el proyecto:* ${input.message.trim()}`,
  ].join('\n');

  return `https://wa.me/${cleanTarget}?text=${encodeURIComponent(text)}`;
}
