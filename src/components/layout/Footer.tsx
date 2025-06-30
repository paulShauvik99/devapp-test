import React, { useState } from 'react';
import { 
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
 
} from 'lucide-react';

const Footer = () => {



  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/ShauvikP', name: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shauvik-paul20', name: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Github, href: 'https://github.com/paulShauvik99', name: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' }
  ];

  const companyInfo = {
    name: 'DevHub.',
    email: 'paul99shauvik108@gmail.com',
    phone: '+91 70024 50760',
    address: 'Kolkata, India',
    year: new Date().getFullYear()
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       
        {/* Footer Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700 space-y-6 lg:space-y-0">
          {/* Company Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{companyInfo.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">© {companyInfo.year} All rights reserved.</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            </div>
            <div className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <Phone className="h-4 w-4" />
              <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{companyInfo.address}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600`}
                aria-label={social.name}
                title={social.name}
              >
                <social.icon className={`h-5 w-5 text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-200`} />
              </a>
            ))}
          </div>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;