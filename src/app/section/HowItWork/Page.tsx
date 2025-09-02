'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HowItWork() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 1,
            title: "Upload Your Photo",
            description: "Select a clear, high-quality photo of yourself. We support all common formats and ensure your privacy.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/30",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"
        },
        {
            id: 2,
            title: "Choose Your Era",
            description: "Pick from 50+ historical periods, artistic styles, and cultural themes. Each transformation is unique.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/30",
            image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"
        },
        {
            id: 3,
            title: "Get Your Transformation",
            description: "Receive your AI-generated masterpiece in seconds. Download in high resolution and share instantly.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/30",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"
        }
    ];

    return (
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white/80 mb-8">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                        Simple & Fast
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Transform in
                        <br />
                        <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Three Steps
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Our advanced AI technology makes it effortless to reimagine yourself across different eras and styles in just seconds.
                    </p>
                </div>

                {/* Interactive Steps */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Steps List */}
                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                                    activeStep === index 
                                        ? `border-${step.color.split('-')[1]}-400 bg-white/5 shadow-xl shadow-${step.color.split('-')[1]}-500/20` 
                                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                }`}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                {/* Step Number */}
                                <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-sm font-bold border-2 border-slate-900`}>
                                    {step.id}
                                </div>

                                {/* Content */}
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}>
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Interactive Preview */}
                    <div className="relative">
                        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 bg-gradient-to-br from-slate-800 to-slate-700">
                            <img 
                                src={steps[activeStep].image} 
                                alt={`Step ${activeStep + 1}`} 
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            
                            {/* Step Indicator */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-white font-semibold">{steps[activeStep].title}</h4>
                                            <p className="text-gray-300 text-sm">Step {activeStep + 1} of 3</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center text-white`}>
                                            {steps[activeStep].icon}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute top-6 left-6 right-6">
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                                        style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce animation-delay-1000"></div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                        <p className="text-gray-400">Get your transformation in under 30 seconds</p>
                    </div>

                    <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">High Quality</h3>
                        <p className="text-gray-400">4K resolution output with stunning detail</p>
                    </div>

                    <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
                        <p className="text-gray-400">Your photos are processed securely and deleted</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link
                        href="/upload"
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    >
                        <span className="relative z-10 flex items-center">
                            Start Your Transformation
                            <svg className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                    <p className="text-gray-400 mt-4">
                        Join thousands of users transforming their photos daily
                    </p>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
}