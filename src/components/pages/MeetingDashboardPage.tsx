import { useState, useEffect } from 'react';
import { Bookings } from '@/entities';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MeetingCard from '@/components/MeetingCard';
import RescheduleDialog from '@/components/RescheduleDialog';
import CancelDialog from '@/components/CancelDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { generateMeetingLink, generateZoomUrl, generateConfirmationToken } from '@/lib/meeting-utils';

interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  clientNotes: string;
}

export default function MeetingDashboardPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
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
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { items } = await BaseCrudService.getAll<Bookings>('bookings');
      setBookings(items);
    } catch (err) {
      setError('Failed to load meetings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedule = (bookingId: string) => {
    const booking = bookings.find(b => b._id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setRescheduleDialogOpen(true);
    }
  };

  const handleCancel = (bookingId: string) => {
    const booking = bookings.find(b => b._id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setCancelDialogOpen(true);
    }
  };

  const handleSuccess = () => {
    setSuccessMessage('Meeting updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    loadBookings();
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

      setTimeout(() => {
        setSubmitStatus('idle');
        setShowBookingForm(false);
        loadBookings();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const rescheduledBookings = bookings.filter(b => b.status === 'rescheduled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Meetings
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              View and manage your scheduled consultations
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 mb-8">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-red-900 mb-1">Error</h3>
                <p className="font-paragraph text-red-800">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 mb-8">
              <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-green-800">{successMessage}</p>
            </div>
          )}

          {/* New Booking Form Section */}
          {showBookingForm && (
            <div className="mb-12 p-8 bg-pastelbeige/10 border border-pastelbeige rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-3xl text-secondary">Schedule a New Consultation</h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-secondary/60 hover:text-secondary text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-green-900 mb-1">Booking Submitted Successfully!</h3>
                      <p className="font-paragraph text-green-800">We'll contact you shortly to confirm your consultation appointment.</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="clientName" className="block font-paragraph font-semibold text-secondary mb-2">
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
                    <label htmlFor="clientEmail" className="block font-paragraph font-semibold text-secondary mb-2">
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
                    <label htmlFor="clientPhone" className="block font-paragraph font-semibold text-secondary mb-2">
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
                    <label htmlFor="serviceType" className="block font-paragraph font-semibold text-secondary mb-2">
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
                    <label htmlFor="preferredDate" className="block font-paragraph font-semibold text-secondary mb-2">
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
                    <label htmlFor="preferredTime" className="block font-paragraph font-semibold text-secondary mb-2">
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
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="clientNotes" className="block font-paragraph font-semibold text-secondary mb-2">
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
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-secondary/10 hover:bg-secondary/20 text-secondary font-semibold py-3 px-6 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>

                <p className="font-paragraph text-sm text-secondary/60 text-center">
                  * Required fields
                </p>
              </form>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-paragraph text-lg text-foreground/60 mb-6">
                You don't have any scheduled meetings yet.
              </p>
              <button
                onClick={() => setShowBookingForm(true)}
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Schedule a Consultation
              </button>
            </div>
          ) : (
            <>
              {!showBookingForm && (
                <div className="mb-8">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition"
                  >
                    + Schedule New Consultation
                  </button>
                </div>
              )}

              <Tabs defaultValue="confirmed" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="confirmed">
                    Confirmed {confirmedBookings.length > 0 && `(${confirmedBookings.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending {pendingBookings.length > 0 && `(${pendingBookings.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="rescheduled">
                    Rescheduled {rescheduledBookings.length > 0 && `(${rescheduledBookings.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="cancelled">
                    Cancelled {cancelledBookings.length > 0 && `(${cancelledBookings.length})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="confirmed" className="space-y-4">
                  {confirmedBookings.length === 0 ? (
                    <p className="font-paragraph text-foreground/60 text-center py-8">
                      No confirmed meetings
                    </p>
                  ) : (
                    confirmedBookings.map(booking => (
                      <MeetingCard
                        key={booking._id}
                        booking={booking}
                        onReschedule={handleReschedule}
                        onCancel={handleCancel}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {pendingBookings.length === 0 ? (
                    <p className="font-paragraph text-foreground/60 text-center py-8">
                      No pending meetings
                    </p>
                  ) : (
                    pendingBookings.map(booking => (
                      <MeetingCard
                        key={booking._id}
                        booking={booking}
                        onReschedule={handleReschedule}
                        onCancel={handleCancel}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="rescheduled" className="space-y-4">
                  {rescheduledBookings.length === 0 ? (
                    <p className="font-paragraph text-foreground/60 text-center py-8">
                      No rescheduled meetings
                    </p>
                  ) : (
                    rescheduledBookings.map(booking => (
                      <MeetingCard
                        key={booking._id}
                        booking={booking}
                        onReschedule={handleReschedule}
                        onCancel={handleCancel}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="cancelled" className="space-y-4">
                  {cancelledBookings.length === 0 ? (
                    <p className="font-paragraph text-foreground/60 text-center py-8">
                      No cancelled meetings
                    </p>
                  ) : (
                    cancelledBookings.map(booking => (
                      <MeetingCard
                        key={booking._id}
                        booking={booking}
                        onReschedule={handleReschedule}
                        onCancel={handleCancel}
                      />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>

      {/* Dialogs */}
      <RescheduleDialog
        booking={selectedBooking}
        isOpen={rescheduleDialogOpen}
        onClose={() => {
          setRescheduleDialogOpen(false);
          setSelectedBooking(null);
        }}
        onSuccess={handleSuccess}
      />

      <CancelDialog
        booking={selectedBooking}
        isOpen={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false);
          setSelectedBooking(null);
        }}
        onSuccess={handleSuccess}
      />

      <Footer />
    </div>
  );
}
