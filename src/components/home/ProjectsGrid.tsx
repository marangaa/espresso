import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/constants/content';

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { damping: 15, stiffness: 100 };
    const x = useSpring(
        useTransform(
            scrollYProgress,
            [0, 1],
            [project.alignment === 'right' ? 100 : -100, 0]
        ),
        springConfig
    );

    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]),
        springConfig
    );

    return (
        <motion.article
            ref={cardRef}
            style={{ x, opacity }}
            className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 my-32 ${
                project.alignment === 'right' ? 'lg:ml-auto' : 'lg:mr-auto'
            } w-11/12 max-w-6xl`}
            data-cursor-hover
        >
            <div className={`space-y-6 ${
                project.alignment === 'right' ? 'lg:order-1' : 'lg:order-2'
            }`}>
                <motion.span
                    className="text-sm font-mono tracking-wider text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {project.category}
                </motion.span>

                <motion.h2
                    className="text-4xl lg:text-5xl xl:text-6xl font-serif leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {project.title}
                </motion.h2>

                <motion.p
                    className="text-lg lg:text-xl text-muted-foreground max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {project.description}
                </motion.p>

                <motion.button
                    className="group flex items-center space-x-3 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                >
                    <span>View Project</span>
                    <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-2" />
                </motion.button>
            </div>

            <motion.div
                className={`relative aspect-[4/3] lg:aspect-auto lg:h-[70vh] ${
                    project.alignment === 'right' ? 'lg:order-2' : 'lg:order-1'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ scale: { duration: 0.3 } }}
            >
                <div className="relative h-full w-full">
                    <img
                        src={`/api/placeholder/800/600`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay" />
                    <div
                        className="absolute -inset-4 border border-primary/10 -z-10
                       opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </motion.div>
        </motion.article>
    );
};

const ProjectsGrid = () => {
    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <header className="text-center mb-24 space-y-4">
                    <motion.span
                        className="text-sm font-mono tracking-wider text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Work
                    </motion.span>
                    <motion.h2
                        className="text-5xl lg:text-7xl font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The Space Between
                    </motion.h2>
                    <motion.p
                        className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Exploring the intersection of human creativity and artificial intelligence.
                    </motion.p>
                </header>

                <div className="space-y-32 lg:space-y-48">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGrid;