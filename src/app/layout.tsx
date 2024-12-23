import { Inter, Playfair_Display } from 'next/font/google';
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
    title: 'Studio AI',
    description: 'Digital experiences crafted with intelligence',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            {/* Adding overflow-x-hidden prevents horizontal scrolling during page transitions */}
            {/* Adding min-h-screen ensures the page always fills the viewport height */}
            {/* Adding antialiased improves font rendering */}
            <body className="overflow-x-hidden min-h-screen antialiased">
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}