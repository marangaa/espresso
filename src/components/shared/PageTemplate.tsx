'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTemplateProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageTemplate({ children, className = '' }: PageTemplateProps) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {children}
        </motion.main>
    );
}