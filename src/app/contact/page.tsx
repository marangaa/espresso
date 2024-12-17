'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { TextRevealWithLine } from '@/components/interactive/TextReveal';
import TextReveal from "@/components/interactive/TextReveal";
import SectionWrapper from '@/components/home/SectionWrapper';
import ContactForm from '@/components/contact/ContactForm';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const socialLinks = [
    {
        name: 'Twitter',
        url: 'https://twitter.com',
        icon: Twitter,
        color: '#1DA1F2'
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com',
        icon: Linkedin,
        color: '#0A66C2'
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com',
        icon: Instagram,
        color: '#E4405F'
    }
];

const ContactHero = () => {
    return (
        <div className="relative">
            {/* Animated background dots */}
            <div className="absolute inset-0 -z-10">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="space-y-8">
                <TextRevealWithLine>
          <span className="text-sm font-mono tracking-wider text-muted-foreground">
            Get in Touch
          </span>
                </TextRevealWithLine>

                <TextRevealWithLine delay={0.2}>
                    <h1 className="text-4xl lg:text-5xl font-serif">
                        Let&#39;s create something extraordinary together
                    </h1>
                </TextRevealWithLine>

                <TextReveal delay={0.4}>
                    <p className="text-xl text-muted-foreground">
                        We collaborate with clients worldwide to create
                        innovative digital experiences.
                    </p>
                </TextReveal>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <a
                        href="mailto:hello@studioai.com"
                        className="flex items-center gap-2 text-lg hover:text-primary transition-colors cursor-pointer"
                    >
                        <Mail className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                        hello@studioai.com
                    </a>

                    <div className="flex gap-6">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                whileHover={{ y: -2 }}
                                style={{ color: social.color }}
                            >
                                <social.icon className="w-6 h-6" />
                                <span className="sr-only">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default function ContactPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen relative"
        >
            <SectionWrapper className="py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <ContactHero />
                        <div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </motion.div>
    );
}