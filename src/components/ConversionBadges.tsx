import { DollarSign, CreditCard, HeartHandshake } from 'lucide-react';

interface ConversionBadgesProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function ConversionBadges({ className = '', variant = 'light' }: ConversionBadgesProps) {
  const isDark = variant === 'dark';

  const badges = [
    {
      icon: DollarSign,
      label: 'Flat fee available',
    },
    {
      icon: CreditCard,
      label: 'Payment plans available',
    },
    {
      icon: HeartHandshake,
      label: 'No obligation consultation',
    },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className={[
            "flex items-center gap-2 px-4 py-2 rounded-full border font-paragraph text-sm font-medium",
            isDark
              ? "border-white/20 bg-white/10 text-white"
              : "border-primary/20 bg-primary/5 text-secondary",
          ].join(" ")}
        >
          <badge.icon className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gold' : 'text-primary'}`} />
          {badge.label}
        </div>
      ))}
    </div>
  );
}
