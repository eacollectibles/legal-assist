import { Shield, Clock, MessageCircle, Award } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
}

export default function TrustBadges({ variant = 'horizontal', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: 'LSO Licensed',
      subtitle: 'Law Society of Ontario',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: MessageCircle,
      title: 'Free Consultation',
      subtitle: '30 minutes, no obligation',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Clock,
      title: '24hr Response',
      subtitle: 'Fast turnaround guaranteed',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Award,
      title: 'Affordable Rates',
      subtitle: 'Flat fees, no surprises',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div 
            key={index}
            className={`flex items-center gap-2 ${badge.bgColor} px-3 py-2 rounded-full`}
          >
            <badge.icon className={`w-4 h-4 ${badge.color}`} />
            <span className="font-paragraph text-xs sm:text-sm font-medium text-secondary">
              {badge.title}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        {badges.map((badge, index) => (
          <div 
            key={index}
            className={`flex items-center gap-3 ${badge.bgColor} px-4 py-3 rounded-xl`}
          >
            <div className={`w-10 h-10 rounded-lg ${badge.bgColor} flex items-center justify-center flex-shrink-0`}>
              <badge.icon className={`w-5 h-5 ${badge.color}`} />
            </div>
            <div>
              <p className="font-heading font-semibold text-sm text-secondary">{badge.title}</p>
              <p className="font-paragraph text-xs text-secondary/70">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div 
          key={index}
          className={`flex flex-col items-center text-center ${badge.bgColor} px-4 py-5 rounded-xl border border-secondary/5`}
        >
          <div className={`w-12 h-12 rounded-full ${badge.bgColor} flex items-center justify-center mb-3`}>
            <badge.icon className={`w-6 h-6 ${badge.color}`} />
          </div>
          <p className="font-heading font-semibold text-sm text-secondary">{badge.title}</p>
          <p className="font-paragraph text-xs text-secondary/60 mt-1">{badge.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
