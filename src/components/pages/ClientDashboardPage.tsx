import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser, isAuthenticated } from '@/lib/auth-service';

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/client-login');
    }
  }, [navigate]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <p className="font-paragraph text-foreground/80">Redirecting to login...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Welcome, {currentUser.firstName || currentUser.email}
          </h1>
          <p className="font-paragraph text-foreground/80 mb-8">
            Your client dashboard is being updated. Please check back soon.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

