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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}