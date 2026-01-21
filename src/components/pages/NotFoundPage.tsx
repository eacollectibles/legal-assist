import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found | LegalAssist';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'The page you are looking for could not be found. Browse our legal services or contact us for assistance.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="font-heading text-9xl md:text-[12rem] font-bold text-primary opacity-20">
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-md mx-auto">
              We couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph font-semibold"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 font-paragraph font-semibold"
            >
              <Link to="/services">
                <Search className="w-5 h-5 mr-2" />
                Browse Services
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <p className="font-paragraph text-sm text-foreground/60 mb-4">
              Looking for something specific? Try these popular pages:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/services/small-claims"
                className="font-paragraph text-sm text-primary hover:underline"
              >
                Small Claims Court
              </Link>
              <span className="text-foreground/30">•</span>
              <Link
                to="/services/landlord-tenant"
                className="font-paragraph text-sm text-primary hover:underline"
              >
                Landlord Tenant Board
              </Link>
              <span className="text-foreground/30">•</span>
              <Link
                to="/services/traffic-tickets"
                className="font-paragraph text-sm text-primary hover:underline"
              >
                Traffic Tickets
              </Link>
              <span className="text-foreground/30">•</span>
              <Link
                to="/contact"
                className="font-paragraph text-sm text-primary hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
