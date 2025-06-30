import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Error404Page = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-700/25"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-sm font-medium text-red-800 dark:text-red-300">
                <span className="mr-2">🔍</span>
                Page not found
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Oops! Page
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
                  Not Found
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                The page you're looking for doesn't exist or has been moved. Let's get you back to exploring our developer community and amazing content.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/')} className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </button>
              
              </div>
            </div>

            {/* Right SVG Illustration - 404 Error Illustration */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <svg 
                  width="100%" 
                  height="500" 
                  viewBox="0 0 600 500" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-2xl"
                >
                  {/* Background Elements */}
                  <circle cx="300" cy="250" r="220" fill="url(#bgGradient)" fillOpacity="0.1" />
                  <circle cx="480" cy="100" r="40" fill="#ef4444" fillOpacity="0.1" className="animate-pulse" />
                  <circle cx="120" cy="80" r="25" fill="#f97316" fillOpacity="0.15" className="animate-bounce" />
                  <circle cx="500" cy="400" r="30" fill="#eab308" fillOpacity="0.1" className="animate-pulse" style={{animationDelay: '1s'}} />
                  
                  {/* Large 404 Text */}
                  <text x="300" y="200" textAnchor="middle" fill="url(#textGradient)" fontSize="120" fontWeight="bold" fontFamily="monospace" className="drop-shadow-lg">
                    404
                  </text>
                  
                  {/* Broken Computer/Screen */}
                  <rect x="200" y="220" width="200" height="140" rx="12" fill="url(#laptopGradient)" className="drop-shadow-xl" />
                  <rect x="200" y="220" width="200" height="18" rx="12" fill="#1e293b" />
                  
                  {/* Cracked Screen Effect */}
                  <rect x="205" y="245" width="190" height="105" rx="4" fill="#0f172a" />
                  
                  {/* Error Screen Content */}
                  <rect x="215" y="255" width="170" height="6" rx="3" fill="#ef4444" />
                  <text x="220" y="268" fill="#ef4444" fontSize="8" fontFamily="monospace">ERROR: Page not found</text>
                  
                  {/* Broken/Glitched Elements */}
                  <rect x="220" y="280" width="80" height="4" rx="2" fill="#64748b" />
                  <rect x="320" y="280" width="60" height="4" rx="2" fill="#64748b" opacity="0.5" />
                  <rect x="220" y="290" width="45" height="3" rx="1" fill="#94a3b8" />
                  <rect x="280" y="290" width="70" height="3" rx="1" fill="#94a3b8" opacity="0.3" />
                  <rect x="220" y="300" width="120" height="3" rx="1" fill="#94a3b8" opacity="0.7" />
                  
                  {/* Crack Lines on Screen */}
                  <path d="M250 245 L280 300 L320 280 L350 340" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.6" />
                  <path d="M320 250 L290 320 L340 310" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <path d="M220 290 L380 270" stroke="#eab308" strokeWidth="1" fill="none" opacity="0.3" />
                  
                  {/* Warning Icons */}
                  <circle cx="350" cy="270" r="8" fill="#ef4444" />
                  <text x="347" y="274" fill="white" fontSize="8" fontWeight="bold">!</text>
                  
                  {/* Laptop Base */}
                  <rect x="180" y="360" width="240" height="12" rx="6" fill="url(#baseGradient)" />
                  <ellipse cx="300" cy="375" rx="120" ry="6" fill="#1e293b" fillOpacity="0.3" />
                  
                  {/* Floating Error Messages */}
                  <g className="animate-float" style={{animationDuration: '3s'}}>
                    <rect x="80" y="130" width="100" height="70" rx="8" fill="white" stroke="#ef4444" strokeWidth="2" className="drop-shadow-lg" />
                    <circle cx="95" cy="145" r="6" fill="#ef4444" />
                    <text x="92" y="149" fill="white" fontSize="8" fontWeight="bold">✕</text>
                    <text x="110" y="148" fill="#1e293b" fontSize="9" fontWeight="bold">Error 404</text>
                    <rect x="88" y="155" width="84" height="2" rx="1" fill="#64748b" />
                    <rect x="88" y="160" width="60" height="2" rx="1" fill="#94a3b8" />
                    <rect x="88" y="165" width="75" height="2" rx="1" fill="#94a3b8" />
                    <rect x="88" y="170" width="50" height="2" rx="1" fill="#94a3b8" />
                    <text x="88" y="185" fill="#ef4444" fontSize="7" fontWeight="bold">File not found</text>
                  </g>
                  
                  <g className="animate-float" style={{animationDuration: '4s', animationDelay: '1s'}}>
                    <rect x="450" y="150" width="85" height="60" rx="8" fill="white" stroke="#f97316" strokeWidth="2" className="drop-shadow-lg" />
                    <circle cx="470" cy="170" r="8" fill="#f97316" />
                    <text x="466" y="175" fill="white" fontSize="10" fontWeight="bold">?</text>
                    <text x="485" y="173" fill="#1e293b" fontSize="8" fontWeight="bold">Lost?</text>
                    <rect x="458" y="185" width="70" height="2" rx="1" fill="#64748b" />
                    <rect x="458" y="190" width="45" height="2" rx="1" fill="#94a3b8" />
                    <rect x="458" y="195" width="55" height="2" rx="1" fill="#94a3b8" />
                  </g>
                  
                  <g className="animate-float" style={{animationDuration: '3.5s', animationDelay: '2s'}}>
                    <rect x="60" y="320" width="90" height="65" rx="8" fill="white" stroke="#eab308" strokeWidth="2" className="drop-shadow-lg" />
                    <rect x="75" cy="335" width="12" height="12" rx="2" fill="#eab308" />
                    <text x="79" y="343" fill="white" fontSize="8" fontWeight="bold">!</text>
                    <text x="95" y="342" fill="#1e293b" fontSize="8" fontWeight="bold">Warning</text>
                    <rect x="68" y="350" width="74" height="2" rx="1" fill="#64748b" />
                    <rect x="68" y="355" width="55" height="2" rx="1" fill="#94a3b8" />
                    <rect x="68" y="360" width="65" height="2" rx="1" fill="#94a3b8" />
                    <rect x="68" y="365" width="45" height="2" rx="1" fill="#94a3b8" />
                    <text x="68" y="378" fill="#eab308" fontSize="6" fontWeight="bold">Page missing</text>
                  </g>
                  
                  {/* Connection Lines (Broken/Disconnected) */}
                  <path d="M200 260 Q160 200 130 170" stroke="url(#errorLineGradient)" strokeWidth="2" fill="none" strokeDasharray="8,4" className="animate-pulse" opacity="0.6" />
                  <path d="M400 260 Q440 200 485 180" stroke="url(#errorLineGradient)" strokeWidth="2" fill="none" strokeDasharray="8,4" className="animate-pulse" style={{animationDelay: '0.5s'}} opacity="0.6" />
                  <path d="M220 360 Q140 350 110 360" stroke="url(#errorLineGradient)" strokeWidth="2" fill="none" strokeDasharray="8,4" className="animate-pulse" style={{animationDelay: '1s'}} opacity="0.6" />
                  
                  {/* Decorative Error Icons */}
                  <circle cx="520" cy="280" r="15" fill="#ef4444" fillOpacity="0.2" className="animate-ping" />
                  <text x="514" y="286" fontSize="14">💥</text>
                  
                  <circle cx="50" cy="220" r="12" fill="#f97316" fillOpacity="0.2" className="animate-ping" style={{animationDelay: '1.5s'}} />
                  <text x="46" y="225" fontSize="10">⚠️</text>
                  
                  <circle cx="300" cy="50" r="18" fill="#eab308" fillOpacity="0.2" className="animate-ping" style={{animationDelay: '0.8s'}} />
                  <text x="293" y="57" fontSize="16">🔍</text>
                  
                  {/* Gradients and Definitions */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                    <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="errorLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                  
                  <style>
                    {`
                      @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                      }
                      .animate-float {
                        animation: float 3s ease-in-out infinite;
                      }
                    `}
                  </style>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404Page;