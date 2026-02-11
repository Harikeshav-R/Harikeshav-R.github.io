import { RevealOnScroll } from './RevealOnScroll';

const experiences = [
    {
        company: "Tech Corp Inc.",
        role: "Senior Full Stack Developer",
        period: "2023 - Present",
        description: "Leading the development of scalable web applications using React and Node.js. Architected microservices and improved system performance by 40%."
    },
    {
        company: "Creative Studio",
        role: "Frontend Developer",
        period: "2021 - 2023",
        description: "Collaborated with designers to implement pixel-perfect user interfaces. Migrated legacy codebases to modern React stacks."
    },
    {
        company: "StartUp Ltd.",
        role: "Junior Developer",
        period: "2019 - 2021",
        description: "Contributed to backend API development and database design. Assisted in testing and deployment pipelines."
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
