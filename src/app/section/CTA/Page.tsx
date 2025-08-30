import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative py-28 bg-black overflow-hidden">
            {/* Subtle violet glow in the background */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.25),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_40%)]"></div>

            <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-12">
                <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 tracking-tight">
                    Ready to Transform?
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
                    Join thousands exploring new realities with{" "}
                    <span className="font-semibold text-white">TimeLens</span>.
                </p>

                <Link
                    href="/upload"
                    className="inline-flex items-center px-10 py-4 text-lg font-semibold 
                               rounded-xl shadow-lg transition-all duration-500
                               bg-gradient-to-r from-violet-600 to-purple-500
                               text-white hover:shadow-violet-500/40 hover:scale-105"
                >
                    Start Your Journey
                    <svg
                        className="ml-3 w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
