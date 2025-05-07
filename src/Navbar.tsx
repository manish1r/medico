
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Medico</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              {role === 'patient' && (
                <>
                  <Link to="/patient/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/patient/find-doctor" className="text-gray-600 hover:text-primary transition-colors">
                    Find Doctor
                  </Link>
                  <Link to="/patient/appointments" className="text-gray-600 hover:text-primary transition-colors">
                    My Appointments
                  </Link>
                </>
              )}
              
              {role === 'admin' && (
                <>
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/admin/doctors" className="text-gray-600 hover:text-primary transition-colors">
                    Doctors
                  </Link>
                  <Link to="/admin/appointments" className="text-gray-600 hover:text-primary transition-colors">
                    Appointments
                  </Link>
                  <Link to="/admin/profile" className="text-gray-600 hover:text-primary transition-colors">
                    Hospital Profile
                  </Link>
                </>
              )}
              
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-500 cursor-pointer hover:text-primary transition-colors" />
                <User size={20} className="text-gray-500 cursor-pointer hover:text-primary transition-colors" />
                <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <Menu />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {user ? (
              <>
                {role === 'patient' && (
                  <>
                    <Link to="/patient/dashboard" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/patient/find-doctor" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      Find Doctor
                    </Link>
                    <Link to="/patient/appointments" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      My Appointments
                    </Link>
                  </>
                )}
                
                {role === 'admin' && (
                  <>
                    <Link to="/admin/dashboard" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/admin/doctors" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      Doctors
                    </Link>
                    <Link to="/admin/appointments" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      Appointments
                    </Link>
                    <Link to="/admin/profile" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                      Hospital Profile
                    </Link>
                  </>
                )}
                
                <Button variant="outline" onClick={logout} className="flex items-center gap-2 w-full justify-center mt-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
