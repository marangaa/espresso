'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 'neuromorphic-design',
        title: 'Neuromorphic Design System',
        description: 'Adaptive interfaces that learn and evolve with user behavior',
        category: 'AI Interface',
        image: '/api/placeholder/800/600',
        year: '2024',
    },
    {
        id: 'cognitive-architecture',
        title: 'Cognitive Architecture',
        description: "Building tomorrow's thinking spaces",
        category: 'Spatial Computing',
        image: '/api/placeholder/800/600',
        year: '2024',
    },
    // Add more projects...
];

const ProjectCard = ({ project, index }) => {
    return (
        <Link href={`/work/${project.id}`}>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
            >
                <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ArrowUpRight className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>
                </div>

                <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {project.category}
            </span>
                        <span className="text-sm text-muted-foreground">
              {project.year}
            </span>
                    </div>

                    <h2 className="text-2xl font-serif group-hover:text-primary transition-colors">
                        {project.title}
                    </h2>

                    <p className="text-muted-foreground">
                        {project.description}
                    </p>
                </div>
            </motion.article>
        </Link>
    );
};

export default function WorkPage() {
    return (
        <div className="min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-serif">Selected Work</h1>
                    <p className="mt-6 text-xl text-muted-foreground">
                        Exploring the intersection of artificial intelligence and human creativity
                        through innovative digital experiences.
                    </p>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}