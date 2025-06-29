import { type ReactNode, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../store/hooks/redux'
import { checkAuthStatus } from '../../store/slice/authSlice'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // Check authentication status on mount if not already authenticated
    if (!isAuthenticated && !isLoading) {
      dispatch(checkAuthStatus())
    }
  }, [dispatch, isAuthenticated, isLoading])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    )
  }

  // If route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save the attempted location for redirecting after login
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    )
  }

  // If route requires no authentication and user is authenticated (e.g., login page)
  if (!requireAuth && isAuthenticated) {
    // Redirect to home or the intended destination
    const from = location.state?.from || '/'
    return <Navigate to={from} replace />
  }

  // Render the protected content
  return <>{children}</>
}

// Higher-order component for protecting routes
// eslint-disable-next-line react-refresh/only-export-components
export const withAuth = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => (
    <ProtectedRoute>
      <Component {...props} />
    </ProtectedRoute>
  )
}

// Component for routes that should only be accessible to unauthenticated users
export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute requireAuth={false}>
      {children}
    </ProtectedRoute>
  )
}