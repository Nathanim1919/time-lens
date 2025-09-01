import Link from 'next/link';
// import { getAvailableThemes, getThemeDisplayName, getThemeIcon } from '../lib/ai';
import Feature from './section/Feature/Page';
import HowItWork from './section/HowItWork/Page';
import CTA from './section/CTA/Page';


export default function HomePage() {
  return (
    <>
      <section className="relative bg-black min-h-screen overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white z-10 py-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Reimagine yourself.
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Upload a single photo and watch AI transform you across timelines, cultures, and styles. 
              Discover versions of yourself you've never imagined.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/upload"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:opacity-90 transition-all transform hover:-translate-y-1"
              >
                Start Your Journey
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-gray-700 rounded-full hover:bg-gray-900 transition-all"
              >
                Explore Gallery
              </Link>
            </div>
          </div>

          {/* Right Column - Image Showcase */}
          <div className="relative h-[600px]">
            {/* Base Image */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-64 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Original portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Transformed Images */}
            <div className="absolute right-0 top-10 w-56 transform rotate-6 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Renaissance style" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute right-12 bottom-10 w-52 transform -rotate-3 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Futuristic style" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute right-32 top-1/2 w-48 transform rotate-12 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                alt="Cyberpunk style" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Connecting Line */}
            <div className="absolute left-64 top-1/2 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>
            
            {/* Floating Elements */}
            <div className="absolute left-40 top-20 w-6 h-6 rounded-full bg-blue-500 opacity-70 animate-pulse"></div>
            <div className="absolute left-32 bottom-28 w-4 h-4 rounded-full bg-purple-500 opacity-70 animate-pulse"></div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>
      
      {/* Rest of your sections */}
      <CTA />
      <Feature />
      <HowItWork /> 
    </>
  );
}