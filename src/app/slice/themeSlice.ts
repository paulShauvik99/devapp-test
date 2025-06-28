import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isDarkMode: boolean
}

const initialState: ThemeState = {
  isDarkMode: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
    },
    initializeTheme: (state) => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        state.isDarkMode = savedTheme === 'dark'
      } else {
        // Default to system preference
        state.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
      }
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload
      localStorage.setItem('theme', action.payload ? 'dark' : 'light')
    },
  },
})

export const { toggleTheme, initializeTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer