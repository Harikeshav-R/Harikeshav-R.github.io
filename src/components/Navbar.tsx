import { motion } from 'framer-motion';

const Navbar = () => {
    const links = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 backdrop-blur-md bg-white/50 dark:bg-black/50 border-b border-black/5 dark:border-white/10"
        >
            <ul className="flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
                {links.map((link) => (
                    <li key={link.name}>
                        <motion.a
                            href={link.href}
                            className="relative text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 block"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {link.name}
                        </motion.a>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Navbar;
