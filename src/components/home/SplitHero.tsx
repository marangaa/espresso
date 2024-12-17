import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    return (
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Typography */}
            <motion.div
                className="relative flex items-center justify-center bg-black text-white p-8 lg:p-16 min-h-[60vh] lg:min-h-screen"
                onMouseMove={handleMouseMove}
                style={{ perspective: 1000 }}
                data-cursor-hover
            >
                <motion.div
                    className="relative z-10"
                    style={{ rotateX, rotateY }}
                >
                    <TextReveal delay={0.2}>
            <span className="text-sm font-mono tracking-wider text-white/60">
              Studio AI
            </span>
                    </TextReveal>

                    <div className="mt-4">
                        <CharacterReveal
                            text="Crafting"
                            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1]"
                            delay={0.4}
                        />
                        <CharacterReveal
                            text="Intelligence"
                            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] italic text-gradient"
                            delay={0.6}
                        />
                    </div>

                    <div className="mt-6">
                        <TextReveal delay={0.8}>
                            <p className="text-lg md:text-xl text-white/80 max-w-md">
                                We shape artificial intelligence into meaningful experiences
                                that push the boundaries of what's possible.
                            </p>
                        </TextReveal>
                    </div>

                    <div className="mt-8">
                        <TextReveal delay={1}>
                            <MagneticButton
                                className="px-6 py-3 text-sm font-mono tracking-wider border border-white/20 hover:border-white/100 transition-colors"
                                strength={15}
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
                        animate={{ opacity: 0.05 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute left-0 w-full h-[1px] bg-white/20"
                                style={{
                                    top: `${(i + 1) * 5}%`,
                                    scaleX: useTransform(
                                        mouseX,
                                        [-300, 300],
                                        [0.8 + (i % 3) * 0.1, 1.2 - (i % 3) * 0.1]
                                    )
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Right: Visual */}
            <div className="relative bg-muted min-h-[40vh] lg:min-h-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Abstract shapes */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 border border-primary/20 rounded-full"
                                initial={{ scale: 1 - i * 0.1 }}
                                animate={{
                                    rotate: i * 360,
                                    scale: 1 + i * 0.1
                                }}
                                transition={{
                                    duration: 20 - i * 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        ))}

                        {/* Floating particles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`particle-${i}`}
                                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
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