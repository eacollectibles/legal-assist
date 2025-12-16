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

// Legal Services List - Non-categorized
const LEGAL_SERVICES_LIST = [
  'Provincial Human Rights',
  'Uncontested Divorce Filings',
  'Simple Motion to Change Orders',
  'Enforcement of Support Orders',
  'Small Claims Court Matters (up to $50,000)',
  'Landlord and Tenant Disputes',
  'Provincial Offences Act Matters',
  'WSIB Claims and Appeals',
  'Criminal Summary Conviction Matters',
  'Administrative Tribunals and Boards',
  'Federal Human Rights',
  'Immigration Appeals',
  'Municipal by-law infractions',
  'Debt Collections',
  'Employment Standards Act',
  'Accident Benefits Claims',
  'License Appeal Tribunal',
  'Notary Public',
  'Commissioner of Oaths'
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter services based on search
  const filteredServices = LEGAL_SERVICES_LIST.filter(service =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
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
            {/* Services Grid */}
            <div className="space-y-4">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                        {service}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="font-paragraph text-lg text-gray-600 mb-6">
                    No services found matching "{searchTerm}". Try a different search term.
                  </p>
                </div>
              )}
            </div>
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
