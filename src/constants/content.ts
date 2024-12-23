type ProjectAlignment = 'left' | 'right';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    client: string;
    year: string;
    role: string;
    alignment: ProjectAlignment;
}

export const SITE_CONFIG = {
    name: 'Studio AI',
    email: 'hello@studioai.com',
    location: {
        street: '44 Tehama Street',
        city: 'San Francisco, CA 94105'
    },
    social: [
        { name: 'Twitter', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'Instagram', url: '#' }
    ]
};

export const NAVIGATION = [
    {
        title: 'Work',
        description: 'Exploring the intersection of AI and design',
        href: '/work'
    },
    {
        title: 'Approach',
        description: 'How we think about artificial intelligence',
        href: '/approach'
    },
    {
        title: 'Studio',
        description: 'Our team and philosophy',
        href: '/studio'
    },
    {
        title: 'Contact',
        description: 'Start a conversation',
        href: '/contact'
    }
];

export const PROJECTS: Project[] = [
    {
        id: 'neuromorphic-design-system',
        title: 'Neuromorphic Design System',
        description: 'Crafting adaptive interfaces that learn and evolve with user behavior',
        category: 'AI Interface',
        client: 'TechCorp Industries',
        year: '2024',
        role: 'Design System Architecture',
        alignment: 'right' as const
    },
    {
        id: 'synthetic-media-engine',
        title: 'Synthetic Media Engine',
        description: 'Generated content that maintains human authenticity',
        category: 'Content Generation',
        client: 'MediaTech Solutions',
        year: '2024',
        role: 'AI Development',
        alignment: 'left' as const
    },
    {
        id: 'cognitive-architecture',
        title: 'Cognitive Architecture',
        description: "Building tomorrow's thinking spaces",
        category: 'Spatial Computing',
        client: 'Future Spaces Inc',
        year: '2024',
        role: 'System Design',
        alignment: 'right' as const
    },
    {
        id: 'data-visualization-suite',
        title: 'Data Visualization Suite',
        description: 'Transforming data into interactive narratives',
        category: 'Data Visualization',
        client: 'Insight Analytics',
        year: '2024',
        role: 'Frontend Development',
        alignment: 'left' as const
    },
    {
        id: 'machine-learning-platform',
        title: 'Machine Learning Platform',
        description: 'Empowering developers with AI tools',
        category: 'Machine Learning',
        client: 'CodeCraft Labs',
        year: '2024',
        role: 'Backend Development',
        alignment: 'right' as const
    },
    {
        id: 'ai-ethics-framework',
        title: 'AI Ethics Framework',
        description: 'Guiding principles for responsible AI',
        category: 'AI Ethics',
        client: 'Ethical AI Institute',
        year: '2024',
        role: 'Research & Development',
        alignment: 'left' as const
    }
] as const;