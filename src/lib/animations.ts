
export const EASE = [0.76, 0, 0.24, 1]; // Custom easing function

export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: EASE }
};

export const slideIn = (direction = 'left') => ({
    initial: {
        x: direction === 'left' ? -100 : 100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1
    },
    transition: {
        duration: 0.8,
        ease: EASE
    }
});

export const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: EASE }
};

export const springConfig = {
    stiffness: 100,
    damping: 15,
    mass: 1
};

export const pageTransition = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASE
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.6,
            ease: EASE
        }
    }
};