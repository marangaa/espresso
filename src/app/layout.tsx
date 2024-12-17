'use client'
import React, { useEffect, useState } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import CustomCursor from '@/components/interactive/CustomCursor';
import Navigation from '@/components/layout/Navigation';
import PageTransition from '@/components/interactive/PageTransition';
import { WithLoading } from '@/components/interactive/Loader';
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair'
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [showCustomCursor, setShowCustomCursor] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            // Only show custom cursor on desktop devices
            const isTouchDevice = (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            );

            // Also check for minimum viewport width
            const isLargeScreen = window.innerWidth >= 1024;

            setShowCustomCursor(!isTouchDevice && isLargeScreen);
        };

        // Initial check
        checkDevice();

        // Check on window load to ensure proper initialization
        window.addEventListener('load', checkDevice);

        // Check on resize for responsive changes
        window.addEventListener('resize', checkDevice);

        // Simulate initial page load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            window.removeEventListener('resize', checkDevice);
            clearTimeout(timer);
        };
    }, []);

    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className={`bg-background text-foreground ${showCustomCursor ? 'cursor-none' : ''}`}>
        {showCustomCursor && <CustomCursor />}
        <Navigation />

        <WithLoading isLoading={isLoading}>
            <PageTransition>
                <main className="relative">
                    {children}
                </main>
            </PageTransition>
        </WithLoading>

        </body>
        </html>
    );
}