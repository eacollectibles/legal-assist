import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';

export default function LegalServicesPage() {
  const [categories, setCategories] = useState<LegalServiceCategories[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<LegalServiceCategories[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOffered, setFilterOffered] = useState<'all' | 'offered' | 'not-offered'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categories, searchTerm, filterOffered]);

  const loadCategories = async () => {
    try {
      const { items } = await BaseCrudService.getAll<LegalServiceCategories>('legalservicecategories');
      setCategories(items);
      setFilteredCategories(items);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...categories];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(cat => 
        cat.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.relevantTribunal?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply offered filter
    if (filterOffered === 'offered') {
      filtered = filtered.filter(cat => cat.isCurrentlyOffered === true);
    } else if (filterOffered === 'not-offered') {
      filtered = filtered.filter(cat => cat.isCurrentlyOffered === false);
    }

    setFilteredCategories(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image 
            src="https://static.wixstatic.com/media/99571b_822cd0681dda4e6cacacddc2ec6e1f59~mv2.png?originWidth=1920&originHeight=448"
            alt="Legal services and representation"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-secondary/20" />
        </div>
        
        <div className="relative z-10 px-6 lg:px-12 py-16 max-w-3xl">
          <div className="bg-background/95 p-8 lg:p-12">
            <h1 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              Our Legal Practice Areas
            </h1>
            <p className="font-paragraph text-lg text-secondary/80 leading-relaxed">
              Discover the full range of legal services our licensed paralegals provide across Ontario. Each practice area represents our commitment to accessible, professional legal representation.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-pastelbeige py-8">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary/40" />
                <Input
                  type="text"
                  placeholder="Search practice areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 font-paragraph bg-background border-secondary/20 focus:border-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-secondary" />
              <div className="flex gap-3">
                <button
                  onClick={() => setFilterOffered('all')}
                  className={`font-paragraph px-6 py-2 transition-all ${
                    filterOffered === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-secondary hover:bg-background/80'
                  }`}
                >
                  All Services
                </button>
                <button
                  onClick={() => setFilterOffered('offered')}
                  className={`font-paragraph px-6 py-2 transition-all ${
                    filterOffered === 'offered'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-secondary hover:bg-background/80'
                  }`}
                >
                  Currently Offered
                </button>
                <button
                  onClick={() => setFilterOffered('not-offered')}
                  className={`font-paragraph px-6 py-2 transition-all ${
                    filterOffered === 'not-offered'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-secondary hover:bg-background/80'
                  }`}
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="font-paragraph text-secondary/70">
              Showing {filteredCategories.length} of {categories.length} practice areas
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary/60">Loading practice areas...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary/60">No practice areas found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/legal-services/${category._id}`}
                  className="group bg-background border border-secondary/10 hover:border-primary transition-all overflow-hidden"
                >
                  {category.categoryImage && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={category.categoryImage}
                        alt={category.categoryName || 'Legal service category'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={600}
                      />
                      {category.isCurrentlyOffered !== undefined && (
                        <div className="absolute top-4 right-4">
                          <Badge 
                            className={`font-paragraph ${
                              category.isCurrentlyOffered
                                ? 'bg-pastelgreen text-secondary'
                                : 'bg-pastelpeach text-secondary'
                            }`}
                          >
                            {category.isCurrentlyOffered ? 'Available Now' : 'Coming Soon'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:text-primary transition-colors">
                      {category.categoryName}
                    </h3>
                    
                    {category.relevantTribunal && (
                      <p className="font-paragraph text-sm text-primary mb-3 uppercase tracking-wider">
                        {category.relevantTribunal}
                      </p>
                    )}
                    
                    <p className="font-paragraph text-secondary/80 leading-relaxed mb-4">
                      {category.shortDescription}
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary font-paragraph font-semibold group-hover:gap-4 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pastelgreen/30">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl text-secondary mb-6">
            Need Help Choosing the Right Service?
          </h2>
          <p className="font-paragraph text-lg text-secondary/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Our experienced paralegals are here to guide you. Contact us for a free consultation to discuss your legal needs and find the best solution.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph px-8 py-4 text-lg transition-all hover:bg-primary/90"
          >
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
