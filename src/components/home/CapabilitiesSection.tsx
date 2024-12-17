import React from 'react';
import { motion } from 'framer-motion';
import { TextRevealWithLine } from '@/components/interactive/TextReveal';
import MagneticButton from '@/components/interactive/MagneticButton';

const capabilities = [
    {
        title: 'AI Interface Design',
        description: 'Creating intuitive interfaces that bridge human interaction with artificial intelligence.',
        icon: '⚡️'
    },
    {
        title: 'Machine Learning Systems',
        description: 'Developing adaptive systems that learn and evolve with user behavior.',
        icon: '🧠'
    },
    {
        title: 'Natural Language',
        description: 'Building conversational experiences that feel natural and human.',
        icon: '💭'
    },
    {
        title: 'Computer Vision',
        description: 'Implementing visual intelligence that understands and interprets the world.',
        icon: '👁️'
    }
];

const CapabilitiesSection = () => {
    return (
        <section className="py-32 px-6 lg:px-8 bg-black text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                    {/* Left side */}
                    <div className="space-y-8">
                        <TextRevealWithLine delay={0.2}>
              <span className="text-sm font-mono tracking-wider text-white/60">
                Our Capabilities
              </span>
                        </TextRevealWithLine>

                        <TextRevealWithLine delay={0.4}>
                            <h2 className="text-4xl lg:text-5xl font-serif">
                                Bridging human creativity with artificial intelligence
                            </h2>
                        </TextRevealWithLine>

                        <TextRevealWithLine delay={0.6}>
                            <p className="text-lg text-white/60">
                                We create intelligent systems that adapt and evolve, pushing the boundaries
                                of what&#39;s possible in human-computer interaction.
                            </p>
                        </TextRevealWithLine>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <MagneticButton
                                className="px-6 py-3 text-sm font-mono tracking-wider border border-white/20 hover:border-white/100 transition-colors"
                            >
                                Explore Our Approach
                            </MagneticButton>
                        </motion.div>
                    </div>

                    {/* Right side - Capabilities grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {capabilities.map((capability, index) => (
                            <motion.div
                                key={capability.title}
                                className="group relative p-6 border border-white/10 hover:border-white/30 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                viewport={{ once: true }}
                                data-cursor-hover
                            >
                                <motion.div
                                    className="absolute inset-0 bg-primary/5"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <span className="text-2xl mb-4 block">{capability.icon}</span>

                                <h3 className="text-xl font-serif mb-2 relative">
                                    {capability.title}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 h-[1px] bg-white/40"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ originX: 0 }}
                                    />
                                </h3>

                                <p className="text-white/60">
                                    {capability.description}
                                </p>

                                {/* Animated corner */}
                                <motion.div
                                    className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/0 group-hover:border-white/40"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.div
                                    className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/0 group-hover:border-white/40"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesSection;