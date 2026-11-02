import { SectionTitle } from '../components/ui/SectionTitle';
import { UXCase } from '../components/cards/UXCaseCard';
import { projects } from '../content';

export const UXLabSection = () => {
    return (
        <section id="ux-lab" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_02"
                subtitle="Problemas reais transformados em software, do entendimento à entrega."
            >
                PROJETOS SELECIONADOS
            </SectionTitle>

            <div className="mt-12 grid grid-cols-1 gap-10 md:gap-12">
                {projects.map((project) => (
                    <UXCase key={project.id} data={project} />
                ))}
            </div>
        </section>
    );
};
