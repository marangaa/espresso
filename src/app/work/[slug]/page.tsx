'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/project';

const ProjectHero = ({ project }: { project: Project }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="h-[90vh] relative flex items-center">
            <motion.div
                className="absolute inset-0"
                style={{ y, opacity }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
                <Image
                    src={project.heroImage.url}
                    alt={project.heroImage.alt}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            <div className="relative z-10 w-full">
                <motion.div
                    className="max-w-7xl mx-auto px-6 lg:px-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/work"
                        className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Link>

                    <div className="max-w-3xl">
                        <motion.span
                            className="text-sm text-white/60 block mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {project.category}
                        </motion.span>

                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {project.title}
                        </motion.h1>

                        <motion.p
                            className="text-xl text-white/80 mt-6 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {project.description}
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ProjectContent = ({ project }: { project: Project }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
            {/* Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                <div className="lg:col-span-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg max-w-none"
                    >
                        <h2 className="text-3xl font-serif">Overview</h2>
                        <p className="text-xl text-muted-foreground">{project.details.challenge}</p>
                    </motion.div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {[
                        { label: 'Client', value: project.client },
                        { label: 'Year', value: project.year },
                        { label: 'Services', value: project.category }
                    ].map((item) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
              <span className="text-sm text-muted-foreground block mb-1">
                {item.label}
              </span>
                            <span className="text-lg">{item.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h3 className="text-2xl font-serif">Challenge</h3>
                    <p className="text-lg text-muted-foreground">{project.details.challenge}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h3 className="text-2xl font-serif">Solution</h3>
                    <p className="text-lg text-muted-foreground">{project.details.solution}</p>
                </motion.div>
            </div>

            {/* Project Images */}
            <div className="space-y-32">
                {project.images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-video w-full overflow-hidden"
                    >
                        <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Results */}
            {project.details.results && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <h3 className="text-2xl font-serif mb-8">Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {project.details.results.map((result, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-muted"
                            >
                                <p className="text-lg">{result}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const NextProject = ({ project }: { project: Project['nextProject'] }) => {
    if (!project) return null;
    return (
        <Link href={`/work/${project.slug}`}>
            <div className="group relative h-[50vh] overflow-hidden">
                <Image
                    src={project.thumbnail.url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:bg-black/40" />

                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-between items-center">
                        <div>
                            <span className="text-sm text-white/60">Next Project</span>
                            <h2 className="mt-2 text-3xl font-serif text-white group-hover:text-primary transition-colors">
                                {project.title}
                            </h2>
                        </div>
                        <ArrowRight className="w-8 h-8 text-white transform transition-transform duration-500 group-hover:translate-x-2" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = React.use(params);
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await fetch(`/api/projects?slug=${resolvedParams.slug}`);
                if (!response.ok) throw new Error('Project not found');
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchProject();
    }, [resolvedParams.slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'Project not found'}</p>
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            <ProjectHero project={project} />
            <ProjectContent project={project} />
            {project.nextProject && <NextProject project={project.nextProject} />}
        </motion.div>
    );
}