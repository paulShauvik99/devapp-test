import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Heart, Eye, MessageCircle, Calendar, User, Plus, Trash2, Edit, BookOpen } from 'lucide-react';


interface BlogFilters {
  category?: string;
  author?: string;
  searchTerm?: string;
  [key: string]: unknown; // if you're allowing dynamic keys
}


type Blog = {
  id: string;
  title: string;
  content: string;
  likes: number;
  tags: string[];
  date: string;
};

type BlogsState = {
  blogs: Blog[];
};

type AppState = {
  blogs: BlogsState;
  // add other parts of your state here if needed
};

// Mock Redux store structure (in real app, this would come from your store)
const mockInitialState = {
  auth: {
    user: { id: '1', name: 'John Doe', avatar: '/api/placeholder/40/40' },
    isAuthenticated: true,
    isLoading: false
  },
  blogs: {
    blogs: [
      {
        id: '1',
        title: 'Getting Started with React and Redux',
        content: 'Learn the fundamentals of building scalable applications with React and Redux. This comprehensive guide covers everything from basic setup to advanced patterns...',
        excerpt: 'Learn the fundamentals of building scalable applications with React and Redux.',
        author: { id: '1', name: 'John Doe', avatar: '/api/placeholder/32/32' },
        tags: ['React', 'Redux', 'JavaScript'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        likes: 42,
        views: 1337,
        commentCount: 8,
        featured: true,
        published: true
      },
      {
        id: '2',
        title: 'Modern CSS Techniques for 2024',
        content: 'Explore the latest CSS features and techniques that will revolutionize your web development workflow. From container queries to advanced grid layouts...',
        excerpt: 'Explore the latest CSS features and techniques for modern web development.',
        author: { id: '2', name: 'Jane Smith', avatar: '/api/placeholder/32/32' },
        tags: ['CSS', 'Web Design', 'Frontend'],
        createdAt: '2024-01-14T14:30:00Z',
        updatedAt: '2024-01-14T14:30:00Z',
        likes: 28,
        views: 892,
        commentCount: 12,
        featured: false,
        published: true
      },
      {
        id: '3',
        title: 'Building Scalable Node.js Applications',
        content: 'Discover best practices for architecting and building enterprise-grade Node.js applications. Learn about microservices, database optimization, and deployment strategies...',
        excerpt: 'Best practices for building enterprise-grade Node.js applications.',
        author: { id: '3', name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
        tags: ['Node.js', 'Backend', 'Architecture'],
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z',
        likes: 35,
        views: 654,
        commentCount: 5,
        featured: true,
        published: true
      }
    ],
    featuredBlogs: [],
    isLoading: false,
    searchFilters: {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      search: '',
      tags: []
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 3,
      hasNext: false,
      hasPrev: false,
      limit: 10
    }
  }
};

// Mock actions
const mockActions = {
  fetchBlogs: (filters: BlogFilters) => ({ type: 'blogs/fetchBlogs', payload: filters }),
  likeBlog: (blogId: string) => ({ type: 'blogs/likeBlog', payload: blogId }),
  deleteBlog: (blogId: string) => ({ type: 'blogs/deleteBlog', payload: blogId }),
  setSearchFilters: (filters: BlogFilters) => ({ type: 'blogs/setSearchFilters', payload: filters })
};

const BlogPage = () => {
  const dispatch = useDispatch();
  
  // In a real app, these would come from useSelector
  const [state, setState] = useState(mockInitialState);
  const { blogs, isLoading, searchFilters, pagination } = state.blogs;
  const { user, isAuthenticated } = state.auth;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique tags from all blogs
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  
  const handleSearch = () => {
    const filters = {
      ...searchFilters,
      search: searchTerm,
      tags: selectedTags,
      sortBy,
      sortOrder,
      page: 1
    };
    
    // In real app: dispatch(fetchBlogs(filters));
    console.log('Searching with filters:', filters);
  };
  
  const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


const toggleTag = (tag: string): void => {
  setSelectedTags((prev: string[]) =>
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  );
};

  useEffect(() => {
    handleSearch();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Blog Hub</h1>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Blog</span>
                </button>
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Date</option>
                <option value="likes">Likes</option>
                <option value="views">Views</option>
                <option value="title">Title</option>
              </select>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Tag Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
            >
              {blog.featured && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-xs font-medium">
                  FEATURED
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{blog.author.name}</span>
                  </div>
                  
                  {isAuthenticated && user.id === blog.author.id && (
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        //onClick={() => handleDelete(blog.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {blog.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{blog.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{blog.commentCount}</span>
                    </span>
                  </div>
                  
                  <button
                    //onClick={() => handleLike(blog.id)}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{blog.likes}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              disabled={!pagination.hasPrev}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg ${
                    page === pagination.currentPage
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              disabled={!pagination.hasNext}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or create a new blog.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;