/**
 * Meeting utilities for generating links and managing meeting data
 */

export const generateMeetingLink = (bookingId: string): string => {
  return `${window.location.origin}/meeting/${bookingId}`;
};

export const generateZoomUrl = (bookingId: string): string => {
  // In a real implementation, this would call a backend API to create a Zoom meeting
  // For now, we'll generate a placeholder URL
  return `https://zoom.us/meeting/${bookingId}`;
};

export const generateConfirmationToken = (): string => {
  return crypto.randomUUID();
};

export const formatDateTime = (date: string | Date, time: string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const [hours, minutes] = time.split(':');
  dateObj.setHours(parseInt(hours), parseInt(minutes));
  return dateObj.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isUpcomingMeeting = (date: string | Date, time: string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const [hours, minutes] = time.split(':');
  dateObj.setHours(parseInt(hours), parseInt(minutes));
  return dateObj > new Date();
};

export const canReschedule = (date: string | Date, time: string): boolean => {
  // Can reschedule if meeting is more than 24 hours away
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const [hours, minutes] = time.split(':');
  dateObj.setHours(parseInt(hours), parseInt(minutes));
  const hoursUntilMeeting = (dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60);
  return hoursUntilMeeting > 24;
};

export const canCancel = (date: string | Date, time: string): boolean => {
  // Can cancel if meeting is more than 24 hours away
  return canReschedule(date, time);
};
