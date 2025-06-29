import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, MapPin, Star, Github, Linkedin, Twitter, Mail, ChevronDown, X, Users, Code, Award, Calendar } from 'lucide-react';

// TypeScript interfaces
interface SocialLink {
  type: string;
  url: string;
}

interface Developer {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  skills: string[];
  experience: string;
  availability: string;
  description: string;
  socialLinks: SocialLink[];
}

// Mock data for demonstration
const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Full Stack Developer',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 85,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    experience: '5+ years',
    availability: 'Available',
    description: 'Passionate full-stack developer with expertise in modern web technologies and cloud platforms.',
    socialLinks: [
      { type: 'github', url: 'https://github.com/sarahchen' },
      { type: 'linkedin', url: 'https://linkedin.com/in/sarahchen' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Mobile App Developer',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 75,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    experience: '4+ years',
    availability: 'Busy',
    description: 'Mobile-first developer creating beautiful, performant apps for iOS and Android platforms.',
    socialLinks: [
      { type: 'github', url: 'https://github.com/marcusrod' },
      { type: 'twitter', url: 'https://twitter.com/marcusrod' }
    ]
  },
  {
    id: '3',
    name: 'Emily Wang',
    title: 'UI/UX Designer & Frontend Dev',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 90,
    skills: ['Figma', 'React', 'Vue.js', 'Tailwind CSS', 'Design Systems'],
    experience: '6+ years',
    availability: 'Available',
    description: 'Designer-developer hybrid specializing in user-centered design and pixel-perfect implementations.',
    socialLinks: [
      { type: 'linkedin', url: 'https://linkedin.com/in/emilywang' },
      { type: 'github', url: 'https://github.com/emilywang' }
    ]
  },
  {
    id: '4',
    name: 'David Kumar',
    title: 'Backend Engineer',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 203,
    hourlyRate: 95,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
    experience: '7+ years',
    availability: 'Available',
    description: 'Backend specialist focused on scalable architectures and high-performance systems.',
    socialLinks: [
      { type: 'github', url: 'https://github.com/davidkumar' },
      { type: 'linkedin', url: 'https://linkedin.com/in/davidkumar' }
    ]
  },
  {
    id: '5',
    name: 'Alex Thompson',
    title: 'DevOps Engineer',
    location: 'Denver, CO',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 100,
    skills: ['AWS', 'Terraform', 'Jenkins', 'Docker', 'Monitoring'],
    experience: '5+ years',
    availability: 'Available',
    description: 'DevOps engineer passionate about automation, infrastructure as code, and reliable deployments.',
    socialLinks: [
      { type: 'github', url: 'https://github.com/alexthompson' }
    ]
  },
  {
    id: '6',
    name: 'Lisa Park',
    title: 'Data Scientist',
    location: 'Boston, MA',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 67,
    hourlyRate: 110,
    skills: ['Python', 'R', 'TensorFlow', 'SQL', 'Tableau'],
    experience: '4+ years',
    availability: 'Busy',
    description: 'Data scientist specializing in machine learning and predictive analytics for business insights.',
    socialLinks: [
      { type: 'linkedin', url: 'https://linkedin.com/in/lisapark' },
      { type: 'github', url: 'https://github.com/lisapark' }
    ]
  }
];

const DeveloperPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [developers, setDevelopers] = useState<Developer[]>(mockDevelopers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [rateRange, setRateRange] = useState([0, 200]);

  // Mock skills data
  const allSkills = ['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Flutter', 'Vue.js', 'Django', 'Figma', 'Tailwind CSS', 'Firebase', 'TensorFlow', 'Jenkins'];

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const getSocialIcon = (type: string) => {
    switch(type) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const filteredDevelopers = developers.filter(dev => {
    const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dev.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.every(skill => dev.skills.includes(skill));
    
    const matchesAvailability = !availabilityFilter || dev.availability === availabilityFilter;
    
    const matchesRate = dev.hourlyRate >= rateRange[0] && dev.hourlyRate <= rateRange[1];
    
    return matchesSearch && matchesSkills && matchesAvailability && matchesRate;
  });

  const DeveloperCard = ({ developer, isListView = false }: { developer: Developer; isListView?: boolean }) => (
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
            {developer.title}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{developer.location}</span>
          </div>
          
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {developer.rating}
              </span>
              <span className="text-sm text-gray-500">({developer.reviewCount})</span>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium
                            ${developer.availability === 'Available' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {developer.availability}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'} mb-3 line-clamp-2`}>
          {developer.description}
        </p>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {developer.skills.slice(0, 4).map(skill => (
            <span key={skill} className={`px-2 py-1 text-xs rounded-lg font-medium
                                         ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-gray-100 text-gray-700'}`}>
              {skill}
            </span>
          ))}
          {developer.skills.length > 4 && (
            <span className={`px-2 py-1 text-xs rounded-lg font-medium
                             ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-500'}`}>
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
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
          
          <div className="text-right">
            <div className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${developer.hourlyRate}/hr
            </div>
            <div className="text-xs text-gray-500">{developer.experience}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Developers
              </h1>
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg text-sm
                              ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                <Users className="w-4 h-4" />
                {filteredDevelopers.length} found
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`p-2 rounded-lg transition-colors
                           ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors
                           ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

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
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors
                           ${isDarkMode 
                             ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500' 
                             : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                           } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            
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
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Skills Filter */}
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

                {/* Availability Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                    Availability
                  </label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-slate-600 border-slate-500 text-slate-200' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="">All</option>
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>

                {/* Rate Range */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                    Hourly Rate: ${rateRange[0]} - ${rateRange[1]}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={rateRange[0]}
                      onChange={(e) => setRateRange([parseInt(e.target.value), rateRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={rateRange[1]}
                      onChange={(e) => setRateRange([rateRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setSelectedSkills([]);
                    setAvailabilityFilter('');
                    setRateRange([0, 200]);
                    setSearchQuery('');
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
        {filteredDevelopers.length === 0 ? (
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
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'}>
            {filteredDevelopers.map(developer => (
              <DeveloperCard 
                key={developer.id} 
                developer={developer} 
                isListView={viewMode === 'list'} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeveloperPage;