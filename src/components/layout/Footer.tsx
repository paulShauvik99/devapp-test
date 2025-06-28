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
  Activity,
  Shield,
  Zap,
  Send,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async () => {
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter subscription:', email);
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const footerLinks = {
    Platform: [
      { name: 'Features', href: '#features' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'API Documentation', href: '#api-docs' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Enterprise', href: '#enterprise' }
    ],
    Resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' }
    ],
    Support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'System Status', href: '#status' },
      { name: 'Bug Reports', href: '#bugs' },
      { name: 'Feature Requests', href: '#features' },
      { name: 'Feedback', href: '#feedback' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
      { name: 'Security', href: '#security' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#facebook', name: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#twitter', name: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#instagram', name: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#linkedin', name: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Github, href: '#github', name: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' }
  ];

  const systemStatus = [
    { name: 'API Status', status: 'operational', icon: Activity, color: 'text-green-500' },
    { name: 'Database', status: 'operational', icon: Shield, color: 'text-green-500' },
    { name: 'CDN', status: 'operational', icon: Zap, color: 'text-green-500' }
  ];

  const companyInfo = {
    name: 'AppName Inc.',
    email: 'contact@appname.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    year: new Date().getFullYear()
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
          
          <div className="relative text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Get the latest updates, insights, and exclusive content delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
              <button 
                type="button"
                onClick={handleNewsletterSubmit}
                disabled={isSubmitting || !email}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
                              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative">
                {category}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-500" />
            System Status
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {systemStatus.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <system.icon className={`h-5 w-5 ${system.color}`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{system.name}</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-200 dark:border-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                  {system.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <a 
              href="#status" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              View detailed status →
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700 space-y-6 lg:space-y-0">
          {/* Company Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
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

        {/* Additional Info */}
        <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Built with ❤️ using React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;