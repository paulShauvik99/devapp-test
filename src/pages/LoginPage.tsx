import { use, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Eye, EyeOff, Mail, Lock, Code, ArrowRight, AlertCircle,
  Globe, Shield, Zap, Moon, Sun
} from 'lucide-react';
import type { LoginInput as FormData } from '../models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slice/authSlice';


// Extended form data interface for UI state

// Validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const LoginPage = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const loginRes = useAppSelector((state) => state.auth);


  // React Hook Form setup
  const { register, handleSubmit, formState: { errors, isValid},  watch } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  

  // // Watch form values for dynamic UI updates
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const resAction = await dispatch(loginUser( data ));
    setIsLoading(false);

    if(loginUser.fulfilled.match(resAction)) {
      console.log('Login successful:', resAction.payload);
      // navigate to dashboard or home page
      navigate('/');
    } else {
      console.error('Login failed:', resAction.error.message);
      // Handle error (e.g., show notification)
      alert(`Login failed: ${resAction.error.message}`);
    }

  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateRegister = () => {
    navigate("/register")
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
              Welcome back to the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600">
                Developer Community
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Continue building connections with skilled developers and exploring cutting-edge technical content.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <Globe className="w-5 h-5" />, text: "Global network of 50K+ developers" },
              { icon: <Shield className="w-5 h-5" />, text: "Verified profiles and secure platform" },
              { icon: <Zap className="w-5 h-5" />, text: "Advanced matching algorithms" }
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

        {/* Right Side - Login Form */}
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
                Welcome Back
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Sign in to your account
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Sign In
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome back! Please sign in to your account.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.email ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${
                      errors.password ? 'border-red-300 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'
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

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading || !isValid}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-violet-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  onClick={navigateRegister}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;