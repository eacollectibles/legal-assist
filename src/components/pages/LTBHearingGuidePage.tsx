import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Shield, Home, Clock, CheckCircle, AlertTriangle, FileText, Monitor, Mic, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LTBHearingGuidePage() {
  // SEO handled by AutoSEO component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <FileText className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Free Guide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              How to Prepare for an LTB Hearing
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              LTB hearings can be intimidating, but preparation is key. This guide covers what to expect, what to bring, and how to present your case effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Virtual vs In-Person */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Virtual Hearings (Most Common)</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <Monitor className="w-10 h-10 text-primary mb-4" />
              <p className="font-paragraph text-foreground/80 mb-6">
                Most LTB hearings are now held by video (Zoom/Microsoft Teams). Here's what you need:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Technical Requirements</h3>
                  <ul className="space-y-2">
                    {[
                      'Computer, tablet, or smartphone',
                      'Stable internet connection',
                      'Working camera and microphone',
                      'Quiet, private location',
                      'Zoom or Teams installed and tested',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Virtual Hearing Tips</h3>
                  <ul className="space-y-2">
                    {[
                      'Test your technology beforehand',
                      'Join 10-15 minutes early',
                      'Mute when not speaking',
                      'Have documents ready on screen',
                      'Look at the camera when speaking',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 font-paragraph text-foreground/70 text-sm">
                        <Monitor className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">What to Bring</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Your Application/Response', desc: 'The forms you filed or received' },
              { title: 'The Lease Agreement', desc: 'Original or copy of your rental agreement' },
              { title: 'Notices', desc: 'Any N-forms (N4, N5, N12, etc.) served' },
              { title: 'Payment Records', desc: 'Bank statements, receipts, e-transfers showing rent paid' },
              { title: 'Communication Records', desc: 'Emails, texts, letters between parties' },
              { title: 'Photos/Videos', desc: 'Evidence of property condition, damage, etc.' },
              { title: 'Witness Information', desc: 'Names and contact info of anyone who will testify' },
              { title: 'Notes/Summary', desc: 'Organized timeline of events' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm flex items-start gap-3">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What Happens at the Hearing</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { step: 1, title: 'Roll Call', desc: 'Member confirms who is present and identifies the case.' },
              { step: 2, title: 'Opening', desc: 'Member explains the process and what issues will be decided.' },
              { step: 3, title: 'Applicant\'s Case', desc: 'The person who filed presents their evidence and testimony first.' },
              { step: 4, title: 'Cross-Examination', desc: 'The other party can ask questions about the testimony.' },
              { step: 5, title: 'Respondent\'s Case', desc: 'The other party presents their evidence and testimony.' },
              { step: 6, title: 'Cross-Examination', desc: 'The applicant can ask questions.' },
              { step: 7, title: 'Closing', desc: 'Each party summarizes their position.' },
              { step: 8, title: 'Decision', desc: 'Member may decide immediately or "reserve" and mail decision later.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-sm">
                  {item.step}
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
                  <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Tips for Success</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: 'Be Organized', desc: 'Have all documents in order and know where to find them quickly.' },
              { title: 'Be Respectful', desc: 'Address the Member as "Member" or "Adjudicator." Don\'t interrupt.' },
              { title: 'Stick to Facts', desc: 'Focus on what happened, not emotions. Dates and specifics matter.' },
              { title: 'Answer Directly', desc: 'When asked questions, give clear, direct answers.' },
              { title: 'Don\'t Argue', desc: 'Let the Member decide. Arguing makes you look bad.' },
              { title: 'Request Relief', desc: 'Clearly state what you want the Member to order.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Want Professional Representation?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We can represent you at your LTB hearing. Free consultation available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services/landlord-tenant" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              LTB Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
