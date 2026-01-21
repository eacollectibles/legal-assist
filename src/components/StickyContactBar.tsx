import { Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';

interface StickyContactBarProps {
  isVisible?: boolean;
}

export default function StickyContactBar({ isVisible = true }: StickyContactBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="backdrop-blur-lg bg-background/95 border-t border-primary/20 shadow-lg">
        <div className="flex gap-3 p-4 pb-safe max-w-[100rem] mx-auto">
          <Button
            asChild
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </Button>
          
          <Button
            asChild
            className="flex-1 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          >
            <Link to="/contact" className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Book Consultation</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
