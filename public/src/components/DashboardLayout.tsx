
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'patient';
}

const DashboardLayout = ({ children, requiredRole }: DashboardLayoutProps) => {
  const { isAuthenticated, user } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect if not the required role
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Medico. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
