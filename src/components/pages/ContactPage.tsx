import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// --- Utility Components for Motion & Interaction ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'scale-up';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  animation = 'fade-up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'opacity-0 transition-opacity duration-1000 ease-out data-[visible=true]:opacity-100';
      case 'slide-in-right': return 'opacity-0 translate-x-10 transition-all duration-1000 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0';
      case 'scale-up': return 'opacity-0 scale-95 transition-all duration-1000 ease-out data-[visible=true]:opacity-100 data-[visible=true]:scale-100';
      case 'fade-up':
      default: return 'opacity-0 translate-y-8 transition-all duration-1000 ease-out';
    }
  };

  return (
    <div 
      ref={ref} 
      className={cn(getAnimationClass(), className, "[&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:translate-x-0 [&.is-visible]:scale-100")}
    >
      {children}
    </div>
  );
};

// Contact Method Card Component
interface ContactMethodProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: string;
  actionHref?: string;
  actionOnClick?: () => void;
  color: string;
  delay: number;
}

const ContactMethodCard: React.FC<ContactMethodProps> = ({
  icon: Icon,
  title,
  description,
  action,
  actionHref,
  actionOnClick,
  color,
  delay
}) => {
  const content = (
    <div className={cn(
      "group relative h-full p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden",
      color
    )}>
      <div className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/20" />
      
      <div className="relative z-10 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-7 h-7" />
      </div>

      <div className="relative z-10">
        <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <p className="font-paragraph text-secondary/80 leading-relaxed mb-6">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-primary font-paragraph font-semibold group-hover:gap-3 transition-all">
          {action}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>

      <Icon className="absolute -bottom-8 -right-8 w-48 h-48 text-secondary/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
    </div>
  );

  if (actionHref) {
    return (
      <AnimatedElement delay={delay} className="h-full">
        <a href={actionHref} className="block h-full">
          {content}
        </a>
      </AnimatedElement>
    );
  }

  return (
    <AnimatedElement delay={delay} className="h-full">
      <button onClick={actionOnClick} className="block w-full h-full text-left">
        {content}
      </button>
    </AnimatedElement>
  );
};

// Form Components
interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const CallbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ 
        type: 'success', 
        message: 'Thank you! We will call you back within 24 hours.' 
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setStatus({ type: 'idle' }), 5000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to submit. Please try again.' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="(416) 555-0123"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Preferred Time to Call
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          placeholder="e.g., Weekday mornings, after 5 PM, etc."
        />
      </div>

      {status.type === 'success' && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="font-paragraph text-sm text-green-800">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-paragraph text-sm text-red-800">{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full bg-primary text-primary-foreground font-paragraph px-6 py-4 rounded-lg transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status.type === 'loading' ? (
          <>
            <span className="animate-spin">⏳</span>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Request Callback
          </>
        )}
      </button>
    </form>
  );
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ 
        type: 'success', 
        message: 'Thank you for your feedback! We appreciate your input.' 
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setStatus({ type: 'idle' }), 5000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to submit. Please try again.' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fb-name" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="fb-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Your name (optional)"
        />
      </div>

      <div>
        <label htmlFor="fb-email" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="fb-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="your@email.com (optional)"
        />
      </div>

      <div>
        <label htmlFor="fb-message" className="block font-paragraph text-sm font-semibold text-secondary mb-2">
          Your Feedback
        </label>
        <textarea
          id="fb-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full px-4 py-3 border border-secondary/20 rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          placeholder="Share your feedback, suggestions, or comments..."
        />
      </div>

      {status.type === 'success' && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="font-paragraph text-sm text-green-800">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-paragraph text-sm text-red-800">{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full bg-primary text-primary-foreground font-paragraph px-6 py-4 rounded-lg transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status.type === 'loading' ? (
          <>
            <span className="animate-spin">⏳</span>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Feedback
          </>
        )}
      </button>
    </form>
  );
};

