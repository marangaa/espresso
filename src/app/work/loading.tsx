import React from 'react';

function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-sm ${className}`}
        />
    );
}

export default function WorkLoading() {
    return (
        <div className="min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl">
                    <Skeleton className="h-12 w-2/3 mb-6" />
                    <Skeleton className="h-24 w-full" />
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="w-full aspect-[4/3]" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}