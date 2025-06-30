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
import axios from 'axios';

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

      const response = await axios.get(`/api/blogs?${queryParams}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

// 1. Fetch all blogs (default page 1, limit 10):

// dispatch(fetchBlogs());
// 2. Fetch blogs with filters:

// dispatch(fetchBlogs({
//   page: 2,
//   limit: 5,
//   tags: ['react', 'javascript'],
//   search: 'hooks',
//   authorId: 'u1',
//   isPublished: true,
// }));

export const fetchBlogById = createAsyncThunk<Blog, string>(
  'blogs/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/blogs/${blogId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Blog not found');
    }
  }
);

export const fetchUserBlogs = createAsyncThunk<Blog[], string>(
  'blogs/fetchUserBlogs',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${userId}/blogs`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user blogs');
    }
  }
);

export const createBlog = createAsyncThunk<Blog,{ id: string; data: CreateBlogInput } >(
  'blogs/createBlog',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/users/${id}/blogs`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create blog');
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
      const response = await axios.put(`/api/blogs/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update blog');
    }
  }
);

export const deleteBlog = createAsyncThunk<string, string>(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      return blogId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
    }
  }
);

export const likeBlog = createAsyncThunk<
  { blogId: string; likes: number },              // return type
  { blogId: string; likes: number }               // input payload type
>(
  'blogs/likeBlog',
  async ({ blogId, likes }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/blogs/${blogId}/like/${likes}`);
      return { blogId, likes: response.data.likes };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like blog');
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

  },
});

export const { 
  clearCurrentBlog, 
  clearError, 
  setSearchFilters, 
  addComment
} = blogSlice.actions;

export default blogSlice.reducer;