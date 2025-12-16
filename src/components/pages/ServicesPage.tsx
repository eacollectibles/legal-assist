import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<LegalServiceCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    // SEO Meta Tags
    document.title = 'Legal Services | Licensed Paralegal Services in Ontario | LegalAssist';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse all legal services offered by our licensed paralegals in Ontario. Expert representation across all practice areas.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Browse all legal services offered by our licensed paralegals in Ontario. Expert representation across all practice areas.';
      document.head.appendChild(meta);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}/services`);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}/services`;
      document.head.appendChild(link);
    }
  }, []);

  const loadServices = async () => {
    try {
      const { items } = await BaseCrudService.getAll<LegalServiceCategories>('legalservicecategories');
      setServices(items.filter(service => service.isCurrentlyOffered !== false));
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter services based on search
  const filteredServices = services.filter(service =>
    (service.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     service.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                Expert paralegal representation across all practice areas authorized in Ontario.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="w-full py-12 md:py-16 bg-background border-b border-secondary/10">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary/50" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-base border-secondary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            {isLoading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="font-paragraph text-lg text-gray-600">Loading services...</p>
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group h-full"
                  >
                    <Link to={`/legal-services/${service._id}`} className="h-full block">
                      <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col">
                        {/* Image */}
                        {service.categoryImage && (
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <Image
                              src={service.categoryImage}
                              alt={`${service.categoryName} - Professional legal services`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Badge */}
                          {service.relevantTribunal && (
                            <Badge className="w-fit mb-3 bg-primary/10 text-primary font-paragraph text-xs">
                              {service.relevantTribunal}
                            </Badge>
                          )}

                          {/* Title */}
                          <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {service.categoryName}
                          </h3>

                          {/* Description */}
                          <p className="font-paragraph text-sm text-secondary/70 mb-6 flex-grow line-clamp-3">
                            {service.shortDescription}
                          </p>

                          {/* Learn More Link */}
                          <div className="flex items-center gap-2 text-primary font-paragraph font-semibold group-hover:gap-3 transition-all">
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-gray-600 mb-6">
                  No services found matching "{searchTerm}". Try a different search term.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
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
              <a
                href="tel:4165550123"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
