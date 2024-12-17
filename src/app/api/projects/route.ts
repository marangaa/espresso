import { NextResponse } from 'next/server';
import type { Project, ProjectListItem } from '@/types/project';

// Mock database - In production, this would be your actual database
const projects: Project[] = [
    {
        id: 'neuromorphic-design',
        slug: 'neuromorphic-design',
        title: 'Neuromorphic Design System',
        description: 'Adaptive interfaces that learn and evolve with user behavior',
        category: 'AI Interface',
        year: '2024',
        client: 'TechCorp Industries',
        thumbnail: {
            url: '/api/placeholder/800/600',
            alt: 'Neuromorphic Design System thumbnail',
            width: 800,
            height: 600
        },
        heroImage: {
            url: '/api/placeholder/1920/1080',
            alt: 'Neuromorphic Design System hero',
            width: 1920,
            height: 1080
        },
        images: [
            {
                url: '/api/placeholder/1920/1080',
                alt: 'Project detail 1',
                width: 1920,
                height: 1080
            },
            {
                url: '/api/placeholder/800/600',
                alt: 'Project detail 2',
                width: 800,
                height: 600
            }
        ],
        details: {
            challenge: 'Creating an interface system that could learn from users while maintaining consistency and usability across multiple touchpoints.',
            approach: 'We developed a comprehensive research phase to understand user behavior patterns and identify key adaptation points.',
            solution: 'A neural network-based design system that observes user interactions and gradually adjusts its behavior to match user preferences and needs.',
            results: [
                'Increased user engagement by 45%',
                'Reduced learning curve by 60%',
                'Improved user satisfaction scores by 35%'
            ],
            technologies: [
                'TensorFlow.js',
                'React',
                'Python',
                'WebGL'
            ]
        },
        nextProject: {
            id: 'cognitive-architecture',
            slug: 'cognitive-architecture',
            title: 'Cognitive Architecture',
            thumbnail: {
                url: '/api/placeholder/800/600',
                alt: 'Cognitive Architecture thumbnail',
                width: 800,
                height: 600
            }
        }
    },
    // Add more projects...
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    // If slug is provided, return single project
    if (slug) {
        const project = projects.find(p => p.slug === slug);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    }

    // Filter projects by category if provided
    let filteredProjects = projects;
    if (category && category !== 'All') {
        filteredProjects = projects.filter(p => p.category === category);
    }

    // Convert to list items (simplified version for listing)
    const projectList: ProjectListItem[] = filteredProjects.map(({
                                                                     id, slug, title, description, category, year, thumbnail
                                                                 }) => ({
        id,
        slug,
        title,
        description,
        category,
        year,
        thumbnail
    }));

    return NextResponse.json(projectList);
}