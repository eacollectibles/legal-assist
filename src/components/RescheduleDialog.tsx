import { useState } from 'react';
import { Bookings } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

interface RescheduleDialogProps {
  booking: Bookings | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RescheduleDialog({ booking, isOpen, onClose, onSuccess }: RescheduleDialogProps) {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleReschedule = async () => {
    if (!newDate || !newTime) {
      setError('Please select both date and time');
      return;
    }

    if (!booking) return;

    setIsSubmitting(true);
    setError('');

    try {
      await BaseCrudService.update('bookings', {
        _id: booking._id,
        preferredDate: newDate,
        preferredTime: newTime,
        status: 'rescheduled',
      });

      onSuccess();
      onClose();
      setNewDate('');
      setNewTime('');
    } catch (err) {
      setError('Failed to reschedule meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Reschedule Meeting</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="newDate" className="block font-paragraph font-semibold text-foreground mb-2">
              New Date *
            </label>
            <Input
              id="newDate"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="newTime" className="block font-paragraph font-semibold text-foreground mb-2">
              New Time *
            </label>
            <Input
              id="newTime"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border-gray-300"
            />
          </div>

          <p className="font-paragraph text-sm text-foreground/60">
            A confirmation email will be sent to {booking?.clientEmail} with the new meeting details.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleReschedule}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isSubmitting ? 'Rescheduling...' : 'Confirm Reschedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
