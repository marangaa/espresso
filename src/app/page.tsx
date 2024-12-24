'use client'
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SplitHero from '@/components/home/SplitHero';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import ScrollProgress from '@/components/interactive/ScrollProgress';
import { TextRevealWithLine } from '@/components/interactive/TextReveal';
import TextReveal from '@/components/interactive/TextReveal';
import SectionWrapper from '@/components/home/SectionWrapper';
import HoverCard from '@/components/interactive/HoverCard';
import MagneticButton from '@/components/interactive/MagneticButton';
import Lenis from 'lenis';
import Image from 'next/image';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        const debouncedResize = debounce(checkMobile, 100);
        window.addEventListener('resize', debouncedResize);
        
        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    return isMobile;
};

const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const ProcessSection = () => {
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll();
    const y = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, isMobile ? -25 : -50]),
        {
            stiffness: isMobile ? 50 : 100,
            damping: isMobile ? 15 : 30,
        }
    );

    const steps = [
        {
            number: '01',
            title: 'Discovery & Research',
            description: 'Understanding the problem space and identifying opportunities.'
        },
        {
            number: '02',
            title: 'System Design',
            description: 'Architecting intelligent solutions that scale.'
        },
        {
            number: '03',
            title: 'Implementation',
            description: 'Building and iterating with precision.'
        },
        {
            number: '04',
            title: 'Evolution',
            description: 'Continuous learning and adaptation.'
        }
    ];

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <div className="relative overflow-hidden will-change-transform" ref={ref}>
            {inView && (
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{ y }}
                >
                    {[...Array(isMobile ? 10 : 20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-[1px] bg-primary"
                            style={{ top: `${i * (isMobile ? 20 : 10)}%` }}
                        />
                    ))}
                </motion.div>
            )}

            <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <TextRevealWithLine delay={0.2}>
                        <span className="text-sm font-mono tracking-wider text-muted-foreground">
                            Our Process
                        </span>
                    </TextRevealWithLine>

                    <TextRevealWithLine delay={0.4}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mt-4">
                            How We Work
                        </h2>
                    </TextRevealWithLine>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            className="relative p-4 sm:p-6 group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0,
                                transition: {
                                    duration: isMobile ? 0.3 : 0.5,
                                    delay: isMobile ? 0.1 * index : 0.2 * index
                                }
                            }}
                            viewport={{ once: true }}
                        >
                            <span className="absolute -top-6 sm:-top-8 -left-2 sm:-left-4 text-6xl sm:text-8xl font-serif opacity-10 transition-opacity">
                                {step.number}
                            </span>

                            <div className="relative">
                                <h3 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3">{step.title}</h3>
                                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                            </div>

                            {!isMobile && (
                                <motion.div
                                    className="absolute inset-0 border border-primary/0 group-hover:border-primary/20"
                                    initial={{ scale: 0.8 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const InsightsSection = () => {
    const isMobile = useIsMobile();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        fallbackInView: true
    });

    const insights = [
        {
            title: 'The Future of AI Interfaces',
            category: 'Design Thinking',
            date: 'March 2024',
            imageId: '32' // For demo, using placeholder images
        },
        {
            title: 'Machine Learning in Practice',
            category: 'Technology',
            date: 'March 2024',
            imageId: '33'
        },
        {
            title: 'Ethics in AI Development',
            category: 'Perspective',
            date: 'February 2024',
            imageId: '34'
        }
    ];

    return (
        <div className="relative" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-8 mb-8 sm:mb-12">
                    <div className="space-y-2">
                        <TextRevealWithLine>
                            <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                Latest Insights
                            </span>
                        </TextRevealWithLine>

                        <TextRevealWithLine delay={0.2}>
                            <h2 className="text-3xl sm:text-4xl font-serif">
                                Thoughts and Updates
                            </h2>
                        </TextRevealWithLine>
                    </div>

                    {!isMobile && (
                        <MagneticButton className="text-sm font-mono tracking-wider px-4 py-2 border border-white/20 hover:border-white/40 transition-colors">
                            View All Insights
                        </MagneticButton>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {insights.map((insight, index) => (
                        <motion.article
                            key={insight.title}
                            className="group relative bg-white/5 rounded-sm overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { 
                                opacity: 1, 
                                y: 0,
                                transition: {
                                    duration: isMobile ? 0.3 : 0.5,
                                    delay: isMobile ? 0.1 * index : 0.2 * index
                                }
                            } : {}}
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <Image
                                    src={`https://picsum.photos/id/${insight.imageId}/800/600`}
                                    alt={insight.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            <div className="p-6">
                                <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                    {insight.category}
                                </span>

                                <h3 className="text-lg font-serif mt-2 group-hover:text-primary transition-colors">
                                    {insight.title}
                                </h3>

                                <span className="text-sm text-muted-foreground mt-2 block">
                                    {insight.date}
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {isMobile && (
                    <div className="mt-8 text-center">
                        <MagneticButton className="text-sm font-mono tracking-wider px-4 py-2 border border-white/20">
                            View All Insights
                        </MagneticButton>
                    </div>
                )}
            </div>
        </div>
    );
};

const ParallaxSection = () => {
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll();
    const y = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, isMobile ? -25 : -50]),
        {
            stiffness: isMobile ? 50 : 100,
            damping: isMobile ? 15 : 30
        }
    );

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const stats = [
        {
            number: "95%",
            label: "Accuracy Rate",
            description: "In ML predictions"
        },
        {
            number: "2x",
            label: "Faster Development",
            description: "With our AI tools"
        },
        {
            number: "50+",
            label: "AI Projects",
            description: "Successfully delivered"
        },
        {
            number: "24/7",
            label: "System Uptime",
            description: "Continuous operation"
        }
    ];

    return (
        <motion.div
            ref={ref}
            className="relative overflow-hidden will-change-transform"
            style={{ y: inView ? y : 0 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                    <div className="space-y-6 sm:space-y-8">
                        <TextRevealWithLine>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif">
                                Moving AI Forward
                            </h2>
                        </TextRevealWithLine>
                        <TextReveal>
                            <p className="text-lg sm:text-xl text-white/60">
                                Our mission is to push the boundaries of what&apos;s possible
                                with artificial intelligence, creating experiences that
                                feel natural and intuitive.
                            </p>
                        </TextReveal>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {stats.slice(0, isMobile ? 2 : 4).map((stat, i) => (
                            <HoverCard key={i} className="aspect-square">
                                <div className="w-full h-full bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center">
                                    <span className="text-3xl sm:text-4xl font-serif text-primary mb-2">
                                        {stat.number}
                                    </span>
                                    <span className="text-sm font-mono tracking-wider text-white mb-2">
                                        {stat.label}
                                    </span>
                                    <span className="text-sm text-white/60">
                                        {stat.description}
                                    </span>
                                </div>
                            </HoverCard>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ContactSection = () => {
    const isMobile = useIsMobile();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        fallbackInView: true
    });

    return (
        <div className="relative" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                    <div className="space-y-6 sm:space-y-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <TextRevealWithLine>
                                <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                    Get in Touch
                                </span>
                            </TextRevealWithLine>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <TextRevealWithLine delay={0.2}>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif">
                                    Let&apos;s create something extraordinary together
                                </h2>
                            </TextRevealWithLine>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <TextReveal delay={0.4}>
                                <p className="text-lg sm:text-xl text-muted-foreground">
                                    We&apos;re always looking to partner with ambitious brands
                                    and people.
                                </p>
                            </TextReveal>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ 
                                duration: isMobile ? 0.3 : 0.5,
                                delay: 0.6
                            }}
                        >
                            <MagneticButton 
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-base sm:text-lg hover:bg-black/90 transition-colors"
                                strength={isMobile ? 0 : 15}
                            >
                                Start a Project
                            </MagneticButton>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ 
                                duration: isMobile ? 0.3 : 0.5,
                                delay: 0.7
                            }}
                        >
                            <HoverCard className="p-4 sm:p-6 bg-muted">
                                <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                    Email
                                </span>
                                <a href="mailto:hello@studioai.com" className="block text-base sm:text-lg mt-2 hover:text-primary transition-colors">
                                    hello@studioai.com
                                </a>
                            </HoverCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ 
                                duration: isMobile ? 0.3 : 0.5,
                                delay: 0.8
                            }}
                        >
                            <HoverCard className="p-4 sm:p-6 bg-muted">
                                <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                    Location
                                </span>
                                <p className="text-base sm:text-lg mt-2">
                                    San Francisco, CA
                                </p>
                            </HoverCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function HomePage() {
    useEffect(() => {
        // Check if it's a touch device
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Performance optimized Lenis configuration
        const lenis = new Lenis({
            duration: isTouch ? 1 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: !isTouch,  // Disable smooth scrolling on touch devices
            syncTouch: false,     // Disable smooth touch scrolling
            touchMultiplier: 1,     // Reduced for more natural feel
            wheelMultiplier: 1,     // Consistent scrolling speed
            lerp: 0.1,             // Lower value for smoother interpolation
        });

        let rafId: number | null = null;
        
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            lenis.destroy();
        };
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <ScrollProgress />

            <SectionWrapper spacing="none" withParallax={false}>
                <SplitHero />
            </SectionWrapper>

            <SectionWrapper spacing="sm">
                <ProjectsGrid />
            </SectionWrapper>

            <SectionWrapper spacing="md" colorScheme="dark">
                <CapabilitiesSection />
            </SectionWrapper>

            <SectionWrapper spacing="md" colorScheme="dark">
                <ParallaxSection />
            </SectionWrapper>

            <SectionWrapper spacing="md">
                <ProcessSection />
            </SectionWrapper>

            <SectionWrapper spacing="md" colorScheme="dark">
                <InsightsSection />
            </SectionWrapper>

            <SectionWrapper spacing="md">
                <ContactSection />
            </SectionWrapper>
        </motion.main>
    );
}