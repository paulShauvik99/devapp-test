import React, { useState, useEffect } from 'react';
import { 
  Search, Code, Users, BookOpen, MessageSquare, Github, 
  TrendingUp, Award, Zap, Database, Server, Globe, 
  GitBranch, Terminal, Layers, ChevronRight, Star,
  ArrowRight, Calendar, Eye, Heart, Filter, LogOut,
  Settings, User, Bell, Plus
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { logout, checkAuthStatus } from '../store/slice/authSlice';

// Define interfaces for type safety
interface Developer {
  id: number;
  name: string;
  title: string;
  avatar: string;
  skills: string[];
  experience: string;
  location: string;
  rating: number;
  projectsCount: number;
  githubUrl: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  views: number;
  likes: number;
  featured: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [featuredDevs, setFeaturedDevs] = useState<Developer[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  
  // Connect to Redux store
  let { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  isAuthenticated = true;

  console.log(isAuthenticated)

  // Check authentication status on component mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Mock data for featured developers
  const mockFeaturedDevs: Developer[] = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Full Stack Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4,c0aede,d1d4f9",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      experience: "5+ years",
      location: "San Francisco, CA",
      rating: 4.9,
      projectsCount: 23,
      githubUrl: "https://github.com/sarahchen"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "DevOps Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4,c0aede,d1d4f9",
      skills: ["Docker", "Kubernetes", "Python", "GCP"],
      experience: "7+ years",
      location: "Austin, TX",
      rating: 4.8,
      projectsCount: 31,
      githubUrl: "https://github.com/marcusrod"
    },
    {
      id: 3,
      name: "Priya Patel",
      title: "Backend Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=b6e3f4,c0aede,d1d4f9",
      skills: ["Go", "Microservices", "MongoDB", "Redis"],
      experience: "4+ years",
      location: "Toronto, ON",
      rating: 4.9,
      projectsCount: 18,
      githubUrl: "https://github.com/priyapatel"
    }
  ];

  // Mock data for recent blogs
  const mockRecentBlogs: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable APIs with Go and PostgreSQL",
      excerpt: "Deep dive into creating high-performance APIs using Go's concurrency patterns and advanced PostgreSQL techniques...",
      author: "Alex Kumar",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=ffdfbf,ffd5dc,c0aede",
      publishedAt: "2 days ago",
      readTime: "8 min read",
      tags: ["Go", "PostgreSQL", "API Design"],
      views: 1247,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: "Microservices Architecture: Lessons from Production",
      excerpt: "Real-world insights from migrating a monolith to microservices, including common pitfalls and solutions...",
      author: "Lisa Zhang",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=ffdfbf,ffd5dc,c0aede",
      publishedAt: "5 days ago",
      readTime: "12 min read",
      tags: ["Microservices", "Architecture", "DevOps"],
      views: 2156,
      likes: 143,
      featured: false
    },
    {
      id: 3,
      title: "Advanced TypeScript Patterns for Large Codebases",
      excerpt: "Explore advanced TypeScript features and patterns that make large-scale applications more maintainable...",
      author: "David Kim",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffdfbf,ffd5dc,c0aede",
      publishedAt: "1 week ago",
      readTime: "10 min read",
      tags: ["TypeScript", "Architecture", "Best Practices"],
      views: 1832,
      likes: 124,
      featured: false
    }
  ];

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize data
  useEffect(() => {
    setFeaturedDevs(mockFeaturedDevs);
    setRecentBlogs(mockRecentBlogs);
  }, []);

  const techStats = [
    { tech: "React", count: 2847, trend: "+12%" },
    { tech: "Node.js", count: 2134, trend: "+8%" },
    { tech: "Python", count: 1923, trend: "+15%" },
    { tech: "TypeScript", count: 1756, trend: "+23%" },
    { tech: "Go", count: 892, trend: "+31%" },
    { tech: "Rust", count: 456, trend: "+45%" }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Technologies' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'devops', label: 'DevOps' },
    { value: 'mobile', label: 'Mobile' }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navigateToAuth = () => {
    navigate("/register");
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  // Authenticated User Header Component
  const AuthenticatedHeader = () => (
    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={navigateToProfile}
              className="flex items-center space-x-2 p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button 
              onClick={navigateToDashboard}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Authenticated User Quick Actions
  const QuickActions = () => (
    <section className="py-8 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-slate-900 dark:text-white">Create Post</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <Code className="w-5 h-5 text-green-600" />
            <span className="font-medium text-slate-900 dark:text-white">Share Project</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-slate-900 dark:text-white">Find Developers</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <BookOpen className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-slate-900 dark:text-white">Write Article</span>
          </button>
        </div>
      </div>
    </section>
  );

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
      {/* Authenticated User Header */}
      {isAuthenticated && <AuthenticatedHeader />}

      {/* Hero Section - Modified based on auth status */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-700/25"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {!isAuthenticated && (
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Now with advanced search filters
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                {isAuthenticated ? (
                  <>
                    Continue Building Your
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                      Professional Network
                    </span>
                  </>
                ) : (
                  <>
                    Connect with
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                      Expert Developers
                    </span>
                  </>
                )}
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAuthenticated ? (
                  "Explore new connections, share your expertise, and discover the latest in tech. Your developer journey continues here."
                ) : (
                  "Discover skilled developers, dive into technical blogs, and build your professional network. Find expertise in cutting-edge technologies and architectural patterns."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={navigateToDashboard}
                      className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Go to Dashboard
                    </button>
                    <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                      Explore Community
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Explore Developers
                    </button>
                    <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                      Browse Technical Blogs
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {isAuthenticated ? "Quick Search" : "Advanced Search"}
                  </h3>
                  <Filter className="w-5 h-5 text-slate-400" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isAuthenticated ? "Search developers, projects, or articles..." : "Search by skills, experience, or location..."}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                    />
                  </div>
                  
                  <div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                    >
                      {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-violet-700 transition-all">
                    {isAuthenticated ? "Search" : "Search Developers"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions for Authenticated Users */}
      {isAuthenticated && <QuickActions />}

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

      {/* Featured Developers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {isAuthenticated ? "Recommended Developers" : "Featured Developers"}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {isAuthenticated ? "Based on your interests and connections" : "Connect with experienced professionals in your field"}
              </p>
            </div>
            <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDevs.map((dev) => (
              <div key={dev.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                        {dev.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {dev.title}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        {dev.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{dev.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span>{dev.experience}</span>
                  <span>{dev.projectsCount} projects</span>
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    {isAuthenticated ? "Connect" : "View Profile"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                  <a
                    href={dev.githubUrl}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {isAuthenticated ? "Recommended Reading" : "Latest Technical Insights"}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {isAuthenticated ? "Articles tailored to your interests" : "In-depth articles from experienced developers"}
              </p>
            </div>
            <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog, index) => (
              <article key={blog.id} className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}>
                <div className="p-6">
                  {blog.featured && (
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
                        src={blog.authorAvatar}
                        alt={blog.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {blog.author}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{blog.publishedAt}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">{blog.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{blog.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Built for Professional Developers
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Advanced features designed to help experienced developers showcase their expertise and connect with like-minded professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Terminal className="w-8 h-8" />,
                title: "Code Portfolio",
                description: "Showcase your best work with integrated GitHub repos, live demos, and detailed case studies.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Architecture Discussions",
                description: "Engage in deep technical discussions about system design, patterns, and best practices.",
                color: "from-violet-500 to-purple-500"
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Technical Skills Graph",
                description: "Visualize your technology stack with proficiency levels and years of experience.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Network",
                description: "Connect with developers worldwide, find mentors, or offer mentorship to others.",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:transform hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-6`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Elevate Your Professional Network?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of experienced developers who are already building meaningful connections and sharing knowledge on DevHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg" onClick={navigateToAuth}>
              Create Your Profile
            </button>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;