import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';
import { motion } from 'framer-motion';

export default function LegalServicesPage() {
  const [categories, setCategories] = useState<LegalServiceCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    // SEO Meta Tags
    document.title = 'Legal Services in Ontario | Licensed Paralegal Services | LegalAssist';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive legal services in Ontario. Licensed paralegals providing professional representation across multiple practice areas.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore our comprehensive legal services in Ontario. Licensed paralegals providing professional representation across multiple practice areas.';
      document.head.appendChild(meta);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}/legal-services`);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}/legal-services`;
      document.head.appendChild(link);
    }
  }, []);

  const loadCategories = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { items } = await BaseCrudService.getAll<LegalServiceCategories>('legalservicecategories');
      
      if (!items || items.length === 0) {
        setError('No legal services available at the moment.');
        setCategories([]);
      } else {
        setCategories(items);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load legal services. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary via-primary to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Our Legal Services
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Comprehensive legal representation across multiple practice areas. Expert paralegal services for your needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="font-paragraph text-lg text-foreground">Loading legal services...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <Alert variant="destructive" className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Services Grid */}
            {!isLoading && categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/legal-services/${category._id}`} className="group h-full">
                      <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col">
                        {/* Image Container */}
                        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                          {category.categoryImage ? (
                            <Image
                              src={category.categoryImage}
                              alt={category.categoryName || 'Legal Service'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                              height={224}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-pastellavender to-pastelbeige flex items-center justify-center">
                              <span className="text-gray-400 font-paragraph">No image available</span>
                            </div>
                          )}
                          
                          {/* Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge
                              variant={category.isCurrentlyOffered ? 'default' : 'secondary'}
                              className={`${
                                category.isCurrentlyOffered
                                  ? 'bg-green-500 text-white hover:bg-green-600'
                                  : 'bg-gray-400 text-white hover:bg-gray-500'
                              }`}
                            >
                              {category.isCurrentlyOffered ? 'Available Now' : 'Coming Soon'}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col">
                          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {category.categoryName}
                          </h3>
                          
                          <p className="font-paragraph text-sm md:text-base text-gray-600 mb-4 flex-1">
                            {category.shortDescription}
                          </p>

                          {category.relevantTribunal && (
                            <div className="mb-4 pb-4 border-t border-gray-100">
                              <p className="font-paragraph text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Tribunal/Court
                              </p>
                              <p className="font-paragraph text-sm text-foreground font-medium">
                                {category.relevantTribunal}
                              </p>
                            </div>
                          )}

                          {/* CTA Button */}
                          <div className="flex items-center text-primary font-paragraph font-semibold text-sm group-hover:gap-2 transition-all">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && categories.length === 0 && !error && (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-gray-600 mb-6">
                  No legal services available at the moment.
                </p>
                <Button
                  onClick={loadCategories}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {categories.length > 0 && (
          <section className="w-full bg-secondary/5 py-16 md:py-20">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Need Legal Assistance?
                </h2>
                <p className="font-paragraph text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Contact us today to discuss your legal needs with our experienced paralegal team.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Get in Touch
                </Button>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
