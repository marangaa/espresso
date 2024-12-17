import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
            <motion.div
                className="relative w-24 h-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border-2 border-primary rounded-full"
                        initial={{ scale: 1 - i * 0.2 }}
                        animate={{
                            scale: 1 + i * 0.2,
                            rotate: 360,
                            opacity: 1 - i * 0.2
                        }}
                        transition={{
                            duration: 2 - i * 0.2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

// Loading wrapper component
export const WithLoading = ({ children, isLoading }) => {
    return (
        <>
            <AnimatePresence>
                {isLoading && <Loader />}
            </AnimatePresence>
            <motion.div
                animate={{
                    opacity: isLoading ? 0.3 : 1,
                    filter: isLoading ? 'blur(10px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default Loader;