import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useMember } from '@/integrations';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, member, actions, isLoading } = useMember();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-background border-b border-secondary/10 sticky top-0 z-50" role="banner">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0" aria-label="LegalAssist home">
            <div className="w-9 sm:w-10 h-9 sm:h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg sm:text-xl">LA</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading text-xl sm:text-2xl text-secondary font-bold leading-tight">LegalAssist</span>
              <span className="font-paragraph text-xs sm:text-sm text-secondary/60 font-normal leading-tight">Paralegal Services</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            <Link 
              to="/" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/') 
                  ? 'text-primary font-semibold' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/about') 
                  ? 'text-primary font-semibold' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/services') 
                  ? 'text-primary font-semibold' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Services
            </Link>

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/client-dashboard" 
                      className={`font-paragraph text-base transition-colors ${
                        isActive('/client-dashboard') 
                          ? 'text-primary font-semibold' 
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center gap-4 pl-4 border-l border-secondary/10">
                      <span className="font-paragraph text-sm text-secondary">
                        {member?.profile?.nickname || member?.contact?.firstName || 'Client'}
                      </span>
                      <button
                        onClick={actions.logout}
                        className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/client-signup" 
                      className={`font-paragraph text-base transition-colors ${
                        isActive('/client-signup') 
                          ? 'text-primary font-semibold' 
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      Client Portal
                    </Link>
                    <Link 
                      to="/contact" 
                      className="bg-primary text-primary-foreground font-paragraph px-6 py-3 rounded-lg transition-all hover:bg-primary/90 active:scale-95"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary hover:text-primary transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-secondary/10 pt-4" aria-label="Mobile navigation">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : 'text-secondary hover:bg-pastelbeige'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                isActive('/about') 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : 'text-secondary hover:bg-pastelbeige'
              }`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                isActive('/services') 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : 'text-secondary hover:bg-pastelbeige'
              }`}
            >
              Services
            </Link>

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/client-dashboard" 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                        isActive('/client-dashboard') 
                          ? 'bg-primary text-primary-foreground font-semibold' 
                          : 'text-secondary hover:bg-pastelbeige'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 font-paragraph text-base py-2 px-3 rounded-lg text-secondary hover:bg-pastelbeige transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/client-signup" 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                        isActive('/client-signup') 
                          ? 'bg-primary text-primary-foreground font-semibold' 
                          : 'text-secondary hover:bg-pastelbeige'
                      }`}
                    >
                      Client Portal
                    </Link>
                    <Link 
                      to="/contact" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-primary text-primary-foreground font-paragraph px-3 py-2 rounded-lg transition-all hover:bg-primary/90 active:scale-95 text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
