import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, DollarSign } from 'lucide-react';
import PrimaryCTA from '@/components/PrimaryCTA';

interface ConversionStripProps {
  outcome?: string;
  timeline?: string;
  pricing?: string;
  className?: string;
}

export default function ConversionStrip({
  outcome = "Expert representation & favorable outcomes",
  timeline = "Quick resolution with clear timelines",
  pricing = "Transparent fees with no hidden costs",
  className = ""
}: ConversionStripProps) {
  return (
    <section className={`w-full py-12 md:py-16 bg-gradient-to-r from-secondary to-secondary/95 ${className}`}>
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Outcome */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/20 rounded-full flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white mb-1">Proven Outcomes</h3>
              <p className="font-paragraph text-sm text-white/80">{outcome}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/20 rounded-full flex-shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white mb-1">Clear Timeline</h3>
              <p className="font-paragraph text-sm text-white/80">{timeline}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/20 rounded-full flex-shrink-0">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-white mb-1">Transparent Fees</h3>
              <p className="font-paragraph text-sm text-white/80">{pricing}</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <PrimaryCTA variant="button" size="lg" />
          <Link 
            to="/services"
            className="btn-shine btn-lift border border-white/30 text-white font-paragraph px-8 py-4 text-base rounded-lg inline-block text-center hover:bg-white/10 transition-colors"
          >
            See Services
          </Link>
        </div>
      </div>
    </section>
  );
}
