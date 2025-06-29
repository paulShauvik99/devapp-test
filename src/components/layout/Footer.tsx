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