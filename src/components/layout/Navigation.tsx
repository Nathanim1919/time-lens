'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '../../types';
import Button from '../ui/Button';

export default function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Hide navigation on protected routes
  const isProtectedRoute = pathname.startsWith('/in') || pathname.startsWith('/dashboard');

  if (isProtectedRoute) {
    return null;
  }

  return (
    <nav className="bg-black relative text-white w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold tracking-wide text-white">TimeLens</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['/', '/upload', '/gallery'].map((path, i) => (
              <Link
                key={i}
                href={path}
                className={`relative px-3 py-2 font-semibold text-sm transition-colors ${isActive(path)
                  ? 'text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:via-purple-600 after:to-pink-500'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium focus:outline-none"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-medium text-sm">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-gray-900 rounded-xl shadow-2xl py-2 z-50 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                      <p className="text-xs text-blue-400 font-medium mt-1">{user.credits} credits</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-lg">
                      Profile
                    </Link>
                    <Link href="/credits" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-lg">
                      Buy Credits
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-lg">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Minimal Sign In */}
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-transparent border-white/30 hover:bg-white/10 hover:border-violet-400 hover:text-violet-300 
                             rounded-lg px-5 py-2 transition-all duration-300"
                  >
                    Log In
                  </Button>
                </Link>

                {/* Premium Sign Up */}
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-violet-500 via-purple-600 to-pink-500 text-white font-semibold
                             rounded-lg px-6 py-2 border border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.5)]
                             hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 bg-black">
            <div className="space-y-2 px-2">
              {['/', '/upload', '/gallery'].map((path, i) => (
                <Link
                  key={i}
                  href={path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(path) ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
