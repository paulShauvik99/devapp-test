import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import  Navbar  from './components/layout/Navbar'
import  Footer  from './components/layout/Footer'
import { useAppSelector } from './app/hooks/redux'
import { initializeTheme } from './app/slice/themeSlice'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { lightTheme, darkTheme } from './styles/theme'

// Pages
import  HomePage  from './pages/HomePage'
import  DeveloperListPage  from './pages/DeveloperListPage'
import  DeveloperProfilePage  from './pages/DeveloperProfilePage'
import  BlogListPage  from './pages/BlogListPage'
import  BlogDetailPage  from './pages/BlogDetailPage'
import  CreateBlogPage  from './pages/CreateBlogPage'
import  EditBlogPage  from './pages/EditBlogPage'
import  LoginPage  from './pages/LoginPage'
import  RegisterPage  from './pages/RegisterPage'
import  NotFoundPage  from './pages/NotFoundPage'

function App() {
  const dispatch = useDispatch()
  const { isDarkMode } = useAppSelector((state) => state.theme)

  useEffect(() => {
    dispatch(initializeTheme())
  }, [dispatch])

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/developers" element={<DeveloperListPage />} />
            <Route path="/developers/:id" element={<DeveloperProfilePage />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/blogs/create"
              element={
                <ProtectedRoute>
                  <CreateBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/:id/edit"
              element={
                <ProtectedRoute>
                  <EditBlogPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App