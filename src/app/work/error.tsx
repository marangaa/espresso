'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function ProjectError({
                                         error,
                                         reset,
                                     }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <motion.div
                className="max-w-md w-full text-center space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-block p-4 bg-red-50 rounded-full">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-serif">Something went wrong</h1>
                    <p className="text-muted-foreground">
                        {error.message || 'An error occurred while loading this page.'}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/work"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-black/10 rounded-md hover:bg-black/5 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>

                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            </motion.div>
        </div>
    );
}