import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import ClientLayout from '@/components/layout/ClientLayout';
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair'
});

export const metadata = {
    title: 'vertex ai',
    description: 'Digital experiences crafted with intelligence',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="overflow-x-hidden min-h-screen antialiased">
                <ClientLayout>
                    {children}
                </ClientLayout>
                <Analytics />
            </body>
        </html>
    );
}