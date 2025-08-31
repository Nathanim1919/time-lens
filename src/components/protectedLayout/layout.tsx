'use client';

import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (isPending) return; // Still loading
        if (!session) {
            redirect("/login");
        }
    }, [session, isPending]);

    // Show loading state while checking authentication
    if (isPending) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
            </div>
        );
    }

    // If not authenticated, this will redirect
    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-950 to-gray-900">
            {/* Protected Navigation */}
            <nav className="bg-black/80 backdrop-blur-sm text-white w-full z-50 shadow-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <span className="text-2xl font-bold tracking-wide text-white">TimeLens</span>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-medium text-sm">
                                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold text-white">{session.user.name}</p>
                                    <p className="text-xs text-gray-400">{session.user.email}</p>
                                </div>
                            </div>

                            {/* Sign Out Button */}
                            <button
                                onClick={() => authClient.signOut()}
                                className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}