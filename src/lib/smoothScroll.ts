import { useEffect, useRef } from 'react';

interface ScrollConfig {
    ease?: number;
    lerp?: number;
    smooth?: boolean;
}

class SmoothScroll {
    private container: HTMLElement;
    private ease: number;
    private lerp: number;
    private currentY: number;
    private targetY: number;
    private isEnabled: boolean;
    private rafId: number | null;

    constructor(container: HTMLElement, config: ScrollConfig = {}) {
        this.container = container;
        this.ease = config.ease || 0.1;
        this.lerp = config.lerp || 0.1;
        this.currentY = 0;
        this.targetY = 0;
        this.isEnabled = config.smooth !== false;
        this.rafId = null;

        this.init();
    }

    private init() {
        // Set initial styles
        document.body.style.height = `${this.container.scrollHeight}px`;
        this.container.style.position = 'fixed';
        this.container.style.width = '100%';
        this.container.style.top = '0';
        this.container.style.left = '0';

        // Bind methods
        this.onScroll = this.onScroll.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);

        // Add scroll listener
        window.addEventListener('scroll', this.onScroll);
        this.update();
    }

    private onScroll() {
        this.targetY = -window.scrollY;
    }

    private update() {
        if (!this.isEnabled) {
            this.container.style.transform = `translateY(${this.targetY}px)`;
            this.rafId = requestAnimationFrame(this.update);
            return;
        }

        // Calculate new position with lerp
        this.currentY = this.lerp * (this.targetY - this.currentY) + this.currentY;

        // Apply transform with rounded value to avoid subpixel rendering
        const roundedY = Math.round(this.currentY * 100) / 100;
        this.container.style.transform = `translateY(${roundedY}px)`;

        // Continue animation loop
        this.rafId = requestAnimationFrame(this.update);
    }

    public destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        window.removeEventListener('scroll', this.onScroll);
        document.body.style.height = '';
        this.container.style.position = '';
        this.container.style.width = '';
        this.container.style.top = '';
        this.container.style.left = '';
        this.container.style.transform = '';
    }
}

// React Hook for using SmoothScroll
export const useSmoothScroll = (config: ScrollConfig = {}) => {
    const scrollRef = useRef<SmoothScroll | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize smooth scroll
        scrollRef.current = new SmoothScroll(containerRef.current, config);

        // Cleanup
        return () => {
            if (scrollRef.current) {
                scrollRef.current.destroy();
            }
        };
    }, []);

    return containerRef;
};
