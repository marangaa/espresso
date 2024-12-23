'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  {
    name: 'Work',
    href: '/work',
    description: 'View our latest projects'
  },
  {
    name: 'Studio',
    href: '/studio',
    description: 'Learn about our team'
  },
  {
    name: 'Journal',
    href: '/journal',
    description: 'Read our latest insights'
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Get in touch'
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
      <>
        {/* Main Navigation Bar */}
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 ${
                scrolled ? 'bg-white/80 backdrop-blur-lg' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif hover:text-primary transition-colors">
              Studio AI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm hover:text-primary transition-colors ${
                          pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    {item.name}
                  </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </motion.header>

        {/* Full Screen Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
              <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="fixed inset-0 z-50 overflow-auto"
                >
                  <div className="min-h-screen flex flex-col">
                    <div className="flex justify-between items-center p-6">
                      <Link
                          href="/"
                          className="text-2xl font-serif text-white"
                          onClick={() => setIsOpen(false)}
                      >
                        Studio AI
                      </Link>

                      <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          aria-label="Close menu"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>

                    <nav className="flex-1 flex items-center justify-center p-6">
                      <div className="grid gap-8">
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="text-center"
                            >
                              <Link
                                  href={item.href}
                                  className="group relative inline-block text-white text-3xl font-serif"
                                  onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                                <span className="block text-sm text-white/60 font-sans mt-1">
                            {item.description}
                          </span>
                                <motion.span
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-white/50"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                              </Link>
                            </motion.div>
                        ))}
                      </div>
                    </nav>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </>
  );
}