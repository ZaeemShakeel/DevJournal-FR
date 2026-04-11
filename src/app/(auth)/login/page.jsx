"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, AlertCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setError(null);
    const result = await login(data.email, data.password);
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
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 dark:bg-primary/20 rounded-full blur-[100px] -z-10 drift-1" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 dark:bg-secondary/20 rounded-full blur-[100px] -z-10 drift-2" />

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <StyledWrapper>
          <div id="form">
            <div id="welcome-lines">
              <div id="welcome-line-1">DevJournal</div>
              <div id="welcome-line-2">Welcome Back, Developer</div>
            </div>

            {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl flex items-start gap-3 text-error text-sm">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border-light text-primary focus:ring-primary cursor-pointer"
                  {...register('rememberMe')}
                />
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-primary font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg shadow-lg shadow-primary/20 mt-4"
              isLoading={isLoading}
              disabled={!isValid}
            >
              Log In
            </Button>
          </form>


          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>

          <div id="bar" />
        </div>
        </StyledWrapper>
      </div>
    </div>
  );
};

export default LoginPage;

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

  #bar {
    position: absolute;
    left: 50%;
    bottom: -4px;
    width: 28px;
    height: 8px;
    margin-left: -14px;
    background-color: var(--primary);
    border-radius: 10px;
  }

  #bar:before,
  #bar:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #ececec;
    border-radius: 50%;
  }

  html.dark & #bar:before, html.dark & #bar:after {
    background-color: #444;
  }

  #bar:before {
    right: -20px;
  }

  #bar:after {
    right: -38px;
  }
`;