// Main Contact Page Component
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'callback' | 'feedback'>('callback');

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team. Call us during business hours for immediate assistance.',
      action: 'Call Now',
      actionHref: 'tel:16399992222',
      color: 'bg-pastelgreen',
      delay: 0
    },
    {
      icon: MessageSquare,
      title: 'Text Us',
      description: 'Send us a text message and we\'ll respond as soon as possible.',
      action: 'Text Now',
      actionHref: 'sms:16399992222',
      color: 'bg-pastellavender',
      delay: 100
    },
    {
      icon: Mail,
      title: 'Send an Email',
      description: 'Have questions? Send us an email and we\'ll respond within 24 business hours.',
      action: 'Email Us',
      actionHref: 'mailto:info@legalassist.ca',
      color: 'bg-pastelpeach',
      delay: 200
    },
    {
      icon: Clock,
      title: 'Request a Callback',
      description: 'Prefer to talk by phone? Request a callback and we\'ll reach out at your convenience.',
      action: 'Request Now',
      color: 'bg-pastelbeige',
      delay: 300
    },
    {
      icon: Mail,
      title: 'Send Feedback',
      description: 'Help us improve! Share your feedback, suggestions, or comments about our services.',
      action: 'Share Feedback',
      color: 'bg-pastelbeige',
      delay: 400
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-clip selection:bg-primary/20 selection:text-secondary">
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/99571b_116291d834424659a3dd7ba8988f92f3~mv2.png?originWidth=1920&originHeight=1024"
            alt="Contact us - Professional legal consultation"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-secondary/20" />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <AnimatedElement animation="fade-up" delay={200}>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-lg leading-[0.9] tracking-tight mb-6">
                Get in <br/>
                <span className="text-pastelbeige italic">Touch</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <p className="font-paragraph text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                We're here to help. Reach out through any of these convenient methods and we'll get back to you promptly.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS SECTION */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-6">
                How Can We Help?
              </h2>
              <p className="font-paragraph text-lg text-secondary/70">
                Choose the contact method that works best for you. We're committed to responding quickly and professionally.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {contactMethods.map((method, index) => (
              <ContactMethodCard
                key={index}
                icon={method.icon}
                title={method.title}
                description={method.description}
                action={method.action}
                actionHref={method.actionHref}
                actionOnClick={() => {
                  if (method.title === 'Request a Callback') {
                    setActiveTab('callback');
                    document.getElementById('callback-form')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (method.title === 'Send Feedback') {
                    setActiveTab('feedback');
                    document.getElementById('feedback-form')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                color={method.color}
                delay={method.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION SECTION */}
      <section className="py-24 lg:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <AnimatedElement delay={0}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Phone</h3>
                  <p className="font-paragraph text-secondary-foreground/80 mb-2">
                    Call us during business hours
                  </p>
                  <a href="tel:16399992222" className="font-paragraph font-semibold text-primary hover:text-primary/80 transition-colors">
                    (639) 999-2222
                  </a>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Email</h3>
                  <p className="font-paragraph text-secondary-foreground/80 mb-2">
                    We respond within 24 hours
                  </p>
                  <a href="mailto:info@legalassist.ca" className="font-paragraph font-semibold text-primary hover:text-primary/80 transition-colors">
                    info@legalassist.ca
                  </a>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Office Location</h3>
                  <p className="font-paragraph text-secondary-foreground/80">
                    123 Bay Street, Suite 500<br />
                    Toronto, ON M5J 2N8
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* FORMS SECTION */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4 text-center">
                Get in Touch
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 text-center mb-12">
                Fill out the form below and we'll be in touch shortly.
              </p>
            </AnimatedElement>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-12 border-b border-secondary/10">
              <button
                onClick={() => setActiveTab('callback')}
                className={cn(
                  "pb-4 px-2 font-paragraph font-semibold transition-colors border-b-2 -mb-px",
                  activeTab === 'callback'
                    ? 'text-primary border-primary'
                    : 'text-secondary/60 border-transparent hover:text-secondary'
                )}
              >
                Request Callback
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={cn(
                  "pb-4 px-2 font-paragraph font-semibold transition-colors border-b-2 -mb-px",
                  activeTab === 'feedback'
                    ? 'text-primary border-primary'
                    : 'text-secondary/60 border-transparent hover:text-secondary'
                )}
              >
                Send Feedback
              </button>
            </div>

            {/* Forms */}
            <AnimatedElement>
              {activeTab === 'callback' && (
                <div id="callback-form">
                  <CallbackForm />
                </div>
              )}
              {activeTab === 'feedback' && (
                <div id="feedback-form">
                  <FeedbackForm />
                </div>
              )}
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* BUSINESS HOURS SECTION */}
      <section className="py-16 lg:py-20 bg-pastelbeige/30">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <AnimatedElement>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-2xl text-secondary mb-4">Business Hours</h3>
                  <div className="space-y-2 font-paragraph text-secondary/80">
                    <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                    <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
                    <p><span className="font-semibold">Sunday:</span> Closed</p>
                    <p className="text-sm text-secondary/60 mt-4">
                      * Emergency matters may be accommodated outside regular hours. Please call to inquire.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
