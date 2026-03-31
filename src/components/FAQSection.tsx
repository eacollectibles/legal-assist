import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { getSEOConfig, FAQ } from '@/components/seoConfig';

/**
 * FAQ Section Component
 * 
 * Displays FAQs from seoConfig in an accordion format.
 * Schema.org markup is handled by AutoSEO component.
 * 
 * Usage (auto-loads from seoConfig):
 * <FAQSection />
 * 
 * Usage (custom FAQs):
 * <FAQSection faqs={[{ question: '...', answer: '...' }]} />
 */

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  className?: string;
}

export function FAQSection({ 
  faqs: customFaqs, 
  title = 'Frequently Asked Questions',
  className = ''
}: FAQSectionProps) {
  const location = useLocation();
  const seo = getSEOConfig(location.pathname);
  
  // Use custom FAQs or pull from seoConfig
  const faqs = customFaqs || seo.faqs;
  
  // Track which FAQs are expanded
  const [expanded, setExpanded] = useState<number[]>([0]); // First one open by default
  
  // Don't render if no FAQs
  if (!faqs || faqs.length === 0) {
    return null;
  }
  
  const toggleFaq = (index: number) => {
    setExpanded(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          {title}
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expanded.includes(index);
            
            return (
              <div 
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-white"
              >
                {/* Question - clickable header */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-foreground/60 flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Answer - expandable content */}
                <div 
                  className={`overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="font-paragraph text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
