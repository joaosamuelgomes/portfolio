import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { CareerSection } from "../sections/Career";
import { ContactSection } from "../sections/Contact";
import { HeroSection } from "../sections/Hero";
import { PlaygroundSection } from "../sections/Playground";
import { UXLabSection } from "../sections/UXLab";


export const Home = () => (
    <div className="min-h-screen w-full overflow-x-hidden bg-zinc-950 text-zinc-200 font-sans">
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