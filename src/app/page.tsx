import Link from 'next/link';
import { getAvailableThemes, getThemeDisplayName, getThemeIcon } from '../lib/ai';
import Feature from './section/Feature/Page';
import HowItWork from './section/HowItWork/Page';
import CTA from './section/CTA/Page';

export default function HomePage() {

  return (
    <>
      <section className="relative bg-black min-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative text-white min-h-[90vh] flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl capitalize md:text-6xl font-extrabold leading-tight mb-6">
              discover versions of yourself you’ve never seen before.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Upload a photo and watch AI reimagine you across timelines, cultures, and styles.
              From ancient portraits to futuristic visions — discover versions of yourself you’ve never seen before.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/upload"
                className="inline-flex items-center px-10 py-4 text-lg font-semibold text-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-xl hover:opacity-90 transition"
              >
                Start Your Journey
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center px-10 py-4 text-lg font-semibold border-2 border-gray-500 rounded-full text-white hover:bg-gray-900 transition"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>

        <div className="columns-3 gap-4 w-[50%] absolute top-0 right-0 transform rotate-45">
          {/* Gradient overlay */}
          <div
            className="absolute top-0 right-0 w-[100%] h-full pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(0,0,0), rgba(0,0,0,.7),rgba(0,0,0,.5),rgba(0,0,0,.2),rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.8),rgba(0,0,0))" }}
          />

          {/* Images */}
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/700" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/450" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/600" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/500" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/700" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/450" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/600" alt="Hero" />
          <img className="w-full mb-4 rounded-lg" src="https://picsum.photos/400/500" alt="Hero" />
        </div>


      </section>
      <Feature />
      <HowItWork />
      <CTA />
    </>
  );
}