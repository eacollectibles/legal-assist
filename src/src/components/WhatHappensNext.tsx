import { MessageCircle, FileText, CheckCircle } from 'lucide-react';

type WhatHappensNextProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function WhatHappensNext({ className, variant = 'light' }: WhatHappensNextProps) {
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
      aria-label="What happens when you contact us"
    >
      <h3 className="text-base font-semibold font-heading">What Happens When You Contact Us</h3>

      <ol className="mt-4 grid gap-4 md:grid-cols-3">
        <li className={[
          "rounded-xl border px-4 py-3",
          isDark ? "border-white/10 bg-white/5" : "border-primary/10 bg-white"
        ].join(" ")}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>1</div>
            <MessageCircle className={`w-4 h-4 ${isDark ? 'text-white/80' : 'text-primary'}`} />
          </div>
          <p className="text-sm font-semibold font-heading">Speak with a Paralegal</p>
          <p className={`text-sm mt-1 ${isDark ? 'opacity-80' : 'text-muted-foreground'}`}>
            You speak directly with a licensed Ontario paralegal.
          </p>
        </li>

        <li className={[
          "rounded-xl border px-4 py-3",
          isDark ? "border-white/10 bg-white/5" : "border-primary/10 bg-white"
        ].join(" ")}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>2</div>
            <FileText className={`w-4 h-4 ${isDark ? 'text-white/80' : 'text-primary'}`} />
          </div>
          <p className="text-sm font-semibold font-heading">Get Clear Options</p>
          <p className={`text-sm mt-1 ${isDark ? 'opacity-80' : 'text-muted-foreground'}`}>
            We explain your rights and options under Ontario law.
          </p>
        </li>

        <li className={[
          "rounded-xl border px-4 py-3",
          isDark ? "border-white/10 bg-white/5" : "border-primary/10 bg-white"
        ].join(" ")}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>3</div>
            <CheckCircle className={`w-4 h-4 ${isDark ? 'text-white/80' : 'text-primary'}`} />
          </div>
          <p className="text-sm font-semibold font-heading">You Decide</p>
          <p className={`text-sm mt-1 ${isDark ? 'opacity-80' : 'text-muted-foreground'}`}>
            No pressure. No obligation. Proceed only if you're comfortable.
          </p>
        </li>
      </ol>
    </section>
  );
}

export default WhatHappensNext;
