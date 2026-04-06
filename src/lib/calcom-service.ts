/**
 * Cal.com API Service
 * Fetches bookings from Cal.com and maps them to the appointment format
 * used in the paralegal dashboard.
 *
 * Cal.com API docs: https://cal.com/docs/api-reference/v2
 */

export interface CalComBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: 'ACCEPTED' | 'PENDING' | 'CANCELLED' | 'REJECTED';
  location?: string;
  meetingUrl?: string;
  metadata?: Record<string, unknown>;
  attendees: Array<{
    id: number;
    email: string;
    name: string;
    timeZone: string;
    locale?: string;
    phone?: string;
  }>;
  user?: {
    email: string;
    name: string;
    timeZone: string;
  };
  eventType?: {
    id: number;
    title: string;
    slug: string;
    length: number;
    description?: string;
  };
  references?: Array<{
    type: string;
    meetingUrl?: string;
    meetingId?: string;
    meetingPassword?: string;
  }>;
}

export interface CalComAppointment {
  _id: string;
  calcomId: number;
  calcomUid: string;
  title: string;
  description?: string;
  type: string;
  eventDate: string;
  eventTime: string;
  endTime: string;
  duration: number; // minutes
  status: string;
  priority: string;
  location: string;
  meetingUrl: string;
  zoomLink: string;
  zoomPassword: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientTimezone: string;
  paralegalName: string;
  paralegalEmail: string;
  notes: string;
  source: 'calcom';
}

/**
 * Maps Cal.com status to our dashboard status
 */
function mapStatus(calStatus: string): string {
  switch (calStatus) {
    case 'ACCEPTED': return 'Confirmed';
    case 'PENDING': return 'Pending';
    case 'CANCELLED': return 'Cancelled';
    case 'REJECTED': return 'Cancelled';
    default: return 'Pending';
  }
}

/**
 * Extracts the Zoom or meeting URL from Cal.com booking data
 */
function extractMeetingUrl(booking: CalComBooking): { meetingUrl: string; zoomLink: string; zoomPassword: string } {
  let meetingUrl = booking.meetingUrl || '';
  let zoomLink = '';
  let zoomPassword = '';

  // Check references array for Zoom/Meet details
  if (booking.references && booking.references.length > 0) {
    for (const ref of booking.references) {
      if (ref.meetingUrl) {
        meetingUrl = ref.meetingUrl;
        if (ref.meetingUrl.includes('zoom.us')) {
          zoomLink = ref.meetingUrl;
          zoomPassword = ref.meetingPassword || '';
        }
      }
    }
  }

  // Check location field for URL
  if (!meetingUrl && booking.location) {
    if (booking.location.startsWith('http')) {
      meetingUrl = booking.location;
      if (booking.location.includes('zoom.us')) {
        zoomLink = booking.location;
      }
    }
  }

  // Check metadata for integrations
  if (!meetingUrl && booking.metadata) {
    const meta = booking.metadata as any;
    if (meta.videoCallUrl) meetingUrl = meta.videoCallUrl;
    if (meta.hangoutLink) meetingUrl = meta.hangoutLink;
  }

  return { meetingUrl, zoomLink, zoomPassword };
}

/**
 * Fetches all bookings from Cal.com API v2
 */
export async function fetchCalComBookings(apiKey: string): Promise<CalComAppointment[]> {
  if (!apiKey) {
    console.warn('Cal.com API key not configured');
    return [];
  }

  try {
    // Fetch bookings from the past 30 days to 90 days ahead
    const now = new Date();
    const afterDate = new Date(now);
    afterDate.setDate(afterDate.getDate() - 30);
    const beforeDate = new Date(now);
    beforeDate.setDate(beforeDate.getDate() + 90);

    const params = new URLSearchParams({
      afterStart: afterDate.toISOString(),
      beforeEnd: beforeDate.toISOString(),
      status: 'upcoming',
    });

    // Cal.com API v1 endpoint (most widely supported)
    const response = await fetch(`https://api.cal.com/v1/bookings?${params.toString()}&apiKey=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Cal.com API error:', response.status, errText);

      // If v1 fails, try v2
      if (response.status === 404 || response.status === 401) {
        return await fetchCalComBookingsV2(apiKey, afterDate, beforeDate);
      }
      return [];
    }

    const data = await response.json();
    const bookings: CalComBooking[] = data.bookings || data || [];

    return bookings.map(mapCalComBooking);
  } catch (error) {
    console.error('Error fetching Cal.com bookings:', error);
    return [];
  }
}

/**
 * Fallback: Cal.com API v2 format
 */
async function fetchCalComBookingsV2(apiKey: string, afterDate: Date, beforeDate: Date): Promise<CalComAppointment[]> {
  try {
    const response = await fetch('https://api.cal.com/v2/bookings', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'cal-api-version': '2024-08-13',
      },
    });

    if (!response.ok) {
      console.error('Cal.com v2 API error:', response.status);
      return [];
    }

    const data = await response.json();
    const bookings: CalComBooking[] = data.data || data.bookings || [];
    return bookings.map(mapCalComBooking);
  } catch (error) {
    console.error('Error fetching Cal.com v2 bookings:', error);
    return [];
  }
}

/**
 * Maps a single Cal.com booking to our CalComAppointment format
 */
function mapCalComBooking(booking: CalComBooking): CalComAppointment {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);
  const durationMs = end.getTime() - start.getTime();
  const durationMin = Math.round(durationMs / 60000);

  const { meetingUrl, zoomLink, zoomPassword } = extractMeetingUrl(booking);

  const attendee = booking.attendees?.[0];
  const location = booking.location || (zoomLink ? 'Zoom Meeting' : meetingUrl ? 'Virtual Meeting' : 'TBD');

  return {
    _id: `calcom-${booking.id}`,
    calcomId: booking.id,
    calcomUid: booking.uid,
    title: booking.title || booking.eventType?.title || 'Consultation',
    description: booking.description || booking.eventType?.description || '',
    type: 'Cal.com Booking',
    eventDate: start.toISOString(),
    eventTime: start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    endTime: end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    duration: durationMin || booking.eventType?.length || 30,
    status: mapStatus(booking.status),
    priority: 'Medium',
    location,
    meetingUrl,
    zoomLink,
    zoomPassword,
    clientName: attendee?.name || 'Unknown',
    clientEmail: attendee?.email || '',
    clientPhone: attendee?.phone || '',
    clientTimezone: attendee?.timeZone || '',
    paralegalName: booking.user?.name || 'Johnny Demers',
    paralegalEmail: booking.user?.email || '',
    notes: booking.description || '',
    source: 'calcom',
  };
}
