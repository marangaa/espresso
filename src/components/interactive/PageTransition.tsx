import React, { PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }: PropsWithChildren) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                    initial: {
                        opacity: 0,
                        y: 20,
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                    },
                    exit: {
                        opacity: 0,
                        y: -20,
                    },
                }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {children}

                {/* Overlay transition effects */}
                <motion.div
                    className="fixed inset-0 bg-primary z-[60] pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    style={{ transformOrigin: 'top' }}
                />

                <motion.div
                    className="fixed inset-0 bg-black z-[60] pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.76, 0, 0.24, 1],
                        delay: 0.2,
                    }}
                    style={{ transformOrigin: 'bottom' }}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;