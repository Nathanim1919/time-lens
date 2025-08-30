import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 grid place-items-center px-4">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-800 bg-gradient-to-b from-gray-900/70 to-gray-950/80 backdrop-blur-xl">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    Sign in to your account to continue
                </p>

                {/* Form */}
                <form className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-violet-500/30 transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-800"></div>
                    <span className="px-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-800"></div>
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    className="w-full py-3 flex items-center justify-center gap-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                {/* Footer */}
                <p className="text-gray-500 text-center text-sm mt-8">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-violet-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
