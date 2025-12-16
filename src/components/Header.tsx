import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
            <span className="font-heading text-xl sm:text-2xl text-secondary font-bold hidden sm:inline">LegalAssist</span>
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
              to="/services" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/services') 
                  ? 'text-primary font-semibold' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Services
            </Link>
            <a 
              href="#contact" 
              className="bg-primary text-primary-foreground font-paragraph px-6 py-3 rounded-lg transition-all hover:bg-primary/90 active:scale-95"
            >
              Get Started
            </a>
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
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-primary-foreground font-paragraph px-3 py-2 rounded-lg transition-all hover:bg-primary/90 active:scale-95 text-center"
            >
              Get Started
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
