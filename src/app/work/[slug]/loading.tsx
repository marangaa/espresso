import React from 'react';

function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-sm ${className}`}
        />
    );
}

export default function ProjectLoading() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="h-screen relative flex items-end">
                <Skeleton className="absolute inset-0" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-32">
                    <div className="max-w-2xl">
                        <Skeleton className="h-4 w-24 mb-4" />
                        <Skeleton className="h-16 w-2/3" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-16">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mt-32 space-y-16">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="w-full aspect-[4/3]" />
                    ))}
                </div>
            </div>

            {/* Next Project */}
            <Skeleton className="w-full h-[50vh]" />
        </div>
    );
}