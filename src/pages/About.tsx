import React from 'react';
import { Code, Users, BookOpen, Heart, Zap, Globe } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-700/25"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                
                {/* Left Content */}
                <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300">
                    <Globe className="w-4 h-4 mr-2" />
                    About DevBlog Community
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                    Where Developers
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                    Share & Grow
                    </span>
                </h1>
                
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                    DevBlog Community is a vibrant platform designed exclusively for developers who are passionate about sharing knowledge and learning from each other.
                    </p>
                    
                    <p>
                    Whether you're a seasoned engineer sharing complex architectural insights, a junior developer documenting your learning journey, or someone exploring new technologies, our community provides the perfect space to express your ideas and connect with like-minded professionals.
                    </p>
                    
                    <p>
                    Join thousands of developers who have made DevBlog their home for technical discussions, tutorials, career advice, and everything in between. Together, we're building a more collaborative and knowledge-rich developer ecosystem.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Share Stories</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Technical blogs</p>
                        </div>
                        </div>
                        
                        
                        
                        <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                        <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                            <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Learn</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Grow together</p>
                        </div>
                    </div>
                </div>
                </div>

                {/* Right SVG Illustration - Large Animated Community Illustration */}
                <div className="flex justify-center items-center order-1 lg:order-2">
                <div className="relative w-full max-w-2xl">
                    <svg 
                    width="100%" 
                    height="600" 
                    viewBox="0 0 800 600" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                    >
                    {/* Background Elements */}
                    <circle cx="400" cy="300" r="280" fill="url(#bgGradient)" fillOpacity="0.1" />
                    <circle cx="650" cy="120" r="50" fill="#3b82f6" fillOpacity="0.1" className="animate-pulse" />
                    <circle cx="150" cy="100" r="35" fill="#8b5cf6" fillOpacity="0.15" className="animate-bounce" />
                    <circle cx="680" cy="480" r="40" fill="#06b6d4" fillOpacity="0.1" className="animate-pulse" style={{animationDelay: '1s'}} />
                    <circle cx="120" cy="450" r="25" fill="#10b981" fillOpacity="0.12" className="animate-pulse" style={{animationDelay: '2s'}} />
                    
                    {/* Central Community Hub */}
                    <circle cx="400" cy="300" r="120" fill="url(#hubGradient)" className="drop-shadow-xl" />
                    <circle cx="400" cy="300" r="100" fill="white" fillOpacity="0.9" />
                    <circle cx="400" cy="300" r="80" fill="url(#centerGradient)" />
                    
                    {/* Central Icon */}
                    <g transform="translate(370, 270)">
                        <rect width="60" height="60" rx="12" fill="white" />
                        <path d="M15 20 L25 15 L35 20 L45 15 M15 30 L25 25 L35 30 L45 25 M15 40 L25 35 L35 40 L45 35" 
                            stroke="#3b82f6" strokeWidth="2" fill="none" />
                        <circle cx="30" cy="45" r="3" fill="#8b5cf6" />
                        <circle cx="45" cy="15" r="2" fill="#06b6d4" />
                    </g>
                    
                    {/* Floating Developer Cards */}
                    <g className="animate-float" style={{animationDuration: '4s'}}>
                        <rect x="200" y="150" width="120" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                        <circle cx="230" cy="175" r="12" fill="url(#avatar1Gradient)" />
                        <rect x="250" y="168" width="60" height="4" rx="2" fill="#1e293b" />
                        <rect x="250" y="176" width="45" height="3" rx="1" fill="#64748b" />
                        <rect x="210" y="195" width="15" height="8" rx="4" fill="#3b82f6" />
                        <text x="230" y="201" fill="#64748b" fontSize="8">React</text>
                        <rect x="250" y="195" width="18" height="8" rx="4" fill="#10b981" />
                        <text x="255" y="201" fill="#64748b" fontSize="8">Node</text>
                        <rect x="275" y="195" width="15" height="8" rx="4" fill="#f59e0b" />
                        <text x="280" y="201" fill="#64748b" fontSize="8">JS</text>
                        <rect x="210" y="210" width="80" height="3" rx="1" fill="#e2e8f0" />
                        <rect x="210" y="216" width="60" height="2" rx="1" fill="#e2e8f0" />
                    </g>
                    
                    <g className="animate-float" style={{animationDuration: '3.5s', animationDelay: '1s'}}>
                        <rect x="480" y="140" width="120" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                        <circle cx="510" cy="165" r="12" fill="url(#avatar2Gradient)" />
                        <rect x="530" y="158" width="55" height="4" rx="2" fill="#1e293b" />
                        <rect x="530" y="166" width="40" height="3" rx="1" fill="#64748b" />
                        <rect x="490" y="185" width="18" height="8" rx="4" fill="#8b5cf6" />
                        <text x="495" y="191" fill="#64748b" fontSize="8">Python</text>
                        <rect x="515" y="185" width="15" height="8" rx="4" fill="#ef4444" />
                        <text x="520" y="191" fill="#64748b" fontSize="8">AI</text>
                        <rect x="490" y="200" width="75" height="3" rx="1" fill="#e2e8f0" />
                        <rect x="490" y="206" width="55" height="2" rx="1" fill="#e2e8f0" />
                    </g>
                    
                    <g className="animate-float" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}>
                        <rect x="150" y="350" width="120" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                        <circle cx="180" cy="375" r="12" fill="url(#avatar3Gradient)" />
                        <rect x="200" y="368" width="50" height="4" rx="2" fill="#1e293b" />
                        <rect x="200" y="376" width="35" height="3" rx="1" fill="#64748b" />
                        <rect x="160" y="395" width="15" height="8" rx="4" fill="#06b6d4" />
                        <text x="180" y="401" fill="#64748b" fontSize="8">Go</text>
                        <rect x="200" y="395" width="20" height="8" rx="4" fill="#84cc16" />
                        <text x="205" y="401" fill="#64748b" fontSize="8">Docker</text>
                        <rect x="160" y="410" width="70" height="3" rx="1" fill="#e2e8f0" />
                        <rect x="160" y="416" width="50" height="2" rx="1" fill="#e2e8f0" />
                    </g>
                    
                    <g className="animate-float" style={{animationDuration: '3.8s', animationDelay: '1.5s'}}>
                        <rect x="530" y="380" width="120" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                        <circle cx="560" cy="405" r="12" fill="url(#avatar4Gradient)" />
                        <rect x="580" y="398" width="55" height="4" rx="2" fill="#1e293b" />
                        <rect x="580" y="406" width="40" height="3" rx="1" fill="#64748b" />
                        <rect x="540" y="425" width="18" height="8" rx="4" fill="#f97316" />
                        <text x="545" y="431" fill="#64748b" fontSize="8">Rust</text>
                        <rect x="565" y="425" width="20" height="8" rx="4" fill="#14b8a6" />
                        <text x="570" y="431" fill="#64748b" fontSize="8">WebGL</text>
                        <rect x="540" y="440" width="75" height="3" rx="1" fill="#e2e8f0" />
                        <rect x="540" y="446" width="60" height="2" rx="1" fill="#e2e8f0" />
                    </g>
                    
                    {/* Blog Post Cards */}
                    <g className="animate-slide-up" style={{animationDuration: '3s', animationDelay: '2s'}}>
                        <rect x="80" y="250" width="100" height="70" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-md" />
                        <rect x="88" y="258" width="84" height="4" rx="2" fill="#3b82f6" />
                        <rect x="88" y="268" width="70" height="2" rx="1" fill="#64748b" />
                        <rect x="88" y="273" width="60" height="2" rx="1" fill="#94a3b8" />
                        <rect x="88" y="278" width="75" height="2" rx="1" fill="#94a3b8" />
                        <rect x="88" y="290" width="12" height="6" rx="3" fill="#3b82f6" />
                        <rect x="105" y="290" width="15" height="6" rx="3" fill="#8b5cf6" />
                        <rect x="125" y="290" width="18" height="6" rx="3" fill="#10b981" />
                        <g transform="translate(88, 305)">
                        <circle cx="6" cy="6" r="4" fill="#06b6d4" />
                        <rect x="15" y="3" width="30" height="2" rx="1" fill="#64748b" />
                        <rect x="15" y="7" width="20" height="1.5" rx="0.5" fill="#94a3b8" />
                        </g>
                    </g>
                    
                    <g className="animate-slide-up" style={{animationDuration: '3s', animationDelay: '2.5s'}}>
                        <rect x="620" y="260" width="100" height="70" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-md" />
                        <rect x="628" y="268" width="84" height="4" rx="2" fill="#8b5cf6" />
                        <rect x="628" y="278" width="65" height="2" rx="1" fill="#64748b" />
                        <rect x="628" y="283" width="55" height="2" rx="1" fill="#94a3b8" />
                        <rect x="628" y="288" width="70" height="2" rx="1" fill="#94a3b8" />
                        <rect x="628" y="300" width="15" height="6" rx="3" fill="#ef4444" />
                        <rect x="648" y="300" width="12" height="6" rx="3" fill="#f59e0b" />
                        <rect x="665" y="300" width="20" height="6" rx="3" fill="#06b6d4" />
                        <g transform="translate(628, 315)">
                        <circle cx="6" cy="6" r="4" fill="#10b981" />
                        <rect x="15" y="3" width="25" height="2" rx="1" fill="#64748b" />
                        <rect x="15" y="7" width="35" height="1.5" rx="0.5" fill="#94a3b8" />
                        </g>
                    </g>
                    
                    {/* Connection Lines */}
                    <path d="M320 190 Q360 220 380 250" stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeDasharray="8,8" className="animate-pulse" />
                    <path d="M480 180 Q440 210 420 250" stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeDasharray="8,8" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                    <path d="M270 390 Q330 360 380 340" stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeDasharray="8,8" className="animate-pulse" style={{animationDelay: '1s'}} />
                    <path d="M530 420 Q470 380 420 350" stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeDasharray="8,8" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                    
                    {/* Floating Icons */}
                    <g className="animate-bounce" style={{animationDuration: '2s', animationDelay: '1s'}}>
                        <circle cx="350" cy="100" r="20" fill="#f59e0b" fillOpacity="0.2" />
                        <text x="342" y="108" fontSize="16">💡</text>
                    </g>
                    
                    <g className="animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                        <circle cx="750" cy="300" r="18" fill="#10b981" fillOpacity="0.2" />
                        <text x="743" y="307" fontSize="14">🚀</text>
                    </g>
                    
                    <g className="animate-bounce" style={{animationDuration: '2.2s', animationDelay: '1.8s'}}>
                        <circle cx="50" cy="180" r="15" fill="#8b5cf6" fillOpacity="0.2" />
                        <text x="44" y="186" fontSize="12">⚡</text>
                    </g>
                    
                    <g className="animate-bounce" style={{animationDuration: '2.8s', animationDelay: '2.2s'}}>
                        <circle cx="400" cy="50" r="22" fill="#06b6d4" fillOpacity="0.2" />
                        <text x="391" y="58" fontSize="18">🌟</text>
                    </g>
                    
                    <g className="animate-bounce" style={{animationDuration: '2.3s', animationDelay: '3s'}}>
                        <circle cx="100" cy="520" r="16" fill="#f97316" fillOpacity="0.2" />
                        <text x="93" y="527" fontSize="13">🎯</text>
                    </g>
                    
                    {/* Gradients and Definitions */}
                    <defs>
                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                        </linearGradient>
                        <linearGradient id="avatar1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="avatar2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                        <linearGradient id="avatar3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="avatar4Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                    
                    <style>
                        {`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-15px); }
                        }
                        @keyframes slide-up {
                            0% { transform: translateY(20px); opacity: 0; }
                            100% { transform: translateY(0px); opacity: 1; }
                        }
                        .animate-float {
                            animation: float ease-in-out infinite;
                        }
                        .animate-slide-up {
                            animation: slide-up ease-out forwards;
                        }
                        `}
                    </style>
                    </svg>
                </div>
                </div>
            </div>
            </div>
        </section>

      {/* Bottom section with community stats */}
        <section className="py-12 sm:py-16 bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 mb-6">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Built with passion for the developer community
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Ready to join our community?
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Start sharing your development journey today and become part of a growing community of passionate developers.
            </p>
            </div>
        </section>
        </div>
    );
};

export default AboutPage;