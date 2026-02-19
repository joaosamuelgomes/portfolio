import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Seus componentes atuais de layout e seções
import { Header } from './components/layout/Header';
import { HeroSection } from './sections/Hero';
import { CareerSection } from './sections/Career';
import { UXLabSection } from './sections/UXLab';
import { PlaygroundSection } from './sections/Playground';
import { ContactSection } from './sections/Contact';
import { Footer } from './components/layout/Footer';
import { CaseStudy } from './pages/CaseStudy';

// 1. Isolamos a sua Single Page Application atual em um componente
const Home = () => (
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

// 2. O App principal agora atua exclusivamente como o roteador
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz exibe o portfólio completo */}
        <Route path="/" element={<Home />} />
        
        {/* Rota dinâmica para os cases de UX */}
        <Route path="/case/:id" element={<CaseStudy/>} />
      </Routes>
    </BrowserRouter>
  );
}