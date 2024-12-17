import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

// Update the MagneticButtonProps interface
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    // Removed onClick since it's included in ButtonHTMLAttributes
}

const MagneticButton = ({
    children,
    className = '',
    strength = 20,
    ...props
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Spring animation configuration
    const springConfig = { damping: 15, stiffness: 300, mass: 0.1 };

    // Motion values for x and y movement
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    // Transform the movement for a more subtle effect on the child
    const rotateX = useTransform(y, [-strength, strength], [5, -5]);
    const rotateY = useTransform(x, [-strength, strength], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX / 2);
        y.set(distanceY / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.button
            ref={buttonRef}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ x, y }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <motion.div style={{ rotateX, rotateY }}>
                {children}
            </motion.div>

            {/* Magnetic effect indicator */}
            <motion.div
                className="absolute -inset-4 bg-primary/5 rounded-full -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.button>
    );
};

export default MagneticButton;