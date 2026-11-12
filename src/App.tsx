/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { FoundersSection } from './components/FoundersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import type { ProjectSummary, ServiceId } from './utils/inquiryLogic';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>('sistema-web');
  const [activeProject, setActiveProject] = useState<ProjectSummary | null>(null);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
    scrollToContact();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0A0A0A]">
        <Navbar onScheduleClick={scrollToContact} />

        <main className="flex-1">
          <HeroSection onStartProject={scrollToContact} />

          <ServicesSection
            selectedService={selectedService}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />

          <ProjectsSection onOpenProject={setActiveProject} />

          <FoundersSection />

          <ContactSection
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
        </main>

        <Footer />

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onQuoteSimilar={handleSelectServiceForQuote}
        />
      </div>
    </MotionConfig>
  );
}
