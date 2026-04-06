import { Link } from 'react-router-dom';
import { CheckCircle, UserPlus, Shield, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Book Your Free Consultation
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 mb-8">
              We'd love to help you with your legal matter. To ensure we can best serve you, we have a quick and easy sign-up process that includes a conflict of interest check — a standard legal requirement to protect everyone involved.
            </p>
            <Link to="/client-signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            How It Works
          </h2>
          <p className="font-paragraph text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Three simple steps to get the legal help you need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Create Your Account
              </h3>
              <p className="font-paragraph text-foreground/70">
                Sign up with your email to get started. It only takes a minute and keeps your information secure throughout the process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Complete Your Intake
              </h3>
              <p className="font-paragraph text-foreground/70">
                Fill out a short intake form with your details and case information. This includes a conflict of interest check — a legal requirement that protects both you and our team.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Book Your Appointment
              </h3>
              <p className="font-paragraph text-foreground/70">
                Once your intake is complete, you'll be able to pick a date and time that works for you. You'll receive a Zoom link for your consultation automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-paragraph text-foreground/70 mb-8">
              The entire process takes just a few minutes. Create your account now and you'll be booking your consultation in no time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/client-signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 gap-2">
                  Create an Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/client-login">
                <Button size="lg" variant="outline" className="font-semibold px-8">
                  Already have an account? Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sidebar Section */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                What to Expect
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Initial Consultation</h4>
                  <p className="font-paragraph text-foreground/80 text-sm">
                    Your first consultation is a 30-minute video call where we'll discuss your case, answer your questions, and outline your options.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Why the Intake Process?</h4>
                  <p className="font-paragraph text-foreground/80 text-sm">
                    The Law Society of Ontario requires a conflict of interest check before we can assist you. This protects your interests and ensures we can represent you without any conflicts. It's quick and straightforward.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-2">Your Information Is Secure</h4>
                  <p className="font-paragraph text-foreground/80 text-sm">
                    All information submitted is handled securely and confidentially. Please note that no paralegal-client relationship is created until a written retainer agreement is signed.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-pastelbeige">
                <h4 className="font-heading font-bold text-foreground mb-4">Contact Information</h4>
                <div className="space-y-3 font-paragraph text-foreground/80 text-sm">
                  <p>
                    <strong>Email:</strong><br />
                    info@legalassist.london
                  </p>
                  <p>
                    <strong>Office Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
