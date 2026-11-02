import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ScrollNavigator } from "../components/motion/ScrollNavigator";
import { DotGrid } from "../components/react-bits/DotGrid";
import { Seo } from "../components/Seo";
import { ArticlesSection } from "../sections/Articles";
import { CareerSection } from "../sections/Career";
import { ContactSection } from "../sections/Contact";
import { HeroSection } from "../sections/Hero";
import { UXLabSection } from "../sections/UXLab";


export const Home = () => (
    <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#08080c] font-sans text-zinc-200">
        <Seo path="/" />
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            <DotGrid />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,12,0.24)_58%,rgba(8,8,12,0.74)_100%)]" />
        </div>

        <div className="relative z-10">
            <Header />
            <ScrollNavigator />
            <main className="pb-20 pt-24">
                <HeroSection />
                <UXLabSection />
                <CareerSection />
                <ArticlesSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    </div>
);
