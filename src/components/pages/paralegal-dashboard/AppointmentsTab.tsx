import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar, Clock, User, Plus, AlertCircle, Video, ExternalLink,
  Phone, Mail, Globe, Copy, CheckCircle, RefreshCw, Timer, MapPin,
  Pencil, Trash2, MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { useParalegalDashboard } from './ParalegalDashboardContext';
import { getClientName, getParalegalName, getPriorityColor, getStatusColor, type Appointment } from './types';

export default function AppointmentsTab() {
  const {
    appointments,
    clients,
    paralegals,
    isLoading,
    setAppointments,
    refreshData
  } = useParalegalDashboard();

  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);
  const [calcomBookings, setCalcomBookings] = useState<Appointment[]>([]);
  const [calcomLoading, setCalcomLoading] = useState(true);
  const [calcomError, setCalcomError] = useState('');
  const [copiedLink, setCopiedLink] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    type: 'Appointment',
    eventDate: '',
    eventTime: '',
    clientId: '',
    assignedParalegalId: '',
    status: 'Pending',
    priority: 'Medium',
    location: '',
    notes: ''
  });

  // Auto-sync Cal.com bookings on page load
  useEffect(() => {
    fetchCalcomBookings();
  }, []);

  const [calcomSyncSuccess, setCalcomSyncSuccess] = useState(false);

  const fetchCalcomBookings = async () => {
    setCalcomLoading(true);
    setCalcomError('');
    setCalcomSyncSuccess(false);
    try {
      const response = await fetch('/api/calcom-bookings.json');

      if (!response.ok) {
        setCalcomError(`Server returned ${response.status}. The Cal.com API endpoint may not be deployed or accessible.`);
        setCalcomLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success && data.bookings?.length > 0) {
        const mapped: Appointment[] = data.bookings.map((b: any) => ({
          _id: b._id,
          title: b.title,
          description: b.description,
          type: b.type || 'Cal.com Booking',
          eventDate: b.eventDate,
          eventTime: b.eventTime,
          endTime: b.endTime,
          duration: b.duration,
          status: b.status,
          priority: b.priority || 'Medium',
          location: b.location,
          meetingUrl: b.meetingUrl,
          zoomLink: b.zoomLink,
          zoomPassword: b.zoomPassword,
          clientName: b.clientName,
          clientEmail: b.clientEmail,
          clientPhone: b.clientPhone,
          clientTimezone: b.clientTimezone,
          paralegalName: b.paralegalName,
          paralegalEmail: b.paralegalEmail,
          notes: b.notes,
          source: 'calcom' as const,
          calcomId: b.calcomId,
          calcomUid: b.calcomUid,
        }));
        setCalcomBookings(mapped);
        setCalcomSyncSuccess(true);
        setTimeout(() => setCalcomSyncSuccess(false), 5000);
      } else if (data.success && (!data.bookings || data.bookings.length === 0)) {
        // API key works but no bookings found
        setCalcomBookings([]);
        setCalcomSyncSuccess(true);
        setTimeout(() => setCalcomSyncSuccess(false), 5000);
      } else if (!data.success && data.error) {
        if (data.error.includes('not configured')) {
          setCalcomError('Cal.com API key is not configured on the server. Please add CALCOM_API_KEY to your Wix Secrets Manager (for production) or .env.local (for local development).');
        } else {
          setCalcomError(data.error);
        }
      }
    } catch (err: any) {
      console.error('Error fetching Cal.com bookings:', err);
      setCalcomError('Could not connect to the Cal.com sync endpoint. Make sure the /api/calcom-bookings.json endpoint is deployed and accessible.');
    } finally {
      setCalcomLoading(false);
    }
  };

  // Merge manual appointments with Cal.com bookings
  const allAppointments: Appointment[] = [
    ...appointments.map(a => ({ ...a, source: 'manual' as const })),
    ...calcomBookings,
  ];

  const upcomingAppointments = allAppointments
    .filter(a => a.status !== 'Cancelled' && a.status !== 'Completed')
    .sort((a, b) => {
      const dateA = new Date(a.eventDate || 0).getTime();
      const dateB = new Date(b.eventDate || 0).getTime();
      return dateA - dateB;
    });

  const handleAddAppointment = async () => {
    try {
      await BaseCrudService.create('appointments', {
        _id: crypto.randomUUID(),
        ...newAppointment
      });

      setIsAddAppointmentOpen(false);
      setNewAppointment({
        title: '',
        type: 'Appointment',
        eventDate: '',
        eventTime: '',
        clientId: '',
        assignedParalegalId: '',
        status: 'Pending',
        priority: 'Medium',
        location: '',
        notes: ''
      });
      refreshData();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    // Cal.com bookings are read-only from this dashboard
    if (appointmentId.startsWith('calcom-')) {
      alert('Cal.com bookings must be managed from Cal.com. This change won\'t persist.');
      return;
    }
    try {
      await BaseCrudService.update('appointments', { _id: appointmentId, status: newStatus } as any);
      setAppointments(prev =>
        prev.map(a => a._id === appointmentId ? { ...a, status: newStatus } : a)
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleEditAppointment = async () => {
    if (!editingAppointment) return;
    if (editingAppointment.source === 'calcom') {
      alert('Cal.com bookings must be managed from Cal.com.');
      return;
    }
    try {
      await BaseCrudService.update('appointments', editingAppointment as any);
      setAppointments(prev =>
        prev.map(a => a._id === editingAppointment._id ? { ...editingAppointment } : a)
      );
      setIsEditOpen(false);
      setEditingAppointment(null);
    } catch (error) {
      console.error('Error editing appointment:', error);
    }
  };

  const handleDeleteAppointment = async () => {
    if (!deletingAppointment) return;
    if (deletingAppointment.source === 'calcom') {
      alert('Cal.com bookings must be managed from Cal.com.');
      return;
    }
    try {
      await BaseCrudService.delete('appointments', deletingAppointment._id);
      setAppointments(prev => prev.filter(a => a._id !== deletingAppointment._id));
      setIsDeleteOpen(false);
      setDeletingAppointment(null);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Helper to parse Cal.com title to extract a cleaner display name
  const getDisplayTitle = (appointment: Appointment): string => {
    if (!appointment.title) return 'Untitled';
    // Cal.com titles are like "30 min meeting between X and Y"
    const match = appointment.title.match(/^(\d+\s*min)\s+meeting\s+between\s+(.+?)\s+and\s+(.+)$/i);
    if (match) {
      const [, duration, name1, name2] = match;
      // If both names are the same (self-booking), just show one
      if (name1.trim().toLowerCase() === name2.trim().toLowerCase()) {
        return `${duration} Meeting`;
      }
      return `${duration} Meeting — ${name2.trim()}`;
    }
    return appointment.title;
  };

  const getBookedWithName = (appointment: Appointment): string | null => {
    if (!appointment.title) return null;
    const match = appointment.title.match(/^(\d+\s*min)\s+meeting\s+between\s+(.+?)\s+and\s+(.+)$/i);
    if (match) {
      const [, , name1, name2] = match;
      if (name1.trim().toLowerCase() !== name2.trim().toLowerCase()) {
        return name2.trim();
      }
    }
    return null;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLink(label);
      setTimeout(() => setCopiedLink(''), 2000);
    });
  };

  const getAppointmentStatusColor = (status?: string): string => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-green-500 text-white';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-600';
      default: return getStatusColor(status);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">
          Upcoming Appointments & Deadlines
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCalcomBookings}
            disabled={calcomLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${calcomLoading ? 'animate-spin' : ''}`} />
            Sync Cal.com
          </Button>
          <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Appointment/Deadline</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newAppointment.title}
                    onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                    placeholder="e.g., Court Hearing, Filing Deadline"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newAppointment.type}
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appointment">Appointment</SelectItem>
                        <SelectItem value="Deadline">Deadline</SelectItem>
                        <SelectItem value="Court Date">Court Date</SelectItem>
                        <SelectItem value="Filing Deadline">Filing Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newAppointment.priority}
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={newAppointment.eventDate}
                      onChange={(e) => setNewAppointment({ ...newAppointment, eventDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Time</Label>
                    <Input
                      id="eventTime"
                      type="time"
                      value={newAppointment.eventTime}
                      onChange={(e) => setNewAppointment({ ...newAppointment, eventTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientId">Client</Label>
                  <Select
                    value={newAppointment.clientId}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, clientId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client._id} value={client._id}>
                          {client.firstName} {client.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedParalegalId">Assigned Paralegal</Label>
                  <Select
                    value={newAppointment.assignedParalegalId}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, assignedParalegalId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select paralegal" />
                    </SelectTrigger>
                    <SelectContent>
                      {paralegals.map((paralegal) => (
                        <SelectItem key={paralegal._id} value={paralegal._id}>
                          {paralegal.firstName} {paralegal.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newAppointment.location}
                    onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                    placeholder="e.g., Courtroom 3, Virtual Meeting"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Additional details..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleAddAppointment} className="w-full">
                  Create Appointment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cal.com sync status */}
      {calcomError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{calcomError}</span>
        </div>
      )}

      {calcomSyncSuccess && calcomBookings.length === 0 && !calcomError && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-sm text-green-700">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>Cal.com sync complete — no upcoming bookings found.</span>
        </div>
      )}

      {calcomBookings.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2 text-sm text-blue-700">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>{calcomBookings.length} booking{calcomBookings.length !== 1 ? 's' : ''} synced from Cal.com</span>
        </div>
      )}

      {/* Appointments list */}
      <div className="grid gap-4" style={{ minHeight: '400px' }}>
        {(isLoading && calcomLoading) ? null : upcomingAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-foreground/40 mb-4" />
              <p className="font-paragraph text-lg text-foreground/60">
                No upcoming appointments or deadlines
              </p>
              {calcomBookings.length === 0 && (
                <p className="font-paragraph text-sm text-foreground/40 mt-2">
                  Cal.com bookings will appear here once your API key is configured
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          upcomingAppointments.map((appointment) => {
            const isCalcom = appointment.source === 'calcom';
            const isExpanded = expandedCard === appointment._id;
            const bookedWith = isCalcom ? getBookedWithName(appointment) : null;

            return (
              <Card
                key={appointment._id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setExpandedCard(isExpanded ? null : appointment._id)}
              >
                <CardContent className="p-4">
                  {/* Compact row: title + badges + date + actions */}
                  <div className="flex items-center gap-3">
                    {/* Left: title & meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-semibold text-sm truncate">
                          {isCalcom ? getDisplayTitle(appointment) : (appointment.title || 'Untitled')}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{appointment.type}</Badge>
                        {isCalcom && (
                          <Badge className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0 gap-0.5">
                            <Calendar className="h-2.5 w-2.5" />
                            Cal.com
                          </Badge>
                        )}
                        <Badge className={`text-[10px] px-1.5 py-0 ${getAppointmentStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </Badge>
                        <Badge className={`text-[10px] px-1.5 py-0 ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-foreground/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {appointment.eventDate ? format(new Date(appointment.eventDate), 'MMM d, yyyy') : 'No date'}
                        </span>
                        {appointment.eventTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.eventTime}{appointment.endTime ? ` — ${appointment.endTime}` : ''}
                          </span>
                        )}
                        {appointment.duration && (
                          <span className="flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            {appointment.duration}min
                          </span>
                        )}
                        {/* Show who the booking is with */}
                        {isCalcom && (appointment.paralegalName || bookedWith) && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            with {bookedWith || appointment.paralegalName}
                          </span>
                        )}
                        {!isCalcom && appointment.clientId && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {getClientName(clients, appointment.clientId)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: action buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                      {/* Meeting link quick-join */}
                      {isCalcom && (appointment.zoomLink || appointment.meetingUrl) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          title="Join Meeting"
                          onClick={() => window.open(appointment.zoomLink || appointment.meetingUrl, '_blank')}
                        >
                          <Video className="h-3.5 w-3.5 text-blue-600" />
                        </Button>
                      )}
                      {isCalcom && appointment.calcomUid && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          title="View on Cal.com"
                          onClick={() => window.open(`https://app.cal.com/bookings/${appointment.calcomUid}`, '_blank')}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {!isCalcom && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            title="Edit"
                            onClick={() => { setEditingAppointment({ ...appointment }); setIsEditOpen(true); }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                            title="Delete"
                            onClick={() => { setDeletingAppointment(appointment); setIsDeleteOpen(true); }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                      {!isCalcom && appointment.status === 'Pending' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-green-700 hover:bg-green-50"
                          onClick={() => handleUpdateAppointmentStatus(appointment._id, 'Completed')}
                        >
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Done
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t space-y-2 text-sm" onClick={e => e.stopPropagation()}>
                      {/* Location */}
                      {appointment.location && (
                        <div className="flex items-center gap-2 text-foreground/70">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{appointment.location}</span>
                        </div>
                      )}

                      {/* Cal.com client details */}
                      {isCalcom && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-foreground/70">
                          {appointment.clientName && (
                            <span className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" /> {appointment.clientName}
                            </span>
                          )}
                          {appointment.clientEmail && (
                            <a href={`mailto:${appointment.clientEmail}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                              <Mail className="h-3.5 w-3.5" /> {appointment.clientEmail}
                            </a>
                          )}
                          {appointment.clientPhone && (
                            <a href={`tel:${appointment.clientPhone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                              <Phone className="h-3.5 w-3.5" /> {appointment.clientPhone}
                            </a>
                          )}
                          {appointment.clientTimezone && (
                            <span className="flex items-center gap-1">
                              <Globe className="h-3.5 w-3.5" /> {appointment.clientTimezone}
                            </span>
                          )}
                          {appointment.paralegalName && (
                            <span className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" /> Paralegal: {appointment.paralegalName}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Manual appointment client/paralegal */}
                      {!isCalcom && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-foreground/70">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" /> Client: {getClientName(clients, appointment.clientId)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" /> Paralegal: {getParalegalName(paralegals, appointment.assignedParalegalId)}
                          </span>
                        </div>
                      )}

                      {/* Meeting links */}
                      {isCalcom && (appointment.zoomLink || appointment.meetingUrl) && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="h-7 text-xs gap-1"
                            onClick={() => window.open(appointment.zoomLink || appointment.meetingUrl, '_blank')}
                          >
                            <Video className="h-3 w-3" />
                            {appointment.zoomLink ? 'Join Zoom' : 'Join Meeting'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1"
                            onClick={() => copyToClipboard((appointment.zoomLink || appointment.meetingUrl)!, appointment._id)}
                          >
                            {copiedLink === appointment._id ? <CheckCircle className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                            {copiedLink === appointment._id ? 'Copied!' : 'Copy Link'}
                          </Button>
                          {appointment.zoomPassword && (
                            <span className="text-xs text-foreground/60">
                              Password: <code className="bg-gray-100 px-1 rounded font-mono">{appointment.zoomPassword}</code>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Notes */}
                      {(appointment.notes || appointment.description) && (
                        <p className="text-foreground/70 text-xs">
                          <strong>Notes:</strong> {appointment.notes || appointment.description}
                        </p>
                      )}

                      {/* Status actions for manual */}
                      {!isCalcom && appointment.status === 'Pending' && (
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleUpdateAppointmentStatus(appointment._id, 'Completed')}
                          >
                            Mark Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => handleUpdateAppointmentStatus(appointment._id, 'Cancelled')}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {editingAppointment && (
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label htmlFor="edit-title" className="text-sm">Title</Label>
                <Input
                  id="edit-title"
                  value={editingAppointment.title || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="edit-type" className="text-sm">Type</Label>
                  <Select
                    value={editingAppointment.type || 'Appointment'}
                    onValueChange={(value) => setEditingAppointment({ ...editingAppointment, type: value })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Appointment">Appointment</SelectItem>
                      <SelectItem value="Deadline">Deadline</SelectItem>
                      <SelectItem value="Court Date">Court Date</SelectItem>
                      <SelectItem value="Filing Deadline">Filing Deadline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-priority" className="text-sm">Priority</Label>
                  <Select
                    value={editingAppointment.priority || 'Medium'}
                    onValueChange={(value) => setEditingAppointment({ ...editingAppointment, priority: value })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="edit-date" className="text-sm">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingAppointment.eventDate ? String(editingAppointment.eventDate).slice(0, 10) : ''}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, eventDate: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-time" className="text-sm">Time</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editingAppointment.eventTime || ''}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, eventTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-status" className="text-sm">Status</Label>
                <Select
                  value={editingAppointment.status || 'Pending'}
                  onValueChange={(value) => setEditingAppointment({ ...editingAppointment, status: value })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-location" className="text-sm">Location</Label>
                <Input
                  id="edit-location"
                  value={editingAppointment.location || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, location: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-notes" className="text-sm">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingAppointment.notes || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, notes: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleEditAppointment} className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Appointment</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-foreground/70 py-2">
            Are you sure you want to delete <strong>{deletingAppointment?.title || 'this appointment'}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleDeleteAppointment} className="flex-1">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
