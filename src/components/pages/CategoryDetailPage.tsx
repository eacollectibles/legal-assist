import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Scale, FileText } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LegalServiceCategories } from '@/entities';

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<LegalServiceCategories | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCategory(id);
    }
  }, [id]);

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
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[400px] flex items-center">
        {category.categoryImage && (
          <>
            <div className="absolute inset-0">
              <Image 
                src={category.categoryImage}
                alt={category.categoryName || 'Legal service category'}
                className="w-full h-full object-cover"
                width={1920}
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

      {/* Detailed Description Section */}
      {category.detailedDescription && (
        <section className="py-16 bg-pastelbeige">
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

      {/* Eligibility Criteria Section */}
      {category.eligibilityCriteria && (
        <section className="py-16 bg-background">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary">
                  Eligibility & Requirements
                </h2>
              </div>
              
              <div className="bg-pastelgreen/30 p-8 lg:p-12">
                <p className="font-paragraph text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
                  {category.eligibilityCriteria}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How We Can Help Section */}
      <section className="py-16 bg-pastellavender/30">
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
      <section className="py-16 bg-background">
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
      <section className="py-20 bg-secondary text-secondary-foreground">
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
