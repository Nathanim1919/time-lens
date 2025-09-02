'use client';

import { authClient } from '@/lib/auth-client';
import { LogOut, User } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (isPending) return; // Still loading
        if (!session) {
            redirect("/login");
        }

        console.log(session);
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
        <div className="min-h-screen overflow-hidden">
            {/* Protected Navigation */}
            <nav className="backdrop-blur-sm fixed top-0 right-[100px] bottom-0 text-white h-[80%] w-[70px] my-auto z-50 grid">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        {/* User Info */}
                        <div className="flex items-center flex-col gap-6 justify-between">
                            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/in/profile')}>
                                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <span className="text-white font-medium text-sm">
                                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => authClient.signOut()}
                                className="px-4 py-2 cursor-pointer text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
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