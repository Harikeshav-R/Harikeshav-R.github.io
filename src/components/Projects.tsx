import { RevealOnScroll } from './RevealOnScroll';
import { Github } from 'lucide-react';

const projects = [
    {
        title: 'LEAP',
        description: 'A custom, high-performance, distributed LLM inference engine in C++20 that pipelines transformer models across heterogeneous clusters using a ring topology and zero-copy Linux kernel networking.',
        tech: ['C/C++', 'LibTorch', 'Linux Kernel', 'OpenMP', 'SIMD'],
        github: 'https://github.com/Harikeshav-R/LEAP',
        image: 'bg-gradient-to-br from-purple-900 to-slate-900'
    },
    {
        title: 'Distill',
        description: 'A high-performance LLM context compression library utilizing a fine-tuned BERT architecture for intelligent token pruning, enabling drastic reductions in inference costs and latency while preserving accuracy across massive context windows.',
        tech: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'React'],
        github: 'https://github.com/Harikeshav-R/Distill',
        image: 'bg-gradient-to-br from-emerald-900 to-slate-900'
    },
    {
        title: 'LeadForge',
        description: 'An end-to-end agentic sales automation ecosystem that orchestrates autonomous AI workflows for lead discovery, AI-generated personalized landing pages, and automated multi-channel outreach via voice and email.',
        tech: ['Python', 'LangGraph', 'FastAPI', 'React', 'TypeScript'],
        github: 'https://github.com/Harikeshav-R/LeadForge',
        image: 'bg-gradient-to-br from-blue-900 to-slate-900'
    },
    {
        title: 'Sane Jtreet',
        description: 'An AI-driven multi-agent research platform that automates financial market analysis, sentiment tracking, and risk-managed trading strategies using LangGraph and FastAPI.',
        tech: ['Python', 'FastAPI', 'React', 'LangGraph', 'TypeScript'],
        github: 'https://github.com/Harikeshav-R/Sane-Jtreet',
        image: 'bg-gradient-to-br from-indigo-900 to-slate-900'
    },
    {
        title: 'Penny',
        description: 'A gamified AI-driven personal finance assistant that simplifies expense tracking and financial goal setting through intelligent receipt analysis and interactive mascot-led insights.',
        tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'LangChain'],
        github: 'https://github.com/VamshiS123/penny',
        image: 'bg-gradient-to-br from-rose-900 to-slate-900'
    },
    {
        title: 'Nudgly',
        description: 'A privacy-centric, cross-platform AI assistant that provides real-time, context-aware assistance by analyzing on-screen content using Large Language Models and a robust C++/Qt architecture.',
        tech: ['C++', 'Qt 6', 'QML', 'LLM', 'CMake'],
        github: 'https://github.com/Harikeshav-R/Nudgly',
        image: 'bg-gradient-to-br from-amber-900 to-slate-900'
    },
    {
        title: 'Spartan',
        description: 'A modular and secure remote administration framework built in C# and .NET, featuring dynamic payload delivery, X3DH key exchange, and end-to-end encrypted communication via a double-ratchet mechanism.',
        tech: ['C#', '.NET', 'MessagePack', 'Cryptography', 'Sockets'],
        github: 'https://github.com/Harikeshav-R/Spartan',
        image: 'bg-gradient-to-br from-cyan-900 to-slate-900'
    },
    {
        title: 'VR Appathon',
        description: 'An immersive VR market simulator featuring a dynamic economy system, physics-based interactions, and AI-driven NPCs, developed for Meta Quest using Unity and the Meta XR SDK.',
        tech: ['Unity', 'C#', 'Meta XR SDK', 'URP', 'NavMesh'],
        github: 'https://github.com/Harikeshav-R/VR-Appathon',
        image: 'bg-gradient-to-br from-teal-900 to-slate-900'
    },
    {
        title: 'RSSI Prediction Study',
        description: 'A comprehensive machine learning framework for simulating synthetic indoor signal strength datasets and predicting RSSI values across diverse room geometries using empirical path loss models and deep learning architectures.',
        tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'Matplotlib'],
        github: 'https://github.com/Harikeshav-R/RSSI-Prediction',
        image: 'bg-gradient-to-br from-purple-900 to-slate-900'
    },
    {
        title: 'DriveDataDollars',
        description: 'A decentralized data collection platform that incentivizes users to contribute dashcam-style imagery and GPS coordinates to a verifiable network powered by the Constellation Metagraph.',
        tech: ['Kotlin', 'Python', 'React', 'Constellation', 'Flask'],
        github: 'https://github.com/Harikeshav-R/DriveDataDollars',
        image: 'bg-gradient-to-br from-emerald-900 to-slate-900'
    },
    {
        title: 'FEH Robotics',
        description: 'A comprehensive C++ robotics platform for an autonomous competition robot featuring precise encoder-based movement, real-time sensor integration, and multi-task navigation logic.',
        tech: ['C++', 'Embedded Systems', 'Robotics', 'FEH Proteus'],
        github: 'https://github.com/Harikeshav-R/FEH-Robotics',
        image: 'bg-gradient-to-br from-blue-900 to-slate-900'
    },
    {
        title: 'SDP Project',
        description: 'A high-performance C++20 rhythm game featuring dynamic difficulty scaling, music-synchronized gameplay, and persistent performance tracking.',
        tech: ['C++', 'CMake', 'OpenGL', 'Miniaudio', 'Tigr'],
        github: 'https://github.com/Harikeshav-R/SDP-Project',
        image: 'bg-gradient-to-br from-indigo-900 to-slate-900'
    },
    {
        title: 'Unified Healthcare Interface',
        description: 'A voice-enabled healthcare management ecosystem integrating a FastAPI backend and a Rasa virtual assistant to centralize medical records, track appointments, and provide emergency support through a natural language interface.',
        tech: ['Python', 'FastAPI', 'Rasa', 'SQLite', 'SpeechRecognition'],
        github: 'https://github.com/Harikeshav-R/Unified-Healthcare-Interface',
        image: 'bg-gradient-to-br from-rose-900 to-slate-900'
    },
    {
        title: 'Sign Language Translator',
        description: 'A real-time bidirectional translator enabling seamless communication between the hearing-impaired and the public through deep learning-based gesture recognition and NLP-driven sign language synthesis.',
        tech: ['Python', 'OpenCV', 'TensorFlow', 'NLTK', 'PySide6'],
        github: 'https://github.com/Harikeshav-R/Sign-Language-Translator',
        image: 'bg-gradient-to-br from-amber-900 to-slate-900'
    },
    {
        title: 'Mathtrix',
        description: 'A comprehensive event management ecosystem featuring a FastAPI backend, a PySide6 administrative suite, and automated registration workflows for seamless event orchestration.',
        tech: ['Python', 'FastAPI', 'PySide6', 'SQLite', 'Bootstrap'],
        github: 'https://github.com/Harikeshav-R/Mathtrix',
        image: 'bg-gradient-to-br from-cyan-900 to-slate-900'
    },
    {
        title: 'CipherVault',
        description: 'A multi-layered CLI password manager featuring biometric face recognition, email OTP, and AES-256 encrypted storage.',
        tech: ['Python', 'MySQL', 'Face Recognition', 'AES-256', 'Rich'],
        github: 'https://github.com/Harikeshav-R/CipherVault',
        image: 'bg-gradient-to-br from-teal-900 to-slate-900'
    },
    {
        title: 'Mazdoor Sahay',
        description: 'A web platform connecting migrant labourers with contractors through geolocation-based job matching, featuring community support forums and an AI chatbot for economic inclusion.',
        tech: ['Python', 'Flask', 'MySQL', 'Rasa'],
        github: 'https://github.com/Harikeshav-R/mazdoor-sahay/',
        image: 'bg-gradient-to-br from-purple-900 to-slate-900'
    },
    {
        title: 'Covid Essentials',
        description: 'An integrated COVID-19 information platform for India featuring real-time statistical tracking, health news integration, and a Rasa-powered AI chatbot for vaccination center discovery.',
        tech: ['Rasa', 'Python', 'TensorFlow', 'JavaScript', 'HTML5'],
        github: 'https://github.com/Harikeshav-R/covid-essentials',
        image: 'bg-gradient-to-br from-emerald-900 to-slate-900'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">Selected Work.</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="glass group relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg dark:hover:shadow-white/5"
                            >
                                <div className={`aspect-video w-full ${project.image} group-hover:scale-105 transition-transform duration-500`} />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs font-medium px-2 py-1 bg-black/10 dark:bg-white/10 rounded-full text-gray-700 dark:text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-black dark:text-white hover:underline transition-colors">
                                            <Github className="w-4 h-4" /> Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Projects;
