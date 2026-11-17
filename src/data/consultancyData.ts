import heroStudioImg from '../assets/images/hero_pytech_studio_1794511566257.jpg';
import projectErpImg from '../assets/images/project_system_erp_1794511565561.jpg';
import projectMobileImg from '../assets/images/project_mobile_app_1794511567622.jpg';
import projectWebImg from '../assets/images/project_web_platform_1794511567236.jpg';
import founderGersonImg from '../assets/images/founder_gerson_1794511568029.jpg';
import founderDanielaImg from '../assets/images/founder_daniela_1794511569003.jpg';
import type { ProjectSummary, ServiceId } from '../utils/inquiryLogic';

export const HERO_MEDIA = {
  imageUrl: heroStudioImg,
  imageAlt:
    'Estudio de ingeniería y consultoría tecnológica pytech con estación de trabajo minimalista',
};

export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export const KEY_METRICS: MetricItem[] = [
  {
    value: '+22',
    label: 'Productos lanzados',
    detail: 'Web, sistemas ERP y apps móviles en producción',
  },
  {
    value: '98%',
    label: 'Retención de clientes',
    detail: 'Empresas que escalan sus plataformas con nosotros',
  },
  {
    value: '2+ años',
    label: 'Experiencia combinada',
    detail: 'Arquitectura de software, producto y diseño',
  },
  {
    value: '< 12 h',
    label: 'Respuesta técnica',
    detail: 'Diagnóstico directo con los fundadores',
  },
];

export interface ServiceItem {
  id: ServiceId;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  stackLabel: string;
  featured?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'sistema-web',
    index: '01.',
    title: 'Sistemas Web a Medida',
    subtitle: 'Plataformas operativas, ERP, CRM y SaaS',
    description:
      'Diseñamos y programamos sistemas internos, portales de clientes y plataformas SaaS adaptadas al flujo exacto de tu empresa, eliminando procesos manuales y hojas de cálculo desconectadas.',
    deliverables: [
      'Paneles administrativos en tiempo real y control de roles',
      'Automatización de facturación, inventario y flujos comerciales',
      'Bases de datos escalables con respaldos y auditoría',
    ],
    stackLabel: 'React · TypeScript · Node.js · PostgreSQL',
    featured: true,
  },
  {
    id: 'app-movil',
    index: '02.',
    title: 'Aplicaciones Móviles',
    subtitle: 'iOS y Android con experiencia fluida',
    description:
      'Construimos aplicaciones móviles rápidas, intuitivas y listas para operar incluso con conectividad limitada, desde apps de consumo hasta herramientas de campo.',
    deliverables: [
      'Despliegue unificado en App Store y Google Play',
      'Notificaciones push, geolocalización y pagos integrados',
      'Sincronización offline y biometría nativa',
    ],
    stackLabel: 'React Native · Expo · Swift · Kotlin',
    featured: true,
  },
  {
    id: 'web-corporativa',
    index: '03.',
    title: 'Páginas Web y E-Commerce',
    subtitle: 'Sitios de alto impacto orientados a conversión',
    description:
      'Creamos presencias digitales veloces, minimalistas y memorables que comunican el valor real de tu marca y convierten visitas en oportunidades comerciales medibles.',
    deliverables: [
      'Diseño editorial único con animaciones de alto rendimiento',
      'SEO técnico estructurado y tiempos de carga inferiores a 1 s',
      'Tiendas online con pasarelas de pago locales e internacionales',
    ],
    stackLabel: 'Next.js · Vite · Tailwind · Stripe',
  },
  {
    id: 'arquitectura-cloud',
    index: '04.',
    title: 'APIs, Cloud y Soluciones Especiales',
    subtitle: 'Integraciones, automatización e inteligencia aplicada',
    description:
      'Si puedes imaginarlo, podemos modelar su arquitectura. Conectamos sistemas legados, integramos asistentes inteligentes y optimizamos infraestructura en la nube.',
    deliverables: [
      'Integración de ERPs, CRMs y webhooks personalizados',
      'Flujos con IA generativa y procesamiento documental',
      'Despliegue continuo, monitoreo y optimización de costos cloud',
    ],
    stackLabel: 'Python · Go · Docker · Google Cloud / AWS',
  },
];

