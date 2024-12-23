'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TextRevealWithLine } from '@/components/interactive/TextReveal';
import TextReveal from '@/components/interactive/TextReveal';
import SectionWrapper from '@/components/home/SectionWrapper';
import HoverCard from '@/components/interactive/HoverCard';
import MagneticButton from '@/components/interactive/MagneticButton';

interface Article {
    title: string;
    category: ArticleCategory;
    excerpt: string;
    image: string;
    date: string;
    readingTime: number;
}

type ArticleCategory = 'All' | 'AI & Technology' | 'Design Thinking' | 'Innovation' | 'Culture';

interface CategoryFilterProps {
    activeCategory: ArticleCategory;
    setActiveCategory: (category: ArticleCategory) => void;
}

interface ArticleCardProps {
    article: Article;
}

// Define categories array
const categories: ArticleCategory[] = [
    'All',
    'AI & Technology',
    'Design Thinking',
    'Innovation',
    'Culture'
];

const FeaturedArticle: React.FC<{ article: Article }> = ({ article }) => {
    const { scrollYProgress } = useScroll();
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]));

    return (
        <section className="relative min-h-[80vh] flex items-center">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y }}
            >
                <Image
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                />

            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-3xl">
                    <TextReveal>
            <span className="text-sm font-mono tracking-wider text-white/60">
              Featured Article
            </span>
                    </TextReveal>

                    <TextRevealWithLine delay={0.2}>
                        <h1 className="text-4xl lg:text-6xl font-serif text-white mt-4">
                            {article.title}
                        </h1>
                    </TextRevealWithLine>

                    <TextReveal delay={0.4}>
                        <p className="text-xl text-white/80 mt-6">
                            {article.excerpt}
                        </p>
                    </TextReveal>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 flex items-center gap-6"
                    >
                        <MagneticButton className="px-6 py-3 bg-white text-black">
                            Read Article
                        </MagneticButton>
                        <div className="text-white/60">
                            <span className="text-sm">{article.readingTime} min read</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, setActiveCategory }) => (
    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {categories.map((category) => (
            <motion.button
                key={category}
                className={`px-4 py-2 text-sm font-mono whitespace-nowrap ${
                    activeCategory === category
                        ? 'bg-black text-white'
                        : 'bg-transparent text-black hover:bg-black/5'
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {category}
            </motion.button>
        ))}
    </div>
);

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <HoverCard className="group">
            <div className="space-y-4">
                <div className="relative aspect-[3/2] overflow-hidden">
                    <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    />
                </div>

                <div className="space-y-2">
          <span className="text-sm font-mono tracking-wider text-muted-foreground">
            {article.category}
          </span>

                    <h3 className="text-2xl font-serif group-hover:text-primary transition-colors">
                        {article.title}
                    </h3>

                    <p className="text-muted-foreground">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <span>{article.readingTime} min read</span>
                    </div>
                </div>
            </div>
        </HoverCard>
    );
};

const NewsletterSection = () => {
    return (
        <SectionWrapper className="py-32 bg-black" colorScheme="dark">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <TextRevealWithLine>
                    <h2 className="text-3xl lg:text-4xl font-serif text-white">
                        Stay Updated
                    </h2>
                </TextRevealWithLine>

                <TextReveal delay={0.2}>
                    <p className="text-xl text-white/60 mt-4 max-w-2xl mx-auto">
                        Subscribe to our newsletter for the latest insights on AI,
                        design, and innovation.
                    </p>
                </TextReveal>

                <motion.form
                    className="mt-8 max-w-md mx-auto flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                    />
                    <MagneticButton className="px-6 py-3 bg-white text-black whitespace-nowrap">
                        Subscribe
                    </MagneticButton>
                </motion.form>
            </div>
        </SectionWrapper>
    );
};

export default function InsightsPage() {
    const [activeCategory, setActiveCategory] = useState<ArticleCategory>('All');
    const [articles] = useState<Article[]>([
        {
            title: 'The Future of AI Interface Design',
            category: 'AI & Technology',
            excerpt: 'Exploring how artificial intelligence is reshaping the way we interact with digital interfaces.',
            image: '/api/placeholder/800/600',
            date: 'Mar 15, 2024',
            readingTime: 5
        },
        
        {
            title: 'Design Thinking in the Age of AI',
            category: 'Design Thinking',
            excerpt: 'How design thinking principles are evolving to incorporate artificial intelligence.',
            image: '/api/placeholder/800/600',
            date: 'Mar 10, 2024',
            readingTime: 6
        },
        {
            title: 'Innovating for a Sustainable Future',
            category: 'Innovation',
            excerpt: 'Exploring how innovation can drive sustainable solutions for a better world.',
            image: '/api/placeholder/800/600',
            date: 'Mar 5, 2024',
            readingTime: 7
        },
        {
            title: 'Cultivating a Creative Culture',
            category: 'Culture',
            excerpt: 'How to foster a culture of creativity and innovation within your organization.',
            image: '/api/placeholder/800/600',
            date: 'Mar 1, 2024',
            readingTime: 8
        }
    ]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FeaturedArticle article={articles[0]} />

            <SectionWrapper className="py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                        <TextRevealWithLine>
                            <h2 className="text-4xl font-serif">Latest Articles</h2>
                        </TextRevealWithLine>
                        <CategoryFilter
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            <NewsletterSection />
        </motion.div>
    );
}