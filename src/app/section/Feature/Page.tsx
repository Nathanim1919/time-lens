import { getAvailableThemes, getThemeDisplayName, getThemeIcon } from "@/lib/ai";

export default function Feature() {
    const themes = getAvailableThemes().slice(0, 6); // Show first 6 themes

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Era
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        From medieval knights to cyberpunk warriors, explore endless possibilities with our AI-powered transformations.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {themes.map((theme) => (
                        <div
                            key={theme}
                            className="group cursor-pointer p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                {getThemeIcon(theme)}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {getThemeDisplayName(theme)}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}