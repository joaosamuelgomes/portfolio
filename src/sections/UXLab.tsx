import { SectionTitle } from '../components/ui/SectionTitle';
import { UXCase } from '../components/cards/UXCaseCard';
import { UX_CASES } from '../data/content'; 

export const UXLabSection = () => {
    return (
        <section id="ux-lab" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_03"
                subtitle="Estudos de caso da descoberta à implementação, conectando estratégia de produto, UX e engenharia."
            >
                PROJETOS
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                {[...UX_CASES].sort((a, b) => a.id - b.id).map((project) => (
                    <UXCase key={project.id} data={project} />
                ))}
            </div>
        </section>
    );
};
