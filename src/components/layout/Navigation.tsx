'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Custom hook to handle scroll-based navigation behavior
const useScrollDirection = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Function to control navbar visibility based on scroll position
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled past threshold
      setScrolled(currentScrollY > 20);

      // Hide header when scrolling down past threshold, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShouldHideHeader(true);
      } else {
        setShouldHideHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Implement performant scroll handling with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          controlNavbar();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return { shouldHideHeader, scrolled };
};

// Navigation items configuration
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
  const { shouldHideHeader, scrolled } = useScrollDirection();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: shouldHideHeader ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10 text-2xl font-serif hover:text-primary transition-colors"
          >
            Studio AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                    pathname === item.href ? 'bg-primary scale-x-100' : 'bg-primary'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden relative z-10 p-2 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 overflow-auto"
            >
              <div className="min-h-screen flex flex-col">
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-4 sm:p-6">
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

                {/* Mobile Navigation Links */}
                <nav className="flex-1 flex items-center p-4 sm:p-6">
                  <div className="w-full max-w-md mx-auto space-y-2">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.1 + i * 0.1,
                          duration: 0.3
                        }}
                        className="w-full"
                      >
                        <Link
                          href={item.href}
                          className={`group flex flex-col w-full p-4 rounded-lg transition-colors ${
                            pathname === item.href 
                              ? 'bg-white/15' 
                              : 'hover:bg-white/10'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-white text-2xl font-serif mb-1">
                            {item.name}
                          </span>
                          <span className="text-white/80 text-base font-sans">
                            {item.description}
                          </span>
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