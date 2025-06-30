import React, { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
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
  MessageSquare,
  Edit3,
  Save,
  Plus,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { toggleTheme } from '../../store/slice/themeSlice';
import { logout } from '../../store/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type {  User as UserType,  Skill } from '../../models';
import { SkillCategory } from '../../models/Skill';





// Predefined skills
const PREDEFINED_SKILLS: Omit<Skill, 'id'>[] = [
  { name: 'React', category: SkillCategory.FRONTEND },
  { name: 'Vue.js', category: SkillCategory.FRONTEND },
  { name: 'Angular', category: SkillCategory.FRONTEND },
  { name: 'JavaScript', category: SkillCategory.FRONTEND },
  { name: 'TypeScript', category: SkillCategory.FRONTEND },
  { name: 'HTML', category: SkillCategory.FRONTEND },
  { name: 'CSS', category: SkillCategory.FRONTEND },
  { name: 'Node.js', category: SkillCategory.BACKEND },
  { name: 'Express.js', category: SkillCategory.BACKEND },
  { name: 'Python', category: SkillCategory.BACKEND },
  { name: 'Django', category: SkillCategory.BACKEND },
  { name: 'Java', category: SkillCategory.BACKEND },
  { name: 'Spring Boot', category: SkillCategory.BACKEND },
  { name: 'MongoDB', category: SkillCategory.DATABASE },
  { name: 'PostgreSQL', category: SkillCategory.DATABASE },
  { name: 'MySQL', category: SkillCategory.DATABASE },
  { name: 'Redis', category: SkillCategory.DATABASE },
  { name: 'Docker', category: SkillCategory.DEVOPS },
  { name: 'Kubernetes', category: SkillCategory.DEVOPS },
  { name: 'AWS', category: SkillCategory.DEVOPS },
  { name: 'React Native', category: SkillCategory.MOBILE },
  { name: 'Flutter', category: SkillCategory.MOBILE },
  { name: 'Figma', category: SkillCategory.DESIGN },
  { name: 'Jest', category: SkillCategory.TESTING },
  { name: 'Cypress', category: SkillCategory.TESTING }
];

// Profile Modal Component
const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  onSave: (userData: Partial<UserType>) => void;
}> = ({ isOpen, onClose, user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    twitter: user?.twitter || '',
    skills: user?.skills || []
  });
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>(SkillCategory.FRONTEND);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        skills: user.skills || []
      });
    }
  }, [user]);

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const addSkill = (skillToAdd: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillToAdd,
      id: Date.now().toString() // Temporary ID generation
    };
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== skillId)
    }));
  };

  const addCustomSkill = () => {
    if (newSkillName.trim()) {
      addSkill({
        name: newSkillName.trim(),
        category: newSkillCategory
      });
      setNewSkillName('');
    }
  };

  const getCategoryColor = (category: SkillCategory) => {
    const colors = {
      [SkillCategory.FRONTEND]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [SkillCategory.BACKEND]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      [SkillCategory.DATABASE]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      [SkillCategory.DEVOPS]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      [SkillCategory.MOBILE]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      [SkillCategory.DESIGN]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      [SkillCategory.TESTING]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      [SkillCategory.OTHER]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Profile' : 'Profile Details'}
            </h3>
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'user')}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full text-xl font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                ) : (
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h4>
                )}
                <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{user?.bio || 'No bio added yet.'}</p>
              )}
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Social Links
              </label>
              <div className="space-y-3">
                {/* GitHub */}
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://github.com/username"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">
                      {user?.github ? (
                        <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {user.github}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </span>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://linkedin.com/in/username"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">
                      {user?.linkedin ? (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {user.linkedin}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </span>
                  )}
                </div>

                {/* Twitter */}
                <div className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://twitter.com/username"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">
                      {user?.twitter ? (
                        <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {user.twitter}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Skills
              </label>
              
              {/* Current Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(skill.category)}`}
                  >
                    {skill.name}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <>
                  {/* Predefined Skills */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add from predefined skills:</h5>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {PREDEFINED_SKILLS
                        .filter(skill => !formData.skills.some(userSkill => userSkill.name === skill.name))
                        .map((skill, index) => (
                          <button
                            key={index}
                            onClick={() => addSkill(skill)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 border-dashed transition-all hover:scale-105 ${getCategoryColor(skill.category)} opacity-70 hover:opacity-100`}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            {skill.name}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Custom Skill Input */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Add custom skill..."
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                    />
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {Object.entries(SkillCategory).map(([key, value]) => (
                        <option key={key} value={value}>
                          {key.charAt(0) + key.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={addCustomSkill}
                      disabled={!newSkillName.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  const handleProfileSave = (userData: Partial<UserType>) => {
   
    console.log('Saving user data:', userData);
  
  };

  // Navigation links for authenticated users
  const authenticatedNavLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Developers', href: '/developers', icon: Users },
    { name: 'Blogs', href: '/blogs', icon: BookOpen },
    { name: 'My Blogs', href: '/my-blogs', icon: BookOpen },
  ];

  // Navigation links for guests
  const guestNavLinks = [
    { name: 'Home', href: '/', icon: Home },
    // { name: 'Developers', href: '/developers', icon: Users },
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
    <>
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
                          <button 
                            onClick={() => {
                              setIsProfileModalOpen(true);
                              setIsProfileDropdownOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            <User className="h-4 w-4 mr-3" />
                            View Profile
                          </button>
                          
                          
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
                          <button 
                            onClick={() => {
                              setIsProfileModalOpen(true);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          >
                            <User className="h-4 w-4 mr-3" />
                            View Profile
                          </button>
                          
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

      {/* Profile Modal */}
      {isAuthenticated && user && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          onSave={handleProfileSave}
        />
      )}
    </>
  );
};

export default Navbar;