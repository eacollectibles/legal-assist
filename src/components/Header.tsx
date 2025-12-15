import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-background border-b border-secondary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-xl">LA</span>
            </div>
            <span className="font-heading text-2xl text-secondary font-bold">LegalAssist</span>
          </Link>
          
          <nav className="flex items-center gap-8">
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
              to="/legal-services" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/legal-services') 
                  ? 'text-primary font-semibold' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Legal Services
            </Link>
            <Link 
              to="/legal-services#contact" 
              className="bg-primary text-primary-foreground font-paragraph px-6 py-3 transition-all hover:bg-primary/90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
