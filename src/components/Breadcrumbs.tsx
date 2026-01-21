import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getSEOConfig } from './seoConfig';

/**
 * Breadcrumb Component
 * 
 * Displays visual breadcrumb navigation based on seoConfig.
 * Improves UX and helps search engines understand site structure.
 * 
 * Usage:
 * <Breadcrumbs />
 * 
 * Or with custom class:
 * <Breadcrumbs className="mb-4" />
 */

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className = '' }: BreadcrumbsProps) {
  const location = useLocation();
  const seo = getSEOConfig(location.pathname);
  
  // Don't render if no breadcrumbs or only home
  if (!seo.breadcrumbs || seo.breadcrumbs.length <= 1) {
    return null;
  }
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`text-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1">
        {seo.breadcrumbs.map((item, index) => {
          const isLast = index === seo.breadcrumbs!.length - 1;
          const isFirst = index === 0;
          
          return (
            <li key={item.url} className="flex items-center">
              {/* Separator (except for first item) */}
              {!isFirst && (
                <ChevronRight className="w-4 h-4 text-foreground/40 mx-1" />
              )}
              
              {/* Breadcrumb link or text */}
              {isLast ? (
                // Current page - no link, just text
                <span 
                  className="text-foreground/60 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                // Link to parent page
                <Link 
                  to={item.url}
                  className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-1"
                >
                  {isFirst && <Home className="w-3.5 h-3.5" />}
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
