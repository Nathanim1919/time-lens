'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function NavigationWrapper() {
  const pathname = usePathname();
  
  // Hide navigation on protected routes
  const isProtectedRoute = pathname.startsWith('/in') || pathname.startsWith('/dashboard');
  
  if (isProtectedRoute) {
    return null;
  }
  
  return <Navigation />;
}
