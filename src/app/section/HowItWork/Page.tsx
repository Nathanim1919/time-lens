export default function HowItWork() {
    return (
        <section className="py-28 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
                {/* Heading */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center rounded-full bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 mb-6 backdrop-blur-sm border border-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Simple Process
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                        Transform in Three Steps
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Our AI technology makes it effortless to reimagine yourself across different eras and styles.
                    </p>
                </div>

                {/* Steps with connecting line */}
                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-1/2 top-20 bottom-20 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2 hidden md:block"></div>

                    <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative">
                        {/* Step 1 */}
                        <div className="text-center group relative">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto shadow-lg border border-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-black">
                                    1
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Upload Your Photo</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Select a clear photo of yourself. We support all common image formats.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center group relative">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-lg border border-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-black">
                                    2
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Choose Your Style</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Select from historical eras, futuristic themes, or artistic styles.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center group relative">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 rounded-full bg-green-500/10 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                <div className="relative w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg border border-green-500/30 group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-black">
                                    3
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Receive Transformation</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Get your AI-generated image in seconds. Download and share instantly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Visual process illustration for mobile */}
                <div className="mt-16 md:hidden">
                    <div className="flex flex-col items-center space-y-12">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white text-sm font-bold mr-4">
                                    {step}
                                </div>
                                <div className="h-0.5 w-8 bg-gray-700 mx-4"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <button className="inline-flex items-center px-6 py-3.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-all duration-300">
                        Begin Your Journey
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}