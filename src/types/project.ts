export type ProjectCategory =
    | 'AI Interface'
    | 'Spatial Computing'
    | 'Machine Learning'
    | 'Data Visualization'
    | 'Content Generation'

export interface ProjectImage {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export interface ProjectDetails {
    challenge: string;
    approach: string;
    solution: string;
    results?: string[];
    technologies?: string[];
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: ProjectCategory;
    year: string;
    client: string;
    thumbnail: ProjectImage;
    heroImage: ProjectImage;
    images: ProjectImage[];
    details: ProjectDetails;
    nextProject?: {
        id: string;
        slug: string;
        title: string;
        thumbnail: ProjectImage;
    };
}

export interface ProjectListItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: ProjectCategory;
    year: string;
    thumbnail: ProjectImage;
}