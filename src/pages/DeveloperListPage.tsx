import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Github, Linkedin, Twitter, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDevelopers } from '../store/slice/userSlice';
import type { User } from '../models';



const DeveloperListPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchDevelopers({
        page: 1,
        limit: 5,
        query: '',
        filter: []}));    
  }, [dispatch]);

  const { isDarkMode } = useAppSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock skills data
  const allSkills = ['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Flutter', 'Vue.js', 'Django', 'Figma', 'Tailwind CSS', 'Firebase', 'TensorFlow', 'Jenkins'];


  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSearch = () => {
    console.log(searchQuery, selectedSkills, currentPage);
    dispatch(fetchDevelopers({
      page: currentPage,
      limit: itemsPerPage,
      query: searchQuery,
      filter: selectedSkills
    }));
  };

  const getSocialIcon = (name: string | undefined) => {
    switch(name) {
      case 'Github': return <Github className="w-4 h-4" />;
      case 'LinkedIn': return <Linkedin className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const {developers, pagination, isLoading} = useAppSelector(state => state.developers);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed to:', page, searchQuery, selectedSkills);
    dispatch(fetchDevelopers({
      page: page,
      limit: itemsPerPage,
      query: searchQuery,
      filter: selectedSkills
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const DeveloperCard = ({ developer, isListView = false }: { developer: User; isListView?: boolean }) => (
    <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} 
                     border rounded-xl p-4 sm:p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer
                     ${isListView ? 'flex flex-col sm:flex-row gap-4' : ''}`}>
      
      <div className={`flex ${isListView ? 'sm:flex-shrink-0' : 'flex-col sm:flex-row'} items-center gap-4`}>
        <img 
          src={developer.avatar} 
          alt={developer.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
        />
        
        <div className={`flex-1 ${isListView ? '' : 'text-center sm:text-left'}`}>
          <h3 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {developer.name}
          </h3>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-gray-600'} mb-1`}>
            {developer.email}
          </p>
        </div>
      </div>
      
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'} mb-3 line-clamp-2`}>
          {developer.bio}
        </p>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {developer.skills.slice(0, 4).map(skill => (
            <span key={skill.id} className={`px-2 py-1 text-xs rounded-lg font-medium ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-gray-100 text-gray-700'}`}>
              {skill.name}
            </span>
          ))}
          {developer.skills.length > 4 && (
            <span className={`px-2 py-1 text-xs rounded-lg font-medium ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-500'}`}>
              +{developer.skills.length - 4}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {developer.socialLinks.map((link, index) => (
              <a key={index} href={link.url} 
                 className={`p-2 rounded-lg transition-colors
                            ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                {getSocialIcon(link.name)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Pagination = () => {
    
    if (pagination.totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 3;
      
      if (pagination.totalPages <= maxVisiblePages) {
        for (let i = 1; i <= pagination.totalPages; i++) {
          pages.push(i);
        }
      } else {
        const startPage = Math.max(1, pagination.currentPage - 2);
        const endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);
        
        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) pages.push('...');
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        if (endPage < pagination.totalPages) {
          if (endPage < pagination.totalPages - 1) pages.push('...');
          pages.push(pagination.totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex items-center justify-between mt-8">
        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)} of {pagination.totalItems} developers
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className={`p-2 rounded-lg border transition-colors ${
              pagination.hasPrev
                ? isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                : isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                page === pagination.currentPage
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : typeof page === 'number'
                    ? isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    : isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-default'
                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-default'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className={`p-2 rounded-lg border transition-colors ${
              pagination.hasNext
                ? isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                : isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };


  if(isLoading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-2xl ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Loading...</div>
      </div>
    );
  }



  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} mt-16`}>
      {/* Search and Filters */}
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search developers, skills, or locations..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors
                            ${isDarkMode 
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                className={`px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium`}
              >
                Search
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors
                           ${isDarkMode 
                             ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' 
                             : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                           }`}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={` px-3 rounded-lg border transition-colors
                           ${isDarkMode 
                             ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' 
                             : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                           }`}
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 text-sm rounded-lg border transition-colors
                                 ${selectedSkills.includes(skill)
                                   ? 'bg-blue-500 text-white border-blue-500'
                                   : isDarkMode 
                                     ? 'bg-slate-600 text-slate-200 border-slate-500 hover:bg-slate-500'
                                     : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                 }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setSelectedSkills([]);
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors
                             ${isDarkMode ? 'text-slate-300 hover:bg-slate-600' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {developers.length === 0 ? (
          <div className="text-center py-12">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'}`}>🔍</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
              No developers found
            </h3>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'}>
              {developers.map(developer => (
                <DeveloperCard 
                  key={developer.id} 
                  developer={developer} 
                  isListView={viewMode === 'list'} 
                />
              ))}
            </div>
            
            <Pagination />
          </>
        )}
      </main>
    </div>
  );
};

export default DeveloperListPage;