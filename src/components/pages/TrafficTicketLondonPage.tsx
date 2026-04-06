import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Car, Shield, Clock, MapPin, FileText, DollarSign, CheckCircle, AlertTriangle, Building2, Gauge } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices, relatedServicesConfig } from '@/components/RelatedServices';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/phone-constants';

export default function TrafficTicketLondonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Car className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Traffic Ticket Paralegal — London, Ontario</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Traffic Ticket Paralegal in London, Ontario
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              Fight your London traffic ticket with a licensed paralegal. We defend speeding tickets, careless driving charges, stunt driving, red light camera tickets, and all Highway Traffic Act offences at the London Provincial Offences Court.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              A traffic conviction in London can result in demerit points, licence suspension, skyrocketing insurance premiums, and even a criminal record for serious charges. Do not simply pay the fine — let LegalAssist fight your ticket and protect your driving record.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/5">
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets We Fight */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">London Traffic Tickets We Fight</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-6 max-w-3xl mx-auto">
            We defend all types of traffic tickets issued in London, on Highway 401, Highway 402, and throughout Middlesex County. Our paralegal has extensive experience at the London Provincial Offences Court and knows the local procedures inside and out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Gauge className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Speeding Tickets</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Tickets for exceeding the speed limit on London city streets, Highway 401, Highway 402, and county roads in Middlesex County.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Speeding convictions add demerit points and increase insurance. We fight to have charges reduced or dismissed.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Careless Driving</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Careless driving is one of the most serious Highway Traffic Act charges, carrying up to 6 demerit points, fines up to $2,000, and possible licence suspension.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We build strong defences and often negotiate reduced charges at the London court.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Car className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Stunt Driving / Racing</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Charges for driving 40+ km/h over the limit on roads posted 80 km/h or less, or 50+ km/h over on highways. Includes immediate roadside licence suspension and vehicle impoundment.</p>
              <p className="font-paragraph text-foreground/50 text-sm">These charges carry severe penalties including potential jail time. Immediate legal representation is essential.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><FileText className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Red Light Camera Tickets</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Automated red light camera tickets issued at London intersections. While these do not carry demerit points, fines can be substantial.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We review the evidence, check camera calibration records, and challenge tickets where possible.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><Shield className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Driving Under Suspension</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Charges for operating a motor vehicle while your licence is suspended. This is a serious offence with mandatory fines and potential further suspension.</p>
              <p className="font-paragraph text-foreground/50 text-sm">We review the circumstances of the suspension and build the strongest possible defence.</p>
            </div>

            <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Other HTA Offences</h3>
              <p className="font-paragraph text-foreground/70 mb-2">Distracted driving, failure to yield, improper turns, following too closely, no insurance, and all other Highway Traffic Act violations in London.</p>
              <p className="font-paragraph text-foreground/50 text-sm">Every ticket deserves a defence. We review the officer&apos;s notes and evidence to find the best strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* London Court Info */}
      <section className="py-16 md:py-24 bg-pastelbeige/10">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">London Provincial Offences Court</h2>
          <p className="font-paragraph text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            Traffic tickets issued in London and Middlesex County are heard at the London Provincial Offences Court at 824 Dundas Street. We regularly appear at this courthouse and are familiar with local prosecutors and court procedures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Court Location</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">London Provincial Offences Court is located at 824 Dundas Street, London, Ontario. This is where all City of London traffic matters and HTA offences are heard.</p>
              <p className="font-paragraph text-foreground/60 text-sm">Hours: Monday to Friday, 8:30 AM to 4:30 PM. Early resolution and trial dates are scheduled by the court.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-pastelbeige shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Deadlines &amp; Timelines</h3>
              <p className="font-paragraph text-foreground/70 text-sm mb-2">You have 15 days from the date of your ticket to request a trial. Missing this deadline can result in an automatic conviction. Contact us immediately after receiving a ticket.</p>
              <p className="font-paragraph text-foreground/60 text-sm">We handle the early resolution option (Option 2) and full trial requests (Option 3) on your behalf.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fight */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Why You Should Fight Your London Traffic Ticket</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Save on Insurance</h3>
              <p className="font-paragraph text-foreground/70 text-sm">A single speeding conviction can increase your insurance by hundreds of dollars per year for up to three years. Fighting the ticket can save you thousands.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Protect Your Record</h3>
              <p className="font-paragraph text-foreground/70 text-sm">Demerit points accumulate and can lead to licence suspension. A clean driving record is essential for London commuters and commercial drivers.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Local Expertise</h3>
              <p className="font-paragraph text-foreground/70 text-sm">We know the London Provincial Offences Court, local prosecutors, and the most effective defence strategies for tickets issued in this jurisdiction.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-primary" /></div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">No Court Visits</h3>
              <p className="font-paragraph text-foreground/70 text-sm">In most cases, you do not need to attend court. We handle everything — from filing to trial appearances — so you do not miss work.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <RelatedServices services={relatedServicesConfig.general} />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Got a Traffic Ticket in London?</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4 max-w-2xl mx-auto">
            Do not pay your ticket and accept the conviction. Contact LegalAssist today for a free consultation. We will review your ticket and explain your options for fighting it at the London Provincial Offences Court.
          </p>
          <p className="font-paragraph text-base text-secondary-foreground/60 mb-8 max-w-2xl mx-auto">
            Remember: you only have 15 days to respond. Call us now to protect your driving record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary/90">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg transition-all hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
