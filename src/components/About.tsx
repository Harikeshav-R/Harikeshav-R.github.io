import { RevealOnScroll } from './RevealOnScroll';

const About = () => {
    return (
        <section id="about" className="py-20 md:py-32 relative">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">About.</h2>

                    {/* Top Row: Text & Image */}
                    <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-center mb-16">
                        <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg space-y-6">
                            <p>
                                I've been coding since I was 10 years old. While I never had a knack for traditional artistic pursuits, I found that building software and hardware was the best way for me to express myself creatively.
                            </p>
                            <p>
                                In a world where performance is often taken for granted and "AI slop" is shipped all too frequently, I am driven to create systems that are smart, secure, high-performance, and efficient.
                            </p>
                            <p>
                                I believe tools should be intuitive, fast, and respectful of the user's resources. My focus is on engineering robust infrastructure and intelligent software that solves real problems without the bloat.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass p-2 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="w-full h-full rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative group">
                                    <img
                                        src="/Headshot.jpg"
                                        alt="Harikeshav R"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center');
                                            (e.target as HTMLImageElement).parentElement!.innerHTML += '<span class="text-gray-400 dark:text-gray-500 text-sm p-4 text-center">Add profile.jpg to public folder</span>';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Focus & Skills */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                                My Focus
                            </h3>
                            <ul className="space-y-4">
                                <li className="glass p-4 rounded-xl hover:-translate-y-1 transition-transform duration-300 border border-black/5 dark:border-white/5">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">System Performance</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Optimizing for speed and efficiency at every layer.</p>
                                </li>
                                <li className="glass p-4 rounded-xl hover:-translate-y-1 transition-transform duration-300 border border-black/5 dark:border-white/5">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Security Engineering</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Building resilient systems that protect user data.</p>
                                </li>
                                <li className="glass p-4 rounded-xl hover:-translate-y-1 transition-transform duration-300 border border-black/5 dark:border-white/5">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Intelligent Systems</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Leveraging AI to solve complex problems smartly.</p>
                                </li>
                                <li className="glass p-4 rounded-xl hover:-translate-y-1 transition-transform duration-300 border border-black/5 dark:border-white/5">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Low Level Dev</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Understanding the stack from the kernel up.</p>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-6 text-xl flex items-center gap-2">
                                <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
                                Tech Stack
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['C++', 'Python', 'TypeScript', 'React', 'FastAPI', 'C#', 'Next.js'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">Tools</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['CMake', 'Qt', 'Git', 'Postman', 'VS Code'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">DevOps</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Docker', 'Linux', 'GitHub Actions', 'AWS', 'PostgreSQL'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default About;
