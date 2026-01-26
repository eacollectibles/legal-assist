import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import PrimaryCTA from '@/components/PrimaryCTA';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pb-safe">
      {/* Extra padding at bottom for sticky contact bar on mobile */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 pb-32 lg:pb-16">
        {/* Primary CTA Section */}
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-secondary-foreground/20">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-secondary-foreground">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <PrimaryCTA variant="button" size="lg" className="w-full sm:w-auto" />
            <p className="font-paragraph text-secondary-foreground/80 text-center sm:text-left">
              Get a free consultation with our licensed paralegals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg sm:text-xl">LA</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl font-bold">LegalAssist</span>
                <span className="font-paragraph text-xs sm:text-sm text-secondary-foreground/60 font-normal leading-tight">Paralegal Services</span>
              </div>
            </div>
            <p className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 leading-relaxed">
              Professional paralegal services across Ontario, delivering accessible and affordable legal support for individuals and businesses.
            </p>
          </div>
          
          {/* Quick Links Section - 48px touch targets */}
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-0.5" aria-label="Footer navigation">
              <Link 
                to="/" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                About Us
              </Link>
              <Link 
                to="/services" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources Section - NEW */}
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Resources</h3>
            <nav className="flex flex-col gap-0.5" aria-label="Resources navigation">
              <Link 
                to="/resources" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                All Resources
              </Link>
              <Link 
                to="/legal-news" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                Recent Decisions
              </Link>
              <Link 
                to="/guides/ontario-tenant-rights" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                Tenant Rights Guide
              </Link>
              <Link 
                to="/guides/small-claims-court-process" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                Small Claims Guide
              </Link>
              <Link 
                to="/guides/what-is-a-paralegal" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground active:text-primary hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors min-h-[48px] flex items-center px-3 -mx-3 rounded-lg focus-ring"
              >
                What Is a Paralegal?
              </Link>
            </nav>
          </div>
          
          {/* Contact Information Section - 48px touch targets */}
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact</h3>
            <div className="flex flex-col gap-0.5">
              {/* Address - not clickable but styled consistently */}
              <div className="flex items-start gap-3 min-h-[48px] py-2 px-3 -mx-3 rounded-lg">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80">
                  P.O Box 1000<br />London, Ontario, N6A 2L1
                </span>
              </div>
              
              {/* Phone - clickable with proper touch target */}
              <a 
                href={PHONE_HREF} 
                className="flex items-center gap-3 min-h-[48px] py-2 px-3 -mx-3 rounded-lg hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors group focus-ring"
                aria-label={`Call us at ${PHONE_DISPLAY}`}
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 group-hover:text-primary-foreground group-active:text-primary transition-colors">
                  {PHONE_DISPLAY}
                </span>
              </a>
              
              {/* Email - clickable with proper touch target */}
              <a 
                href="mailto:info@legalassist.london" 
                className="flex items-center gap-3 min-h-[48px] py-2 px-3 -mx-3 rounded-lg hover:bg-secondary-foreground/10 active:bg-secondary-foreground/15 transition-colors group focus-ring"
                aria-label="Email us at info@legalassist.london"
              >
                <Mail className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 group-hover:text-primary-foreground group-active:text-primary transition-colors break-all">
                  info@legalassist.london
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* LSO Badge - proper touch target */}
        <div className="flex justify-center mb-8">
          <a 
            href="https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/lawyer-and-paralegal-directory" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-secondary-foreground/20 rounded-xl min-h-[64px] px-5 sm:px-6 py-3 sm:py-4 transition-colors group focus-ring"
            aria-label="Verify our credentials on the Law Society of Ontario Directory (opens in new tab)"
          >
            {/* LSO Shield Icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-sm text-secondary-foreground group-hover:text-primary transition-colors">
                Licensed by the Law Society of Ontario
              </p>
              <p className="font-paragraph text-xs text-secondary-foreground/70">
                Verify our credentials on the LSO Directory →
              </p>
            </div>
          </a>
        </div>
        
        {/* Disclaimer and Copyright */}
        <div className="border-t border-secondary-foreground/20 pt-6 sm:pt-8">
          <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 text-center mb-6 italic">
            Legal Aid Notice: Legal Aid Ontario generally does not fund paralegal services.
          </p>
          <div className="bg-secondary-foreground/5 rounded-xl p-4 sm:p-6 border border-secondary-foreground/10 mb-6">
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed mb-4">
              <strong className="text-secondary-foreground/90">Disclaimer:</strong> The information provided on this website is for general informational purposes only and does not constitute legal advice. No paralegal-client relationship is created by viewing this website, submitting information, or communicating with LegalAssist unless and until a written retainer agreement is executed. Information submitted through this website is handled securely but is not subject to solicitor-client or paralegal-client privilege prior to the formation of a formal retainer. LegalAssist is operated by a Licensed Paralegal regulated by the Law Society of Ontario. For advice specific to your legal situation, please contact us to schedule a consultation.
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed mb-4">
              <strong className="text-secondary-foreground/90">Immigration Services Notice:</strong> Immigration services are provided exclusively by licensed Regulated Canadian Immigration Consultants (RCICs). LegalAssist Paralegal Services does not provide immigration advice or representation except where permitted by the Law Society of Ontario in relation to advocacy before the Immigration and Refugee Board (IRB).
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed mb-4">
              <strong className="text-secondary-foreground/90">Insolvency Services Notice:</strong> Insolvency and bankruptcy services referenced on this website are provided exclusively by Licensed Insolvency Trustees (LITs) licensed by the Office of the Superintendent of Bankruptcy. LegalAssist Paralegal Services does not provide insolvency advice or representation.
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed">
              <strong className="text-secondary-foreground/90">Referral Fee Disclosure:</strong> LegalAssist Paralegal Services may receive a referral or administrative fee when connecting clients with third-party licensed professionals, including Regulated Canadian Immigration Consultants (RCICs) and Licensed Insolvency Trustees (LITs). Any such referrals do not affect the independence of the licensed professional or the fees charged to the client.
            </p>
          </div>
          <p className="text-xs text-secondary-foreground/50 text-center mb-2">
            Images on this website are for illustrative purposes only. All persons depicted are models 
            or AI-generated and do not represent actual clients, cases, or outcomes.
          </p>
          <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/60 text-center">
            © 2026 LegalAssist Paralegal Services. Operated by XXXXX XXXXX, Licensed Paralegal (Law Society of Ontario), Licence No. [LSO Licence #]. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
