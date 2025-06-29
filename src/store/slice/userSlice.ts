import axios from 'axios';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  UserProfile, 
  UpdateUserInput, 
  DeveloperSearchFilters 
} from '../../models';
import type { Skill, UserSkill } from '../../models';
import type { SocialLink, CreateSocialLinkInput } from '../../models';
import type { PaginatedResponse } from '../../models';

interface DeveloperState {
  developers: UserProfile[];
  currentDeveloper: UserProfile | null;
  skills: Skill[];
  userSkills: UserSkill[];
  socialLinks: SocialLink[];
  searchFilters: DeveloperSearchFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: DeveloperState = {
  developers: [],
  currentDeveloper: null,
  skills: [],
  userSkills: [],
  socialLinks: [],
  searchFilters: {
    page: 1,
    limit: 12
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
    limit: 12,
  },
  isLoading: false,
  isUpdating: false,
  error: null,
};

// Async thunks
export const fetchDevelopers = createAsyncThunk<
  PaginatedResponse<UserProfile>,
  DeveloperSearchFilters | void
>(
  'developers/fetchDevelopers',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users', { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch developers');
    }
  }
);

export const fetchDeveloperById = createAsyncThunk<UserProfile, string>(
  'developers/fetchDeveloperById',
  async (developerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${developerId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Developer not found');
    }
  }
);

export const updateDeveloperProfile = createAsyncThunk<
  UserProfile,
  { id: string; data: UpdateUserInput }
>(
  'developers/updateProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/users/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const fetchAllSkills = createAsyncThunk<Skill[], void>(
  'developers/fetchAllSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/skills');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch skills');
    }
  }
);

export const fetchUserSkills = createAsyncThunk<UserSkill[], string>(
  'developers/fetchUserSkills',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${userId}/skills`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user skills');
    }
  }
);

export const addUserSkill = createAsyncThunk<UserSkill, { userId: string } & {}>(
  'developers/addUserSkill',
  async ({ userId, ...skillData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/users/${userId}/skills`, skillData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add skill');
    }
  }
);

export const fetchUserSocialLinks = createAsyncThunk<SocialLink[], string>(
  'developers/fetchUserSocialLinks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${userId}/social-links`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch social links');
    }
  }
);

const developerSlice = createSlice({
  name: 'developers',
  initialState,
  reducers: {
    clearCurrentDeveloper: (state) => {
      state.currentDeveloper = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSearchFilters: (state, action: PayloadAction<Partial<DeveloperSearchFilters>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    resetFilters: (state) => {
      state.searchFilters = {
        page: 1,
        limit: 12
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.developers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDeveloperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeveloperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDeveloper = action.payload;
      })
      .addCase(fetchDeveloperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDeveloperProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateDeveloperProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedProfile = action.payload;

        if (state.currentDeveloper && state.currentDeveloper.id === updatedProfile.id) {
          state.currentDeveloper = updatedProfile;
        }

        const index = state.developers.findIndex(dev => dev.id === updatedProfile.id);
        if (index !== -1) {
          state.developers[index] = updatedProfile;
        }
      })
      .addCase(updateDeveloperProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.userSkills = action.payload;
      })
      .addCase(addUserSkill.fulfilled, (state, action) => {
        state.userSkills.push(action.payload);
      })
      .addCase(fetchUserSocialLinks.fulfilled, (state, action) => {
        state.socialLinks = action.payload;
      });
  },
});

export const { 
  clearCurrentDeveloper, 
  clearError, 
  setSearchFilters, 
  resetFilters 
} = developerSlice.actions;

export default developerSlice.reducer;
