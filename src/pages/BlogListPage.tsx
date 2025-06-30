import React, { useState, useEffect } from 'react';
import { Search, Filter,  BookOpen, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBlogs } from '../store/slice/blogSlice';
import { useNavigate } from 'react-router-dom';
import { mockBlogs } from '../api/msw';




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


const BlogPage = () => {
  const dispatch = useAppDispatch();

  // In a real app, these would come from useSelector
  const blogState = useAppSelector(state => state.blogs);
  const { blogs, isLoading, searchFilters, pagination } = blogState;


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const naviate = useNavigate();

  // Get unique tags from all blogs
  const allTags = [...new Set(mockBlogs.flatMap(blog => blog.tags))];


  const handleSearch = () => {

    dispatch(fetchBlogs({
      page : 1,
      limit : 6,
      search : searchTerm,
      tags : selectedTags
    }))
  };

  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(parsedDate);
  };


  const toggleTag = (tag: string): void => {
    setSelectedTags((prev: string[]) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleViewBlog = (blogId: Blog['id']) => {
    console.log('Viewing blog:', blogId);
    naviate(`/blogs/${blogId}/view`);
  };

  useEffect(() => {
    dispatch(fetchBlogs({ page: 1, limit: 6 }));
  }, [dispatch]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchBlogs({ page: page, limit: 6 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Pagination = () => {

    if (pagination.totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 3;

      if (pagination.totalPages <= maxVisiblePages) {
        for (let i = 1; i <= pagination.totalPages; i++) {
          pages.push(i);
        }
      } else {
        const startPage = Math.max(1, pagination.currentPage - 2);
        const endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);

        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (endPage < pagination.totalPages) {
          if (endPage < pagination.totalPages - 1) pages.push('...');
          pages.push(pagination.totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="flex items-center justify-between mt-8">
        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)} of {pagination.totalItems} blogs
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className={`p-2 rounded-lg border transition-colors ${pagination.hasPrev
              ? isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg border transition-colors ${page === pagination.currentPage
                ? 'bg-blue-500 border-blue-500 text-white'
                : typeof page === 'number'
                  ? isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  : isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-default'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-default'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className={`p-2 rounded-lg border transition-colors ${pagination.hasNext
              ? isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-[500px] bg-gray-50 pt-[65px] dark:bg-slate-900">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 dark:bg-slate-800">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2">


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
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag)
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
          {blogs.map((blog) => (
            <div key={blog.id} className={`group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300`}>

              {/* Main Content */}
              <div className={`p-6`}>
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Status Badge */}
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-medium">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Published
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-snug"
                  onClick={() => handleViewBlog(blog.id)}
                >
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed text-sm">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                      >
                        <Tag className="w-3 h-3 mr-1.5" />
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-medium">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>


            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination />

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