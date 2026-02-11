import { RevealOnScroll } from './RevealOnScroll';
import { Trophy, ExternalLink } from 'lucide-react';

const achievements = [
    {
        title: "Best Overall Hack",
        event: "HackTheNorth 2025",
        date: "Sep 2025",
        description: "Built an AI-powered accessibility tool that translates sign language to speech in real-time using computer vision.",
        link: "#"
    },
    {
        title: "1st Place - FinTech Track",
        event: "ETHGlobal New York",
        date: "Jul 2025",
        description: "Developed a decentralized privacy-preserving identity verification protocol using zero-knowledge proofs.",
        link: "#"
    },
    {
        title: "Most Innovative Solution",
        event: "Local Hack Day",
        date: "Mar 2025",
        description: "Created a smart waste management system using IoT sensors and route optimization algorithms.",
        link: "#"
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">Achievements.</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="glass p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl dark:hover:shadow-white/5"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                                        <Trophy className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-mono text-gray-500">{achievement.date}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                                <div className="text-blue-600 dark:text-blue-400 font-medium mb-4 text-sm">{achievement.event}</div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                                    {achievement.description}
                                </p>

                                {achievement.link && achievement.link !== "#" && (
                                    <a
                                        href={achievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors"
                                    >
                                        View Project <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Achievements;
