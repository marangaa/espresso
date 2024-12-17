'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// You would typically fetch this data from your API/CMS
const getProjectData = (slug: string) => {
    return {
        id: slug,
        title: 'Neuromorphic Design System',
        description: 'Adaptive interfaces that learn and evolve with user behavior',
        category: 'AI Interface',
        client: 'TechCorp Industries',
        year: '2024',
        challenge: 'Creating an interface system that could learn from users while maintaining consistency and usability across multiple touchpoints.',
        solution: 'We developed a neural network-based design system that observes user interactions and gradually adjusts its behavior to match user preferences and needs.',
        images: [
            '/api/placeholder/1920/1080',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
        ],
        nextProject: {
            id: 'cognitive-architecture',
            title: 'Cognitive Architecture'
        }
    };
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = getProjectData(params.slug);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            {/* Hero Section */}
            <div className="h-screen relative flex items-end">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-32">
                    <div className="max-w-2xl text-white">
            <span className="text-sm text-white/60">
              {project.category}
            </span>
                        <h1 className="mt-4 text-5xl md:text-6xl font-serif">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Project Details */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-serif">Challenge</h2>
                            <p className="text-xl text-muted-foreground">
                                {project.challenge}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-serif">Solution</h2>
                            <p className="text-xl text-muted-foreground">
                                {project.solution}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <span className="text-sm text-muted-foreground">Client</span>
                            <p className="mt-1 text-lg">{project.client}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Year</span>
                            <p className="mt-1 text-lg">{project.year}</p>
                        </div>
                    </div>
                </div>

                {/* Project Gallery */}
                <div className="mt-32 space-y-16">
                    {project.images.slice(1).map((image, index) => (
                        <div key={index} className="aspect-[4/3]">
                            <img
                                src={image}
                                alt={`${project.title} detail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Project */}
            <Link href={`/work/${project.nextProject.id}`}>
                <div className="relative h-[50vh] group">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                        <img
                            src="/api/placeholder/1920/1080"
                            alt={project.nextProject.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="relative z-10 h-full flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-white">
                            <span className="text-sm text-white/60">Next Project</span>
                            <h2 className="mt-4 text-4xl font-serif group-hover:text-primary transition-colors">
                                {project.nextProject.title}
                            </h2>
                        </div>
                        <ArrowRight className="w-12 h-12 text-white transform group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}