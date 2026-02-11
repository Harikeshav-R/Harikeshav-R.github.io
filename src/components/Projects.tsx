import { RevealOnScroll } from './RevealOnScroll';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';

interface ProjectsProps {
    limit?: number;
    showViewAll?: boolean;
    heading?: string;
}

const Projects = ({ limit, showViewAll, heading = "Selected Work." }: ProjectsProps) => {
    const displayedProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6">
                <RevealOnScroll>
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{heading}</h2>
                        {showViewAll && (
                            <Link
                                to="/projects"
                                className="hidden md:flex items-center gap-2 text-lg font-medium hover:translate-x-1 transition-transform"
                            >
                                View All <ArrowRight className="w-5 h-5" />
                            </Link>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {displayedProjects.map((project, index) => (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                className="glass group relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg dark:hover:shadow-white/5 block"
                            >
                                <div className={`aspect-video w-full ${project.image} group-hover:scale-105 transition-transform duration-500`} />
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{project.title}</h3>
                                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                                            {project.year}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs font-medium px-2 py-1 bg-black/10 dark:bg-white/10 rounded-full text-gray-700 dark:text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white group-hover:underline transition-colors">
                                            <ArrowRight className="w-4 h-4" /> View on GitHub
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {showViewAll && (
                        <div className="md:hidden flex justify-center">
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium"
                            >
                                View All Projects <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Projects;
