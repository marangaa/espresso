import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    colorScheme?: 'light' | 'dark';
    withParallax?: boolean;
}

const SectionWrapper = ({
                            children,
                            className = '',
                            colorScheme = 'light',
                            withParallax = true
                        }: SectionWrapperProps) => {
    const { scrollYProgress } = useScroll();

    const springConfig = { mass: 1, stiffness: 100, damping: 30 };
    const y = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, withParallax ? -50 : 0]),
        springConfig
    );

    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]),
        springConfig
    );

    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]),
        springConfig
    );

    return (
        <motion.section
            className={`relative ${
                colorScheme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
            } ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Pattern */}
            {withParallax && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ y }}
                >
                    <svg
                        className="absolute inset-0 w-full h-full opacity-[0.02]"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <pattern
                            id="grid"
                            width="32"
                            height="32"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 32 0 L 0 0 0 32"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </motion.div>
            )}

            {/* Content Wrapper */}
            <motion.div
                className="relative"
                style={{
                    scale: withParallax ? scale : 1,
                    opacity: withParallax ? opacity : 1
                }}
            >
                {children}
            </motion.div>
        </motion.section>
    );
};

export default SectionWrapper;