import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const TextReveal = ({ children, className = '', delay = 0 }: TextRevealProps) => {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay
                }}
                viewport={{ once: true }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    );
};

// Text reveal with line animation
export const TextRevealWithLine = ({ children, className = '', delay = 0 }: TextRevealProps) => {
    return (
        <div className="relative">
            <TextReveal delay={delay} className={className}>
                {children}
            </TextReveal>
            <motion.div
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: delay + 0.2
                }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
            />
        </div>
    );
};

// Character by character reveal
export const CharacterReveal = ({ text, className = '', delay = 0 }: { text: string } & TextRevealProps) => {
    const characters = text.split('');

    return (
        <div className={`flex overflow-hidden ${className}`}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                        delay: delay + index * 0.03
                    }}
                    viewport={{ once: true }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    );
};

export default TextReveal;