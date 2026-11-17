import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppInquiryUrl,
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

test('estimateProjectScope returns expected timeline and deliverables by service', () => {
  const standardSystem = estimateProjectScope('sistema-web');
  const mobileApp = estimateProjectScope('app-movil');
  assert.equal(standardSystem.estimatedWeeks, '2 – 3 semanas');
  assert.equal(mobileApp.estimatedWeeks, '3 – 4 semanas');
  assert.equal(standardSystem.deliverables.length, 3);
});

test('validateContactForm rejects empty or invalid inputs with clear field errors', () => {
  const invalid = validateContactForm({
    name: 'A',
    phone: '+591 ',
    service: 'sistema-web',
    message: 'Hola',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.message);
});

test('validateContactForm accepts valid complete inquiry with Bolivian phone number', () => {
  const valid = validateContactForm({
    name: 'Carlos Mendoza',
    phone: '+591 71234567',
    service: 'app-movil',
    message: 'Necesitamos desarrollar una aplicación móvil para pedidos B2B en tiempo real.',
  });

  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppInquiryUrl formats pre-filled WhatsApp message accurately', () => {
  const url = buildWhatsAppInquiryUrl(
    '59160107969',
    {
      name: 'Carlos Mendoza',
      phone: '+591 71234567',
      service: 'sistema-web',
      message: 'Queremos un sistema ERP para 5 sucursales en La Paz.',
    },
    'Sistemas Web a Medida'
  );

  assert.ok(url.startsWith('https://wa.me/59160107969?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('Carlos Mendoza'));
  assert.ok(decoded.includes('+591 71234567'));
  assert.ok(decoded.includes('Sistemas Web a Medida'));
  assert.ok(decoded.includes('Queremos un sistema ERP para 5 sucursales en La Paz.'));
});
