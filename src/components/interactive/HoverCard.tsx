import React, { ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HoverCardProps {
    children: ReactNode;
    className?: string;
    glareEffect?: boolean;
    borderEffect?: boolean;
}

const HoverCard = ({
                       children,
                       className = '',
                       glareEffect = true,
                       borderEffect = true
                   }: HoverCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
        damping: 20,
        stiffness: 200
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
        damping: 20,
        stiffness: 200
    });

    const glareBackground = useTransform(
        mouseX,
        [-0.5, 0.5],
        [
            'radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
            'radial-gradient(circle at 100% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)'
        ]
    );
    const glareOpacity = useTransform(mouseX, [-0.5, 0, 0.5], [1, 0, 1]);

    const borderClipPath = useTransform(
        mouseX,
        [-0.5, 0.5],
        ['inset(0% 50% 0% 0%)', 'inset(0% 0% 0% 50%)']
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            className={`relative group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
            }}
            data-cursor-hover
        >
            <motion.div
                className="relative"
                style={{
                    rotateX,
                    rotateY,
                }}
            >
                {children}

                {/* Glare Effect */}
                {glareEffect && (
                    <motion.div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                            background: glareBackground,
                            opacity: glareOpacity,
                        }}
                    />
                )}

                {/* Border Effect */}
                {borderEffect && (
                    <motion.div
                        className="absolute inset-0 rounded-lg border border-primary/20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            clipPath: borderClipPath,
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export default HoverCard;