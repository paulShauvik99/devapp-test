import React, { useState, useEffect } from 'react';
import {
  Search, Eye, Heart, MessageSquare, Calendar, Edit3, Trash2,
  Plus, Filter, Grid, List, MoreVertical, Tag, TrendingUp,
  Clock, User, ArrowLeft, Share2, Bookmark, Settings,
  ChevronDown, ChevronUp, ExternalLink, Send, Sparkles,
  BarChart3, BookOpen, ThumbsUp
} from 'lucide-react';
import CreateBlogModal from './CreateBlogPage';
import type { Blog, CreateBlogInput, UpdateBlogInput, Comment } from '../models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createBlog, fetchUserBlogs, updateBlog, likeBlog, createComment } from '../store/slice/blogSlice';

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [showCommentForm, setShowCommentForm] = useState<Set<string>>(new Set());
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set());
  const [likingBlogs, setLikingBlogs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | {}>({});
  const [editBlogMode, setEditBlogMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const blogList = useAppSelector(state => state.blogs.userBlogs);
  const user = useAppSelector(state => state.auth.user);
  console.log(user)

  useEffect(() => {
    dispatch(fetchUserBlogs(user!.id));
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
    setFilteredBlogs(filtered);
  }, [blogs, searchQuery]);

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.dropdown-container')) {
          setDropdownOpen(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);



  const toggleCommentForm = (blogId: string) => {
    const newShowForm = new Set(showCommentForm);
    if (newShowForm.has(blogId)) {
      newShowForm.delete(blogId);
      setCommentTexts(prev => ({ ...prev, [blogId]: '' }));
    } else {
      newShowForm.add(blogId);
    }
    setShowCommentForm(newShowForm);
    setDropdownOpen(null); // Close dropdown after action
  };

  const handleCommentTextChange = (blogId: string, text: string) => {
    setCommentTexts(prev => ({ ...prev, [blogId]: text }));
  };

  const handleAddComment = (blogId: string) => {
    const commentText = commentTexts[blogId]?.trim();
    if (!commentText) return;

    const newComment = {
      content: commentText,
      blogId: blogId,
      authorName: user!.name,
      parentId: undefined
    };

    dispatch(createComment({blogId, commentData : newComment}));

    setTimeout(() => { dispatch(fetchUserBlogs(user!.id)); }, 100)
    setCommentTexts(prev => ({ ...prev, [blogId]: "" }));
    
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

  const toggleDropdown = (blogId: Blog['id'], event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDropdownOpen(dropdownOpen === blogId ? null : blogId);
  };

  const handleViewBlog = (blogId: Blog['id']) => {
    console.log('Viewing blog:', blogId);
    setDropdownOpen(null); // Close dropdown after action
  };

  const handleDeleteBlog = (blogId: Blog['id']) => {
    console.log('Deleting blog:', blogId);
    setDropdownOpen(null); // Close dropdown after action
  };

  const handleSaveBlog = (blogData: UpdateBlogInput | CreateBlogInput) => {
    if (editBlogMode) {
      dispatch(updateBlog({ id: (editBlog as Blog).id, data: blogData }));
    } else {
      dispatch(createBlog({ id: user!.id, data: blogData as CreateBlogInput }));
    }
    setTimeout(() => { dispatch(fetchUserBlogs(user!.id)); }, 100)
    setIsModalOpen(false);
    setEditBlogMode(false);
  };

  const openEditBlogModal = (blogId: any) => {
    const blog = blogList.filter(ele => ele.id === blogId);
    if (blog) {
      setEditBlog(blog[0]);
      setEditBlogMode(true);
      setIsModalOpen(true);
      setDropdownOpen(null); // Close dropdown after action
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

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1">
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setIsModalOpen(true)}>
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Create New Blog</span>
                    </button>
                  </div>
                </div>
                {/* <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1">
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
                </div> */}
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
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className={`group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>

                  {/* Main Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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

                      {/* Dropdown Menu */}
                      <div className="relative dropdown-container">
                        <button
                          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                          onClick={(e) => toggleDropdown(blog.id, e)}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {dropdownOpen === blog.id && (
                          <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 ">
                            <div className="py-2">
                              <button
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-3 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewBlog(blog.id);
                                }}
                              >
                                <Eye className="w-4 h-4 text-blue-500" />
                                <span>View Blog</span>
                              </button>
                              <button
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-3 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditBlogModal(blog.id);
                                }}
                              >
                                <Edit3 className="w-4 h-4 text-amber-500" />
                                <span>Edit Blog</span>
                              </button>
                              <button
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-3 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCommentForm(blog.id);
                                }}
                              >
                                <MessageSquare className="w-4 h-4 text-green-500" />
                                <div className="flex items-center justify-between flex-1">
                                  <span>Comments</span>
                                  {blog.comments.length > 0 && (
                                    <span className="text-xs bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded-full">
                                      {blog.comments.length}
                                    </span>
                                  )}
                                </div>
                              </button>
                              <div className="border-t border-slate-200 dark:border-slate-600 my-2"></div>
                              <button
                                className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBlog(blog.id);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete Blog</span>
                              </button>
                            </div>
                          </div>
                        )}
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

                  {/* Comment Form - Only shown when toggled from dropdown */}
                  {showCommentForm.has(blog.id) && (
                    <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-5 bg-slate-50 dark:bg-slate-800">
                      <div className="flex space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={commentTexts[blog.id] || ''}
                            onChange={(e) => handleCommentTextChange(blog.id, e.target.value)}
                            placeholder="Share your thoughts about this blog post..."
                            className="w-full p-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none text-sm"
                            rows={3}
                          />
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              {commentTexts[blog.id]?.length || 0}/500 characters
                            </span>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => toggleCommentForm(blog.id)}
                                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAddComment(blog.id)}
                                disabled={!commentTexts[blog.id]?.trim()}
                                className="flex items-center space-x-2 px-5 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-medium"
                              >
                                <Send className="w-4 h-4" />
                                <span>Post Comment</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Existing Comments Display */}
                      {blog.comments.length > 0 && (
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-600">
                            <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              {blog.comments.length} Comment{blog.comments.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="space-y-4 max-h-80 overflow-y-auto">
                            {blog.comments.map((comment) => (
                              <div key={comment.id} className="flex space-x-3 p-4 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
                                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
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