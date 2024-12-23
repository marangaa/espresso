'use client'

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-[70]"
        >
            <div className="relative w-24 h-24">
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
            </div>
        </motion.div>
    );
};

export const WithLoading = ({ children, isLoading }: { children: React.ReactNode, isLoading: boolean }) => {
    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Loader />}
            </AnimatePresence>
            {children}
        </>
    );
};

export default Loader;