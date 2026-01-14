import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { generateMeetingLink, generateZoomUrl, generateConfirmationToken } from '@/lib/meeting-utils';

interface MeetingRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  preferredDate?: Date | string;
  preferredTime?: any;
  serviceType?: string;
  clientNotes?: string;
  status?: string;
  approvalNotes?: string;
  meetingLink?: string;
  zoomUrl?: string;
  confirmationToken?: string;
}

interface MeetingRequestFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  clientNotes: string;
  password: string;
}

export default function MeetingRequestPage() {
  const [showPasswordForm, setShowPasswordForm] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const [formData, setFormData] = useState<MeetingRequestFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    preferredDate: '',
    preferredTime: '',
    serviceType: 'small-claims',
    clientNotes: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Verify password
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Simple password verification - in production, this should be more secure
    const correctPassword = 'MeetingRequest2025';

    if (password === correctPassword) {
      setIsPasswordVerified(true);
      setShowPasswordForm(false);
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

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
      const requestId = crypto.randomUUID();
      const meetingLink = generateMeetingLink(requestId);
      const zoomUrl = generateZoomUrl(requestId);
      const confirmationToken = generateConfirmationToken();

      const meetingRequest: MeetingRequests = {
        _id: requestId,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        serviceType: formData.serviceType,
        clientNotes: formData.clientNotes,
        status: 'pending',
        meetingLink,
        zoomUrl,
        confirmationToken,
      };

      await BaseCrudService.create('meetingrequests', meetingRequest);

      setSubmitStatus('success');
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        preferredDate: '',
        preferredTime: '',
        serviceType: 'small-claims',
        clientNotes: '',
        password: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit meeting request. Please try again.');
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
              Request a Meeting
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              Submit a meeting request that requires approval from our team. Your request will be reviewed and you'll receive confirmation once approved.
            </p>
          </div>
        </div>
      </section>

      {/* Meeting Request Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {showPasswordForm && !isPasswordVerified ? (
                // Password Protection Form
                <div className="max-w-md mx-auto">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-3 bg-primary text-white rounded-full">
                        <Lock className="w-6 h-6" />
                      </div>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-2">
                      Password Protected
                    </h2>
                    <p className="font-paragraph text-foreground/80 text-center mb-6">
                      This meeting request form is password protected. Please enter the password to continue.
                    </p>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      {passwordError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-heading font-bold text-red-900 mb-1">Error</h3>
                            <p className="font-paragraph text-red-800">{passwordError}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label htmlFor="password" className="block font-paragraph font-semibold text-foreground mb-2">
                          Password *
                        </label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="border-gray-300"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                      >
                        Unlock Form
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                // Meeting Request Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading font-bold text-green-900 mb-1">Request Submitted Successfully!</h3>
                        <p className="font-paragraph text-green-800">Your meeting request has been submitted for approval. We'll contact you shortly to confirm.</p>
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
                        <SelectItem value="landlord-tenant">Landlord & Tenant Board</SelectItem>
                        <SelectItem value="criminal">Criminal Matters</SelectItem>
                        <SelectItem value="human-rights">Human Rights Tribunal</SelectItem>
                        <SelectItem value="mediation">Mediation Services</SelectItem>
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
                      placeholder="Tell us more about your meeting request..."
                      className="border-gray-300 min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Meeting Request'}
                  </Button>

                  <p className="font-paragraph text-sm text-foreground/60 text-center">
                    * Required fields
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  About This Request
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Password Protected</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      This form is password protected to ensure only authorized individuals can submit meeting requests.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Approval Required</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      All meeting requests require approval from our team before confirmation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Confirmation</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Once your request is approved, you'll receive a confirmation email with meeting details.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Contact Support</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      If you have questions, please contact us at (555) 123-4567 or info@legalservices.com
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
