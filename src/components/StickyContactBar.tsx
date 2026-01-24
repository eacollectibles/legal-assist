import { Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import PrimaryCTA from '@/components/PrimaryCTA';

interface StickyContactBarProps {
  isVisible?: boolean;
}

export default function StickyContactBar({ isVisible = true }: StickyContactBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="backdrop-blur-lg bg-background/95 border-t border-primary/20 shadow-lg">
        <div className="flex flex-col gap-2 p-4 pb-safe max-w-[100rem] mx-auto">
          <PrimaryCTA variant="mobile" size="md" />
        </div>
      </div>
    </div>
  );
}
