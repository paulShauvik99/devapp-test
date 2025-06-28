import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { CreateBlogInput, UpdateBlogInput, BlogSearchFilters } from '../../models/Blog'
import type { CreateCommentInput, UpdateCommentInput } from '../../models/Comment'
import type { BlogsState } from '../../models/Blog'

const initialState: BlogsState = {
  blogs: [],
  currentBlog: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
  selectedTags: [],
  availableTags: [],
  sortBy: 'createdAt',
  sortOrder: 'desc',
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
}

// Async thunks
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (
    params: BlogSearchFilters = {},
    { rejectWithValue }
  ) => {
    try {
      const searchParams = new URLSearchParams()
      if (params.page) searchParams.append('page', params.page.toString())
      if (params.limit) searchParams.append('limit', params.limit.toString())
      if (params.search) searchParams.append('search', params.search)
      if (params.tags && params.tags.length > 0) {
        searchParams.append('tags', params.tags.join(','))
      }
      if (params.sortBy) searchParams.append('sortBy', params.sortBy)
      if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder)
      if (params.authorId) searchParams.append('authorId', params.authorId)
      if (params.isPublished !== undefined) {
        searchParams.append('isPublished', params.isPublished.toString())
      }

      const response = await fetch(`/api/blogs?${searchParams}`)
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch blogs')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (blogId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`)
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Blog not found')
      }

      const blog = await response.json()
      return blog
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/slug/${slug}`)
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Blog not found')
      }

      const blog = await response.json()
      return blog
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (
    blogData: CreateBlogInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to create blog')
      }

      const blog = await response.json()
      return blog
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (
    { id, ...blogData }: { id: string } & UpdateBlogInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to update blog')
      }

      const blog = await response.json()
      return blog
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to delete blog')
      }

      return blogId
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const publishBlog = createAsyncThunk(
  'blogs/publishBlog',
  async (blogId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/blogs/${blogId}/publish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to publish blog')
      }

      const blog = await response.json()
      return blog
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const unpublishBlog = createAsyncThunk(
  'blogs/unpublishBlog',
  async (blogId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/blogs/${blogId}/unpublish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to unpublish blog')
      }

      const blog = await response.json()
      return blog
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async (blogId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to like blog')
      }

      const data = await response.json()
      return { blogId, likes: data.likes, isLiked: data.isLiked }
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const addComment = createAsyncThunk(
  'blogs/addComment',
  async (
    commentData: CreateCommentInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/blogs/${commentData.blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          content: commentData.content, 
          parentId: commentData.parentId 
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to add comment')
      }

      const comment = await response.json()
      return { blogId: commentData.blogId, comment }
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const updateComment = createAsyncThunk(
  'blogs/updateComment',
  async (
    { commentId, content }: { commentId: string } & UpdateCommentInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to update comment')
      }

      const comment = await response.json()
      return comment
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const deleteComment = createAsyncThunk(
  'blogs/deleteComment',
  async (commentId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to delete comment')
      }

      return commentId
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const likeComment = createAsyncThunk(
  'blogs/likeComment',
  async (commentId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to like comment')
      }

      const data = await response.json()
      return { commentId, likes: data.likes }
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const incrementBlogViews = createAsyncThunk(
  'blogs/incrementViews',
  async (blogId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/view`, {
        method: 'POST',
      })

      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to increment views')
      }

      const data = await response.json()
      return { blogId, views: data.views }
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchAvailableTags = createAsyncThunk(
  'blogs/fetchAvailableTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/blogs/tags')
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch tags')
      }

      const tags = await response.json()
      return tags
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload
      state.currentPage = 1
    },
    setSortBy: (state, action: PayloadAction<'createdAt' | 'updatedAt' | 'views' | 'likes' | 'title'>) => {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
      state.currentPage = 1
    },
    setIsPublished: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPublished = action.payload
      state.currentPage = 1
    },
    setAuthorId: (state, action: PayloadAction<string | undefined>) => {
      state.authorId = action.payload
      state.currentPage = 1
    },
    addSelectedTag: (state, action: PayloadAction<string>) => {
      if (!state.selectedTags.includes(action.payload)) {
        state.selectedTags.push(action.payload)
        state.currentPage = 1
      }
    },
    removeSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTags = state.selectedTags.filter(tag => tag !== action.payload)
      state.currentPage = 1
    },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.selectedTags = []
      state.isPublished = undefined
      state.authorId = undefined
      state.currentPage = 1
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs cases
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.blogs = action.payload.blogs
        state.totalCount = action.payload.totalCount
        state.currentPage = action.payload.currentPage
        state.error = null
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch blog by ID cases
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentBlog = action.payload
        state.error = null
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch blog by slug cases
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentBlog = action.payload
        state.error = null
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create blog cases
      .addCase(createBlog.pending, (state) => {
        state.isCreating = true
        state.error = null
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isCreating = false
        state.blogs.unshift(action.payload)
        state.totalCount += 1
        state.error = null
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isCreating = false
        state.error = action.payload as string
      })
      // Update blog cases
      .addCase(updateBlog.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isUpdating = false
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id)
        if (index !== -1) {
          state.blogs[index] = action.payload
        }
        if (state.currentBlog?.id === action.payload.id) {
          state.currentBlog = action.payload
        }
        state.error = null
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload as string
      })
      // Delete blog cases
      .addCase(deleteBlog.pending, (state) => {
        state.isDeleting = true
        state.error = null
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isDeleting = false
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
        state.totalCount -= 1
        if (state.currentBlog?.id === action.payload) {
          state.currentBlog = null
        }
        state.error = null
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isDeleting = false
        state.error = action.payload as string
      })
      // Publish blog cases
      .addCase(publishBlog.fulfilled, (state, action) => {
        const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id)
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = action.payload
        }
        if (state.currentBlog?.id === action.payload.id) {
          state.currentBlog = action.payload
        }
      })
      // Unpublish blog cases
      .addCase(unpublishBlog.fulfilled, (state, action) => {
        const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id)
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = action.payload
        }
        if (state.currentBlog?.id === action.payload.id) {
          state.currentBlog = action.payload
        }
      })
      // Like blog cases
      .addCase(likeBlog.fulfilled, (state, action) => {
        const { blogId, likes, isLiked } = action.payload
        const blogIndex = state.blogs.findIndex(blog => blog.id === blogId)
        if (blogIndex !== -1) {
          state.blogs[blogIndex].likes = likes
          state.blogs[blogIndex].isLiked = isLiked
        }
        if (state.currentBlog?.id === blogId) {
          state.currentBlog.likes = likes
          state.currentBlog.isLiked = isLiked
        }
      })
      // Add comment cases
      .addCase(addComment.fulfilled, (state, action) => {
        const { blogId, comment } = action.payload
        const blogIndex = state.blogs.findIndex(blog => blog.id === blogId)
        if (blogIndex !== -1) {
          state.blogs[blogIndex].comments.push(comment)
          state.blogs[blogIndex].commentCount += 1
        }
        if (state.currentBlog?.id === blogId) {
          state.currentBlog.comments.push(comment)
          state.currentBlog.commentCount += 1
        }
      })
      // Update comment cases
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload
        
        // Update in blogs array
        state.blogs.forEach(blog => {
          const commentIndex = blog.comments.findIndex(c => c.id === updatedComment.id)
          if (commentIndex !== -1) {
            blog.comments[commentIndex] = updatedComment
          }
        })
        
        // Update in current blog
        if (state.currentBlog) {
          const commentIndex = state.currentBlog.comments.findIndex(c => c.id === updatedComment.id)
          if (commentIndex !== -1) {
            state.currentBlog.comments[commentIndex] = updatedComment
          }
        }
      })
      // Delete comment cases
      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload
        
        // Remove from blogs array
        state.blogs.forEach(blog => {
          const commentIndex = blog.comments.findIndex(c => c.id === commentId)
          if (commentIndex !== -1) {
            blog.comments.splice(commentIndex, 1)
            blog.commentCount -= 1
          }
        })
        
        // Remove from current blog
        if (state.currentBlog) {
          const commentIndex = state.currentBlog.comments.findIndex(c => c.id === commentId)
          if (commentIndex !== -1) {
            state.currentBlog.comments.splice(commentIndex, 1)
            state.currentBlog.commentCount -= 1
          }
        }
      })
      // Like comment cases
      .addCase(likeComment.fulfilled, (state, action) => {
        const { commentId, likes } = action.payload
        
        // Update in blogs array
        state.blogs.forEach(blog => {
          const comment = blog.comments.find(c => c.id === commentId)
          if (comment) {
            comment.likes = likes
          }
        })
        
        // Update in current blog
        if (state.currentBlog) {
          const comment = state.currentBlog.comments.find(c => c.id === commentId)
          if (comment) {
            comment.likes = likes
          }
        }
      })
      // Increment views cases
      .addCase(incrementBlogViews.fulfilled, (state, action) => {
        const { blogId, views } = action.payload
        const blogIndex = state.blogs.findIndex(blog => blog.id === blogId)
        if (blogIndex !== -1) {
          state.blogs[blogIndex].views = views
        }
        if (state.currentBlog?.id === blogId) {
          state.currentBlog.views = views
        }
      })
      // Fetch available tags cases
      .addCase(fetchAvailableTags.fulfilled, (state, action) => {
        state.availableTags = action.payload
      })
  },
})

export const {
  setCurrentPage,
  setPageSize,
  setSearchQuery,
  setSelectedTags,
  setSortBy,
  setSortOrder,
  setIsPublished,
  setAuthorId,
  addSelectedTag,
  removeSelectedTag,
  clearFilters,
  clearCurrentBlog,
  clearError,
} = blogsSlice.actions

export default blogsSlice.reducer