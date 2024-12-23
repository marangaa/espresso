'use client'

import React, { useEffect, useState } from 'react';
import CustomCursor from '@/components/interactive/CustomCursor';
import Navigation from '@/components/layout/Navigation';
import { WithLoading } from '@/components/interactive/Loader';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [showCustomCursor, setShowCustomCursor] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const isTouchDevice = (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            );
            const isLargeScreen = window.innerWidth >= 1024;
            setShowCustomCursor(!isTouchDevice && isLargeScreen);
        };

        // Run initial check
        checkDevice();

        // Set up event listeners
        const handleResize = () => {
            checkDevice();
        };

        window.addEventListener('resize', handleResize);
        
        // Initial loading timeout
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {showCustomCursor && <CustomCursor />}
            <Navigation />
            <WithLoading isLoading={isLoading}>
               {children}
            </WithLoading>
        </>
    );
}