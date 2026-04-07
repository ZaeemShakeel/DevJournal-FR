"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: signup, isLoading } = useAuth();
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength({ score: 0, label: '', color: '' });
      return;
    }

    let score = 0;
    if (passwordValue.length > 0) score = 1; // Weak
    if (passwordValue.length >= 4) score = 2; // Medium
    if (passwordValue.length >= 6 && /[a-zA-Z]/.test(passwordValue) && /[0-9]/.test(passwordValue)) score = 3; // Strong

    const strengths = [
      { label: '', color: '' },
      { label: 'Weak', color: 'bg-error' },
      { label: 'Medium', color: 'bg-yellow-500' },
      { label: 'Strong', color: 'bg-success' },
    ];

    setPasswordStrength({ 
      score, 
      label: strengths[score].label, 
      color: strengths[score].color 
    });
  }, [passwordValue]);

  const onSubmit = async (data) => {
    setError(null);
    const result = await signup(data.name, data.email, data.password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md animate-fade-in">
        <div className="glass p-8 rounded-[2rem] border-white/20 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400">Join the developer community today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl flex items-start gap-3 text-error text-sm">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={User}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  icon={Lock}
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {passwordValue && (
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                    <span>Password Strength</span>
                    <span className={passwordStrength.score === 1 ? 'text-error' : passwordStrength.score === 2 ? 'text-yellow-500' : 'text-success'}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3].map((idx) => (
                      <div 
                        key={idx} 
                        className={`flex-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-all duration-500 ${
                          passwordStrength.score >= idx ? passwordStrength.color : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={CheckCircle2}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 rounded border-border-light text-primary focus:ring-primary cursor-pointer"
                  {...register('terms')}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
                  I agree to the <Link href="#" className="text-primary font-semibold hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary font-semibold hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-error mt-1">{errors.terms.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg shadow-lg shadow-primary/20 mt-6"
              isLoading={isLoading}
              disabled={!isValid}
            >
              Sign Up
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
