export default function HowItWork() {
    return (
        <section className="py-28 bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
            {/* Subtle animated gradient glow backdrop */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(29,78,216,0.3),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25),transparent_40%)]"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                {/* Heading */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Just three steps to transform your reality with the power of AI
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Step 1 */}
                    <div className="text-center group">
                        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">Upload Your Photo</h3>
                        <p className="text-gray-400">
                            Drag and drop your selfie or upload directly. We support JPEG, PNG, and WebP formats.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center group">
                        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                            <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">Choose Your Era</h3>
                        <p className="text-gray-400">
                            Select from medieval, cyberpunk, anime, 1920s, space, and dozens of other realities.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center group">
                        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                            <div className="w-20 h-20 bg-gradient-to-tr from-green-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-600/30 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">Get Your Transformation</h3>
                        <p className="text-gray-400">
                            In seconds, our AI reimagines your photo. Download, share, and inspire your friends.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
