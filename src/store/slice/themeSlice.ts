import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
    secondaryColor: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    comments: boolean;
    likes: boolean;
    follows: boolean;
  };
  privacy: {
    profileVisible: boolean;
    emailVisible: boolean;
    skillsVisible: boolean;
  };
}

const getInitialTheme = (): 'light' | 'dark' => {
  
  const savedTheme: string = 'light'; // localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme as 'light' | 'dark';
  }
  
  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return 'light';
};

const initialState: ThemeState = {
  isDarkMode: getInitialTheme() === 'dark',
  theme: {
    mode: getInitialTheme(),
    primaryColor: '#3b82f6',
    secondaryColor: '#6366f1',
  },
  notifications: {
    email: true,
    push: true,
    comments: true,
    likes: true,
    follows: true,
  },
  privacy: {
    profileVisible: true,
    emailVisible: false,
    skillsVisible: true,
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme.mode = state.isDarkMode ? 'dark' : 'light';
      
      // Note: Remove this localStorage usage for Claude.ai compatibility
      // localStorage.setItem('theme', state.theme.mode);
      
      // Apply theme to document
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme.mode = action.payload;
      state.isDarkMode = action.payload === 'dark';
      
      // Note: Remove this localStorage usage for Claude.ai compatibility
      // localStorage.setItem('theme', action.payload);
      
      // Apply theme to document
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode);
      }
    },
    updateThemeColors: (state, action: PayloadAction<{ primary?: string; secondary?: string }>) => {
      if (action.payload.primary) {
        state.theme.primaryColor = action.payload.primary;
      }
      if (action.payload.secondary) {
        state.theme.secondaryColor = action.payload.secondary;
      }
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<ThemeState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updatePrivacySettings: (state, action: PayloadAction<Partial<ThemeState['privacy']>>) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    resetSettings: (state) => {
      state.notifications = initialState.notifications;
      state.privacy = initialState.privacy;
      state.theme.primaryColor = initialState.theme.primaryColor;
      state.theme.secondaryColor = initialState.theme.secondaryColor;
    },
    initializeTheme: (state) => {
      // Initialize theme on app load
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode);
      }
    },
  },
});

export const { 
  toggleTheme, 
  setTheme, 
  updateThemeColors, 
  updateNotificationSettings, 
  updatePrivacySettings, 
  resetSettings,
  initializeTheme 
} = themeSlice.actions;

export default themeSlice.reducer;