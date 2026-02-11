import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Achievements from '../components/Achievements';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Projects limit={6} showViewAll />
            <Experience />
            <Achievements />
            <Contact />
        </main>
    );
};

export default Home;
