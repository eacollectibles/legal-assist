import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LogOut, ChevronDown, AlertTriangle } from 'lucide-react';
import { useMember } from '@/integrations';
import { useAuth } from '@/hooks/use-auth';
import PrimaryCTA from '@/components/PrimaryCTA';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isAuthenticated, member, actions, isLoading } = useMember();
  const { user, isAuthenticated: isAuthenticatedLocal, isAdmin: userIsAdmin, logout: logoutLocal } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Coming Soon Banner */}
      {!bannerDismissed && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white relative">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-2.5">
            <div className="flex items-center justify-center gap-2 text-center pr-8">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 hidden sm:block" />
              <p className="font-paragraph text-xs sm:text-sm font-medium">
                <span className="font-bold">Coming Soon:</span> LegalAssist is not yet open. We are not currently accepting clients or providing legal services.
              </p>
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <header className="bg-background border-b border-secondary/10 sticky top-0 z-50" role="banner">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0" aria-label="LegalAssist home">
            <div className="w-9 sm:w-10 h-9 sm:h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg sm:text-xl">LA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-2xl text-secondary font-bold leading-tight">LegalAssist</span>
              <span className="font-paragraph text-[10px] sm:text-sm text-secondary/60 font-normal leading-tight">Paralegal Services</span>
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
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button 
                className={`font-paragraph text-base transition-colors flex items-center gap-1 ${
                  isActive('/about') || isActive('/guides/what-is-a-paralegal') || isActive('/guides/paralegal-vs-lawyer')
                    ? 'text-primary font-semibold' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-background border border-secondary/10 rounded-lg shadow-lg py-2">
                    <Link
                      to="/about"
                      className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                        isActive('/about')
                          ? 'text-primary font-semibold bg-primary/5'
                          : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                      }`}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/guides/what-is-a-paralegal"
                      className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                        isActive('/guides/what-is-a-paralegal')
                          ? 'text-primary font-semibold bg-primary/5'
                          : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                      }`}
                    >
                      What Is a Paralegal?
                    </Link>
                    <Link
                      to="/guides/paralegal-vs-lawyer"
                      className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                        isActive('/guides/paralegal-vs-lawyer')
                          ? 'text-primary font-semibold bg-primary/5'
                          : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                      }`}
                    >
                      Paralegal vs. Lawyer
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
                {isAuthenticated || isAuthenticatedLocal ? (
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
                    {userIsAdmin && (
                      <Link 
                        to="/admin/users" 
                        className={`font-paragraph text-base transition-colors ${
                          isActive('/admin/users') 
                            ? 'text-primary font-semibold' 
                            : 'text-secondary hover:text-primary'
                        }`}
                      >
                        File Management
                      </Link>
                    )}
                    <div className="flex items-center gap-4 pl-4 border-l border-secondary/10">
                      <span className="font-paragraph text-sm text-secondary">
                        {user?.firstName || member?.profile?.nickname || member?.contact?.firstName || 'Client'}
                      </span>
                      <button
                        onClick={() => {
                          if (isAuthenticatedLocal) {
                            logoutLocal();
                            navigate('/');
                          } else {
                            actions.logout();
                          }
                        }}
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
                    <PrimaryCTA variant="desktop" size="md" />
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
            <div className="flex flex-col">
              <span className="font-paragraph text-xs uppercase tracking-wider text-secondary/50 px-3 py-1">
                About
              </span>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                  isActive('/about') 
                    ? 'bg-primary text-primary-foreground font-semibold' 
                    : 'text-secondary hover:bg-pastelbeige'
                }`}
              >
                About Us
              </Link>
              <Link 
                to="/guides/what-is-a-paralegal" 
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                  isActive('/guides/what-is-a-paralegal') 
                    ? 'bg-primary text-primary-foreground font-semibold' 
                    : 'text-secondary hover:bg-pastelbeige'
                }`}
              >
                What Is a Paralegal?
              </Link>
              <Link 
                to="/guides/paralegal-vs-lawyer" 
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                  isActive('/guides/paralegal-vs-lawyer') 
                    ? 'bg-primary text-primary-foreground font-semibold' 
                    : 'text-secondary hover:bg-pastelbeige'
                }`}
              >
                Paralegal vs. Lawyer
              </Link>
            </div>
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
                {isAuthenticated || isAuthenticatedLocal ? (
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
                    {userIsAdmin && (
                      <Link 
                        to="/admin/users" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-paragraph text-base py-2 px-3 rounded-lg transition-colors ${
                          isActive('/admin/users') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige'
                        }`}
                      >
                        File Management
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        if (isAuthenticatedLocal) {
                          logoutLocal();
                          navigate('/');
                        } else {
                          actions.logout();
                        }
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
                    <PrimaryCTA variant="mobile" size="md" />
                  </>
                )}
              </>
            )}
          </nav>
        )}
      </div>
    </header>
    </>
  );
}
