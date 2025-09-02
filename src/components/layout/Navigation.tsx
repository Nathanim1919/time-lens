'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Hide navigation on protected routes
  const isProtectedRoute = pathname.startsWith('/in') || pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isProtectedRoute) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-sm">TL</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">TimeLens</span>
          </Link>

          {/* Sign In / Sign Up */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 rounded-xl text-sm font-semibold bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
