import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';
import { motion } from 'framer-motion';

export default function LegalServicesPage() {
  const [categories, setCategories] = useState<LegalServiceCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { items } = await BaseCrudService.getAll<LegalServiceCategories>('legalservicecategories');
      setCategories(items);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://static.wixstatic.com/media/99571b_037d480b44144f5eab86c4809b0ad38f~mv2.png?originWidth=1920&originHeight=576"
            alt="Legal services and representation"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/40 to-transparent" />
        </div>
        
        <motion.div 
          className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl bg-background/95 backdrop-blur-sm p-6 sm:p-8 lg:p-12 border border-primary/10">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-secondary mb-4 sm:mb-6 leading-tight">
              Our Legal Practice Areas
            </h1>
            <p className="font-paragraph text-base sm:text-lg text-secondary/80 leading-relaxed">
              Discover the full range of legal services our licensed paralegals provide across Ontario. Each practice area represents our commitment to accessible, professional legal representation.
            </p>
          </div>
        </motion.div>
      </section>



      {/* Categories Grid - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
          {isLoading ? (
            <motion.div 
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
              </div>
              <p className="font-paragraph text-base sm:text-lg text-secondary/60">Loading practice areas...</p>
            </motion.div>
          ) : categories.length === 0 ? (
            <motion.div 
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-paragraph text-base sm:text-lg text-secondary/60 mb-4">
                No practice areas available at this time.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category) => (
                <motion.div key={category._id} variants={itemVariants}>
                  <Link
                    to={`/legal-services/${category._id}`}
                    className="group h-full flex flex-col bg-background border-2 border-secondary/10 hover:border-primary rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-95"
                  >
                    {category.categoryImage && (
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-secondary/5">
                        <Image
                          src={category.categoryImage}
                          alt={category.categoryName || 'Legal service category'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={600}
                        />
                        {category.isCurrentlyOffered !== undefined && (
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                            <Badge 
                              className={`font-paragraph text-xs sm:text-sm px-3 py-1 sm:py-2 ${
                                category.isCurrentlyOffered
                                  ? 'bg-pastelgreen text-secondary'
                                  : 'bg-pastelpeach text-secondary'
                              }`}
                            >
                              {category.isCurrentlyOffered ? 'Available' : 'Coming Soon'}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1 p-4 sm:p-6 flex flex-col">
                      <h3 className="font-heading text-xl sm:text-2xl text-secondary mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {category.categoryName}
                      </h3>
                      
                      {category.relevantTribunal && (
                        <p className="font-paragraph text-xs sm:text-sm text-primary mb-2 sm:mb-3 uppercase tracking-wider">
                          {category.relevantTribunal}
                        </p>
                      )}
                      
                      <p className="font-paragraph text-sm sm:text-base text-secondary/80 leading-relaxed mb-4 sm:mb-6 flex-1 line-clamp-3">
                        {category.shortDescription}
                      </p>
                      
                      <div className="flex items-center gap-2 text-primary font-paragraph font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                        Learn More
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-pastelgreen/40 via-pastellavender/40 to-pastelpeach/40">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <motion.div 
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-2">
                {categories.length}+
              </p>
              <p className="font-paragraph text-sm sm:text-base text-secondary/80">Practice Areas</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-2">
                {categories.filter(c => c.isCurrentlyOffered).length}+
              </p>
              <p className="font-paragraph text-sm sm:text-base text-secondary/80">Available Now</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-2">
                Ontario
              </p>
              <p className="font-paragraph text-sm sm:text-base text-secondary/80">Wide Coverage</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-pastelgreen/30 to-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-secondary mb-4 sm:mb-6 leading-tight">
              Need Help Choosing the Right Service?
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-secondary/80 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              Our experienced paralegals are here to guide you. Contact us for a free consultation to discuss your legal needs and find the best solution.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all hover:bg-primary/90 active:scale-95 w-full sm:w-auto"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
