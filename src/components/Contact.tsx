import { RevealOnScroll } from './RevealOnScroll';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="min-h-[60vh] flex items-center justify-center py-20 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <RevealOnScroll width="100%">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Let's Collaborate.</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        I'm always open to discussing developer work or partnership opportunities.
                        If you have an idea you want to bring to life, let's talk.
                    </p>

                    <a
                        href="mailto:r.harikeshav@icloud.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black text-lg font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <Mail className="w-5 h-5" />
                        Send me an Email
                    </a>

                    <div className="mt-20 flex flex-col items-center gap-6">
                        <div className="flex gap-6">
                            <a
                                href="https://github.com/Harikeshav-R"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com/in/harikeshav-rameshkumar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            © {new Date().getFullYear()} Harikeshav R. All rights reserved.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Contact;
