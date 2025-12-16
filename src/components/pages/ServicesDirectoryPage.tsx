import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, Loader2, Search } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';
import { motion } from 'framer-motion';

// Service categories for organization
const SERVICE_CATEGORIES = {
  traffic: {
    name: 'Traffic & Motor Vehicle',
    description: 'Representation for traffic violations and motor vehicle matters',
    color: 'bg-pastelpeach'
  },
  smallClaims: {
    name: 'Small Claims Court',
    description: 'Claims up to $50,000 in Small Claims Court',
    color: 'bg-pastelgreen'
  },
  landlordTenant: {
    name: 'Landlord & Tenant',
    description: 'Residential tenancy disputes and evictions',
    color: 'bg-pastellavender'
  },
  provincial: {
    name: 'Provincial Offences',
    description: 'Provincial offence tickets and hearings',
    color: 'bg-pastelbeige'
  }
};

export default function ServicesDirectoryPage() {
  const [services, setServices] = useState<LegalServiceCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    // SEO Meta Tags
    document.title = 'Legal Services Directory | Licensed Paralegal Services | LegalAssist';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our complete directory of legal services. Find the paralegal representation you need across Ontario.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Browse our complete directory of legal services. Find the paralegal representation you need across Ontario.';
      document.head.appendChild(meta);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}/services-directory`);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}/services-directory`;
      document.head.appendChild(link);
    }
  }, []);

  const loadServices = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { items } = await BaseCrudService.getAll<LegalServiceCategories>('legalservicecategories');
      
      if (!items || items.length === 0) {
        setError('No legal services available at the moment.');
        setServices([]);
      } else {
        setServices(items);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load legal services. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Categorize services
  const categorizedServices = Object.entries(SERVICE_CATEGORIES).reduce((acc, [key, category]) => {
    acc[key] = {
      ...category,
      services: services.filter(service => {
        const name = service.categoryName?.toLowerCase() || '';
        
        // Categorization logic
        if (key === 'traffic') {
          return name.includes('traffic') || name.includes('motor vehicle') || name.includes('driving');
        }
        if (key === 'smallClaims') {
          return name.includes('small claims') || name.includes('debt collection');
        }
        if (key === 'landlordTenant') {
          return name.includes('landlord') || name.includes('tenant') || name.includes('eviction') || name.includes('residential');
        }
        if (key === 'provincial') {
          return name.includes('provincial') || name.includes('offence') || name.includes('bylaw');
        }
        return false;
      })
    };
    return acc;
  }, {} as Record<string, any>);

  // Filter services based on search
  const filteredCategories = Object.entries(categorizedServices).reduce((acc, [key, category]) => {
    const filtered = category.services.filter(service =>
      service.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filtered.length > 0) {
      acc[key] = { ...category, services: filtered };
    }
    return acc;
  }, {} as Record<string, any>);

  const hasResults = Object.values(filteredCategories).some((cat: any) => cat.services.length > 0);

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
                Services Directory
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Browse our complete range of legal services. Find the representation you need.
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
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="font-paragraph text-lg text-foreground">Loading legal services...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-foreground">{error}</p>
              </div>
            )}

            {/* Services by Category */}
            {!isLoading && hasResults && (
              <div className="space-y-16">
                {Object.entries(filteredCategories).map(([key, category]: [string, any], categoryIndex) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    {/* Category Header */}
                    <div className="mb-8">
                      <div className={`inline-block ${category.color} px-4 py-2 rounded-lg mb-4`}>
                        <h2 className="font-heading text-2xl md:text-3xl text-secondary font-bold">
                          {category.name}
                        </h2>
                      </div>
                      <p className="font-paragraph text-lg text-secondary/70">
                        {category.description}
                      </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.services.map((service: LegalServiceCategories, index: number) => (
                        <motion.div
                          key={service._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                          <Link to={`/legal-services/${service._id}`} className="group h-full">
                            <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col">
                              {/* Image Container */}
                              <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                                {service.categoryImage ? (
                                  <Image
                                    src={service.categoryImage}
                                    alt={service.categoryName || 'Legal Service'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    width={400}
                                    height={224}
                                  />
                                ) : (
                                  <div className={`w-full h-full ${category.color} flex items-center justify-center`}>
                                    <span className="text-gray-400 font-paragraph">No image available</span>
                                  </div>
                                )}
                                
                                {/* Badge */}
                                <div className="absolute top-4 right-4">
                                  <Badge
                                    variant={service.isCurrentlyOffered ? 'default' : 'secondary'}
                                    className={`${
                                      service.isCurrentlyOffered
                                        ? 'bg-pastelgreen text-secondary hover:bg-pastelgreen/80'
                                        : 'bg-pastelpeach text-secondary hover:bg-pastelpeach/80'
                                    }`}
                                  >
                                    {service.isCurrentlyOffered ? 'Available' : 'Coming Soon'}
                                  </Badge>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 p-6 flex flex-col">
                                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  {service.categoryName}
                                </h3>
                                
                                <p className="font-paragraph text-sm md:text-base text-gray-600 mb-4 flex-1">
                                  {service.shortDescription}
                                </p>

                                {service.relevantTribunal && (
                                  <div className="mb-4 pb-4 border-t border-gray-100">
                                    <p className="font-paragraph text-xs text-gray-500 uppercase tracking-wide mb-1">
                                      Tribunal/Court
                                    </p>
                                    <p className="font-paragraph text-sm text-foreground font-medium">
                                      {service.relevantTribunal}
                                    </p>
                                  </div>
                                )}

                                {/* CTA */}
                                <div className="flex items-center text-primary font-paragraph font-semibold text-sm group-hover:gap-2 transition-all">
                                  Learn More
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results State */}
            {!isLoading && !hasResults && searchTerm && (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-gray-600 mb-6">
                  No services found matching "{searchTerm}". Try a different search term.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && services.length === 0 && !error && (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-gray-600 mb-6">
                  No legal services available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {services.length > 0 && (
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
        )}
      </main>

      <Footer />
    </div>
  );
}
