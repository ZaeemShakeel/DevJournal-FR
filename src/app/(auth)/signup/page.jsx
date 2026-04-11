"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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
    
    if (passwordValue.length > 0) {
      score = 1; // Weak
    }

    const hasLower = /[a-z]/.test(passwordValue);
    const hasUpper = /[A-Z]/.test(passwordValue);
    const hasNumber = /[0-9]/.test(passwordValue);
    const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

    if (passwordValue.length >= 6) {
      score = 2; // Medium (Yellow)
    }

    if (passwordValue.length >= 8 && hasLower && hasUpper && hasNumber && hasSpecial) {
      score = 3; // Strong (Green)
    }

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
      <style>{`
        @keyframes drift1 { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(50px, -50px) scale(1.1); } 66% { transform: translate(-30px, 40px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes drift2 { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(-40px, 60px) scale(1.2); } 66% { transform: translate(40px, -30px) scale(0.8); } 100% { transform: translate(0px, 0px) scale(1); } }
        .drift-1 { animation: drift1 15s ease-in-out infinite; }
        .drift-2 { animation: drift2 18s ease-in-out infinite; }
      `}</style>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-secondary/30 dark:bg-secondary/20 rounded-full blur-[100px] -z-10 drift-2" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/30 dark:bg-accent/20 rounded-full blur-[100px] -z-10 drift-1" />

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <StyledWrapper>
          <div id="form">
            <div id="welcome-lines">
              <div id="welcome-line-1">DevJournal</div>
              <div id="welcome-line-2">Join the developer community</div>
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
                    <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength.score >= 1 ? 'bg-error' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength.score >= 2 ? 'bg-yellow-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength.score >= 3 ? 'bg-success' : 'bg-slate-200 dark:bg-slate-700'}`} />
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

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in instead
            </Link>
          </p>

        </div>
        </StyledWrapper>
      </div>
    </div>
  );
};

export default SignupPage;

const StyledWrapper = styled.div`
  #form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 45px 35px;
    background-color: hsl(240, 15%, 9%);
    box-shadow: 0px 15px 60px rgba(139, 92, 246, 0.3);
    outline: 1px solid var(--primary);
    border-radius: 12px;
    position: relative;
    margin: 0 auto;
  }

  html.light & #form {
     background-color: #ffffff;
     box-shadow: 0px 15px 60px rgba(139, 92, 246, 0.15);
  }

  #welcome-lines {
    text-align: center;
    line-height: 1.2;
    margin-bottom: 35px;
  }

  #welcome-line-1 {
    color: var(--primary);
    font-weight: 800;
    font-size: 36px;
  }

  #welcome-line-2 {
    color: #ffffff;
    font-size: 16px;
    margin-top: 8px;
  }
  
  html.light & #welcome-line-2 {
    color: #1a1a1a;
  }
`;
