import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Blog } from '../models/Blog';
import type { UserProfile } from '../models/User';

// Auth selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Blog selectors
export const selectBlogs = (state: RootState) => state.blogs;
export const selectAllBlogs = (state: RootState) => state.blogs.blogs;
export const selectCurrentBlog = (state: RootState) => state.blogs.currentBlog;
export const selectUserBlogs = (state: RootState) => state.blogs.userBlogs;
export const selectFeaturedBlogs = (state: RootState) => state.blogs.featuredBlogs;
export const selectBlogStats = (state: RootState) => state.blogs.blogStats;
export const selectBlogsPagination = (state: RootState) => state.blogs.pagination;
export const selectBlogsLoading = (state: RootState) => state.blogs.isLoading;
export const selectBlogsError = (state: RootState) => state.blogs.error;

// Memoized blog selectors
export const selectPublishedBlogs = createSelector(
  [selectAllBlogs],
  (blogs) => blogs.filter(blog => blog.isPublished)
);

export const selectDraftBlogs = createSelector(
  [selectAllBlogs],
  (blogs) => blogs.filter(blog => blog.isDraft)
);

export const selectBlogsByTag = createSelector(
  [selectAllBlogs, (state: RootState, tag: string) => tag],
  (blogs, tag) => blogs.filter(blog => blog.tags.includes(tag))
);

export const selectBlogsByAuthor = createSelector(
  [selectAllBlogs, (state: RootState, authorId: string) => authorId],
  (blogs, authorId) => blogs.filter(blog => blog.authorId === authorId)
);

// Developer selectors
export const selectDevelopers = (state: RootState) => state.developers;
export const selectAllDevelopers = (state: RootState) => state.developers.developers;
export const selectCurrentDeveloper = (state: RootState) => state.developers.currentDeveloper;
export const selectAllSkills = (state: RootState) => state.developers.skills;
export const selectUserSkills = (state: RootState) => state.developers.userSkills;
export const selectSocialLinks = (state: RootState) => state.developers.socialLinks;
export const selectDevelopersPagination = (state: RootState) => state.developers.pagination;
export const selectDevelopersLoading = (state: RootState) => state.developers.isLoading;
export const selectDevelopersError = (state: RootState) => state.developers.error;

// Memoized developer selectors
export const selectDevelopersBySkill = createSelector(
  [selectAllDevelopers, (state: RootState, skillName: string) => skillName],
  (developers, skillName) => 
    developers.filter(dev => 
      dev.skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())
    )
);

export const selectSkillsByCategory = createSelector(
  [selectAllSkills, (state: RootState, category: string) => category],
  (skills, category) => skills.filter(skill => skill.category === category)
);

export const selectPopularSkills = createSelector(
  [selectAllSkills],
  (skills) => skills.filter(skill => skill.isPopular).sort((a, b) => b.userCount - a.userCount)
);

export const selectCurrentUserSkills = createSelector(
  [selectUserSkills],
  (userSkills) => userSkills.map(us => us.skill)
);

// Theme selectors
export const selectTheme = (state: RootState) => state.theme;
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;
export const selectThemeMode = (state: RootState) => state.theme.theme.mode;
export const selectThemeColors = (state: RootState) => ({
  primary: state.theme.theme.primaryColor,
  secondary: state.theme.theme.secondaryColor,
});
export const selectNotificationSettings = (state: RootState) => state.theme.notifications;
export const selectPrivacySettings = (state: RootState) => state.theme.privacy;

// Comment selectors
export const selectComments = (state: RootState) => state.comments;
export const selectAllComments = (state: RootState) => state.comments.comments;
export const selectCommentsByBlogId = createSelector(
  [selectAllComments, (state: RootState, blogId: string) => blogId],
  (comments, blogId) => comments.filter((comment : Comment)  => comment.blogId === blogId)
);
export const selectCommentsLoading = (state: RootState) => state.comments.isLoading;
export const selectCommentsError = (state: RootState) => state.comments.error;

// Complex selectors combining multiple slices
export const selectCurrentUserProfile = createSelector(
  [selectCurrentUser, selectUserSkills, selectSocialLinks],
  (user, skills, socialLinks) => {
    if (!user) return null;
    return {
      ...user,
      skills: skills.map(us => us.skill),
      socialLinks,
    };
  }
);

