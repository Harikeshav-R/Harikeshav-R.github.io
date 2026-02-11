import { RevealOnScroll } from './RevealOnScroll';

const About = () => {
    return (
        <section id="about" className="py-20 md:py-32 relative">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">About.</h2>
                    <div className="flex flex-col gap-12">
                        <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg space-y-6">
                            <p>
                                I've been coding since I was 10 years old. While I never had a knack for traditional artistic pursuits, I found that building software and hardware was the best way for me to express myself creatively.
                            </p>
                            <p>
                                In a world where performance is often taken for granted and AI slop is shipped all too frequently, I am driven to create systems that are smart, secure, high-performance, and efficient.
                            </p>
                            <p>
                                I believe software and hardware should be intuitive, fast, and respectful of the user's resources. My focus is on engineering robust infrastructure and intelligent software that solves real problems without the bloat.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-6 text-xl">My Focus</h3>
                            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
                                <li className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">System Performance</span>
                                    </div>
                                    <p className="text-sm opacity-80">Optimizing for speed and efficiency at every layer.</p>
                                </li>
                                <li className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">Security Engineering</span>
                                    </div>
                                    <p className="text-sm opacity-80">Building resilient systems that protect user data.</p>
                                </li>
                                <li className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">Intelligent Systems</span>
                                    </div>
                                    <p className="text-sm opacity-80">Leveraging AI to solve complex problems smartly.</p>
                                </li>
                                <li className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full" />
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">Low Level Dev</span>
                                    </div>
                                    <p className="text-sm opacity-80">Understanding the stack from the kernel up.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default About;
