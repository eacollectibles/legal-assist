import { useState } from 'react';
import { Bookings } from '@/entities';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

interface CancelDialogProps {
  booking: Bookings | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CancelDialog({ booking, isOpen, onClose, onSuccess }: CancelDialogProps) {
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = async () => {
    if (!booking) return;

    setIsSubmitting(true);
    setError('');

    try {
      await BaseCrudService.update('bookings', {
        _id: booking._id,
        status: 'cancelled',
        clientNotes: `Cancelled: ${cancellationReason || 'No reason provided'}`,
      });

      onSuccess();
      onClose();
      setCancellationReason('');
    } catch (err) {
      setError('Failed to cancel meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Cancel Meeting</DialogTitle>
          <DialogDescription className="font-paragraph text-foreground/70">
            Are you sure you want to cancel this meeting? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="reason" className="block font-paragraph font-semibold text-foreground mb-2">
              Reason for Cancellation (Optional)
            </label>
            <Textarea
              id="reason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Tell us why you're cancelling..."
              className="border-gray-300 min-h-[100px]"
            />
          </div>

          <p className="font-paragraph text-sm text-foreground/60">
            A cancellation confirmation will be sent to {booking?.clientEmail}.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Keep Meeting
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isSubmitting ? 'Cancelling...' : 'Cancel Meeting'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
