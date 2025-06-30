import React, { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Home,
  Users,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { toggleTheme } from '../../store/slice/themeSlice';
import { logout } from '../../store/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get auth and theme state from Redux
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleToggleTheme = () => dispatch(toggleTheme());

  // Scroll listener for blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement)?.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  // Navigation links for authenticated users
  const authenticatedNavLinks = [
    { name: 'Developers', href: '/developers', icon: Users },
    { name: 'Blogs', href: '/blogs', icon: BookOpen },
    { name: 'View Blogs', href: '/blogs/b1/view', icon: BookOpen },
    //{ name: 'My Blogs', href: '/developers/my-blogs', icon: BookOpen },
  ];

  // Navigation links for guests
  const guestNavLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Developers', href: '/developers', icon: Users },
    { name: 'About', href: '/about', icon: MessageSquare }
  ];

  const navLinks = isAuthenticated ? authenticatedNavLinks : guestNavLinks;

  // Get user avatar or fallback
  const getUserAvatar = () => {
    if (user?.avatar) {
      return user.avatar;
    }
    // Generate avatar based on user name or email
    const seed = user?.name || user?.email || 'user';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
        : 'bg-white dark:bg-gray-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              DevHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative group flex items-center space-x-1 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon className="h-4 w-4" />
                    <span>{link.name}</span>
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            

            {/* Theme Toggle */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Conditional rendering based on authentication */}
            {isAuthenticated ? (
              <>

                {/* Profile Dropdown */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label="Profile menu"
                    disabled={isLoading}
                  >
                    <img
                      src={getUserAvatar()}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isProfileDropdownOpen && (
                    <Suspense fallback={<div className="absolute right-0 mt-2 w-56 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>}>
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in slide-in-from-top-5 duration-200">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </Link>
                        
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </Suspense>
                  )}
                </div>
              </>
            ) : (
              /* Guest Actions */
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <Suspense fallback={<div className="md:hidden h-64 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>}>
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-5 duration-200">
              <div className="px-4 py-6 space-y-4">
                {/* Search for authenticated users */}
                {isAuthenticated && (
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search developers, projects..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
                          isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>

                {/* User section or login buttons */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 px-3 py-2">
                        <img
                          src={getUserAvatar()}
                          alt={user?.name || 'User'}
                          className="w-10 h-10 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Link 
                          to="/profile" 
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handleLogin}
                        className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={handleRegister}
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white px-3 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-violet-700 transition-all"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Suspense>
        )}
      </div>
    </nav>
  );
};

export default Navbar;