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
import { AlertCircle } from 'lucide-react';

export default function MeetingDashboardPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
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

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-paragraph text-lg text-foreground/60 mb-6">
                You don't have any scheduled meetings yet.
              </p>
              <a
                href="/booking"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Schedule a Consultation
              </a>
            </div>
          ) : (
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