export const PROJECTS: ProjectSummary[] = [
  {
    id: 'nexus-logistica',
    title: 'AndesFlow ERP Logístico',
    category: 'Sistemas Web',
    client: 'Grupo TransAndes',
    year: '2026',
    impactMetric: '-64% tiempo en cierre operativo mensual',
    summary:
      'Sistema web integral para despacho de flotas, control de inventarios en 8 almacenes y facturación electrónica automatizada.',
    challenge:
      'La operación dependía de múltiples archivos de Excel sin trazabilidad en tiempo real, generando errores de stock y demoras de hasta 4 días en reportes gerenciales.',
    solution:
      'Construimos una plataforma web multi-sucursal con permisos granulares, lectura de códigos QR en bodega, conciliación automática y tableros financieros instantáneos.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    imageUrl: projectErpImg,
    imageAlt: 'Computadora portátil mostrando el sistema web AndesFlow ERP Logístico',
  },
  {
    id: 'kora-fintech',
    title: 'Kora Pay — Billetera y Cobros Móviles',
    category: 'Apps Móviles',
    client: 'Kora Servicios Financieros',
    year: '2025',
    impactMetric: '+48,000 comercios activos en 9 meses',
    summary:
      'Aplicación móvil para iOS y Android que permite cobros instantáneos con QR, links de pago y conciliación diaria para comercios independientes.',
    challenge:
      'Los comercios necesitaban una app ultraligera que funcionara sin fricción en dispositivos de gama media y redes móviles inestables.',
    solution:
      'Desarrollamos una arquitectura offline-first con autenticación biométrica, generación inmediata de comprobantes digitales y panel web de tesorería.',
    stack: ['React Native', 'TypeScript', 'Node.js', 'Redis', 'Google Cloud'],
    imageUrl: projectMobileImg,
    imageAlt: 'Teléfono móvil sobre piedra travertino mostrando la app Kora Pay',
  },
  {
    id: 'nordika-plataforma',
    title: 'Estudio Nordika — Portal y Configurador Web',
    category: 'Web Corporativa',
    client: 'Nordika Arquitectura',
    year: '2026',
    impactMetric: '+180% solicitudes de proyecto en 4 meses',
    summary:
      'Plataforma web editorial con catálogo arquitectónico interactivo, estimador de presupuesto en línea y agenda automatizada de reuniones.',
    challenge:
      'Su sitio anterior no reflejaba la precisión de sus obras y los prospectos llegaban sin información clara de alcance ni presupuesto.',
    solution:
      'Diseñamos una experiencia web minimalista con carga instantánea de galerías en alta resolución y un flujo de calificación previo a la llamada comercial.',
    stack: ['React', 'Vite', 'Motion', 'Tailwind CSS'],
    imageUrl: projectWebImg,
    imageAlt: 'Monitor de estudio mostrando la plataforma web de Estudio Nordika',
  },
];

export interface FounderProfile {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  experienceHighlights: string[];
  imageUrl: string;
  imageAlt: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    name: 'Gerson Flores',
    role: 'Co-fundador · Arquitectura de Software & Sistemas Web',
    specialty: 'Sistemas escalables, Backend, APIs & Cloud',
    bio: 'Especialista en transformar reglas de negocio complejas en sistemas web rápidos, seguros y mantenibles. Ha liderado implementaciones de plataformas ERP, pasarelas de pago e integraciones críticas para empresas de logística, retail y servicios financieros.',
    experienceHighlights: [
      'Arquitectura full-stack y modelado de datos de alto volumen',
      'Automatización operativa e integración con sistemas empresariales',
      'Optimización de rendimiento, seguridad y despliegue continuo',
    ],
    imageUrl: founderGersonImg,
    imageAlt: 'Retrato editorial de Gerson Flores, co-fundador de pytech',
  },
  {
    name: 'Daniela Rojas',
    role: 'Co-fundadora · Producto Digital, Frontend & Apps Móviles',
    specialty: 'Diseño de Producto, Web Interactiva & Mobile',
    bio: 'Ingeniera enfocada en crear interfaces claras, accesibles y de precisión milimétrica tanto en web como en dispositivos móviles. Dirige la experiencia de usuario y el desarrollo frontend en pytech, cuidando cada transición y detalle funcional.',
    experienceHighlights: [
      'Aplicaciones móviles iOS y Android orientadas a retención',
      'Sistemas de diseño minimalistas y animaciones fluidas a 60 fps',
      'Investigación de producto y validación temprana con usuarios reales',
    ],
    imageUrl: founderDanielaImg,
    imageAlt: 'Retrato editorial de Daniela Rojas, co-fundadora de pytech',
  },
];

export const CLIENT_TESTIMONIAL = {
  quote:
    'Antes operábamos con cuatro herramientas distintas y reportes manuales cada semana. Gerson y Daniela entendieron nuestra operación desde el primer día y construyeron un sistema web a medida que redujo nuestro cierre mensual en más de un 60%.',
  author: 'Rodrigo Salgado',
  role: 'Director de Operaciones, Grupo TransAndes',
};

export interface WhatsAppContact {
  id: string;
  displayPhone: string;
  waNumber: string;
}

export const WHATSAPP_CONTACTS: WhatsAppContact[] = [
  {
    id: 'wa-primary',
    displayPhone: '+591 60107969',
    waNumber: '59160107969',
  },
  {
    id: 'wa-secondary',
    displayPhone: '+591 68120045',
    waNumber: '59168120045',
  },
];

export const CONTACT_INFO = {
  email: 'gersonfloresgato18@gmail.com',
  studioEmail: 'hola@pytech.dev',
  location: 'Consultoría remota para Latinoamérica, EE. UU. y Europa',
  hours: 'Lunes a Viernes · 09:00 – 19:00',
};
