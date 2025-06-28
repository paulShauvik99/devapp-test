import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { User, UserProfile, DeveloperSearchFilters } from '../../models/User'

interface DevelopersState {
  developers: UserProfile[]
  currentDeveloper: User | null
  totalCount: number
  currentPage: number
  pageSize: number
  searchQuery: string
  selectedSkills: string[]
  selectedLocation: string
  availableSkills: string[]
  availableLocations: string[]
  sortBy: 'name' | 'joinedAt' | 'blogCount'
  sortOrder: 'asc' | 'desc'
  isLoading: boolean
  error: string | null
}

const initialState: DevelopersState = {
  developers: [],
  currentDeveloper: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
  selectedSkills: [],
  selectedLocation: '',
  availableSkills: [],
  availableLocations: [],
  sortBy: 'joinedAt',
  sortOrder: 'desc',
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchDevelopers = createAsyncThunk(
  'developers/fetchDevelopers',
  async (filters: DeveloperSearchFilters = {}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { developers: DevelopersState }
      
      // Merge filters with current state
      const searchParams = new URLSearchParams()
      
      const page = filters.page || state.developers.currentPage
      const limit = filters.limit || state.developers.pageSize
      const search = filters.search || state.developers.searchQuery
      const skills = filters.skills || state.developers.selectedSkills
      const location = filters.location || state.developers.selectedLocation
      const sortBy = filters.sortBy || state.developers.sortBy
      const sortOrder = filters.sortOrder || state.developers.sortOrder

      searchParams.append('page', page.toString())
      searchParams.append('limit', limit.toString())
      if (search) searchParams.append('search', search)
      if (location) searchParams.append('location', location)
      if (skills.length > 0) searchParams.append('skills', skills.join(','))
      searchParams.append('sortBy', sortBy)
      searchParams.append('sortOrder', sortOrder)

      const response = await fetch(`/api/developers?${searchParams}`)
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch developers')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchDeveloperById = createAsyncThunk(
  'developers/fetchDeveloperById',
  async (developerId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/developers/${developerId}`)
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Developer not found')
      }

      const developer: User = await response.json()
      return developer
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchAvailableSkills = createAsyncThunk(
  'developers/fetchAvailableSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/skills')
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch skills')
      }

      const skills = await response.json()
      return skills
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

export const fetchAvailableLocations = createAsyncThunk(
  'developers/fetchAvailableLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/locations')
      
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Failed to fetch locations')
      }

      const locations = await response.json()
      return locations
    } catch (error) {
      return rejectWithValue('Network error occurred')
    }
  }
)

const developersSlice = createSlice({
  name: 'developers',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1 // Reset to first page when changing page size
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1 // Reset to first page when searching
    },
    setSelectedSkills: (state, action: PayloadAction<string[]>) => {
      state.selectedSkills = action.payload
      state.currentPage = 1 // Reset to first page when filtering
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload
      state.currentPage = 1 // Reset to first page when filtering
    },
    setSortBy: (state, action: PayloadAction<'name' | 'joinedAt' | 'blogCount'>) => {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
      state.currentPage = 1
    },
    addSelectedSkill: (state, action: PayloadAction<string>) => {
      if (!state.selectedSkills.includes(action.payload)) {
        state.selectedSkills.push(action.payload)
        state.currentPage = 1
      }
    },
    removeSelectedSkill: (state, action: PayloadAction<string>) => {
      state.selectedSkills = state.selectedSkills.filter(skill => skill !== action.payload)
      state.currentPage = 1
    },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.selectedSkills = []
      state.selectedLocation = ''
      state.currentPage = 1
    },
    clearCurrentDeveloper: (state) => {
      state.currentDeveloper = null
    },
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action: PayloadAction<Partial<DeveloperSearchFilters>>) => {
      const { skills, location, search, sortBy, sortOrder } = action.payload
      
      if (skills !== undefined) state.selectedSkills = skills
      if (location !== undefined) state.selectedLocation = location
      if (search !== undefined) state.searchQuery = search
      if (sortBy !== undefined) state.sortBy = sortBy
      if (sortOrder !== undefined) state.sortOrder = sortOrder
      
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch developers cases
      .addCase(fetchDevelopers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.isLoading = false
        state.developers = action.payload.developers
        state.totalCount = action.payload.totalCount
        state.currentPage = action.payload.currentPage || state.currentPage
        state.error = null
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch developer by ID cases
      .addCase(fetchDeveloperById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDeveloperById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentDeveloper = action.payload
        state.error = null
      })
      .addCase(fetchDeveloperById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch available skills cases
      .addCase(fetchAvailableSkills.pending, (state) => {
        // Optional: you can add loading state for skills if needed
      })
      .addCase(fetchAvailableSkills.fulfilled, (state, action) => {
        state.availableSkills = action.payload
      })
      .addCase(fetchAvailableSkills.rejected, (state, action) => {
        // Optional: handle skills fetch error
      })
      // Fetch available locations cases
      .addCase(fetchAvailableLocations.pending, (state) => {
        // Optional: you can add loading state for locations if needed
      })
      .addCase(fetchAvailableLocations.fulfilled, (state, action) => {
        state.availableLocations = action.payload
      })
      .addCase(fetchAvailableLocations.rejected, (state, action) => {
        // Optional: handle locations fetch error
      })
  },
})

export const {
  setCurrentPage,
  setPageSize,
  setSearchQuery,
  setSelectedSkills,
  setSelectedLocation,
  setSortBy,
  setSortOrder,
  addSelectedSkill,
  removeSelectedSkill,
  clearFilters,
  clearCurrentDeveloper,
  clearError,
  setFilters,
} = developersSlice.actions

export default developersSlice.reducer