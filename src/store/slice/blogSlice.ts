import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  Blog, 
  CreateBlogInput, 
  UpdateBlogInput, 
  BlogSearchFilters,
  BlogStats 
} from '../../models/Blog';
import type { Comment } from '../../models/Comment';
import type { PaginatedResponse } from '../../models';

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  userBlogs: Blog[];
  featuredBlogs: Blog[];
  blogStats: BlogStats | null;
  searchFilters: BlogSearchFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  userBlogs: [],
  featuredBlogs: [],
  blogStats: null,
  searchFilters: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
    limit: 10,
  },
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  error: null,
};

// Async thunks
export const fetchBlogs = createAsyncThunk<
  PaginatedResponse<Blog>,
  BlogSearchFilters | void
>(
  'blogs/fetchBlogs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(','));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`/api/blogs?${queryParams}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch blogs');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchBlogById = createAsyncThunk<Blog, string>(
  'blogs/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Blog not found');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchUserBlogs = createAsyncThunk<Blog[], string>(
  'blogs/fetchUserBlogs',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}/blogs`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch user blogs');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const createBlog = createAsyncThunk<Blog, CreateBlogInput>(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to create blog');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const updateBlog = createAsyncThunk<
  Blog,
  { id: string; data: UpdateBlogInput }
>(
  'blogs/updateBlog',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to update blog');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const deleteBlog = createAsyncThunk<string, string>(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to delete blog');
      }
      
      return blogId;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const likeBlog = createAsyncThunk<{ blogId: string; likes: number }, string>(
  'blogs/likeBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to like blog');
      }
      
      const data = await response.json();
      return { blogId, likes: data.likes };
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchBlogStats = createAsyncThunk<BlogStats, string>(
  'blogs/fetchBlogStats',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}/blog-stats`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch blog stats');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSearchFilters: (state, action: PayloadAction<Partial<BlogSearchFilters>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    addComment: (state, action: PayloadAction<{ blogId: string; comment: Comment }>) => {
      const { blogId, comment } = action.payload;
      
      // Update current blog if it matches
      if (state.currentBlog && state.currentBlog.id === blogId) {
        state.currentBlog.comments.push(comment);
        state.currentBlog.commentCount += 1;
      }
      
      // Update blog in blogs array
      const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
      if (blogIndex !== -1) {
        state.blogs[blogIndex].commentCount += 1;
      }
    },
    incrementViews: (state, action: PayloadAction<string>) => {
      const blogId = action.payload;
      
      if (state.currentBlog && state.currentBlog.id === blogId) {
        state.currentBlog.views += 1;
      }
      
      const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
      if (blogIndex !== -1) {
        state.blogs[blogIndex].views += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch user blogs
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.userBlogs = action.payload;
      })
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isCreating = false;
        state.blogs.unshift(action.payload);
        state.userBlogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedBlog = action.payload;
        
        // Update in blogs array
        const blogIndex = state.blogs.findIndex(blog => blog.id === updatedBlog.id);
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = updatedBlog;
        }
        
        // Update in user blogs
        const userBlogIndex = state.userBlogs.findIndex(blog => blog.id === updatedBlog.id);
        if (userBlogIndex !== -1) {
          state.userBlogs[userBlogIndex] = updatedBlog;
        }
        
        // Update current blog
        if (state.currentBlog && state.currentBlog.id === updatedBlog.id) {
          state.currentBlog = updatedBlog;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      // Delete blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const blogId = action.payload;
        state.blogs = state.blogs.filter(blog => blog.id !== blogId);
        state.userBlogs = state.userBlogs.filter(blog => blog.id !== blogId);
        if (state.currentBlog && state.currentBlog.id === blogId) {
          state.currentBlog = null;
        }
      })
      // Like blog
      .addCase(likeBlog.fulfilled, (state, action) => {
        const { blogId, likes } = action.payload;
        
        if (state.currentBlog && state.currentBlog.id === blogId) {
          state.currentBlog.likes = likes;
        }
        
        const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
        if (blogIndex !== -1) {
          state.blogs[blogIndex].likes = likes;
        }
      })
      // Fetch blog stats
      .addCase(fetchBlogStats.fulfilled, (state, action) => {
        state.blogStats = action.payload;
      });
  },
});

export const { 
  clearCurrentBlog, 
  clearError, 
  setSearchFilters, 
  addComment, 
  incrementViews 
} = blogSlice.actions;

export default blogSlice.reducer;