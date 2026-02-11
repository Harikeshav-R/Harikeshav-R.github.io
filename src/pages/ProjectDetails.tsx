import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Github } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetails = () => {
    const { id } = useParams();
    const [readmeContent, setReadmeContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const project = projects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === id);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (project?.github) {
            const fetchReadme = async () => {
                setLoading(true);
                try {
                    // Extract owner and repo from github URL
                    // URL format: https://github.com/StartHawk/LEAP
                    const urlParts = project.github.split('/');
                    const owner = urlParts[urlParts.length - 2];
                    const repo = urlParts[urlParts.length - 1];

                    // Try main branch first
                    let response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`);

                    // If failed, try master branch
                    if (!response.ok) {
                        response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`);
                    }

                    if (response.ok) {
                        const text = await response.text();
                        setReadmeContent(text);
                    } else {
                        setError(true);
                    }
                } catch (err) {
                    console.error("Failed to fetch README", err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };

            fetchReadme();
        } else {
            setLoading(false);
        }
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project not found</h2>
                    <Link to="/projects" className="text-blue-500 hover:underline">Back to all projects</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Projects
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full text-sm font-medium">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            <Github className="w-5 h-5" /> View on GitHub
                        </a>
                        {/* Add live demo link if available in the future */}
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:scroll-mt-24">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 bg-black/5 dark:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <p className="text-gray-500">Could not load README from GitHub.</p>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                                View directly on GitHub
                            </a>
                        </div>
                    ) : (
                        <ReactMarkdown
                            components={{
                                img: ({ node, ...props }) => (
                                    <img
                                        {...props}
                                        className="rounded-xl shadow-lg border border-black/5 dark:border-white/5 mb-8"
                                        alt={props.alt || ''}
                                    />
                                ),
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-words" />
                                ),
                                pre: ({ node, ...props }) => (
                                    <div className="relative group">
                                        <pre {...props} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-black/5 dark:border-white/10" />
                                    </div>
                                ),
                                code: ({ node, ...props }) => (
                                    <code {...props} className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400" />
                                )
                            }}
                        >
                            {readmeContent}
                        </ReactMarkdown>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
