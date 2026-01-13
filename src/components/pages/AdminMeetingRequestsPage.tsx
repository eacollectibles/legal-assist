import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AlertCircle, CheckCircle, Clock, X, Lock } from 'lucide-react';
import { MeetingRequests } from '@/entities';

export default function AdminMeetingRequestsPage() {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [requests, setRequests] = useState<MeetingRequests[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MeetingRequests | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  // Verify password
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    const correctPassword = 'AdminAccess2025';

    if (password === correctPassword) {
      setIsPasswordVerified(true);
      loadRequests();
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // Load all meeting requests
  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<MeetingRequests>('meetingrequests');
      setRequests(items || []);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Approve request
  const handleApprove = async () => {
    if (!selectedRequest) return;

    setActionInProgress(true);
    try {
      await BaseCrudService.update<MeetingRequests>('meetingrequests', {
        _id: selectedRequest._id,
        status: 'approved',
        approvalNotes: approvalNotes,
      });

      // Update local state
      setRequests(requests.map(r =>
        r._id === selectedRequest._id
          ? { ...r, status: 'approved', approvalNotes }
          : r
      ));

      setSelectedRequest(null);
      setApprovalNotes('');
    } catch (error) {
      console.error('Failed to approve request:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  // Reject request
  const handleReject = async () => {
    if (!selectedRequest) return;

    setActionInProgress(true);
    try {
      await BaseCrudService.update<MeetingRequests>('meetingrequests', {
        _id: selectedRequest._id,
        status: 'rejected',
        approvalNotes: approvalNotes,
      });

      // Update local state
      setRequests(requests.map(r =>
        r._id === selectedRequest._id
          ? { ...r, status: 'rejected', approvalNotes }
          : r
      ));

      setSelectedRequest(null);
      setApprovalNotes('');
    } catch (error) {
      console.error('Failed to reject request:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  // Delete request
  const handleDelete = async (requestId: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    setActionInProgress(true);
    try {
      await BaseCrudService.delete('meetingrequests', requestId);
      setRequests(requests.filter(r => r._id !== requestId));
      if (selectedRequest?._id === requestId) {
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Failed to delete request:', error);
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
                  This page is password protected. Please enter the admin password to access meeting requests.
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
              Meeting Requests Admin
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              Review, approve, and manage meeting requests from clients.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Panel Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="font-paragraph text-foreground/80">Loading requests...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Requests List */}
              <div className="lg:col-span-2">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Meeting Requests ({requests.length})
                </h2>

                {requests.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="font-paragraph text-foreground/80">No meeting requests yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div
                        key={request._id}
                        onClick={() => setSelectedRequest(request)}
                        className={`p-6 rounded-lg border cursor-pointer transition-all ${
                          selectedRequest?._id === request._id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 bg-white hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              {request.clientName}
                            </h3>
                            <p className="font-paragraph text-sm text-foreground/60">
                              {request.clientEmail}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : request.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status?.toUpperCase() || 'PENDING'}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-paragraph text-foreground/60">Service Type</p>
                            <p className="font-paragraph font-semibold text-foreground">{request.serviceType}</p>
                          </div>
                          <div>
                            <p className="font-paragraph text-foreground/60">Preferred Date</p>
                            <p className="font-paragraph font-semibold text-foreground">
                              {request.preferredDate instanceof Date 
                                ? request.preferredDate.toLocaleDateString() 
                                : request.preferredDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Request Details */}
              <div className="lg:col-span-1">
                {selectedRequest ? (
                  <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige sticky top-8">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                      Request Details
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Name</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedRequest.clientName}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Email</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedRequest.clientEmail}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Phone</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedRequest.clientPhone}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Service Type</p>
                        <p className="font-paragraph font-semibold text-foreground">{selectedRequest.serviceType}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Preferred Date & Time</p>
                        <p className="font-paragraph font-semibold text-foreground">
                          {selectedRequest.preferredDate} at {selectedRequest.preferredTime}
                        </p>
                      </div>
                      {selectedRequest.clientNotes && (
                        <div>
                          <p className="font-paragraph text-sm text-foreground/60">Client Notes</p>
                          <p className="font-paragraph text-foreground">{selectedRequest.clientNotes}</p>
                        </div>
                      )}
                      {selectedRequest.approvalNotes && (
                        <div>
                          <p className="font-paragraph text-sm text-foreground/60">Approval Notes</p>
                          <p className="font-paragraph text-foreground">{selectedRequest.approvalNotes}</p>
                        </div>
                      )}
                      <div>
                        <p className="font-paragraph text-sm text-foreground/60">Status</p>
                        <p className={`font-paragraph font-semibold ${
                          selectedRequest.status === 'approved'
                            ? 'text-green-600'
                            : selectedRequest.status === 'rejected'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}>
                          {selectedRequest.status?.toUpperCase() || 'PENDING'}
                        </p>
                      </div>
                    </div>

                    {selectedRequest.status === 'pending' && (
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
                            {actionInProgress ? 'Processing...' : 'Approve Request'}
                          </Button>
                          <Button
                            onClick={handleReject}
                            disabled={actionInProgress}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2"
                          >
                            {actionInProgress ? 'Processing...' : 'Reject Request'}
                          </Button>
                        </div>
                      </>
                    )}

                    <Button
                      onClick={() => handleDelete(selectedRequest._id)}
                      disabled={actionInProgress}
                      variant="outline"
                      className="w-full mt-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete Request
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="font-paragraph text-foreground/80">Select a request to view details</p>
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
