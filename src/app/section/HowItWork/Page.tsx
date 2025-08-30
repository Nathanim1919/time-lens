export default function HowItWork() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Three simple steps to transform your reality
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-white">1</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Photo</h3>
                        <p className="text-gray-600">
                            Simply drag and drop your selfie or click to browse. We support JPEG, PNG, and WebP formats.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-white">2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Era</h3>
                        <p className="text-gray-600">
                            Select from medieval, cyberpunk, anime, 1920s, space, and many more exciting themes.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-white">3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Your Transformation</h3>
                        <p className="text-gray-600">
                            Our AI generates your transformation in seconds. Download, share, and amaze your friends!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}