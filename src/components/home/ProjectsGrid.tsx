import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/constants/content';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    client: string;
    year: string;
    role: string;
    alignment: 'left' | 'right';
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
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
            [project.alignment === 'right' ? 50 : -50, 0]
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
            className={`relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full lg:w-11/12 max-w-6xl mx-auto`}
            data-cursor-hover
        >
            <div className={`space-y-4 sm:space-y-6 ${
                project.alignment === 'right' ? 'lg:order-1' : ''
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
                    className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {project.title}
                </motion.h2>

                <motion.p
                    className="text-base sm:text-lg text-muted-foreground max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {project.description}
                </motion.p>

                <motion.button
                    className="group flex items-center space-x-3 text-base sm:text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-2" />
                </motion.button>
            </div>

            <motion.div
                className={`relative aspect-[4/3] lg:aspect-auto lg:h-[60vh] ${
                    project.alignment === 'right' ? '' : 'lg:order-first'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ scale: { duration: 0.3 } }}
            >
                <div className="relative h-full w-full">
                    <Image
                        src={`https://picsum.photos/id/32/800/600`}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
        <section className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12 sm:mb-16 space-y-4">
                    <motion.span
                        className="text-sm font-mono tracking-wider text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Work
                    </motion.span>
                    <motion.h2
                        className="text-4xl sm:text-5xl lg:text-7xl font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The Space Between
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Exploring the intersection of human creativity and artificial intelligence.
                    </motion.p>
                </header>

                <div className="space-y-16 sm:space-y-24 lg:space-y-32">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGrid;