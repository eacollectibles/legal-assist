import { Shield, Scale, Heart } from 'lucide-react';

type TrustSignalsProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function TrustSignals({ className, variant = 'light' }: TrustSignalsProps) {
  const isDark = variant === 'dark';
  
  return (
    <section
      className={[
        "w-full rounded-2xl border",
        isDark 
          ? "border-white/10 bg-white/5 backdrop-blur text-white" 
          : "border-primary/10 bg-primary/5 text-foreground",
        "px-6 py-5 shadow-sm",
        className || "",
      ].join(" ")}
      aria-label="Trust signals"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex gap-3">
          <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-white/80' : 'text-primary'}`} />
          <div className="space-y-1">
            <p className="text-sm font-semibold font-heading">Licensed Ontario Paralegal</p>
            <p className={`text-sm ${isDark ? 'opacity-80' : 'text-muted-foreground'}`}>
              Every file is reviewed and handled by a licensed paralegal.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Scale className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-white/80' : 'text-primary'}`} />
          <div className="space-y-1">
            <p className="text-sm font-semibold font-heading">Regulated by the LSO</p>
            <p className={`text-sm ${isDark ? 'opacity-80' : 'text-muted-foreground'}`}>
              Services provided within the authorized scope of paralegal practice.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Heart className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-white/80' : 'text-primary'}`} />
          <div className="space-y-1">
            <p className="text-sm font-semibold font-heading">No Pressure, No Obligation</p>
            <p className={`text-sm ${isDark ? 'opacity-80' : 'text-muted-foreground'}`}>
              We explain your options clearly. You decide how to proceed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSignals;
