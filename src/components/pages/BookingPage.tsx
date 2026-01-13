import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { generateMeetingLink, generateZoomUrl, generateConfirmationToken } from '@/lib/meeting-utils';
import { sendBookingConfirmationEmail } from '@/lib/email-service';

interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  clientNotes: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    preferredDate: '',
    preferredTime: '',
    serviceType: 'small-claims',
    clientNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.clientName.trim()) {
      setErrorMessage('Please enter your name');
      return false;
    }
    if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.clientPhone.trim()) {
      setErrorMessage('Please enter your phone number');
      return false;
    }
    if (!formData.preferredDate) {
      setErrorMessage('Please select a preferred date');
      return false;
    }
    if (!formData.preferredTime) {
      setErrorMessage('Please select a preferred time');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingId = crypto.randomUUID();
      const meetingLink = generateMeetingLink(bookingId);
      const zoomUrl = generateZoomUrl(bookingId);
      const confirmationToken = generateConfirmationToken();

      await BaseCrudService.create('bookings', {
        _id: bookingId,
        ...formData,
        meetingLink,
        zoomUrl,
        confirmationToken,
        status: 'pending'
      });

      // Send confirmation email to client
      await sendBookingConfirmationEmail({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        serviceType: formData.serviceType,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        bookingId: bookingId,
        confirmationToken: confirmationToken
      });

      setSubmitStatus('success');
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        preferredDate: '',
        preferredTime: '',
        serviceType: 'small-claims',
        clientNotes: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Schedule Your Consultation
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              Book a consultation with our experienced legal team. We'll discuss your case, answer your questions, and help you understand your options.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-green-900 mb-1">Booking Submitted Successfully!</h3>
                      <p className="font-paragraph text-green-800">Your appointment request has been submitted for approval. Our team will review your request and contact you shortly to confirm.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-red-900 mb-1">Error</h3>
                      <p className="font-paragraph text-red-800">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="clientName" className="block font-paragraph font-semibold text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="clientName"
                    name="clientName"
                    type="text"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="border-gray-300"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="clientEmail" className="block font-paragraph font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="border-gray-300"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="clientPhone" className="block font-paragraph font-semibold text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="clientPhone"
                    name="clientPhone"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    className="border-gray-300"
                    required
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="serviceType" className="block font-paragraph font-semibold text-foreground mb-2">
                    Service Type *
                  </label>
                  <Select value={formData.serviceType} onValueChange={handleSelectChange}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small-claims">Small Claims Court</SelectItem>
                      <SelectItem value="family-law">Family Law</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferredDate" className="block font-paragraph font-semibold text-foreground mb-2">
                    Preferred Date *
                  </label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="border-gray-300"
                    required
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="preferredTime" className="block font-paragraph font-semibold text-foreground mb-2">
                    Preferred Time *
                  </label>
                  <Input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="border-gray-300"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="clientNotes" className="block font-paragraph font-semibold text-foreground mb-2">
                    Additional Notes
                  </label>
                  <Textarea
                    id="clientNotes"
                    name="clientNotes"
                    value={formData.clientNotes}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your case or any specific concerns..."
                    className="border-gray-300 min-h-[120px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
                </Button>

                <p className="font-paragraph text-sm text-foreground/60 text-center">
                  * Required fields
                </p>
              </form>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  What to Expect
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Initial Consultation</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      30-minute consultation to discuss your case and understand your legal needs.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Approval Process</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Your appointment request will be reviewed by our team. We'll contact you to confirm once approved.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Next Steps</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      We'll outline your options and discuss the best path forward for your situation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Confidentiality</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      All consultations are confidential and protected by attorney-client privilege.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-pastelbeige">
                  <h4 className="font-heading font-bold text-foreground mb-4">Contact Information</h4>
                  <div className="space-y-3 font-paragraph text-foreground/80 text-sm">
                    <p>
                      <strong>Phone:</strong><br />
                      (555) 123-4567
                    </p>
                    <p>
                      <strong>Email:</strong><br />
                      info@legalservices.com
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
