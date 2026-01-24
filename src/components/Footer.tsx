import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-8 sm:mb-12">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-primary rounded-sm flex items-center justify-center">
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
          
          {/* Quick Links Section */}
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-1">
              <Link 
                to="/" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                About Us
              </Link>
              <Link 
                to="/what-is-a-paralegal" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                What Is a Paralegal?
              </Link>
              <Link 
                to="/paralegal-vs-lawyer" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                Paralegal vs. Lawyer
              </Link>
              <Link 
                to="/services" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                Services
              </Link>
              <Link 
                to="/legal-news" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                Recent Decisions
              </Link>
              <Link 
                to="/contact" 
                className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground hover:bg-secondary-foreground/10 transition-colors py-2 px-3 -mx-3 rounded-lg"
              >
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Contact Information Section */}
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
            <div className="flex flex-col gap-2">
              {/* Address - not clickable */}
              <div className="flex items-start gap-3 py-2 px-3 -mx-3 rounded-lg">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80">
                  P.O Box 1000<br />London, Ontario, N6A 2L1
                </span>
              </div>
              
              {/* Phone - clickable */}
              <a 
                href={PHONE_HREF} 
                className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-secondary-foreground/10 transition-colors group"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 group-hover:text-primary-foreground transition-colors">
                  {PHONE_DISPLAY}
                </span>
              </a>
              
              {/* Email - clickable */}
              <a 
                href="mailto:info@legalassist.london" 
                className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-secondary-foreground/10 transition-colors group"
              >
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 group-hover:text-primary-foreground transition-colors">
                  info@legalassist.london
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* LSO Badge */}
        <div className="flex justify-center mb-8">
          <a 
            href="https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/lawyer-and-paralegal-directory" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-secondary-foreground/20 rounded-lg px-6 py-4 transition-colors group"
          >
            {/* LSO Shield Icon */}
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-7 h-7 text-white"
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
          <div className="bg-secondary-foreground/5 rounded-lg p-4 sm:p-6 border border-secondary-foreground/10 mb-6">
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed mb-4">
              <strong className="text-secondary-foreground/90">Disclaimer:</strong> This website provides general information about paralegal services and is not intended to constitute legal advice. The information contained on this website should not be relied upon as legal advice and does not create or imply a paralegal-client relationship. Contacting LegalAssist through this website, submitting an online form, or sending an email does not establish a paralegal-client relationship unless and until a written retainer agreement is executed. No confidentiality or privilege attaches to information submitted through this website prior to the formal establishment of a paralegal-client relationship. LegalAssist is operated by a Licensed Paralegal regulated by the Law Society of Ontario. For advice specific to your legal situation, please contact us to schedule a consultation.
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed mb-4">
              <strong className="text-secondary-foreground/90">Immigration Services Notice:</strong> Immigration services are provided exclusively by licensed Regulated Canadian Immigration Consultants (RCICs). LegalAssist Paralegal Services does not provide immigration advice or representation except where permitted by the Law Society of Ontario in relation to advocacy before the Immigration and Refugee Board (IRB).
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed">
              <strong className="text-secondary-foreground/90">Insolvency Services Notice:</strong> Insolvency and bankruptcy services referenced on this website are provided exclusively by Licensed Insolvency Trustees (LITs) licensed by the Office of the Superintendent of Bankruptcy. LegalAssist Paralegal Services does not provide insolvency advice or representation.
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
