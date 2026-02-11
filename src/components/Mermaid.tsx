import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
});

interface MermaidProps {
    chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            mermaid.contentLoaded();
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

            mermaid.render(id, chart).then(({ svg }) => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            }).catch((error) => {
                console.error("Mermaid parsing failed", error);
                if (containerRef.current) {
                    containerRef.current.innerHTML = `<div class="text-red-500 bg-red-50 p-4 rounded-lg">Failed to render diagram</div>`;
                }
            });
        }
    }, [chart]);

    return <div ref={containerRef} className="mermaid my-8 flex justify-center overflow-x-auto" />;
};

export default Mermaid;
