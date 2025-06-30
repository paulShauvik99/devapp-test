import React, { useState, useEffect } from 'react';
import {
  Search, Eye, Heart, MessageSquare, Calendar, Edit3, Trash2,
  Plus, Filter, Grid, List, MoreVertical, Tag, TrendingUp,
  Clock, User, ArrowLeft, Share2, Bookmark, Settings,
  ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';
import CreateBlogModal from './CreateBlogPage';
import type { Blog, UpdateBlogInput } from '../models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserBlogs, updateBlog } from '../store/slice/blogSlice';


interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | {}>({});
  const [editBlogMode, setEditBlogMode] = useState(false);

  const dispatch = useAppDispatch();
  const blogList = useAppSelector(state => state.blogs.userBlogs);

  useEffect(() => {
    dispatch(fetchUserBlogs('u1'));
  }, [dispatch]);

  useEffect(() => {
    if (blogList.length > 0 || !isLoading) {
      setBlogs(blogList);
      setFilteredBlogs(blogList);
      setIsLoading(false);
    }
  }, [blogList]);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...blogs];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [blogs, searchQuery]);

  const toggleComments = (blogId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(blogId)) {
      newExpanded.delete(blogId);
    } else {
      newExpanded.add(blogId);
    }
    setExpandedComments(newExpanded);
  };

  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date'; // or fallback
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(parsedDate);
  };

  const handleSaveBlog = (blogData: UpdateBlogInput) => {
    console.log('Blog saved:', blogData);
    dispatch(updateBlog({ id: (editBlog as Blog).id, data: blogData }));
    setTimeout(() => { dispatch(fetchUserBlogs('u1')); }, 100)
    setIsModalOpen(false);
  };

  const openEditBlogModal = (blogId: any) => {
    const blog = blogList.filter(ele => ele.id === blogId);
    if (blog) {
      setEditBlog(blog[0]);
      setEditBlogMode(true);
      setIsModalOpen(true);
    }
  }

  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading your blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 h-[calc(100vh-246px)] mt-[66px] overflow-y-scroll overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1">
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setIsModalOpen(true)}>
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Create New Blog</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${viewMode === 'list'
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
                          <span>{blog.comments.length}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" onClick={() => { openEditBlogModal(blog.id) }}>
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
                        <div className="px-6 pb-4 space-y-4 max-h-48 overflow-y-auto">
                          {blog.comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              {/* <img
                                src={comment.authorAvatar}
                                alt={comment.authorName}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              /> */}
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

      <CreateBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBlog}
        disableEscapeKeyDown
        editBlogMode={editBlogMode}
        data={editBlog}
      />

    </>
  );
};

export default UserBlogsPage;