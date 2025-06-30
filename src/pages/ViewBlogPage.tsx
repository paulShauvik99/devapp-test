import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowLeft, Heart, MessageSquare, Calendar, Tag, User, Send,
} from 'lucide-react';
import type { Blog, Comment } from '../models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBlogById, likeBlog, createComment } from '../store/slice/blogSlice';

interface ViewBlogPageProps {
  blogId: string;
  onBack: () => void;
}

const ViewBlogPage = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const { id } = useParams();


  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const currentBlog = useAppSelector(state => state.blogs.currentBlog);

  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchBlogById(id as string));
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if(id){
      loadBlog();
    }
  }, [id, dispatch, user?.id]);

  useEffect(() => {
    setBlog(currentBlog)
  }, [currentBlog])



  const handleAddComment = async () => {
    if (!blog || !commentText.trim() || isCommenting) return;

    setIsCommenting(true);
    try {
      const newComment = {
        content: commentText.trim(),
        blogId: blog.id,
        authorName: user!.name,
        parentId: undefined
      };

      const result = await dispatch(createComment({ blogId: blog.id, commentData: newComment }));

      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(parsedDate);
  };



  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Blog not found</h2>
          {/* <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Blogs</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Header */}
        <article className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Published
              </span>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(blog.createdAt)}</span>
              </div>
              {/* <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{blog.viewsCount || 0} views</span>
              </div> */}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{blog.authorId}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Author</p>
              </div>
            </div>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                  >
                    <Tag className="w-3 h-3 mr-1.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed border-l-4 border-blue-500 pl-6 bg-blue-50 dark:bg-blue-900/20 py-4 rounded-r-lg">
                {blog.excerpt}
              </div>

              {/* Main content would be rendered here - assuming you have a content field */}
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
                {/* This would typically be rendered from a rich text editor or markdown */}
                <p>
                  {blog.content || "This is where the main blog content would be displayed. In a real application, this would likely be rendered from a rich text editor or markdown format."}
                </p>
                {/* Add more content sections as needed */}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{blog.likes || 0} likes</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{blog.comments.length} comments</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Comments ({blog.comments.length})
            </h2>

            {/* Add Comment Form */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts about this blog post..."
                  className="w-full p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none text-sm"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {commentText.length}/500 characters
                  </span>
                  <button
                    onClick={handleAddComment}
                    disabled={!commentText.trim() || isCommenting}
                    className="flex items-center space-x-2 px-5 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isCommenting ? 'Posting...' : 'Post Comment'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="p-6">
            {blog.comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {blog.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {comment.authorName}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlogPage;