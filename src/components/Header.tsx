import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, LogOut, ChevronDown, AlertTriangle } from 'lucide-react';
import { useMember } from '@/integrations';
import { useAuth } from '@/hooks/use-auth';
import PrimaryCTA from '@/components/PrimaryCTA';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isAuthenticated, member, actions, isLoading } = useMember();
  const { user, isAuthenticated: isAuthenticatedLocal, isAdmin: userIsAdmin, logout: logoutLocal } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isResourcesActive = () => {
    return location.pathname.startsWith('/guides') || 
           location.pathname === '/legal-news' || 
           location.pathname === '/resources';
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileResourcesOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileLinkClick = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileResourcesOpen(false);
  }, []);

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
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors focus-ring"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      <header className="bg-background border-b border-secondary/10 sticky top-0 z-50" role="banner">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 focus-ring rounded-lg p-1 -m-1" 
              aria-label="LegalAssist home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary rounded-sm flex items-center justify-center">
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
                className={`font-paragraph text-base transition-colors focus-ring rounded px-2 py-1 -mx-2 ${
                  isActive('/') 
                    ? 'text-primary font-semibold' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Home
              </Link>
              
              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button 
                  className={`font-paragraph text-base transition-colors flex items-center gap-1 focus-ring rounded px-2 py-1 -mx-2 ${
                    isActive('/about') || isActive('/about/team') || isActive('/guides/what-is-a-paralegal') || isActive('/guides/paralegal-vs-lawyer')
                      ? 'text-primary font-semibold' 
                      : 'text-secondary hover:text-primary'
                  }`}
                  aria-expanded={aboutDropdownOpen}
                  aria-haspopup="true"
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
                        to="/about/team"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/about/team')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        Meet Our Team
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
                className={`font-paragraph text-base transition-colors focus-ring rounded px-2 py-1 -mx-2 ${
                  isActive('/services') 
                    ? 'text-primary font-semibold' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Services
              </Link>

              {/* Resources Dropdown - NEW */}
              <div 
                className="relative"
                onMouseEnter={() => setResourcesDropdownOpen(true)}
                onMouseLeave={() => setResourcesDropdownOpen(false)}
              >
                <button 
                  className={`font-paragraph text-base transition-colors flex items-center gap-1 focus-ring rounded px-2 py-1 -mx-2 ${
                    isResourcesActive()
                      ? 'text-primary font-semibold' 
                      : 'text-secondary hover:text-primary'
                  }`}
                  aria-expanded={resourcesDropdownOpen}
                  aria-haspopup="true"
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform ${resourcesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {resourcesDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-background border border-secondary/10 rounded-lg shadow-lg py-2">
                      <Link
                        to="/resources"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/resources')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        All Resources
                      </Link>
                      <Link
                        to="/legal-news"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/legal-news')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        Recent Legal Decisions
                      </Link>
                      <div className="border-t border-secondary/10 my-2" />
                      <span className="block px-4 py-1 font-paragraph text-xs text-secondary/50 uppercase tracking-wider">
                        Legal Guides
                      </span>
                      <Link
                        to="/guides/ontario-tenant-rights"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/guides/ontario-tenant-rights')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        Ontario Tenant Rights
                      </Link>
                      <Link
                        to="/guides/small-claims-court-process"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/guides/small-claims-court-process')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        Small Claims Court Guide
                      </Link>
                      <Link
                        to="/guides/ltb-hearing-preparation"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/guides/ltb-hearing-preparation')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        LTB Hearing Preparation
                      </Link>
                      <Link
                        to="/guides/what-to-do-when-sued"
                        className={`block px-4 py-2 font-paragraph text-sm transition-colors ${
                          isActive('/guides/what-to-do-when-sued')
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-pastelbeige/50'
                        }`}
                      >
                        What to Do When Sued
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {!isLoading && (
                <>
                  {isAuthenticated || isAuthenticatedLocal ? (
                    <>
                      <Link 
                        to="/client-dashboard" 
                        className={`font-paragraph text-base transition-colors focus-ring rounded px-2 py-1 -mx-2 ${
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
                          className={`font-paragraph text-base transition-colors focus-ring rounded px-2 py-1 -mx-2 ${
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
                          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors focus-ring rounded px-2 py-1"
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
                        className={`font-paragraph text-base transition-colors focus-ring rounded px-2 py-1 -mx-2 ${
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

            {/* Mobile Menu Button - 48px touch target */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden min-w-[48px] min-h-[48px] flex items-center justify-center text-secondary hover:text-primary hover:bg-pastelbeige/50 rounded-lg transition-colors focus-ring"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
            <nav 
              id="mobile-menu"
              className="lg:hidden mobile-menu-enter"
              aria-label="Mobile navigation"
            >
              <div className="mt-4 pb-4 flex flex-col gap-1 border-t border-secondary/10 pt-4">
                {/* Home */}
                <Link 
                  to="/" 
                  onClick={handleMobileLinkClick}
                  className={`font-paragraph text-base min-h-[48px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                    isActive('/') 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                  }`}
                >
                  Home
                </Link>
                
                {/* About Section - Accordion */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className={`font-paragraph text-base min-h-[48px] flex items-center justify-between px-4 rounded-lg transition-colors focus-ring ${
                      isActive('/about') || isActive('/about/team') || isActive('/guides/what-is-a-paralegal') || isActive('/guides/paralegal-vs-lawyer')
                        ? 'text-primary font-semibold' 
                        : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                    }`}
                    aria-expanded={mobileAboutOpen}
                  >
                    <span>About</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {mobileAboutOpen && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-pastelbeige pl-2">
                      <Link 
                        to="/about" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/about') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        About Us
                      </Link>
                      <Link 
                        to="/about/team" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/about/team') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        Meet Our Team
                      </Link>
                      <Link 
                        to="/guides/what-is-a-paralegal" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/guides/what-is-a-paralegal') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        What Is a Paralegal?
                      </Link>
                      <Link 
                        to="/guides/paralegal-vs-lawyer" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/guides/paralegal-vs-lawyer') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        Paralegal vs. Lawyer
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Services */}
                <Link 
                  to="/services" 
                  onClick={handleMobileLinkClick}
                  className={`font-paragraph text-base min-h-[48px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                    isActive('/services') 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                  }`}
                >
                  Services
                </Link>

                {/* Resources Section - Accordion - NEW */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    className={`font-paragraph text-base min-h-[48px] flex items-center justify-between px-4 rounded-lg transition-colors focus-ring ${
                      isResourcesActive()
                        ? 'text-primary font-semibold' 
                        : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                    }`}
                    aria-expanded={mobileResourcesOpen}
                  >
                    <span>Resources</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {mobileResourcesOpen && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-pastelbeige pl-2">
                      <Link 
                        to="/resources" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/resources') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        All Resources
                      </Link>
                      <Link 
                        to="/legal-news" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/legal-news') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        Recent Legal Decisions
                      </Link>
                      <Link 
                        to="/guides/ontario-tenant-rights" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/guides/ontario-tenant-rights') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        Tenant Rights Guide
                      </Link>
                      <Link 
                        to="/guides/small-claims-court-process" 
                        onClick={handleMobileLinkClick}
                        className={`font-paragraph text-base min-h-[44px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                          isActive('/guides/small-claims-court-process') 
                            ? 'bg-primary text-primary-foreground font-semibold' 
                            : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                        }`}
                      >
                        Small Claims Guide
                      </Link>
                    </div>
                  )}
                </div>

                {!isLoading && (
                  <>
                    {isAuthenticated || isAuthenticatedLocal ? (
                      <>
                        <Link 
                          to="/client-dashboard" 
                          onClick={handleMobileLinkClick}
                          className={`font-paragraph text-base min-h-[48px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                            isActive('/client-dashboard') 
                              ? 'bg-primary text-primary-foreground font-semibold' 
                              : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                          }`}
                        >
                          Dashboard
                        </Link>
                        {userIsAdmin && (
                          <Link 
                            to="/admin/users" 
                            onClick={handleMobileLinkClick}
                            className={`font-paragraph text-base min-h-[48px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                              isActive('/admin/users') 
                                ? 'bg-primary text-primary-foreground font-semibold' 
                                : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                            }`}
                          >
                            File Management
                          </Link>
                        )}
                        <div className="mt-2 pt-2 border-t border-secondary/10">
                          <button
                            onClick={() => {
                              if (isAuthenticatedLocal) {
                                logoutLocal();
                                navigate('/');
                              } else {
                                actions.logout();
                              }
                              handleMobileLinkClick();
                            }}
                            className="flex items-center gap-3 font-paragraph text-base min-h-[48px] px-4 rounded-lg text-secondary hover:bg-pastelbeige active:bg-pastelbeige transition-colors w-full focus-ring"
                          >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/client-signup" 
                          onClick={handleMobileLinkClick}
                          className={`font-paragraph text-base min-h-[48px] flex items-center px-4 rounded-lg transition-colors focus-ring ${
                            isActive('/client-signup') 
                              ? 'bg-primary text-primary-foreground font-semibold' 
                              : 'text-secondary hover:bg-pastelbeige active:bg-pastelbeige'
                          }`}
                        >
                          Client Portal
                        </Link>
                        
                        {/* Mobile CTA */}
                        <div className="mt-3 pt-3 border-t border-secondary/10">
                          <PrimaryCTA variant="mobile" size="lg" className="w-full min-h-[52px]" />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
