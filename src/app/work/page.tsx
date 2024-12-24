'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import type { ProjectListItem } from '@/types/project';


function FilterButton({
    category,
    isActive,
    onClick
}: {
    category: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            className="relative px-4 py-2 text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <span className={`relative ${
                isActive 
                    ? 'text-black' 
                    : 'text-muted-foreground hover:text-black'
            }`}>
                {category}
            </span>
            <span 
                className={`absolute bottom-1 left-4 right-4 h-0.5 bg-black transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                }`} 
            />
        </motion.button>
    );
}

function ProjectCard({ project, index }: { project: ProjectListItem; index: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
        >
            <Link href={`/work/${project.slug}`} className="block group">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                        src={project.thumbnail.url}
                        alt={project.thumbnail.alt}
                        width={project.thumbnail.width}
                        height={project.thumbnail.height}
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <motion.div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <ArrowUpRight className="w-12 h-12 text-white" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-6 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                >
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
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default function WorkPage() {
    const [projects, setProjects] = useState<ProjectListItem[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectListItem[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) throw new Error('Failed to fetch projects');

                const data = await response.json();
                setProjects(data);
                setFilteredProjects(data);

                // Extract unique categories
                const uniqueCategories = ['All', ...Array.from(new Set(data.map((p: ProjectListItem) => p.category))) as string[]];
                setCategories(uniqueCategories);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === selectedCategory));
        }
    }, [selectedCategory, projects]);

    if (error) {
        return (
            <div className="min-h-screen pt-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-serif">Selected Work</h1>
                    <p className="mt-6 text-xl text-muted-foreground">
                        Exploring the intersection of artificial intelligence and human creativity
                        through innovative digital experiences.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-16 flex gap-2 overflow-x-auto pb-4 hide-scrollbar"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <FilterButton
                            key={category}
                            category={category}
                            isActive={category === selectedCategory}
                            onClick={() => setSelectedCategory(category)}
                        />
                    ))}
                </motion.div>

                {isLoading ? (
                    <div className="mt-16 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <motion.div
                        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}