import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">LA</span>
              </div>
              <span className="font-heading text-2xl font-bold">LegalAssist</span>
            </div>
            <p className="font-paragraph text-secondary-foreground/80 leading-relaxed">
              Professional paralegal services across Ontario, delivering accessible and affordable legal support for individuals and businesses.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="font-paragraph text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <Link to="/legal-services" className="font-paragraph text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
                Legal Services
              </Link>
              <a href="#contact" className="font-paragraph text-secondary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact Us
              </a>
            </nav>
          </div>
          
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Contact Information</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-secondary-foreground/80">
                  123 Bay Street, Suite 500<br />Toronto, ON M5J 2N8
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-secondary-foreground/80">
                  (416) 555-0123
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-secondary-foreground/80">
                  info@legalassist.ca
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="font-paragraph text-sm text-secondary-foreground/60 text-center">
            © {new Date().getFullYear()} LegalAssist. All rights reserved. Licensed Paralegals serving Ontario.
          </p>
        </div>
      </div>
    </footer>
  );
}
