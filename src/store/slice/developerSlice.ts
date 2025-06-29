import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  UserProfile, 
  UpdateUserInput, 
  DeveloperSearchFilters 
} from '../../models';
import type { Skill, UserSkill, AddUserSkillInput } from '../../models';
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
    limit: 12,
    sortBy: 'name',
    sortOrder: 'asc',
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

      const response = await fetch(`/api/developers?${queryParams}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch developers');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchDeveloperById = createAsyncThunk<UserProfile, string>(
  'developers/fetchDeveloperById',
  async (developerId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/developers/${developerId}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Developer not found');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
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
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to update profile');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchAllSkills = createAsyncThunk<Skill[], void>(
  'developers/fetchAllSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/skills');
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch skills');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchUserSkills = createAsyncThunk<UserSkill[], string>(
  'developers/fetchUserSkills',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}/skills`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch user skills');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const addUserSkill = createAsyncThunk<UserSkill, AddUserSkillInput>(
  'developers/addUserSkill',
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to add skill');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const removeUserSkill = createAsyncThunk<string, string>(
  'developers/removeUserSkill',
  async (userSkillId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/skills/${userSkillId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to remove skill');
      }
      
      return userSkillId;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchUserSocialLinks = createAsyncThunk<SocialLink[], string>(
  'developers/fetchUserSocialLinks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}/social-links`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch social links');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const addSocialLink = createAsyncThunk<SocialLink, CreateSocialLinkInput>(
  'developers/addSocialLink',
  async (linkData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to add social link');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const removeSocialLink = createAsyncThunk<string, string>(
  'developers/removeSocialLink',
  async (linkId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/social-links/${linkId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to remove social link');
      }
      
      return linkId;
    } catch (error) {
      return rejectWithValue('Network error occurred');
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
        limit: 12,
        sortBy: 'name',
        sortOrder: 'asc',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch developers
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
      // Fetch developer by ID
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
      // Update developer profile
      .addCase(updateDeveloperProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateDeveloperProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedProfile = action.payload;
        
        // Update current developer
        if (state.currentDeveloper && state.currentDeveloper.id === updatedProfile.id) {
          state.currentDeveloper = updatedProfile;
        }
        
        // Update in developers array
        const developerIndex = state.developers.findIndex(dev => dev.id === updatedProfile.id);
        if (developerIndex !== -1) {
          state.developers[developerIndex] = updatedProfile;
        }
      })
      .addCase(updateDeveloperProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      // Fetch all skills
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      // Fetch user skills
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.userSkills = action.payload;
      })
      // Add user skill
      .addCase(addUserSkill.fulfilled, (state, action) => {
        state.userSkills.push(action.payload);
      })
      // Remove user skill
      .addCase(removeUserSkill.fulfilled, (state, action) => {
        const userSkillId = action.payload;
        state.userSkills = state.userSkills.filter(skill => skill.id !== userSkillId);
      })
      // Fetch user social links
      .addCase(fetchUserSocialLinks.fulfilled, (state, action) => {
        state.socialLinks = action.payload;
      })
      // Add social link
      .addCase(addSocialLink.fulfilled, (state, action) => {
        state.socialLinks.push(action.payload);
      })
      // Remove social link
      .addCase(removeSocialLink.fulfilled, (state, action) => {
        const linkId = action.payload;
        state.socialLinks = state.socialLinks.filter(link => link.id !== linkId);
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