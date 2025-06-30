import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Eye, EyeOff, Mail, Lock, User, Code, ArrowRight, AlertCircle,
  Globe2, UserCircle2, Moon, Sun
} from 'lucide-react';
import { toggleTheme } from '../store/slice/themeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slice/authSlice';

// Define types for better TypeScript support
export interface RegisterInput {
  email: string;
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

// Yup validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email is invalid'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, clearErrors} = useForm<RegisterInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: RegisterInput) => {
    // Check terms agreement
    if (!agreeToTerms) {
      setTermsError('You must agree to the terms');
      return;
    }

    setIsLoading(true);

    const res = await  dispatch(registerUser(data))
    
    if(registerUser.fulfilled.match(res)) {
      navigate('/');
    } else {
      const error = res.payload as string;
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error}`);   
    }
    
    setIsLoading(false);

  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navigateSignIn = () => {
    navigate("/login")
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
    if (e.target.checked && termsError) {
      setTermsError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative">

      {/* Theme Toggle Button */}
      <button
        onClick={handleThemeToggle}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-200 hover:scale-105"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

        {/* Left Side - Branding & Info */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">DevHub</span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Join the professional
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                Developer Community
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Connect with expert developers, share knowledge, and advance your career in tech.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <Globe2 className="w-5 h-5" />, text: "Connect with developers worldwide" },
              { icon: <UserCircle2 className="w-5 h-5" />, text: "Build your professional profile" },
              { icon: <Code className="w-5 h-5" />, text: "Share and discover projects" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <span className="text-slate-700 dark:text-slate-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8">

            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">DevHub</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Create Account
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Join the developer community
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Create Account
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Get started with your developer profile.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    {...register('email')}
                    onChange={(e) => {
                      register('email').onChange(e);
                      if (errors.email) clearErrors('email');
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${errors.email ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
                      }`}
                    placeholder="john@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Username and Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Username *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      {...register('username')}
                      onChange={(e) => {
                        register('username').onChange(e);
                        if (errors.username) clearErrors('username');
                      }}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${errors.username ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
                        }`}
                      placeholder="johndoe"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    onChange={(e) => {
                      register('name').onChange(e);
                      if (errors.name) clearErrors('name');
                    }}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${errors.name ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
                      }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    onChange={(e) => {
                      register('password').onChange(e);
                      if (errors.password) clearErrors('password');
                    }}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${errors.password ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
                      }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    onChange={(e) => {
                      register('confirmPassword').onChange(e);
                      if (errors.confirmPassword) clearErrors('confirmPassword');
                    }}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${errors.confirmPassword ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
                      }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={handleTermsChange}
                    className={`mt-1 w-4 h-4 text-blue-600 bg-slate-50 dark:bg-slate-700 border rounded focus:ring-blue-500 focus:ring-2 ${termsError ? 'border-red-300 dark:border-red-600' : 'border-slate-300 dark:border-slate-600'
                      }`}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    I agree to the{' '}
                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {termsError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {termsError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  onClick={navigateSignIn}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;