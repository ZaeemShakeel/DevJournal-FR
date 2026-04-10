"use client";

import { useAuth } from '@/contexts/AuthContext';
import LoginRequiredModal from './LoginRequiredModal';
import Loader from '@/components/ui/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader />
        <p className="mt-8 text-xl font-bold animate-pulse text-slate-500 uppercase tracking-widest text-sm">Verifying access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginRequiredModal />;
  }

  return children;
};

export default ProtectedRoute;
