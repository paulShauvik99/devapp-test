import React, { useState } from 'react';
import {
  Star,
  MapPin,
  MessageCircle,
  Heart,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  CheckCircle,
  Sun,
  Moon
} from 'lucide-react';

// Type definitions
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
}

interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface StarRatingProps {
  rating: number;
  size?: number;
}

// Mock data
const developer = {
  name: 'Sarah Chen',
  title: 'Full Stack Developer',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  rating: 4.9,
  reviewCount: 127,
  completedProjects: 89,
  hourlyRate: 85,
  availability: 'Available',
  description: 'Passionate full-stack developer with 6+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
  skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
  socialLinks: [
    { type: 'github', url: 'https://github.com/sarahchen', icon: Github },
    { type: 'linkedin', url: 'https://linkedin.com/in/sarahchen', icon: Linkedin },
    { type: 'website', url: 'https://sarahchen.dev', icon: Globe }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and inventory management.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://demo-ecommerce.com'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      technologies: ['React', 'Firebase', 'Material-UI'],
      liveUrl: 'https://taskmanager-demo.com'
    }
  ],
  reviews: [
    {
      id: '1',
      clientName: 'John Smith',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      comment: 'Sarah delivered exceptional work on our e-commerce platform. Her attention to detail exceeded our expectations.',
      date: '2024-01-15'
    },
    {
      id: '2',
      clientName: 'Emily Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      comment: 'Outstanding developer! Completed the project ahead of schedule with excellent support.',
      date: '2024-01-10'
    }
  ]
};

const CompactDeveloperProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg overflow-hidden h-full flex flex-col`}>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-36 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col">
        <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-3 flex-grow ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className={`px-2 py-1 text-xs rounded-full border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300' 
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-medium ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ExternalLink size={14} />
          View Project
        </a>
      </div>
    </div>
  );

  const ReviewCard = ({ review }: { review: Review }) => (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-4 mb-3`}>
      <div className="flex gap-3">
        <img
          src={review.clientAvatar}
          alt={review.clientName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {review.clientName}
            </h4>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );

  const StarRating = ({ rating, size = 16 }: StarRatingProps) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : isDarkMode ? 'text-gray-600' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            } shadow-md`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Header Card */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg p-6 mb-6`}>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={developer.avatar}
                  alt={developer.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle size={16} className="text-white" />
                </div>
              </div>
              
              <h1 className={`text-2xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {developer.name}
              </h1>
              <h2 className={`text-lg mb-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {developer.title}
              </h2>
              <div className="flex items-center gap-1 mb-4">
                <MapPin size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {developer.location}
                </span>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {developer.socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {developer.rating}
                  </div>
                  <StarRating rating={developer.rating} />
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {developer.reviewCount} reviews
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {developer.completedProjects}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Projects
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    ${developer.hourlyRate}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Per Hour
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {developer.availability}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-grow bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Contact
                </button>
                <button className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm mb-6`}>
          <div className="flex justify-center">
            {['About', 'Projects', 'Reviews'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === index
                    ? `border-b-2 border-blue-600 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
                    : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 0 && (
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                About
              </h3>
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {developer.description}
              </p>
              
              <hr className={`my-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
              
              <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {developer.skills.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-300' 
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Projects ({developer.projects.length})
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {developer.projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Reviews ({developer.reviews.length})
                </h3>
                <div className="flex items-center gap-2">
                  <StarRating rating={developer.rating} />
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {developer.rating}
                  </span>
                </div>
              </div>
              
              <div>
                {developer.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactDeveloperProfile;