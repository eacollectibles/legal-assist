import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AlertCircle, CheckCircle, Clock, X, Lock } from 'lucide-react';
import { Bookings } from '@/entities';

export default function AdminBookingsPage() {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  // Verify password
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    const correctPassword = 'AdminAccess2025';

    if (password === correctPassword) {
      setIsPasswordVerified(true);
      loadBookings();
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // Load all bookings
  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<Bookings>('bookings');
      setBookings(items || []);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Approve booking
  const handleApprove = async () => {
    if (!selectedBooking) return;

    setActionInProgress(true);
    try {
      await BaseCrudService.update<Bookings>('bookings', {
        _id: selectedBooking._id,
        status: 'approved',
        approvalNotes: approvalNotes,
      });

      // Update local state
      setBookings(bookings.map(b =>
        b._id === selectedBooking._id
          ? { ...b, status: 'approved', approvalNotes }
          : b
      ));

      setSelectedBooking(null);
      setApprovalNotes('');
    } catch (error) {
      console.error('Failed to approve booking:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  // Reject booking
  const handleReject = async () => {
    if (!selectedBooking) return;

    setActionInProgress(true);
    try {
      await BaseCrudService.update<Bookings>('bookings', {
        _id: selectedBooking._id,
        status: 'rejected',
        approvalNotes: approvalNotes,
      });

      // Update local state
      setBookings(bookings.map(b =>
        b._id === selectedBooking._id
          ? { ...b, status: 'rejected', approvalNotes }
          : b
      ));

      setSelectedBooking(null);
      setApprovalNotes('');
    } catch (error) {
      console.error('Failed to reject booking:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  // Delete booking
  const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    setActionInProgress(true);
    try {
      await BaseCrudService.delete('bookings', bookingId);
      setBookings(bookings.filter(b => b._id !== bookingId));
      if (selectedBooking?._id === bookingId) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  if (!isPasswordVerified) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="max-w-md mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-primary text-white rounded-full">
                    <Lock className="w-6 h-6" />
                  </div>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-2">
                  Admin Access
                </h2>
                <p className="font-paragraph text-foreground/80 text-center mb-6">
                  This page is password protected. Please enter the admin password to access bookings.
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
                      Admin Password *
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  >
                    Access Admin Panel
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Bookings Admin
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              Review, approve, and manage appointment bookings from clients.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Panel Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="font-paragraph text-foreground/80">Loading bookings...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bookings List */}
              <div className="lg:col-span-2">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Appointment Bookings ({bookings.length})
                </h2>

                {bookings.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="font-paragraph text-foreground/80">No bookings yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`p-6 rounded-lg border cursor-pointer transition-all ${
                          selectedBooking?._id === booking._id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 bg-white hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              {booking.clientName}
                            </h3>
                            <p className="font-paragraph text-sm text-foreground/60">
                              {booking.clientEmail}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status?.toUpperCase() || 'PENDING'}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-paragraph text-foreground/60">Service Type</p>
                            <p className="font-paragraph font-semibold text-foreground">{booking.serviceType}</p>
                          </div>
                          <div>
                            <p className="font-paragraph text-foreground/60">Preferred Date</p>
                            <p className="font-paragraph font-semibold text-foreground">
                              {booking.preferredDate instanceof Date 
                                ? booking.preferredDate.toLocaleDateString() 
                                : booking.preferredDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Booking Details */}
              <div className="lg:col-span-1">
                {selectedBooking ? (
                  <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige sticky top-8">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                      Booking Details
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Name</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedBooking.clientName}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Email</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedBooking.clientEmail}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Phone</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedBooking.clientPhone}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Service Type</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedBooking.serviceType}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Preferred Date & Time</p>
                        <p className="font-paragraph font-semibold text-foreground">
                          {selectedBooking.preferredDate} at {selectedBooking.preferredTime}
                        </p>
                      </div>
                      {selectedBooking.clientNotes && (
                        <div>
                          <p className="font-paragraph text-sm text-foreground/60">Client Notes</p>
                          <p className="font-paragraph text-foreground">{selectedBooking.clientNotes}</p>
                        </div>
                      )}
                      {selectedBooking.approvalNotes && (
                        <div>
                          <p className="font-paragraph text-sm text-foreground/60">Approval Notes</p>
                          <p className="font-paragraph text-foreground">{selectedBooking.approvalNotes}</p>
                        </div>
                      )}
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Status</p>
                        <p className={`font-paragraph font-semibold ${
                          selectedBooking.status === 'approved'
                            ? 'text-green-600'
                            : selectedBooking.status === 'rejected'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}>
                          {selectedBooking.status?.toUpperCase() || 'PENDING'}
                        </p>
                      </div>
                    </div>

                    {selectedBooking.status === 'pending' && (
                      <>
                        <div className="mb-4">
                          <label className="block font-paragraph font-semibold text-foreground mb-2">
                            Approval Notes
                          </label>
                          <Textarea
                            value={approvalNotes}
                            onChange={(e) => setApprovalNotes(e.target.value)}
                            placeholder="Add notes for approval or rejection..."
                            className="border-gray-300 min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Button
                            onClick={handleApprove}
                            disabled={actionInProgress}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
                          >
                            {actionInProgress ? 'Processing...' : 'Approve Booking'}
                          </Button>
                          <Button
                            onClick={handleReject}
                            disabled={actionInProgress}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2"
                          >
                            {actionInProgress ? 'Processing...' : 'Reject Booking'}
                          </Button>
                        </div>
                      </>
                    )}

                    <Button
                      onClick={() => handleDelete(selectedBooking._id)}
                      disabled={actionInProgress}
                      variant="outline"
                      className="w-full mt-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete Booking
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="font-paragraph text-foreground/80">Select a booking to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
