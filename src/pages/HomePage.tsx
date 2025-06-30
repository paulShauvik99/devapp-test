import { useState, useEffect } from 'react';
import { 
  Users, BookOpen, MessageSquare,
  TrendingUp, Award,
  ArrowRight, Calendar, Heart, LogOut,
  Settings, User, Bell, Plus, Lock
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slice/authSlice';
import { createBlog, fetchBlogs, fetchUserBlogs } from '../store/slice/blogSlice';
import { fetchDevelopers } from '../store/slice/userSlice';
import type { Blog, CreateBlogInput, UpdateBlogInput } from '../models';
import CreateBlogModal from './CreateBlogPage';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlogs()); 
    dispatch(fetchDevelopers())
  }, [dispatch]);
  
  // Connect to Redux store
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  // isAuthenticated = true;
  const mockBlogs  = useAppSelector((state) => state.blogs.blogs);
  // Mock user data
  const mockUsers  = useAppSelector((state) => state.developers.developers);
  console.log(isAuthenticated)
  const [isModalOpen, setIsModalOpen] = useState(false);
// const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  


  const formatDate = (date: Date | string) => {
    const now = new Date();
    const inputDate = typeof date === 'string' ? new Date(date) : date;
    const diffTime = Math.abs(now.getTime() - inputDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return inputDate.toLocaleDateString();
  };

  const getAuthor = (authorId : string) => {
    return mockUsers.find(user => user.id === authorId);
  };

  const handleCreateBlog = () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
    // Navigate to CreateBlog page
    setIsModalOpen(true);
    
  };

    const handleSaveBlog = async (blogData: CreateBlogInput | UpdateBlogInput) => {
        await dispatch(createBlog({ id: user!.id, data: blogData as CreateBlogInput }));
        setIsModalOpen(false);
    };
  

  const handleFindDevelopers = () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
    navigate('/developers');
    // Navigate to FindDevelopers page
  };

  const handleReadBlog = (blogId : string) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
    // Navigate to ReadBlog page
    navigate(`/blogs/${blogId}/view`);
  };

  const handleAllBlogs = () => {
    // Navigate to AllBlogs page
    navigate('/blogs');
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };


  const navigateToLogin = () => {
    navigate('/login');
  }
  const navigateToRegister = () => {
    navigate('/register');
  }



  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const techStats = [
    { tech: "React", count: 2847, trend: "+12%" },
    { tech: "Node.js", count: 2134, trend: "+8%" },
    { tech: "Python", count: 1923, trend: "+15%" },
    { tech: "TypeScript", count: 1756, trend: "+23%" },
    { tech: "Go", count: 892, trend: "+31%" },
    { tech: "Rust", count: 456, trend: "+45%" }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">    

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-700/25"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {!isAuthenticated && (
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Join the developer community
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                {isAuthenticated ? (
                  <>
                    Welcome Back to
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                      DevBlog Community
                    </span>
                  </>
                ) : (
                  <>
                    Share Your Code
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                      Stories & Insights
                    </span>
                  </>
                )}
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAuthenticated ? (
                  "Continue sharing your development journey, connect with fellow developers, and discover new insights in the tech world."
                ) : (
                  "A platform where developers share experiences, tutorials, and insights. Join our community to read, write, and connect with passionate developers worldwide."
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => navigate('/blogs')} className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                      <Users className="w-5 h-5 mr-2" />
                      Explore Blogs
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={navigateToLogin}
                      className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                    <button 
                      onClick={navigateToRegister}
                      className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center"
                    >
                      Join Community
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right SVG Illustration - Large Developer Blog Illustration */}
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
                  <circle cx="480" cy="100" r="40" fill="#3b82f6" fillOpacity="0.1" className="animate-pulse" />
                  <circle cx="120" cy="80" r="25" fill="#8b5cf6" fillOpacity="0.15" className="animate-bounce" />
                  <circle cx="500" cy="400" r="30" fill="#06b6d4" fillOpacity="0.1" className="animate-pulse" style={{animationDelay: '1s'}} />
                  
                  {/* Main Laptop/Computer */}
                  <rect x="180" y="180" width="240" height="160" rx="12" fill="url(#laptopGradient)" className="drop-shadow-xl" />
                  <rect x="180" y="180" width="240" height="20" rx="12" fill="#1e293b" />
                  <rect x="185" y="205" width="230" height="125" rx="4" fill="#0f172a" />
                  
                  {/* Screen Content - Blog Interface */}
                  <rect x="195" y="215" width="210" height="8" rx="4" fill="#3b82f6" />
                  <text x="200" y="228" fill="#e2e8f0" fontSize="8" fontFamily="monospace">DevBlog Dashboard</text>
                  
                  {/* Blog Cards on Screen */}
                  <rect x="200" y="240" width="90" height="50" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <rect x="205" y="245" width="80" height="3" rx="1" fill="#64748b" />
                  <rect x="205" y="250" width="60" height="2" rx="1" fill="#94a3b8" />
                  <rect x="205" y="254" width="70" height="2" rx="1" fill="#94a3b8" />
                  <rect x="205" y="265" width="15" height="8" rx="2" fill="#3b82f6" />
                  <text x="225" y="271" fill="#e2e8f0" fontSize="6">React</text>
                  <rect x="245" y="265" width="15" height="8" rx="2" fill="#8b5cf6" />
                  <text x="250" y="271" fill="#e2e8f0" fontSize="6">JS</text>
                  
                  <rect x="305" y="240" width="90" height="50" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <rect x="310" y="245" width="80" height="3" rx="1" fill="#64748b" />
                  <rect x="310" y="250" width="55" height="2" rx="1" fill="#94a3b8" />
                  <rect x="310" y="254" width="75" height="2" rx="1" fill="#94a3b8" />
                  <rect x="310" y="265" width="18" height="8" rx="2" fill="#10b981" />
                  <text x="315" y="271" fill="#e2e8f0" fontSize="6">Node</text>
                  <rect x="335" y="265" width="15" height="8" rx="2" fill="#f59e0b" />
                  <text x="340" y="271" fill="#e2e8f0" fontSize="6">API</text>
                  
                  <rect x="200" y="300" width="195" height="25" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <rect x="205" y="305" width="120" height="3" rx="1" fill="#64748b" />
                  <rect x="205" y="310" width="80" height="2" rx="1" fill="#94a3b8" />
                  <rect x="205" y="314" width="100" height="2" rx="1" fill="#94a3b8" />
                  
                  {/* Laptop Base */}
                  <rect x="160" y="340" width="280" height="15" rx="8" fill="url(#baseGradient)" />
                  <ellipse cx="300" cy="355" rx="140" ry="8" fill="#1e293b" fillOpacity="0.3" />
                  
                  {/* Floating Code Snippets */}
                  <g className="animate-float" style={{animationDuration: '3s'}}>
                    <rect x="100" y="120" width="80" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                    <rect x="108" y="128" width="12" height="12" rx="2" fill="#3b82f6" />
                    <text x="125" y="136" fill="#1e293b" fontSize="8" fontWeight="bold">function</text>
                    <rect x="108" y="145" width="64" height="2" rx="1" fill="#64748b" />
                    <rect x="112" y="150" width="45" height="2" rx="1" fill="#94a3b8" />
                    <rect x="112" y="155" width="55" height="2" rx="1" fill="#94a3b8" />
                    <rect x="108" y="160" width="50" height="2" rx="1" fill="#94a3b8" />
                    <text x="108" y="172" fill="#10b981" fontSize="6">return</text>
                  </g>
                  
                  <g className="animate-float" style={{animationDuration: '4s', animationDelay: '1s'}}>
                    <rect x="450" y="140" width="70" height="50" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                    <circle cx="465" cy="155" r="6" fill="url(#avatarGradient)" />
                    <text x="475" y="158" fill="#1e293b" fontSize="7" fontWeight="bold">Author</text>
                    <rect x="458" y="165" width="50" height="2" rx="1" fill="#64748b" />
                    <rect x="458" y="170" width="35" height="2" rx="1" fill="#94a3b8" />
                    <rect x="458" y="175" width="40" height="2" rx="1" fill="#94a3b8" />
                  </g>
                  
                  <g className="animate-float" style={{animationDuration: '3.5s', animationDelay: '2s'}}>
                    <rect x="80" y="320" width="75" height="55" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-lg" />
                    <rect x="88" y="328" width="59" height="3" rx="1" fill="#1e293b" />
                    <rect x="88" y="335" width="45" height="2" rx="1" fill="#64748b" />
                    <rect x="88" y="340" width="50" height="2" rx="1" fill="#94a3b8" />
                    <rect x="88" y="345" width="40" height="2" rx="1" fill="#94a3b8" />
                    <div className="flex space-x-1">
                      <rect x="88" y="355" width="12" height="6" rx="3" fill="#3b82f6" />
                      <rect x="105" y="355" width="15" height="6" rx="3" fill="#8b5cf6" />
                      <rect x="125" y="355" width="18" height="6" rx="3" fill="#10b981" />
                    </div>
                  </g>
                  
                  {/* Connection Lines */}
                  <path d="M180 200 Q140 160 120 140" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
                  <path d="M420 200 Q460 170 485 160" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                  <path d="M220 340 Q150 350 120 360" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" style={{animationDelay: '1s'}} />
                  
                  {/* Decorative Icons */}
                  <circle cx="520" cy="250" r="15" fill="#f59e0b" fillOpacity="0.2" className="animate-ping" />
                  <text x="515" y="255" fontSize="12">⚡</text>
                  
                  <circle cx="60" cy="250" r="12" fill="#10b981" fillOpacity="0.2" className="animate-ping" style={{animationDelay: '1.5s'}} />
                  <text x="56" y="255" fontSize="10">🚀</text>
                  
                  <circle cx="300" cy="80" r="18" fill="#8b5cf6" fillOpacity="0.2" className="animate-ping" style={{animationDelay: '0.8s'}} />
                  <text x="294" y="86" fontSize="14">💡</text>
                  
                  {/* Gradients and Definitions */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
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

     
      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Tech Trends Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Trending Technologies
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Most in-demand skills among our developer community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{stat.tech}</h3>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.count.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 dark:text-green-400 font-medium">{stat.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

    <div className="space-y-20">
  

      {/* Blog Creation & Community Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Create Blog Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-200 to-blue-200 dark:from-cyan-600/20 dark:to-blue-600/20 rounded-full transform -translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Share Your Knowledge
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Write technical blogs, share your development experiences, and help other developers learn from your journey.
                </p>
                
                <button 
                  onClick={handleCreateBlog}
                  className="group bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Blog
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {!isAuthenticated && (
                  <div className="mt-3 flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Lock className="w-4 h-4 mr-1" />
                    Login required to write blogs
                  </div>
                )}
              </div>
            </div>

            {/* Find Developers Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-600/20 dark:to-emerald-600/20 rounded-full transform translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-teal-200 to-green-200 dark:from-teal-600/20 dark:to-green-600/20 rounded-full transform -translate-x-8 translate-y-8"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Connect with Developers
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Discover talented developers, explore their profiles, and connect with like-minded professionals in the community.
                </p>
                
                <button 
                  onClick={handleFindDevelopers}
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Find Developers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                 {!isAuthenticated && (
                  <div className="mt-3 flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Lock className="w-4 h-4 mr-1" />
                    Login required to check Developers
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Reading Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Recommended Reading
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Discover insightful articles from our developer community
              </p>
            </div>
            <button 
              onClick={handleAllBlogs}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {mockBlogs.slice(0, 3).map((blog, index) => {
              const author = getAuthor(blog.authorId || "");
              return (
                <article 
                  key={blog.id} 
                  className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group cursor-pointer ${
                    index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                  onClick={() => handleReadBlog(blog.id)}
                >
                  <div className="p-6">
                    {index === 0 && (
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full text-xs font-medium mb-4">
                        <Award className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    )}
                    
                    <h3 className={`font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                      index === 0 ? 'text-2xl' : 'text-xl'
                    }`}>
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={author?.avatar}
                          alt={author?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {author?.name}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(blog.publishedAt ?? "")}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-slate-400">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-xs">{blog.commentCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{blog.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Login Required
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Please log in to read blogs and access all features.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={closeLoginPopup}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    closeLoginPopup();
                    navigate('/login');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <CreateBlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBlog}
          disableEscapeKeyDown
          editBlogMode={false}
          data={{}}
    />
    </div>

  );
};

export default HomePage;
