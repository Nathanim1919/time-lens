"use client";

import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await authClient.signIn.email({
                email,
                password,
            }, {
                onRequest: (ctx) => {
                    setIsLoading(true);
                },
                onSuccess: (ctx) => {
                    setIsLoading(false);
                    redirect("/in");
                },
                onError: (ctx) => {
                    console.error('Login error:', ctx.error);
                    setIsLoading(false);

                    if (ctx.error.message.includes('database') || ctx.error.message.includes('connection')) {
                        alert('Database connection issue. Please try again in a few moments.');
                    } else {
                        alert(ctx.error.message);
                    }
                },
            });
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            alert('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 flex items-center justify-center px-4">
            {/* Subtle background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-400">
                        Sign in to continue
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-3 py-2.5 pr-10 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <Button
                            variant="primary"
                            size="lg"
                            disabled={isLoading}
                            loading={isLoading}
                            type="submit"
                            className="w-full"
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                Sign in
                            </span>
                        </Button>
                    </form>

                    {/* OR Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-slate-600/50"></div>
                        <span className="px-3 text-gray-400 text-xs">or</span>
                        <div className="flex-grow h-px bg-slate-600/50"></div>
                    </div>

                    {/* Google Login */}
                    <Button
                        variant="outline"
                        size="lg"
                        disabled={isLoading}
                        className="w-full"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-4 h-4"
                        />
                        Continue with Google
                    </Button>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
