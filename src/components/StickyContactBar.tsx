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
          <p className="text-xs text-center text-secondary/60 px-2">
            Get a clear explanation of your rights and options under Ontario law.
          </p>
        </div>
      </div>
    </div>
  );
}
