import React, { useState, useEffect } from 'react';
import { 
  Search, Eye, Heart, MessageSquare, Calendar, Edit3, Trash2, 
  Plus, Filter, Grid, List, MoreVertical, Tag, TrendingUp,
  Clock, User, ArrowLeft, Share2, Bookmark, Settings,
  ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';

// Mock interfaces based on your provided types
interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  excerpt: string;
  tags: string[];
  isPublished: boolean;
  comments: Comment[];
  commentCount: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

interface BlogStats {
  totalBlogs: number;
  publishedBlogs: number;
  totalLikes: number;
  totalComments: number;
}

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'createdAt' | 'likes' | 'comments'>('createdAt');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [blogStats, setBlogStats] = useState<BlogStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockBlogs: Blog[] = [
    {
      id: '1',
      title: 'Building Scalable React Applications with TypeScript',
      content: 'In this comprehensive guide, we explore the best practices for building large-scale React applications...',
      authorId: 'user1',
      excerpt: 'Learn how to structure and scale React applications effectively using TypeScript and modern patterns.',
      tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
      isPublished: true,
      comments: [
        {
          id: 'c1',
          content: 'Great article! Really helped me understand the patterns better.',
          authorId: 'user2',
          authorName: 'Sarah Chen',
          authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4',
          createdAt: new Date('2024-01-15T10:30:00Z')
        },
        {
          id: 'c2',
          content: 'Could you elaborate more on the state management patterns?',
          authorId: 'user3',
          authorName: 'Mike Johnson',
          authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=c0aede',
          createdAt: new Date('2024-01-16T14:20:00Z')
        }
      ],
      commentCount: 2,
      likes: 45,
      createdAt: new Date('2024-01-10T08:00:00Z'),
      updatedAt: new Date('2024-01-12T10:15:00Z'),
      publishedAt: new Date('2024-01-11T09:00:00Z')
    },
    {
      id: '2',
      title: 'Advanced API Design Patterns with Node.js',
      content: 'Exploring advanced patterns for designing robust and scalable APIs using Node.js and Express...',
      authorId: 'user1',
      excerpt: 'Deep dive into API design patterns that will make your backend services more maintainable and scalable.',
      tags: ['Node.js', 'API Design', 'Backend', 'Express'],
      isPublished: true,
      comments: [
        {
          id: 'c3',
          content: 'The middleware patterns section was particularly insightful!',
          authorId: 'user4',
          authorName: 'Alex Rodriguez',
          authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=d1d4f9',
          createdAt: new Date('2024-01-20T16:45:00Z')
        }
      ],
      commentCount: 1,
      likes: 32,
      createdAt: new Date('2024-01-18T10:00:00Z'),
      updatedAt: new Date('2024-01-19T11:30:00Z'),
      publishedAt: new Date('2024-01-19T12:00:00Z')
    },
    {
      id: '3',
      title: 'Microservices Architecture: Lessons from Production',
      content: 'Real-world insights from implementing microservices in production environments...',
      authorId: 'user1',
      excerpt: 'Practical lessons learned from deploying and maintaining microservices at scale.',
      tags: ['Microservices', 'Architecture', 'DevOps', 'Production'],
      isPublished: false,
      comments: [],
      commentCount: 0,
      likes: 0,
      createdAt: new Date('2024-01-25T14:00:00Z'),
      updatedAt: new Date('2024-01-26T09:30:00Z')
    }
  ];

  const mockStats: BlogStats = {
    totalBlogs: 3,
    publishedBlogs: 2,
    totalLikes: 77,
    totalComments: 3
  };

  // Initialize data
  useEffect(() => {
    const timer = setTimeout(() => {
      setBlogs(mockBlogs);
      setFilteredBlogs(mockBlogs);
      setBlogStats(mockStats);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...blogs];

    // Apply status filter
    if (selectedFilter === 'published') {
      filtered = filtered.filter(blog => blog.isPublished);
    } else if (selectedFilter === 'draft') {
      filtered = filtered.filter(blog => !blog.isPublished);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'comments':
          return b.commentCount - a.commentCount;
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredBlogs(filtered);
  }, [blogs, searchQuery, selectedFilter, sortBy]);

  const toggleComments = (blogId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(blogId)) {
      newExpanded.delete(blogId);
    } else {
      newExpanded.add(blogId);
    }
    setExpandedComments(newExpanded);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (isPublished: boolean) => {
    return isPublished 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
  };

  const getStatusText = (isPublished: boolean) => {
    return isPublished ? 'Published' : 'Draft';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading your blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors lg:hidden">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                My Blogs
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Blog</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {blogStats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Blogs</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{blogStats.totalBlogs}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Edit3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{blogStats.publishedBlogs}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Likes</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{blogStats.totalLikes}</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Comments</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{blogStats.totalComments}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                <option value="all">All Blogs</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'likes' | 'comments')}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                <option value="createdAt">Latest</option>
                <option value="likes">Most Liked</option>
                <option value="comments">Most Comments</option>
              </select>

              <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Grid/List */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <Edit3 className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No blogs found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Start writing your first blog post'}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create New Blog
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all">
                {/* Blog Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.isPublished)}`}>
                          {getStatusText(blog.isPublished)}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                    </div>
                    <div className="ml-4">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-sm"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{blog.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{blog.commentCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>245</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {blog.comments.length > 0 && (
                  <div className="border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => toggleComments(blog.id)}
                      className="w-full px-6 py-3 text-left flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <span className="text-sm font-medium">
                        {blog.comments.length} Comment{blog.comments.length !== 1 ? 's' : ''}
                      </span>
                      {expandedComments.has(blog.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {expandedComments.has(blog.id) && (
                      <div className="px-6 pb-4 space-y-4">
                        {blog.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {comment.authorName}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogsPage;