import { RevealOnScroll } from './RevealOnScroll';

const experiences = [
    {
        company: "Pfizer",
        role: "Apprenticeship",
        period: "Jan 2026 - Present",
        description: [
            {
                title: "Developed an end-to-end AI document intelligence platform that:",
                points: [
                    "Automates the ingestion of massive, unstructured blobs (e.g., mortgage and pharmaceutical files) by splitting and classifying them into individual document types.",
                    "Uses a modular routing function to apply specific extraction logic for documents like pay slips, IDs, and contracts based on layout-based clues.",
                    "Processes and standardizes pharmaceutical Documentation Files (SDFs) to ensure high-fidelity data for downstream compliance workflows."
                ]
            },
            {
                title: "Built a high-precision Retrieval-Augmented Generation (RAG) pipeline that:",
                points: [
                    "Leverages LlamaIndex to retrieve relevant insights from large-scale, multi-page pharmaceutical datasets.",
                    "Optimizes retrieval accuracy through advanced chunking strategies, overlapping, and metadata-based filtering.",
                    "Evaluates and benchmarks the performance of open-source LLMs (e.g., Mistral, Phi-2) against proprietary models for retrieval efficiency.",
                    "Features an interactive, web-based chatbot UI built with Gradio for real-time user querying of complex PDF documents."
                ]
            },
            {
                title: "Engineered an automated OCR and data extraction engine that:",
                points: [
                    "Extracts machine-readable text from scanned PDFs using Tesseract, PaddleOCR, and EasyOCR, comparing performance for pharmaceutical industry standards.",
                    "Implements image pre-processing and enhancement techniques to increase OCR accuracy on low-quality scans.",
                    "Utilizes field heuristics, regex patterns, and anchor phrases to identify critical compliance data like manufacturing and revision dates.",
                    "Identifies and flags documents exceeding 3–4 years of age to automate Pfizer’s regulatory compliance reporting."
                ]
            },
        ]
    },
    {
        company: "Siage Solutions",
        role: "Software Engineer Intern",
        period: "Jun 2025 - Aug 2025",
        description: [
            {
                title: "Developed a machine learning–powered ticketing system that:",
                points: [
                    "Flags potential duplicate tickets by analyzing content similarity.",
                    "Sorts and prioritizes tickets based on issue type, status, priority, and similarity.",
                    "Uses a vector database to store ticket embeddings for fast retrieval and analysis.",
                    "Built an intelligent agent to interface with the vector store for processing and decision-making."
                ]
            },
            {
                title: "Created a private Retrieval-Augmented Generation (RAG) system that:",
                points: [
                    "Makes internal company documents accessible via any LLM-powered agent, chatbot, or assistant.",
                    "Stores documents in a vector database for efficient semantic search and retrieval.",
                    "Enables accurate, hallucination-free responses with source citations shown in a user-friendly UI.",
                    "Fully offline and private with no external API calls."
                ]
            },
            {
                title: "Built an automated feedback analysis pipeline that:",
                points: [
                    "Scrapes product reviews and organizes them by region, outlet, or template.",
                    "Stores and processes the data in structured spreadsheets.",
                    "Performs sentiment analysis and visualizes results using sentiment comparison graphs and heatmaps",
                    "Uses LLMs to extract detailed insights including common themes, positives/negatives, and suggestions for improvement."
                ]
            }
        ]
    },
    {
        company: "Indian Institute of Technology, Madras",
        role: "Research Intern",
        period: "Jun 2023 - Oct 2023",
        description: [
            {
                title: "Electromagnetic Wave Propagation Modeling",
                points: [
                    "Engineered ML algorithms to model wave propagation in closed environments.",
                    "Utilized experimental data to predict and visualize signal intensity."
                ]
            },
            {
                title: "Research Publication",
                points: [
                    "Authored a research paper on optimizing indoor wireless deployment.",
                    "Analyzed generated propagation heat maps to improve deployment strategies."
                ]
            }
        ]
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

                                {exp.description.map((item, idx) => (
                                    <div key={idx} className="mb-4 last:mb-0">
                                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                            {item.title}
                                        </h4>
                                        <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                            {item.points.map((point, pointIdx) => (
                                                <li key={pointIdx}>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Experience;