export const selectBlogWithAuthor = createSelector(
  [selectCurrentBlog, selectAllDevelopers],
  (blog, developers) => {
    if (!blog) return null;
    const author = developers.find(dev => dev.id === blog.authorId);
    return {
      ...blog,
      author,
    };
  }
);

export const selectBlogWithComments = createSelector(
  [selectCurrentBlog, selectAllComments],
  (blog, comments) => {
    if (!blog) return null;
    const blogComments = comments.filter(comment => comment.blogId === blog.id);
    return {
      ...blog,
      comments: blogComments,
    };
  }
);

export const selectDashboardData = createSelector(
  [selectBlogStats, selectAllBlogs, selectUserBlogs],
  (blogStats, allBlogs, userBlogs) => ({
    blogStats,
    totalBlogs: allBlogs.length,
    userBlogCount: userBlogs.length,
    recentBlogs: userBlogs.slice(0, 5),
  })
);

// Search and filter selectors
export const selectFilteredBlogs = createSelector(
  [selectAllBlogs, (state: RootState) => state.blogs.searchFilters],
  (blogs, filters) => {
    let filtered = [...blogs];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(blog => 
        filters.tags!.some(tag => blog.tags.includes(tag))
      );
    }
    
    if (filters.authorId) {
      filtered = filtered.filter(blog => blog.authorId === filters.authorId);
    }
    
    if (filters.isPublished !== undefined) {
      filtered = filtered.filter(blog => blog.isPublished === filters.isPublished);
    }
    
    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof Blog] as any;
        const bValue = b[filters.sortBy as keyof Blog] as any;
        
        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    return filtered;
  }
);

export const selectFilteredDevelopers = createSelector(
  [selectAllDevelopers, (state: RootState) => state.developers.searchFilters],
  (developers, filters) => {
    let filtered = [...developers];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(dev => 
        dev.name.toLowerCase().includes(searchTerm) ||
        dev.username.toLowerCase().includes(searchTerm) ||
        (dev.bio && dev.bio.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(dev => 
        filters.skills!.some(skillName => 
          dev.skills.some(skill => skill.name === skillName)
        )
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(dev => 
        dev.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof UserProfile] as any;
        const bValue = b[filters.sortBy as keyof UserProfile] as any;
        
        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    return filtered;
  }
);

// UI selectors
export const selectUI = (state: RootState) => state.ui;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state: RootState) => state.ui.mobileMenuOpen;
export const selectModalState = (state: RootState) => state.ui.modals;
export const selectToasts = (state: RootState) => state.ui.toasts;

// Utility selectors
export const selectAllTags = createSelector(
  [selectAllBlogs],
  (blogs) => {
    const tags = blogs.flatMap(blog => blog.tags);
    return [...new Set(tags)].sort();
  }
);

export const selectBlogCount = createSelector(
  [selectAllBlogs],
  (blogs) => blogs.length
);

export const selectPublishedBlogCount = createSelector(
  [selectPublishedBlogs],
  (blogs) => blogs.length
);

export const selectDraftBlogCount = createSelector(
  [selectDraftBlogs],
  (blogs) => blogs.length
);

export const selectTotalViews = createSelector(
  [selectAllBlogs],
  (blogs) => blogs.reduce((total, blog) => total + blog.views, 0)
);

export const selectTotalLikes = createSelector(
  [selectAllBlogs],
  (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)
);

export const selectUserBlogStats = createSelector(
  [selectUserBlogs],
  (userBlogs) => ({
    total: userBlogs.length,
    published: userBlogs.filter(blog => blog.isPublished).length,
    drafts: userBlogs.filter(blog => blog.isDraft).length,
    totalViews: userBlogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: userBlogs.reduce((sum, blog) => sum + blog.likes, 0),
  })
);

// Loading state selectors
export const selectIsAnyLoading = createSelector(
  [selectAuthLoading, selectBlogsLoading, selectDevelopersLoading, selectCommentsLoading],
  (authLoading, blogsLoading, developersLoading, commentsLoading) =>
    authLoading || blogsLoading || developersLoading || commentsLoading
);

// Error selectors
export const selectAnyError = createSelector(
  [selectAuthError, selectBlogsError, selectDevelopersError, selectCommentsError],
  (authError, blogsError, developersError, commentsError) =>
    authError || blogsError || developersError || commentsError
);