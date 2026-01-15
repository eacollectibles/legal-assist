import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, FileText, Plus, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Appointment {
  _id: string;
  title?: string;
  type?: string;
  eventDate?: Date | string;
  eventTime?: any;
  clientId?: string;
  assignedParalegalId?: string;
  status?: string;
  priority?: string;
  location?: string;
  notes?: string;
}

interface FileAssignment {
  _id: string;
  clientId?: string;
  paralegalId?: string;
  assignedDate?: Date | string;
  assignedBy?: string;
  notes?: string;
  fileStatus?: string;
  caseType?: string;
}

interface UserAccount {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export default function ParalegalDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fileAssignments, setFileAssignments] = useState<FileAssignment[]>([]);
  const [paralegals, setParalegals] = useState<UserAccount[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);

  // Form states for new appointment
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

  // Form states for new file assignment
  const [newAssignment, setNewAssignment] = useState({
    clientId: '',
    paralegalId: '',
    fileStatus: 'Active',
    caseType: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [appointmentsRes, assignmentsRes, usersRes, clientsRes] = await Promise.all([
        BaseCrudService.getAll<Appointment>('appointments'),
        BaseCrudService.getAll<FileAssignment>('fileassignments'),
        BaseCrudService.getAll<UserAccount>('useraccounts'),
        BaseCrudService.getAll<ClientProfile>('clientprofiles')
      ]);

      setAppointments(appointmentsRes.items);
      setFileAssignments(assignmentsRes.items);
      setParalegals(usersRes.items.filter(u => u.isAdmin));
      setClients(clientsRes.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAppointment = async () => {
    try {
      const paralegal = paralegals.find(p => p._id === newAppointment.assignedParalegalId);
      const client = clients.find(c => c._id === newAppointment.clientId);

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
      loadData();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleAddAssignment = async () => {
    try {
      const currentUser = paralegals[0]; // In real app, get from auth context
      
      await BaseCrudService.create('fileassignments', {
        _id: crypto.randomUUID(),
        ...newAssignment,
        assignedDate: new Date().toISOString(),
        assignedBy: currentUser?._id || ''
      });

      setIsAddAssignmentOpen(false);
      setNewAssignment({
        clientId: '',
        paralegalId: '',
        fileStatus: 'Active',
        caseType: '',
        notes: ''
      });
      loadData();
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      await BaseCrudService.update('appointments', {
        _id: appointmentId,
        status: newStatus
      });
      loadData();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const getClientName = (clientId?: string) => {
    const client = clients.find(c => c._id === clientId);
    return client ? `${client.firstName || ''} ${client.lastName || ''}`.trim() : 'Unknown Client';
  };

  const getParalegalName = (paralegalId?: string) => {
    const paralegal = paralegals.find(p => p._id === paralegalId);
    return paralegal ? `${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim() : 'Unassigned';
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-destructive text-destructive-foreground';
      case 'High': return 'bg-primary text-primary-foreground';
      case 'Medium': return 'bg-secondary text-secondary-foreground';
      case 'Low': return 'bg-pastelgreen text-foreground';
      default: return 'bg-background text-foreground';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed': return 'bg-pastelgreen text-foreground';
      case 'Pending': return 'bg-pastelbeige text-foreground';
      case 'Cancelled': return 'bg-pastellavender text-foreground';
      default: return 'bg-background text-foreground';
    }
  };

  const upcomingAppointments = appointments
    .filter(a => a.status !== 'Completed' && a.status !== 'Cancelled')
    .sort((a, b) => {
      const dateA = new Date(a.eventDate || 0).getTime();
      const dateB = new Date(b.eventDate || 0).getTime();
      return dateA - dateB;
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full max-w-[120rem] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
            Paralegal Dashboard
          </h1>
          <p className="font-paragraph text-lg text-foreground/80">
            Manage appointments, deadlines, and file assignments
          </p>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="appointments">Appointments & Deadlines</TabsTrigger>
            <TabsTrigger value="assignments">File Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Upcoming Appointments & Deadlines
              </h2>
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

            <div className="grid gap-4" style={{ minHeight: '400px' }}>
              {isLoading ? null : upcomingAppointments.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      No upcoming appointments or deadlines
                    </p>
                  </CardContent>
                </Card>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <Card key={appointment._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-2xl mb-2">
                            {appointment.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{appointment.type}</Badge>
                            <Badge className={getPriorityColor(appointment.priority)}>
                              {appointment.priority}
                            </Badge>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Calendar className="h-4 w-4" />
                          <span className="font-paragraph">
                            {appointment.eventDate ? format(new Date(appointment.eventDate), 'MMMM d, yyyy') : 'No date'}
                          </span>
                        </div>
                        {appointment.eventTime && (
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Clock className="h-4 w-4" />
                            <span className="font-paragraph">{appointment.eventTime}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-foreground/80">
                          <User className="h-4 w-4" />
                          <span className="font-paragraph">
                            Client: {getClientName(appointment.clientId)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <User className="h-4 w-4" />
                          <span className="font-paragraph">
                            Paralegal: {getParalegalName(appointment.assignedParalegalId)}
                          </span>
                        </div>
                      </div>
                      {appointment.location && (
                        <p className="font-paragraph text-foreground/80">
                          <strong>Location:</strong> {appointment.location}
                        </p>
                      )}
                      {appointment.notes && (
                        <p className="font-paragraph text-foreground/80">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      )}
                      <div className="flex gap-2 pt-2">
                        {appointment.status === 'Pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleUpdateAppointmentStatus(appointment._id, 'Completed')}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateAppointmentStatus(appointment._id, 'Cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                File Assignments
              </h2>
              <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Assign File
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Assign File to Paralegal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignClientId">Client</Label>
                      <Select
                        value={newAssignment.clientId}
                        onValueChange={(value) => setNewAssignment({ ...newAssignment, clientId: value })}
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
                      <Label htmlFor="assignParalegalId">Paralegal</Label>
                      <Select
                        value={newAssignment.paralegalId}
                        onValueChange={(value) => setNewAssignment({ ...newAssignment, paralegalId: value })}
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fileStatus">File Status</Label>
                        <Select
                          value={newAssignment.fileStatus}
                          onValueChange={(value) => setNewAssignment({ ...newAssignment, fileStatus: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="caseType">Case Type</Label>
                        <Input
                          id="caseType"
                          value={newAssignment.caseType}
                          onChange={(e) => setNewAssignment({ ...newAssignment, caseType: e.target.value })}
                          placeholder="e.g., Small Claims, LTB"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignNotes">Notes</Label>
                      <Textarea
                        id="assignNotes"
                        value={newAssignment.notes}
                        onChange={(e) => setNewAssignment({ ...newAssignment, notes: e.target.value })}
                        placeholder="Assignment details..."
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleAddAssignment} className="w-full">
                      Create Assignment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4" style={{ minHeight: '400px' }}>
              {isLoading ? null : fileAssignments.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      No file assignments yet
                    </p>
                  </CardContent>
                </Card>
              ) : (
                fileAssignments.map((assignment) => (
                  <Card key={assignment._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-2xl mb-2">
                            {getClientName(assignment.clientId)}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{assignment.fileStatus}</Badge>
                            {assignment.caseType && (
                              <Badge className="bg-pastelbeige text-foreground">
                                {assignment.caseType}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <User className="h-4 w-4" />
                          <span className="font-paragraph">
                            Paralegal: {getParalegalName(assignment.paralegalId)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Calendar className="h-4 w-4" />
                          <span className="font-paragraph">
                            Assigned: {assignment.assignedDate ? format(new Date(assignment.assignedDate), 'MMM d, yyyy') : 'N/A'}
                          </span>
                        </div>
                      </div>
                      {assignment.notes && (
                        <p className="font-paragraph text-foreground/80">
                          <strong>Notes:</strong> {assignment.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
