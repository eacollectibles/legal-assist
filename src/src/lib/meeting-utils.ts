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
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    const timeParts = time?.split(':') || ['0', '0'];
    const hours = parseInt(timeParts[0] || '0', 10);
    const minutes = parseInt(timeParts[1] || '0', 10);
    
    dateObj.setHours(hours, minutes);
    
    return dateObj.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export const isUpcomingMeeting = (date: string | Date, time: string): boolean => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return false;
    }
    
    const timeParts = time?.split(':') || ['0', '0'];
    const hours = parseInt(timeParts[0] || '0', 10);
    const minutes = parseInt(timeParts[1] || '0', 10);
    
    dateObj.setHours(hours, minutes);
    return dateObj > new Date();
  } catch (error) {
    console.error('Error checking upcoming meeting:', error);
    return false;
  }
};

export const canReschedule = (date: string | Date, time: string): boolean => {
  try {
    // Can reschedule if meeting is more than 24 hours away
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return false;
    }
    
    const timeParts = time?.split(':') || ['0', '0'];
    const hours = parseInt(timeParts[0] || '0', 10);
    const minutes = parseInt(timeParts[1] || '0', 10);
    
    dateObj.setHours(hours, minutes);
    const hoursUntilMeeting = (dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    return hoursUntilMeeting > 24;
  } catch (error) {
    console.error('Error checking reschedule eligibility:', error);
    return false;
  }
};

export const canCancel = (date: string | Date, time: string): boolean => {
  // Can cancel if meeting is more than 24 hours away
  return canReschedule(date, time);
};
