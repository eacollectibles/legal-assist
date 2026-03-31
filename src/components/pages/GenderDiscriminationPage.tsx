import ServicePageLayout from '@/components/ServicePageLayout';
import SEO from '@/components/SEO';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Users, Briefcase, Heart, Scale } from 'lucide-react';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GenderDiscriminationPage() {
  const authorityItems = [
    { title: 'Gender Discrimination', description: 'Sex, gender identity, and gender expression are protected grounds. Includes pregnancy, transgender status, and non-binary identity.' },
    { title: 'Pay Equity', description: 'Equal pay for equal work is required. Pay disparities based on gender are discrimination.' },
    { title: 'Pregnancy Protection', description: 'Pregnancy discrimination is sex discrimination. Cannot be fired, demoted, or denied opportunities due to pregnancy.' }
  ];

  const processSteps = [
    { step: '1', title: 'Identify Pattern', description: 'Compare treatment to opposite gender colleagues.' },
    { step: '2', title: 'Document Evidence', description: 'Comments, decisions, pay differences, opportunities.' },
    { step: '3', title: 'File HRTO', description: 'Application within 1 year of discrimination.' }
  ];

  const reassuranceItems = [
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Broad Protection', description: 'Sex, gender identity, expression all protected.' },
    { icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />, title: 'Pregnancy Covered', description: 'Specific protection for pregnant workers.' },
    { icon: <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />, title: 'Need Connection', description: 'Must show gender was a factor.' }
  ];

  const honestFAQs = [
    { question: "What counts as gender discrimination?", answer: "Treating someone differently because of sex, gender identity, or gender expression. Includes: pay disparities, promotion denials, harassment, pregnancy discrimination, failing to accommodate trans employees, stereotyping based on gender roles." },
    { question: "How do I prove pay discrimination?", answer: "Compare your pay to colleagues of different gender doing substantially similar work. Factors: skill, effort, responsibility, working conditions. If these are similar but pay differs, that's evidence. Employers must justify any gap with non-discriminatory reasons." },
    { question: "What pregnancy protections exist?", answer: "Cannot be fired, demoted, or denied opportunities due to pregnancy. Must accommodate pregnancy-related needs. Must hold your job during maternity leave. Cannot ask about pregnancy in interviews. Cannot treat you worse upon return from leave." },
    { question: "I was passed over for promotion and told I 'wouldn't commit' with a family. Is that discrimination?", answer: "Likely yes. Assumptions about commitment based on gender or family status are discriminatory. This affects women disproportionately. Document the comment and compare to how male colleagues with families are treated." },
    { question: "What about transgender discrimination?", answer: "Gender identity and gender expression are explicitly protected. Employers must use correct pronouns, allow appropriate washroom access, accommodate transition-related needs, and protect from harassment. Misgendering and deadnaming can be harassment." },
    { question: "What about sexual harassment?", answer: "Sexual harassment is a form of sex discrimination. Includes unwanted sexual advances, comments, requests for sexual favours, sexual jokes, displaying sexual content, and creating a sexualized work environment. See our workplace harassment page for more." }
  ];

  return (
    <>
      <SEO title="Gender Discrimination Paralegal Ontario | Sex Discrimination HRTO" description="Licensed paralegal for gender and sex discrimination claims in Ontario. Pay equity, pregnancy, transgender rights. HRTO applications. Free consultation." canonical="https://www.legalassist.london/services/gender-discrimination" />
      <ServicePageLayout seoTitle="Gender Discrimination | Ontario" seoDescription="Gender discrimination help in Ontario." canonical="https://www.legalassist.london/services/gender-discrimination" problemHeadline="Gender Discrimination" problemDescription="Paid less than male colleagues? Passed over due to pregnancy? Harassed because of gender? Sex and gender are protected grounds. I help fight back." heroImage={{ src: "https://static.wixstatic.com/media/99571b_79f0959236c14ac39708e40fd1377c6e~mv2.png", alt: "Gender discrimination" }} authorityItems={authorityItems} processSteps={processSteps} reassuranceItems={reassuranceItems}>
        
        <div className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Understanding Gender Discrimination</h2>
            
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Protected Grounds</h3>
            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <ul className="text-foreground/80 grid grid-cols-1 md:grid-cols-3 gap-4">
                <li><span className="font-bold">Sex:</span> Male, female, intersex</li>
                <li><span className="font-bold">Gender identity:</span> Transgender, cisgender, non-binary</li>
                <li><span className="font-bold">Gender expression:</span> How you present your gender</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-4">Pregnancy and breastfeeding are included under sex discrimination.</p>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Common Forms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Employment:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Pay gap for same work</li>
                  <li>• Promotion denied (glass ceiling)</li>
                  <li>• Fired after pregnancy announcement</li>
                  <li>• Sexual harassment</li>
                  <li>• Gender-based job assignments</li>
                  <li>• Mommy-tracking</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h4 className="font-bold text-foreground mb-3">Transgender-Specific:</h4>
                <ul className="text-foreground/80 text-sm space-y-1">
                  <li>• Misgendering/wrong pronouns</li>
                  <li>• Denied washroom access</li>
                  <li>• Fired after coming out</li>
                  <li>• Harassment about transition</li>
                  <li>• Deadnaming</li>
                  <li>• Dress code discrimination</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Pregnancy Discrimination</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mb-2" />
              <h4 className="font-bold text-yellow-800 mb-2">Employers Cannot:</h4>
              <ul className="text-yellow-900 text-sm space-y-2">
                <li>• Ask about pregnancy/family plans in interviews</li>
                <li>• Fire you because you're pregnant</li>
                <li>• Deny promotions due to pregnancy</li>
                <li>• Refuse to accommodate pregnancy needs</li>
                <li>• Treat you worse after maternity leave</li>
                <li>• Eliminate your position while on leave</li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2">Pay Equity Analysis</h4>
              <p className="text-foreground/80 text-sm mb-3">To assess pay discrimination, compare:</p>
              <ul className="text-foreground/80 text-sm space-y-1">
                <li>• Same or substantially similar job duties</li>
                <li>• Similar skill requirements</li>
                <li>• Similar effort required</li>
                <li>• Similar responsibility level</li>
                <li>• Similar working conditions</li>
              </ul>
              <p className="text-foreground/70 text-sm mt-3">If these align but pay differs, employer must justify the gap with legitimate factors (seniority, merit, quantity/quality).</p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl font-bold text-foreground">Gender Discrimination FAQs</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {honestFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-left font-heading text-lg font-semibold py-6 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="w-full py-16 md:py-24 bg-primary/5">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Experiencing Gender Discrimination?</h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">Document what's happening and let's discuss your options.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors">Get a Free Assessment</a>
          </div>
        </div>
        <RelatedServices services={relatedServicesConfig.humanRights} />
      </ServicePageLayout>
    </>
  );
}
