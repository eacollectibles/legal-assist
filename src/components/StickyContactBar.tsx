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
        <div className="flex flex-col gap-2 p-4 pb-safe max-w-[100rem] mx-auto">
          <Button
            asChild
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Link to="/contact" className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Find Out Where You Stand</span>
            </Link>
          </Button>
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-secondary/60">or</span>
            <a 
              href={PHONE_HREF}
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
