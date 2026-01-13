import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
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
          
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link to="/" className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <Link to="/services" className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
                Services
              </Link>
              <Link to="/contact" className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80">
                  P.O Box 1000<br />London, Ontario, N6A 2L1
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80">
                  (416) 555-0123
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-sm sm:text-base text-secondary-foreground/80">
                  info@legalassist.london
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="bg-secondary-foreground/5 rounded-lg p-4 sm:p-6 border border-secondary-foreground/10 mb-6 sm:mb-8">
            <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed">
              <strong className="text-secondary-foreground/90">Disclaimer:</strong> This website provides general information about paralegal services and is not intended to constitute legal advice. The information contained on this website should not be relied upon as legal advice and does not create or imply a paralegal-client relationship. Contacting LegalAssist through this website, submitting an online form, or sending an email does not establish a paralegal-client relationship unless and until a written retainer agreement is executed. No confidentiality or privilege attaches to information submitted through this website prior to the formal establishment of a paralegal-client relationship. LegalAssist is operated by a Licensed Paralegal regulated by the Law Society of Ontario. For advice specific to your legal situation, please contact us to schedule a consultation.
            </p>
          </div>
          <p className="font-paragraph text-xs sm:text-sm text-secondary-foreground/60 text-center">
            © 2026 LegalAssist Paralegal Services. Operated by XXXXX XXXXX, Licensed Paralegal (Law Society of Ontario), Licence No. [LSO Licence #]. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
