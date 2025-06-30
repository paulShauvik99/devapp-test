import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  X, Save, Eye, EyeOff, Tag, Plus,
  Bold, Italic, Link2, List, ListOrdered, Quote,
  Code, Image, Heading1, Heading2, Heading3
} from 'lucide-react';
import type { Blog, CreateBlogInput, UpdateBlogInput } from '../models';

interface BlogFormData {
  id?: string;
  title: string;
  content: string;
  authorId?: string;
  excerpt: string;
  tags: string[];
  isPublished: boolean;
  comments?: Comment[];
  commentCount?: number;
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blogData: UpdateBlogInput) => void;
  disableEscapeKeyDown: true;
  editBlogMode: boolean;
  data: Blog | {};
}

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({ isOpen, onClose, onSave, editBlogMode, data }) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    isPublished: false,
    commentCount: 0,
    likes: 0
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Initialize form data when in edit mode
  useEffect(() => {
    if (editBlogMode && data && 'id' in data) {
      const blogData = data as Blog;
      setFormData({
        id: blogData.id,
        title: blogData.title,
        content: blogData.content,
        authorId: blogData.authorId,
        excerpt: blogData.excerpt,
        tags: blogData.tags,
        isPublished: blogData.isPublished,
        comments: [],
        commentCount: blogData.commentCount,
        likes: blogData.likes,
        createdAt: blogData.createdAt,
        updatedAt: blogData.updatedAt,
        publishedAt: blogData.publishedAt
      });
    }
  }, [editBlogMode, data]);

  // Update word count when content changes
  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [formData.content]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        tags: [],
        isPublished: false,
        commentCount: 0,
        likes: 0
      });
      setCurrentTag('');
      setIsPreviewMode(false);
      setIsSaving(false);
    }
  }, [isOpen]);

  // Markdown formatting functions
  const insertMarkdown = (prefix: string, suffix: string = '', placeholder: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newText = formData.content.substring(0, start) +
      prefix + textToInsert + suffix +
      formData.content.substring(end);

    setFormData(prev => ({ ...prev, content: newText }));

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Markdown toolbar buttons
  const toolbarButtons = [
    { icon: Heading1, action: () => insertMarkdown('# ', '', 'Heading 1'), title: 'Heading 1' },
    { icon: Heading2, action: () => insertMarkdown('## ', '', 'Heading 2'), title: 'Heading 2' },
    { icon: Heading3, action: () => insertMarkdown('### ', '', 'Heading 3'), title: 'Heading 3' },
    { icon: Bold, action: () => insertMarkdown('**', '**', 'bold text'), title: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*', 'italic text'), title: 'Italic' },
    { icon: Code, action: () => insertMarkdown('`', '`', 'code'), title: 'Inline Code' },
    { icon: Quote, action: () => insertMarkdown('> ', '', 'Quote'), title: 'Quote' },
    { icon: List, action: () => insertMarkdown('- ', '', 'List item'), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. ', '', 'List item'), title: 'Numbered List' },
    { icon: Link2, action: () => insertMarkdown('[', '](url)', 'link text'), title: 'Link' },
    { icon: Image, action: () => insertMarkdown('![', '](image-url)', 'alt text'), title: 'Image' },
  ];

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your blog post.');
      return;
    }

    setIsSaving(true);

    // Auto-generate excerpt if not provided
    const excerpt = formData.excerpt || formData.content.substring(0, 200).trim() + '...';

    // Prepare the blog data with timestamps
    const blogData: BlogFormData = {
      ...formData,
      excerpt,
      updatedAt: new Date(),
      ...(formData.isPublished && !formData.publishedAt ? { publishedAt: new Date() } : {})
    };

    const updatedBlogData: UpdateBlogInput = {
      title: blogData.title,
      content: blogData.content,
      tags: blogData.tags,
      isPublished: true
    }

    const newBlogdata : CreateBlogInput = {
      title: blogData.title,
      content: blogData.content,
      tags: blogData.tags || [],
      isPublished: true
    }

    if (editBlogMode) {
      onSave(updatedBlogData);
    }else{
      onSave(newBlogdata);
    }



    setIsSaving(false);
    console.log(formData)
    //onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {editBlogMode ? 'Edit Blog' : 'Create New Blog'}
            </h2>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {wordCount} words • {Math.ceil(wordCount / 200)} min read
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${isPreviewMode
                ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300'
                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving || !formData.title.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : (editBlogMode ? 'Update Blog' : 'Save Blog')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex h-[calc(90vh-88px)]">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Title Input */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <input
                type="text"
                placeholder="Enter your blog title..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full text-2xl font-bold bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                autoFocus
              />
            </div>

            {/* Content Editor/Preview */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Toolbar */}
              {!isPreviewMode && (
                <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex flex-wrap gap-2">
                    {toolbarButtons.map((button, index) => (
                      <button
                        key={index}
                        onClick={button.action}
                        title={button.title}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                      >
                        <button.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="flex-1 overflow-auto">
                {isPreviewMode ? (
                  <div className="p-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4 first:mt-0">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">{children}</h3>,
                          p: ({ children }) => <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          code: ({ children }) => <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200">{children}</code>,
                          pre: ({ children }) => <pre className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 italic text-slate-600 dark:text-slate-400 my-4">{children}</blockquote>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-slate-700 dark:text-slate-300">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-slate-700 dark:text-slate-300">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          a: ({ href, children }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>
                        }}
                      >
                        {formData.content || '*Start writing your blog content...*'}
                      </ReactMarkdown>
                    </div>

                  </div>
                ) : (
                  <div className="p-6 h-full">
                    <textarea
                      id="content-editor"
                      placeholder="Start writing your blog content... You can use Markdown syntax for formatting.

                        Examples:
                        # Heading 1
                        ## Heading 2
                        **Bold text**
                        *Italic text*
                        - List item
                        > Quote
                        [Link text](URL)
                        ![Image alt text](Image URL)"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full h-full bg-transparent border-none outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 leading-relaxed font-mono text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Excerpt
                </label>
                <textarea
                  placeholder="Brief description of your blog post..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {formData.excerpt.length}/200 characters
                </div>
              </div>



              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Tags
                </label>

                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm"
                        >
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Blog Stats (for edit mode)
              {editBlogMode && formData.createdAt && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Blog Stats
                  </h4>
                  <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <div>Likes: {formData.likes}</div>
                    <div>Comments: {formData.commentCount}</div>
                    <div>Created: {formData.createdAt.toLocaleDateString()}</div>
                    {formData.publishedAt && (
                      <div>Published: {formData.publishedAt.toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogModal;