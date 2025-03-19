'use client'
import React from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { CharacterReveal } from '@/components/interactive/TextReveal';
import TextReveal from '@/components/interactive/TextReveal';
import MagneticButton from '@/components/interactive/MagneticButton';

const SplitHero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
    const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

    const AnimatedLine = ({ index, mouseX }: { index: number; mouseX: MotionValue<number> }) => {
        const scaleX = useTransform(
            mouseX,
            [-300, 300],
            [0.9 + (index % 3) * 0.05, 1.1 - (index % 3) * 0.05]
        );

        return (
            <motion.div
                className="absolute left-0 w-full h-[1px] bg-white/20"
                style={{
                    top: `${(index + 1) * 5}%`,
                    scaleX,
                }}
            />
        );
    };

    return (
        <section className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Typography */}
            <motion.div
                className="relative flex items-center justify-center bg-black text-white p-8 sm:p-12 lg:p-16 min-h-[60svh] lg:min-h-[100svh]"
                onMouseMove={handleMouseMove}
                style={{ perspective: 1000 }}
                data-cursor-hover
            >
                <motion.div
                    className="relative z-10 max-w-xl mx-auto lg:mx-0"
                    style={{ rotateX, rotateY }}
                >
                    <TextReveal delay={0.2}>
                        <span className="text-sm font-mono tracking-wider text-white/60">
                            vertex ai
                        </span>
                    </TextReveal>

                    <div className="mt-4 md:mt-6">
                        <CharacterReveal
                            text="Crafting"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1]"
                            delay={0.4}
                        />
                        <CharacterReveal
                            text="Intelligence"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] italic text-gradient"
                            delay={0.6}
                        />
                    </div>

                    <div className="mt-4 md:mt-6">
                        <TextReveal delay={0.8}>
                            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-md">
                                We shape artificial intelligence into meaningful experiences
                                that push the boundaries of what&apos;s possible.
                            </p>
                        </TextReveal>
                    </div>

                    <div className="mt-6 md:mt-8">
                        <TextReveal delay={1}>
                            <MagneticButton
                                className="px-6 py-3 text-sm font-mono tracking-wider border border-white/20 hover:border-white/100 transition-colors"
                                strength={10}
                            >
                                View Our Work
                            </MagneticButton>
                        </TextReveal>
                    </div>
                </motion.div>

                {/* Animated background pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                    >
                        {[...Array(25)].map((_, i) => (
                            <AnimatedLine key={i} index={i} mouseX={mouseX} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Right: Visual */}
            <div className="relative bg-muted min-h-[40svh] lg:min-h-[100svh] overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Abstract shapes */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-64 sm:w-80 md:w-96 aspect-square -translate-x-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute inset-0 border ${i === 0 ? 'border-blue-500/30' : i === 1 ? 'border-indigo-500/20' : i === 2 ? 'border-violet-500/20' : 'border-purple-500/20'} rounded-full`}
                                initial={{ scale: 1 - i * 0.1 }}
                                animate={{
                                    rotate: i % 2 === 0 ? 360 : -360,
                                    scale: [1 + i * 0.1, 1 + i * 0.15, 1 + i * 0.1]
                                }}
                                transition={{
                                    duration: 25 + i * 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                    scale: {
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        ))}

                        {/* Floating particles */}
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={`particle-${i}`}
                                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    scale: [1, 2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                    y: [0, -40, 0],
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SplitHero;