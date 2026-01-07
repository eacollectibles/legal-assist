import { Bookings } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDateTime, canReschedule, canCancel } from '@/lib/meeting-utils';
import { useState } from 'react';

interface MeetingCardProps {
  booking: Bookings;
  onReschedule: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
}

export default function MeetingCard({ booking, onReschedule, onCancel }: MeetingCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (booking.meetingLink) {
      navigator.clipboard.writeText(booking.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyZoom = () => {
    if (booking.zoomUrl) {
      navigator.clipboard.writeText(booking.zoomUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const canRescheduleNow = canReschedule(booking.preferredDate || '', booking.preferredTime || '');
  const canCancelNow = canCancel(booking.preferredDate || '', booking.preferredTime || '');

  const statusColors = {
    pending: 'bg-yellow-50 border-yellow-200',
    confirmed: 'bg-green-50 border-green-200',
    rescheduled: 'bg-blue-50 border-blue-200',
    cancelled: 'bg-red-50 border-red-200',
  };

  const statusIcons = {
    pending: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    confirmed: <CheckCircle className="w-5 h-5 text-green-600" />,
    rescheduled: <Calendar className="w-5 h-5 text-blue-600" />,
    cancelled: <AlertCircle className="w-5 h-5 text-red-600" />,
  };

  const statusLabels = {
    pending: 'Pending Confirmation',
    confirmed: 'Confirmed',
    rescheduled: 'Rescheduled',
    cancelled: 'Cancelled',
  };

  const status = (booking.status || 'pending') as keyof typeof statusColors;

  return (
    <Card className={`p-6 border ${statusColors[status]}`}>
      {/* Header with Status */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-1">
            {booking.clientName}
          </h3>
          <div className="flex items-center gap-2">
            {statusIcons[status]}
            <span className="font-paragraph text-sm font-semibold text-foreground/70">
              {statusLabels[status]}
            </span>
          </div>
        </div>
      </div>

      {/* Meeting Details */}
      <div className="space-y-4 mb-6">
        {/* Date & Time */}
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-paragraph text-sm text-foreground/60">Date & Time</p>
            <p className="font-paragraph font-semibold text-foreground">
              {formatDateTime(booking.preferredDate || '', booking.preferredTime || '')}
            </p>
          </div>
        </div>

        {/* Service Type */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-paragraph text-sm text-foreground/60">Service Type</p>
            <p className="font-paragraph font-semibold text-foreground capitalize">
              {booking.serviceType?.replace('-', ' ')}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-paragraph text-sm text-foreground/60">Contact Information</p>
            <p className="font-paragraph text-sm text-foreground">{booking.clientEmail}</p>
            <p className="font-paragraph text-sm text-foreground">{booking.clientPhone}</p>
          </div>
        </div>

        {/* Meeting Links */}
        {booking.status === 'confirmed' && (
          <div className="space-y-3 pt-4 border-t border-foreground/10">
            {booking.meetingLink && (
              <div>
                <p className="font-paragraph text-sm text-foreground/60 mb-2">Meeting Link</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={booking.meetingLink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-foreground/20 rounded text-sm font-paragraph text-foreground/70"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
            )}

            {booking.zoomUrl && (
              <div>
                <p className="font-paragraph text-sm text-foreground/60 mb-2">Zoom Meeting</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={booking.zoomUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-foreground/20 rounded text-sm font-paragraph text-foreground/70"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyZoom}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {booking.clientNotes && (
          <div className="pt-4 border-t border-foreground/10">
            <p className="font-paragraph text-sm text-foreground/60 mb-2">Notes</p>
            <p className="font-paragraph text-sm text-foreground">{booking.clientNotes}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {booking.status !== 'cancelled' && (
        <div className="flex gap-3 pt-6 border-t border-foreground/10">
          {canRescheduleNow && (
            <Button
              variant="outline"
              onClick={() => onReschedule(booking._id)}
              className="flex-1"
            >
              Reschedule
            </Button>
          )}
          {canCancelNow && (
            <Button
              variant="outline"
              onClick={() => onCancel(booking._id)}
              className="flex-1 text-destructive hover:text-destructive"
            >
              Cancel
            </Button>
          )}
          {!canRescheduleNow && !canCancelNow && (
            <p className="font-paragraph text-sm text-foreground/60 py-2">
              Rescheduling and cancellations must be made at least 24 hours before the meeting.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
