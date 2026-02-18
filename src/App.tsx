import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './sections/Hero';
import { CareerSection } from './sections/Career';
import { UXLabSection } from './sections/UXLab';
import { PlaygroundSection } from './sections/Playground';
import { ContactSection } from './sections/Contact';
import { Footer } from './components/layout/Footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      <Header />
      <main className="pt-24 pb-20">
        <HeroSection />
        <CareerSection />
        <UXLabSection />
        <PlaygroundSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}