import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HeroSection } from './sections/Hero';
import { CareerSection } from './sections/Career';
import { UXLabSection } from './sections/UXLab';
import { PlaygroundSection } from './sections/Playground';
import { ContactSection } from './sections/Contact';
import { Footer } from './components/layout/Footer';
import { CaseStudy } from './pages/CaseStudy'; // <--- Importe a sua página

const Home = () => (
  <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans">
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* O :id é a variável que o useParams vai ler na CaseStudy */}
        <Route path="/case/:id" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}