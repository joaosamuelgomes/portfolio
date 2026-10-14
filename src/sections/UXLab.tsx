import { SectionTitle } from '../components/ui/SectionTitle';
import { UXCase } from '../components/cards/UXCaseCard';
import { UX_CASES } from '../data/content'; 

export const UXLabSection = () => {
    return (
        <section id="ux-lab" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_03"
                subtitle="Problemas reais transformados em software, do entendimento à entrega."
            >
                PROJETOS SELECIONADOS
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                {UX_CASES.map((project) => (
                    <UXCase key={project.id} data={project} />
                ))}
            </div>
        </section>
    );
};
