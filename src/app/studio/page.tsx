'use client'
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Image from 'next/image';
import SectionWrapper from '@/components/home/SectionWrapper';
import { TextRevealWithLine, CharacterReveal } from '@/components/interactive/TextReveal';
import HoverCard from '@/components/interactive/HoverCard';
import MagneticButton from '@/components/interactive/MagneticButton';
import TextReveal from '@/components/interactive/TextReveal'

const StudioHero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]));

    const AnimatedLine = ({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) => {
        const scaleX = useTransform(
            scrollYProgress,
            [0, 1],
            [1, 1 + (index % 2 ? 0.5 : -0.5)]
        );

        return (
            <motion.div
                className="absolute w-full h-px bg-white/10"
                style={{
                    top: `${index * 5}%`,
                    left: 0,
                    scaleX,
                }}
            />
        );
    };

    return (
        <div ref={containerRef} className="relative min-h-[100svh] flex items-center">
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Grid pattern */}
                <motion.div
                    className="absolute inset-0"
                    style={{ y }}
                >
                    {[...Array(20)].map((_, i) => (
                        <AnimatedLine key={i} index={i} scrollYProgress={scrollYProgress} />
                    ))}
                </motion.div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="max-w-3xl">
                    <TextReveal>
                        <span className="text-sm font-mono tracking-wider text-white/60">
                            Our Story
                        </span>
                    </TextReveal>

                    <div className="mt-4 md:mt-6">
                        <CharacterReveal
                            text="Crafting the future"
                            className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white"
                            delay={0.2}
                        />
                        <CharacterReveal
                            text="of digital experiences"
                            className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white mt-2"
                            delay={0.4}
                        />
                    </div>

                    <TextReveal delay={0.6}>
                        <p className="text-lg md:text-xl text-white/60 mt-6 md:mt-8">
                            We are a team of designers, developers, and AI specialists
                            pushing the boundaries of what&apos;s possible in digital spaces.
                        </p>
                    </TextReveal>
                </div>
            </div>
        </div>
    );
};

const ValuesSection = () => {
    const values = [
        {
            title: 'Innovation First',
            description: 'Constantly pushing boundaries and exploring new possibilities.'
        },
        {
            title: 'Human-Centered',
            description: 'Technology that enhances and empowers human capabilities.'
        },
        {
            title: 'Ethical Approach',
            description: 'Responsible development with transparency and trust.'
        },
        {
            title: 'Collaborative Spirit',
            description: 'Working together to create extraordinary experiences.'
        }
    ];

    return (
        <SectionWrapper className="py-16 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="space-y-6 md:space-y-8">
                        <TextRevealWithLine>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif">Our Values</h2>
                        </TextRevealWithLine>

                        <TextReveal>
                            <p className="text-xl text-muted-foreground">
                                Built on principles that drive innovation and foster meaningful connections.
                            </p>
                        </TextReveal>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                        {values.map((value, index) => (
                            <HoverCard
                                key={value.title}
                                className="p-6 bg-muted"
                                glareEffect={true}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-xl font-serif">{value.title}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </motion.div>
                            </HoverCard>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

const TeamSection = () => {
    const team = [
        {
            name: 'Alex Chen',
            role: 'Creative Director',
            image: `https://api.dicebear.com/9.x/lorelei/svg?seed=Felix`
        },
        {
            name: 'Sarah Wu',
            role: 'AI Lead',
            image: `https://api.dicebear.com/9.x/avataaars/svg?seed=Felix`
        },
        {
            name: 'Marcus Kim',
            role: 'Design Lead',
            image: `https://api.dicebear.com/9.x/adventurer/svg?seed=Felix`
        },
        {
            name: 'Julia Santos',
            role: 'Tech Lead',
            image: `https://api.dicebear.com/9.x/micah/svg?seed=Felix`
        }
    ];

    return (
        <SectionWrapper className="py-16 md:py-32 bg-black" colorScheme="dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TextRevealWithLine>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-8 md:mb-16">
                        Our Team
                    </h2>
                </TextRevealWithLine>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {team.map((member, index) => (
                        <HoverCard
                            key={member.name}
                            className="group"
                            glareEffect={true}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden mb-3 md:mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <h3 className="text-base sm:text-xl font-serif text-white">{member.name}</h3>
                                <p className="text-sm sm:text-base text-white/60">{member.role}</p>
                            </motion.div>
                        </HoverCard>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

const JoinSection = () => {
    return (
        <SectionWrapper className="py-16 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <TextRevealWithLine>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif">Join Our Team</h2>
                </TextRevealWithLine>

                <TextReveal delay={0.2}>
                    <p className="text-lg md:text-xl text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto">
                        We&apos;re always looking for talented individuals who share our passion
                        for innovation and creativity.
                    </p>
                </TextReveal>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 md:mt-12"
                >
                    <MagneticButton className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-base sm:text-lg">
                        View Open Positions
                    </MagneticButton>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StudioHero />
            <ValuesSection />
            <TeamSection />
            <JoinSection />
        </motion.div>
    );
}