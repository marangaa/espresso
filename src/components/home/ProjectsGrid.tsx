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
            className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl mx-auto ${
                project.alignment === 'right' ? 'lg:ml-0' : 'lg:mr-0'
            }`}
            data-cursor-hover
        >
            {/* Content */}
            <div 
                className={`space-y-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-center ${
                    project.alignment === 'right' ? 'lg:order-2' : 'lg:order-1'
                }`}
            >
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-sm font-mono tracking-wider text-muted-foreground">
                        {project.category}
                    </span>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
                        {project.title}
                    </h2>
                </motion.div>

                <motion.p
                    className="text-base sm:text-lg text-muted-foreground max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {project.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <button className="group inline-flex items-center space-x-3 text-base sm:text-lg hover:text-primary transition-colors">
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-2" />
                    </button>
                </motion.div>
            </div>

            {/* Image */}
            <motion.div
                className={`relative aspect-[16/9] lg:aspect-auto lg:h-[70vh] overflow-hidden ${
                    project.alignment === 'right' ? 'lg:order-1' : 'lg:order-2'
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <div className="absolute inset-4 lg:inset-8">
                    <div className="relative h-full w-full group">
                        <Image
                            src={`https://picsum.photos/200/300`}
                            alt={project.title}
                            fill
                            className="object-cover rounded-sm transition-transform duration-700 will-change-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        
                        {/* Overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-700 rounded-sm" />
                    </div>
                </div>
            </motion.div>
        </motion.article>
    );
};

const ProjectsGrid = () => {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16 lg:mb-24 space-y-4 px-4 sm:px-6 lg:px-8">
                    <motion.span
                        className="text-sm font-mono tracking-wider text-muted-foreground block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Work
                    </motion.span>
                    <motion.h2
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif"
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

                <div className="space-y-24 lg:space-y-40">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGrid;