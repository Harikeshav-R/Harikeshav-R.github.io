import Projects from '../components/Projects';
import { useEffect } from 'react';

const AllProjects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-20">
            <Projects heading="All my projects" />
        </main>
    );
};

export default AllProjects;
