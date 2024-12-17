import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const ContactCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isVisible, setIsVisible] = useState(false);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);

        const handleElementStates = () => {
            // Form inputs and textareas
            const formElements = document.querySelectorAll('input, textarea');
            formElements.forEach(element => {
                element.addEventListener('mouseenter', () => setCursorVariant('input'));
                element.addEventListener('mouseleave', () => setCursorVariant('default'));
            });

            // Clickable elements
            const clickables = document.querySelectorAll('button, a, [data-cursor="click"]');
            clickables.forEach(element => {
                element.addEventListener('mouseenter', () => setCursorVariant('click'));
                element.addEventListener('mouseleave', () => setCursorVariant('default'));
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        handleElementStates();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{ mixBlendMode: 'difference' }}
        >
            {/* Main cursor dot */}
            <motion.div
                className="fixed w-3 h-3 bg-white rounded-full"
                style={{
                    left: smoothX,
                    top: smoothY,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={cursorVariant}
                variants={{
                    default: { scale: 1 },
                    click: { scale: 0.5 },
                    input: { scale: 0.5 },
                }}
            />

            {/* Cursor ring */}
            <motion.div
                className="fixed rounded-full border-2 border-white pointer-events-none"
                style={{
                    left: smoothX,
                    top: smoothY,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={cursorVariant}
                variants={{
                    default: {
                        width: '30px',
                        height: '30px',
                        opacity: 0.5,
                    },
                    click: {
                        width: '50px',
                        height: '50px',
                        opacity: 0.8,
                    },
                    input: {
                        width: '40px',
                        height: '40px',
                        opacity: 0.3,
                    },
                }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                }}
            />
        </motion.div>
    );
};

export default ContactCursor;