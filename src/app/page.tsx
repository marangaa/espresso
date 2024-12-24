'use client'
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

const ProcessSection = () => {
    const { scrollYProgress } = useScroll();
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]));

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

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{ y }}
            >
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-[1px] bg-primary"
                        style={{ top: `${i * 10}%` }}
                    />
                ))}
            </motion.div>

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
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                            viewport={{ once: true }}
                            data-cursor-hover
                        >
                            <span className="absolute -top-6 sm:-top-8 -left-2 sm:-left-4 text-6xl sm:text-8xl font-serif opacity-10 group-hover:opacity-20 transition-opacity">
                                {step.number}
                            </span>

                            <div className="relative">
                                <h3 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3">{step.title}</h3>
                                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                            </div>

                            <motion.div
                                className="absolute inset-0 border border-primary/0 group-hover:border-primary/20"
                                initial={{ scale: 0.8 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const InsightsSection = () => {
    const insights = [
        {
            title: 'The Future of AI Interfaces',
            category: 'Design Thinking',
            date: 'March 2024'
        },
        {
            title: 'Machine Learning in Practice',
            category: 'Technology',
            date: 'March 2024'
        },
        {
            title: 'Ethics in AI Development',
            category: 'Perspective',
            date: 'February 2024'
        }
    ];

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 sm:mb-16 space-y-4 sm:space-y-0">
                    <div>
                        <TextRevealWithLine>
                            <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                Latest Insights
                            </span>
                        </TextRevealWithLine>

                        <TextRevealWithLine delay={0.2}>
                            <h2 className="text-3xl sm:text-4xl font-serif mt-4">
                                Thoughts and Updates
                            </h2>
                        </TextRevealWithLine>
                    </div>

                    <MagneticButton className="text-sm font-mono tracking-wider self-start sm:self-auto">
                        View All Insights
                    </MagneticButton>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {insights.map((insight, index) => (
                        <motion.article
                            key={insight.title}
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            data-cursor-hover
                        >
                            <div className="aspect-[4/3] bg-black/5 mb-4 sm:mb-6 overflow-hidden">
                                <motion.div
                                    className="w-full h-full bg-primary/10"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                />
                            </div>

                            <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                {insight.category}
                            </span>

                            <h3 className="text-lg sm:text-xl font-serif mt-2 group-hover:text-primary transition-colors">
                                {insight.title}
                            </h3>

                            <span className="text-sm text-muted-foreground mt-2 block">
                                {insight.date}
                            </span>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ParallaxSection = () => {
    const { scrollYProgress } = useScroll();
    const y = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="relative overflow-hidden"
            style={{ y: useSpring(useTransform(y, [0, 1], [0, -50])) }}
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
                        {[...Array(4)].map((_, i) => (
                            <HoverCard key={i} className="aspect-square">
                                <div className="w-full h-full bg-white/5 backdrop-blur-sm" />
                            </HoverCard>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ContactSection = () => {
    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                    <div className="space-y-6 sm:space-y-8">
                        <TextRevealWithLine>
                            <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                Get in Touch
                            </span>
                        </TextRevealWithLine>

                        <TextRevealWithLine delay={0.2}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif">
                                Let&apos;s create something extraordinary together
                            </h2>
                        </TextRevealWithLine>

                        <TextReveal delay={0.4}>
                            <p className="text-lg sm:text-xl text-muted-foreground">
                                We&apos;re always looking to partner with ambitious brands
                                and people.
                            </p>
                        </TextReveal>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <MagneticButton className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-base sm:text-lg hover:bg-black/90">
                                Start a Project
                            </MagneticButton>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        <HoverCard className="p-4 sm:p-6 bg-muted">
                            <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                Email
                            </span>
                            <a href="mailto:hello@studioai.com" className="block text-base sm:text-lg mt-2 hover:text-primary">
                                hello@studioai.com
                            </a>
                        </HoverCard>

                        <HoverCard className="p-4 sm:p-6 bg-muted">
                            <span className="text-sm font-mono tracking-wider text-muted-foreground">
                                Location
                            </span>
                            <p className="text-base sm:text-lg mt-2">
                                San Francisco, CA
                            </p>
                        </HoverCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function HomePage() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: false, 
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
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