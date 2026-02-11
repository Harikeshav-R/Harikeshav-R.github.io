import { RevealOnScroll } from './RevealOnScroll';

const experiences = [
    {
        company: "Pfizer",
        role: "Apprenticeship",
        period: "Jan 2026 - Present",
        description: "Engineered an end-to-end AI document intelligence pipeline that leverages multi-engine OCR, automated classification, and advanced RAG workflows to transform unstructured pharmaceutical and mortgage records into an interactive, queryable system."
    },
    {
        company: "Siage Solutions",
        role: "Software Engineer Intern",
        period: "Jun 2025 - Aug 2025",
        description: "Developed comprehensive AI solutions including a private, offline RAG system for secure document retrieval, an ML-powered ticketing agent for automated issue sorting, and a customer sentiment analysis pipeline that converts raw feedback into actionable visual insights."
    },
    {
        company: "Indian Institute of Technology, Madras",
        role: "Research Intern",
        period: "Jun 2023 - Oct 2023",
        description: "Engineered machine learning algorithms to model electromagnetic wave propagation in closed environments, utilizing experimental data to predict and visualize signal intensity. Authored a research paper on optimizing indoor wireless deployment by analyzing generated propagation heat maps."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">Experience.</h2>

                    <div className="relative border-l border-black/10 dark:border-white/10 ml-3 md:ml-6 space-y-12 md:space-y-16">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="relative pl-8 md:pl-12 group"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black dark:bg-white rounded-full ring-4 ring-white dark:ring-black group-hover:scale-125 transition-transform duration-300" />

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <h3 className="text-xl md:text-2xl font-bold">{exp.role}</h3>
                                    <span className="text-gray-500 font-mono text-sm mt-1 sm:mt-0">{exp.period}</span>
                                </div>
                                <div className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">{exp.company}</div>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Experience;
