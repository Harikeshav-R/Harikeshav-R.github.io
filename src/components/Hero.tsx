import { motion } from 'framer-motion';
import { ArrowRight, MapPin, GraduationCap } from 'lucide-react';

const Hero = () => {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Gradient Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 tracking-widest uppercase mb-4"
                    >
                        Hello, I'm
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl md:text-8xl font-bold tracking-tighter mb-6 text-black dark:text-white"
                    >
                        Harikeshav R
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        From kernel space to latent space: Engineering secure, intelligent systems and infrastructure.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-8 text-gray-500 dark:text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span className="text-lg md:text-xl">Columbus, OH</span>
                        </div>
                        <div className="hidden md:block w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            <span className="text-lg md:text-xl">The Ohio State University</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="group px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        View Work
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#contact"
                        className="group px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Contact Me
                    </a>

                    <a
                        href="/Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
