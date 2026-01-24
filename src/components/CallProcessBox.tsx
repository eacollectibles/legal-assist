export default function CallProcessBox() {
  const steps = [
    'You speak directly with a licensed paralegal',
    'We listen and explain your options under Ontario law',
    'You decide — no pressure, no obligation'
  ];

  return (
    <div className="w-full bg-pastelbeige border border-secondary/10 rounded-lg p-8 md:p-10">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
        What Happens When You Call
      </h3>
      
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-lg">
              {index + 1}
            </span>
            <span className="text-base font-paragraph text-foreground pt-1">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
