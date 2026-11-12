import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateProjectScope,
  filterProjectsByCategory,
  validateContactForm,
  type ProjectSummary,
} from './inquiryLogic';

const SAMPLE_PROJECTS: ProjectSummary[] = [
  {
    id: 'p1',
    title: 'Nexus ERP Logística',
    category: 'Sistemas Web',
    client: 'TransAndes',
    year: '2026',
    impactMetric: '-62% tiempo operativo',
    summary: 'Plataforma web de control de flotas.',
    challenge: 'Procesos manuales en hojas de cálculo.',
    solution: 'Sistema web centralizado con trazabilidad.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    imageUrl: '/sample1.jpg',
    imageAlt: 'Sistema ERP',
  },
  {
    id: 'p2',
    title: 'Kora Pay Móvil',
    category: 'Apps Móviles',
    client: 'Kora Finanzas',
    year: '2025',
    impactMetric: '48,000+ usuarios activos',
    summary: 'Billetera digital para comercios.',
    challenge: 'Pagos lentos en campo.',
    solution: 'App nativa iOS/Android con QR instantáneo.',
    stack: ['React Native', 'TypeScript'],
    imageUrl: '/sample2.jpg',
    imageAlt: 'App móvil',
  },
  {
    id: 'p3',
    title: 'Estudio Nordika Web',
    category: 'Web Corporativa',
    client: 'Nordika Arquitectura',
    year: '2026',
    impactMetric: '+175% leads calificados',
    summary: 'Sitio editorial de alto rendimiento.',
    challenge: 'Baja conversión orgánica.',
    solution: 'Arquitectura web minimalista y SEO técnico.',
    stack: ['React', 'Tailwind CSS'],
    imageUrl: '/sample3.jpg',
    imageAlt: 'Web corporativa',
  },
];

test('filterProjectsByCategory returns all projects when Todos is selected', () => {
  const result = filterProjectsByCategory(SAMPLE_PROJECTS, 'Todos');
  assert.equal(result.length, 3);
});

test('filterProjectsByCategory filters accurately by category', () => {
  const mobile = filterProjectsByCategory(SAMPLE_PROJECTS, 'Apps Móviles');
  assert.equal(mobile.length, 1);
  assert.equal(mobile[0].id, 'p2');

  const systems = filterProjectsByCategory(SAMPLE_PROJECTS, 'Sistemas Web');
  assert.equal(systems.length, 1);
  assert.equal(systems[0].id, 'p1');
});

test('estimateProjectScope scales timeline based on service and budget', () => {
  const standardSystem = estimateProjectScope('sistema-web', '$4,000 – $8,000 USD');
  const enterpriseSystem = estimateProjectScope('sistema-web', '$15,000+ USD');
  assert.equal(standardSystem.estimatedWeeks, '6 – 10 semanas');
  assert.equal(enterpriseSystem.estimatedWeeks, '8 – 14 semanas');
  assert.equal(enterpriseSystem.deliverables.length, 3);
});

test('validateContactForm rejects empty or invalid inputs with clear field errors', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'correo-invalido',
    service: 'sistema-web',
    budget: '',
    message: 'Hola',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.budget);
  assert.ok(invalid.errors.message);
});

test('validateContactForm accepts valid complete inquiry', () => {
  const valid = validateContactForm({
    name: 'Carlos Mendoza',
    email: 'carlos@empresa.pe',
    service: 'app-movil',
    budget: '$8,000 – $15,000 USD',
    message: 'Necesitamos desarrollar una aplicación móvil para pedidos B2B en tiempo real.',
  });

  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
