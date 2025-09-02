import Link from 'next/link';
import Feature from './section/Feature/Page';
import HowItWork from './section/HowItWork/Page';
import CTA from './section/CTA/Page';
import Footer from './section/Footer/Page';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            
            {/* Left Column - Content */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">Transform Your Reality</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Rewrite
                  </span>
                  <br />
                  <span className="text-white">Your Story</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg">
                  Step into different eras, cultures, and styles. See yourself through the lens of time itself.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Link
                  href="/upload"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  <span className="relative z-10">Begin Your Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Gallery
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-gray-400">Transformations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Eras & Styles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Image Showcase */}
            <div className="relative h-[700px] flex items-center justify-center">
              {/* Central Orb */}
              <div className="relative w-80 h-80">
                {/* Main Image Container */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Original portrait" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Rotating Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-blue-500/30 animate-spin-slow-reverse"></div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce animation-delay-1000"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full animate-bounce animation-delay-2000"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-bounce animation-delay-3000"></div>
              </div>

              {/* Orbiting Images */}
              <div className="absolute inset-0 animate-spin-slow">
                {/* Renaissance Era */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-20 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Renaissance style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Renaissance</div>
                </div>

                {/* Future Era */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Futuristic style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Future</div>
                </div>

                {/* Cyberpunk Era */}
                <div className="absolute left-0 top-1/2 transform -translate-x-20 -translate-y-1/2 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Cyberpunk style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Cyberpunk</div>
                </div>

                {/* Vintage Era */}
                <div className="absolute right-0 top-1/2 transform translate-x-20 -translate-y-1/2 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Vintage style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Vintage</div>
                </div>
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="160" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-spin-slow"/>
                <circle cx="200" cy="200" r="120" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" className="animate-spin-slow-reverse"/>
              </svg>

              {/* Particle Effects */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Rest of your sections */}
      <CTA />
      <Feature />
      <HowItWork />
      <Footer />
    </>
  );
}