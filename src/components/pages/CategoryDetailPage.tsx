import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Scale, FileText, AlertCircle, Clock, DollarSign, ListChecks, XCircle, HelpCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';
import { motion } from 'framer-motion';

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<LegalServiceCategories | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCategory(id);
    }
  }, [id]);

  useEffect(() => {
    if (category) {
      // Update document title and meta tags for SEO
      const pageTitle = `${category.categoryName} - Legal Services in Ontario | LegalAssist`;
      document.title = pageTitle;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      const descriptionContent = `${category.shortDescription || category.categoryName} - Professional legal representation in Ontario. ${category.relevantTribunal ? `Tribunal: ${category.relevantTribunal}` : ''}`;
      if (metaDescription) {
        metaDescription.setAttribute('content', descriptionContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = descriptionContent;
        document.head.appendChild(meta);
      }

      // Add keywords meta tag
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const keywordsContent = `${category.categoryName}, legal services Ontario, paralegal, ${category.relevantTribunal || 'legal representation'}`;
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywordsContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywordsContent;
        document.head.appendChild(meta);
      }

      // Add Open Graph tags for social sharing
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', pageTitle);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = pageTitle;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', descriptionContent);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = descriptionContent;
        document.head.appendChild(meta);
      }

      // Add canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `${window.location.origin}/legal-services/${id}`);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = `${window.location.origin}/legal-services/${id}`;
        document.head.appendChild(link);
      }
    }
  }, [category, id]);

  useEffect(() => {
    if (category) {
      // Add JSON-LD structured data for search engines
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: category.categoryName,
        description: category.shortDescription || category.detailedDescription,
        areaServed: 'Ontario',
        ...(category.relevantTribunal && { jurisdiction: category.relevantTribunal }),
        serviceType: 'Legal Services',
        provider: {
          '@type': 'LocalBusiness',
          name: 'LegalAssist',
          description: 'Professional legal services and paralegal representation',
        },
        offers: {
          '@type': 'Offer',
          availability: category.isCurrentlyOffered ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      });
      document.head.appendChild(schemaScript);

      return () => {
        document.head.removeChild(schemaScript);
      };
    }
  }, [category]);

  const loadCategory = async (categoryId: string) => {
    try {
      const item = await BaseCrudService.getById<LegalServiceCategories>('legalservicecategories', categoryId);
      setCategory(item);
    } catch (error) {
      console.error('Error loading category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-20 text-center">
          <p className="font-paragraph text-lg text-secondary/60">Loading practice area details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-20 text-center">
          <h1 className="font-heading text-4xl text-secondary mb-6">Practice Area Not Found</h1>
          <Link 
            to="/legal-services"
            className="inline-flex items-center gap-2 text-primary font-paragraph hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[400px] flex items-center" aria-label={`${category.categoryName} legal service details`}>
        {category.categoryImage && (
          <>
            <div className="absolute inset-0">
              <Image 
                src={category.categoryImage}
                alt={`${category.categoryName} - Professional legal services in Ontario`}
                className="w-full h-full object-cover"
                width={1920}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-secondary/30" />
            </div>
          </>
        )}
        
        <div className="relative z-10 px-6 lg:px-12 py-16 w-full">
          <div className="max-w-4xl">
            <Link 
              to="/legal-services"
              className="inline-flex items-center gap-2 text-primary-foreground font-paragraph mb-6 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Services
            </Link>
            
            <div className="bg-background/95 p-8 lg:p-12">
              {category.isCurrentlyOffered !== undefined && (
                <Badge 
                  className={`font-paragraph mb-4 ${
                    category.isCurrentlyOffered
                      ? 'bg-pastelgreen text-secondary'
                      : 'bg-pastelpeach text-secondary'
                  }`}
                >
                  {category.isCurrentlyOffered ? 'Available Now' : 'Coming Soon'}
                </Badge>
              )}
              
              <h1 className="font-heading text-5xl lg:text-6xl text-secondary mb-4">
                {category.categoryName}
              </h1>
              
              {category.relevantTribunal && (
                <div className="flex items-center gap-2 text-primary mb-6">
                  <Scale className="w-5 h-5" />
                  <p className="font-paragraph text-lg uppercase tracking-wider">
                    {category.relevantTribunal}
                  </p>
                </div>
              )}
              
              {category.shortDescription && (
                <p className="font-paragraph text-xl text-secondary/80 leading-relaxed">
                  {category.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section - LSO Compliance */}
      {category.disclaimers && (
        <section className="py-16 bg-pastelpeach/20" aria-label="Legal disclaimers and scope of practice">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <AlertCircle className="w-8 h-8 text-primary" />
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary">
                  Important Disclaimer
                </h2>
              </div>
              
              <div className="bg-white border-l-4 border-primary p-8 lg:p-12">
                <p className="font-paragraph text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
                  {category.disclaimers}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Included & Excluded Section */}
      {(category.servicesIncluded || category.servicesExcluded) && (
        <section className="py-16 bg-background" aria-label="Services included and excluded">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl lg:text-4xl text-secondary mb-12 text-center">
                Service Scope
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Services Included */}
                {category.servicesIncluded && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <ListChecks className="w-8 h-8 text-pastelgreen" />
                      <h3 className="font-heading text-2xl text-secondary">
                        What's Included
                      </h3>
                    </div>
                    <div className="bg-pastelgreen/20 p-6 lg:p-8">
                      <ul className="space-y-3">
                        {category.servicesIncluded.split('\n').filter(item => item.trim()).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pastelgreen flex-shrink-0 mt-1" />
                            <span className="font-paragraph text-secondary/80">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Services Excluded */}
                {category.servicesExcluded && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <XCircle className="w-8 h-8 text-pastelpeach" />
                      <h3 className="font-heading text-2xl text-secondary">
                        What's Not Included
                      </h3>
                    </div>
                    <div className="bg-pastelpeach/20 p-6 lg:p-8">
                      <ul className="space-y-3">
                        {category.servicesExcluded.split('\n').filter(item => item.trim()).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-pastelpeach flex-shrink-0 mt-1" />
                            <span className="font-paragraph text-secondary/80">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Description Section */}
      {category.detailedDescription && (
        <section className="py-16 bg-pastelbeige" aria-label="Detailed service description">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-8 h-8 text-primary" />
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary">
                  Overview
                </h2>
              </div>
              
              <div className="bg-background p-8 lg:p-12">
                <p className="font-paragraph text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
                  {category.detailedDescription}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Steps Section */}
      {category.processSteps && (
        <section className="py-20 bg-gradient-to-b from-background to-pastelbeige/30" aria-label="Service process and steps">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary mb-4">
                  Our Process
                </h2>
                <p className="font-paragraph text-lg text-secondary/60">
                  Follow these steps to understand how we handle your case
                </p>
              </div>
              
              <div className="relative">
                {/* Vertical line connector */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-primary/30" style={{ top: '2rem' }} />
                
                <div className="space-y-8 lg:space-y-12">
                  {category.processSteps.split('\n').filter(step => step.trim()).map((step, idx, arr) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex gap-6 lg:gap-12 items-start ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0 flex justify-center lg:flex-1">
                        <div className="relative">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-heading font-bold text-xl shadow-lg">
                            {idx + 1}
                          </div>
                          {idx < arr.length - 1 && (
                            <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-primary to-primary/30" />
                          )}
                        </div>
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1 lg:flex-1">
                        <div className="bg-white border-l-4 border-primary p-6 lg:p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <p className="font-paragraph text-lg text-secondary/80 leading-relaxed">{step.trim()}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline & Cost Section */}
      {(category.estimatedTimeline || category.costStructure) && (
        <section className="py-16 bg-background" aria-label="Timeline and cost information">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl lg:text-4xl text-secondary mb-12 text-center">
                Timeline & Costs
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Timeline */}
                {category.estimatedTimeline && (
                  <div className="bg-pastelbeige p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="w-8 h-8 text-primary" />
                      <h3 className="font-heading text-2xl text-secondary">
                        Estimated Timeline
                      </h3>
                    </div>
                    <p className="font-paragraph text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
                      {category.estimatedTimeline}
                    </p>
                  </div>
                )}

                {/* Cost Structure */}
                {category.costStructure && (
                  <div className="bg-pastelgreen/20 p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <DollarSign className="w-8 h-8 text-primary" />
                      <h3 className="font-heading text-2xl text-secondary">
                        Cost Structure
                      </h3>
                    </div>
                    <p className="font-paragraph text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
                      {category.costStructure}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {category.faqs && (
        <section className="py-20 bg-gradient-to-b from-pastelbeige to-background" aria-label="Frequently asked questions">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <HelpCircle className="w-8 h-8 text-primary" />
                  <h2 className="font-heading text-3xl lg:text-4xl text-secondary">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="font-paragraph text-lg text-secondary/60">
                  Find answers to common questions about this service
                </p>
              </div>
              
              <div className="space-y-3">
                {category.faqs.split('\n\n').filter(faq => faq.trim()).map((faqItem, idx) => {
                  const lines = faqItem.split('\n').filter(line => line.trim());
                  const question = lines[0];
                  const answer = lines.slice(1).join('\n');
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <AccordionItem value={`faq-${idx}`} className="border border-secondary/10 rounded-lg overflow-hidden bg-white hover:border-primary/20 transition-colors">
                        <AccordionTrigger className="font-heading text-lg text-secondary hover:text-primary py-5 px-6 transition-colors">
                          <span className="flex items-center gap-3">
                            <span className="text-primary font-bold">Q:</span>
                            {question?.trim()}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="font-paragraph text-secondary/80 pb-6 px-6 pt-2 border-t border-secondary/10">
                          <div className="flex gap-3">
                            <span className="text-primary font-bold flex-shrink-0">A:</span>
                            <p className="leading-relaxed">{answer?.trim()}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How We Can Help Section */}
      <section className="py-16 bg-pastellavender/30" aria-label="How LegalAssist can help with your case">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary mb-8">
              How LegalAssist Can Help
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-background p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-heading font-bold text-xl">1</span>
                </div>
                <h3 className="font-heading text-xl text-secondary mb-3">Initial Consultation</h3>
                <p className="font-paragraph text-secondary/80">
                  We'll review your case details and explain your legal options clearly.
                </p>
              </div>
              
              <div className="bg-background p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-heading font-bold text-xl">2</span>
                </div>
                <h3 className="font-heading text-xl text-secondary mb-3">Strategy Development</h3>
                <p className="font-paragraph text-secondary/80">
                  Our paralegals create a tailored approach to achieve the best outcome.
                </p>
              </div>
              
              <div className="bg-background p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-heading font-bold text-xl">3</span>
                </div>
                <h3 className="font-heading text-xl text-secondary mb-3">Professional Representation</h3>
                <p className="font-paragraph text-secondary/80">
                  We handle all proceedings and paperwork on your behalf with expertise.
                </p>
              </div>
            </div>
            
            {category.isCurrentlyOffered && (
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph px-8 py-4 text-lg transition-all hover:bg-primary/90"
              >
                Get Started Today
              </a>
            )}
            
            {!category.isCurrentlyOffered && (
              <div className="bg-pastelpeach/50 p-6 inline-block">
                <p className="font-paragraph text-secondary/80">
                  This service is coming soon. Contact us to learn more about our timeline and how we can assist you.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Information */}
      <section className="py-16 bg-background" aria-label="Important information about our legal services">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary mb-8 text-center">
              Important Information
            </h2>
            
            <div className="bg-pastelbeige p-8 lg:p-12">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="font-paragraph text-secondary/80 leading-relaxed">
                    All our paralegals are licensed and regulated by the Law Society of Ontario, ensuring professional standards and ethical conduct.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="font-paragraph text-secondary/80 leading-relaxed">
                    We provide transparent pricing with no hidden fees, so you know exactly what to expect from the start.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="font-paragraph text-secondary/80 leading-relaxed">
                    Your information is kept strictly confidential under professional privilege and privacy regulations.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="font-paragraph text-secondary/80 leading-relaxed">
                    We offer flexible consultation options including in-person, phone, and video meetings to accommodate your schedule.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground" aria-label="Call to action for legal consultation">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl mb-6">
            Ready to Move Forward?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Contact LegalAssist today to discuss your {category.categoryName?.toLowerCase()} matter. Our experienced paralegals are ready to provide the guidance and representation you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="tel:4165550123"
              className="bg-primary text-primary-foreground font-paragraph px-8 py-4 text-lg transition-all hover:bg-primary/90"
            >
              Call (416) 555-0123
            </a>
            <a 
              href="mailto:info@legalassist.ca"
              className="bg-background text-secondary font-paragraph px-8 py-4 text-lg transition-all hover:bg-background/90"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
