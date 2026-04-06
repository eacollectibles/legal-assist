import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, DollarSign, ArrowRight } from 'lucide-react';
import PrimaryCTA from '@/components/PrimaryCTA';

interface ConversionStripProps {
  outcome?: string;
  timeline?: string;
  pricing?: string;
  className?: string;
}

export default function ConversionStrip({
  outcome = "Professional representation focused on achieving strong outcomes",
  timeline = "Clear timelines and proactive case management",
  pricing = "Transparent fees discussed upfront — no hidden costs",
  className = ""
}: ConversionStripProps) {
  return (
    <section className={`w-full py-12 md:py-16 bg-matte ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Outcome */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-gold/15 rounded-xl flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-gold" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white font-bold mb-1">Results-Focused</h3>
              <p className="font-paragraph text-sm text-white/60 leading-relaxed">{outcome}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-gold/15 rounded-xl flex-shrink-0">
              <Clock className="w-6 h-6 text-gold" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white font-bold mb-1">Clear Timeline</h3>
              <p className="font-paragraph text-sm text-white/60 leading-relaxed">{timeline}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-gold/15 rounded-xl flex-shrink-0">
              <DollarSign className="w-6 h-6 text-gold" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white font-bold mb-1">Transparent Fees</h3>
              <p className="font-paragraph text-sm text-white/60 leading-relaxed">{pricing}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <PrimaryCTA variant="footer" size="lg" />
          <Link
            to="/services"
            className="min-h-[52px] px-8 py-4 text-base border-2 border-white/20 text-white font-paragraph font-semibold rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors focus-ring"
          >
            View All Services
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
