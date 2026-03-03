import { SectionTitle } from '../components/ui/SectionTitle';
import { UXCase } from '../components/cards/UXCaseCard';
import { UX_CASES } from '../data/content'; 

export const UXLabSection = () => {
    return (
        <section id="ux-lab" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
            <SectionTitle subtitle="Case Studies com foco em resolução de problemas complexos.">
                UI/UX Lab
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
                {UX_CASES.map((project) => (
                    <UXCase key={project.id} data={project} />
                ))}
            </div>
        </section>
    );
};