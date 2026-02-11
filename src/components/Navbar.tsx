import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const links = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 backdrop-blur-md bg-white/50 dark:bg-black/50 border-b border-black/5 dark:border-white/10"
            >
                <div className="text-xl font-bold tracking-tighter">
                    <Link to="/" className="text-black dark:text-white">HR</Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="relative text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 block cursor-pointer"
                            >
                                <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="block">
                                    {link.name}
                                </motion.span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-black dark:text-white p-2 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-2xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"
                            >
                                <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="block">
                                    {link.name}
                                </motion.span>
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
