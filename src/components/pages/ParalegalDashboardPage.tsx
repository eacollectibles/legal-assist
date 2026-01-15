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
import { Calendar, Clock, User, FileText, Plus, AlertCircle, Search, Filter, Share2, History, Download, Eye, CheckCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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

interface ClientDocument {
  _id: string;
  documentName?: string;
  fileUrl?: string;
  uploadDate?: Date | string;
  clientEmail?: string;
  fileType?: string;
  fileSize?: number;
  documentCategory?: string;
  notes?: string;
  version?: number;
  previousVersions?: Array<{
    version: number;
    fileUrl: string;
    uploadDate: Date | string;
    notes?: string;
  }>;
}

export default function ParalegalDashboardPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fileAssignments, setFileAssignments] = useState<FileAssignment[]>([]);
  const [paralegals, setParalegals] = useState<UserAccount[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);

  // Document management states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<ClientDocument | null>(null);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

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

  // Current paralegal ID (in real app, get from auth context)
  const [currentParalegalId, setCurrentParalegalId] = useState<string>('');

  useEffect(() => {
    loadData();
    loadCurrentParalegal();
  }, []);

  const loadCurrentParalegal = async () => {
    try {
      // In a real app, get from auth context
      // For now, get the first admin user as the current paralegal
      const { items } = await BaseCrudService.getAll<UserAccount>('useraccounts');
      const paralegal = items.find(u => u.isAdmin);
      if (paralegal) {
        setCurrentParalegalId(paralegal._id);
      }
    } catch (error) {
      console.error('Error loading current paralegal:', error);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [appointmentsRes, assignmentsRes, usersRes, clientsRes, documentsRes] = await Promise.all([
        BaseCrudService.getAll<Appointment>('appointments'),
        BaseCrudService.getAll<FileAssignment>('fileassignments'),
        BaseCrudService.getAll<UserAccount>('useraccounts'),
        BaseCrudService.getAll<ClientProfile>('clientprofiles'),
        BaseCrudService.getAll<ClientDocument>('clientdocuments')
      ]);

      setAppointments(appointmentsRes.items);
      setFileAssignments(assignmentsRes.items);
      setParalegals(usersRes.items.filter(u => u.isAdmin));
      setClients(clientsRes.items);
      setDocuments(documentsRes.items);
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
      await BaseCrudService.create('fileassignments', {
        _id: crypto.randomUUID(),
        ...newAssignment,
        assignedDate: new Date().toISOString(),
        assignedBy: currentParalegalId
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

  const handleSelfAssign = async (clientId: string) => {
    if (!currentParalegalId) {
      alert('Unable to determine current paralegal. Please try again.');
      return;
    }

    try {
      // Check if assignment already exists for this client
      const existingAssignment = fileAssignments.find(a => a.clientId === clientId);
      
      if (existingAssignment) {
        // Update existing assignment
        await BaseCrudService.update('fileassignments', {
          _id: existingAssignment._id,
          paralegalId: currentParalegalId,
          assignedDate: new Date().toISOString(),
          assignedBy: currentParalegalId
        });
      } else {
        // Create new assignment
        await BaseCrudService.create('fileassignments', {
          _id: crypto.randomUUID(),
          clientId: clientId,
          paralegalId: currentParalegalId,
          fileStatus: 'Active',
          assignedDate: new Date().toISOString(),
          assignedBy: currentParalegalId,
          notes: 'Self-assigned by paralegal'
        });
      }

      loadData();
      alert('Successfully assigned to client file!');
    } catch (error) {
      console.error('Error self-assigning:', error);
      alert('Failed to assign. Please try again.');
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

  // Document filtering logic
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.documentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.documentCategory === filterCategory;
    
    let matchesDate = true;
    if (filterDateFrom || filterDateTo) {
      const docDate = new Date(doc.uploadDate || 0);
      if (filterDateFrom) {
        matchesDate = matchesDate && docDate >= new Date(filterDateFrom);
      }
      if (filterDateTo) {
        matchesDate = matchesDate && docDate <= new Date(filterDateTo);
      }
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleRevertToVersion = async (documentId: string, versionIndex: number) => {
    try {
      const doc = documents.find(d => d._id === documentId);
      if (!doc || !doc.previousVersions || !doc.previousVersions[versionIndex]) return;

      const previousVersion = doc.previousVersions[versionIndex];
      
      // Create new version entry with current data
      const newPreviousVersions = [
        ...(doc.previousVersions || []),
        {
          version: doc.version || 1,
          fileUrl: doc.fileUrl || '',
          uploadDate: doc.uploadDate || new Date(),
          notes: doc.notes
        }
      ];

      // Update document with reverted version
      await BaseCrudService.update('clientdocuments', {
        _id: documentId,
        fileUrl: previousVersion.fileUrl,
        version: (doc.version || 1) + 1,
        previousVersions: newPreviousVersions,
        notes: `Reverted to version ${previousVersion.version}`
      });

      loadData();
      setIsVersionHistoryOpen(false);
    } catch (error) {
      console.error('Error reverting to version:', error);
    }
  };

  const handleShareDocument = async () => {
    if (!selectedDocument || !shareEmail) return;

    try {
      // In a real app, this would send an email or create a secure share link
      // For now, we'll create a message record
      await BaseCrudService.create('messages', {
        _id: crypto.randomUUID(),
        senderEmail: 'paralegal@legalservices.com',
        senderName: 'Paralegal Team',
        recipientEmail: shareEmail,
        messageContent: `Document shared: ${selectedDocument.documentName}\n\n${shareMessage}\n\nDocument link: ${selectedDocument.fileUrl}`,
        sentDate: new Date(),
        isRead: false,
        conversationId: crypto.randomUUID()
      });

      setIsShareDialogOpen(false);
      setShareEmail('');
      setShareMessage('');
      alert('Document shared successfully!');
    } catch (error) {
      console.error('Error sharing document:', error);
      alert('Failed to share document. Please try again.');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) return;

    try {
      await BaseCrudService.delete('clientdocuments', documentId);
      setDocuments(prev => prev.filter(doc => doc._id !== documentId));
      alert('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document. Please try again.');
    }
  };

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
            <TabsTrigger value="filemanagement">File Management</TabsTrigger>
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

            {/* Unassigned Clients Section - Highlighted */}
            {!isLoading && clients.length > 0 && (
              <Card className="mb-6 bg-primary/5 border-2 border-primary/30 shadow-lg">
                <CardHeader className="bg-primary/10">
                  <CardTitle className="font-heading text-2xl text-primary flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Unassigned Clients - Self-Assignment Available
                  </CardTitle>
                  <p className="font-paragraph text-foreground/80 mt-2">
                    Click "Assign to Me" to take ownership of a client file
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {clients
                      .filter(client => !fileAssignments.some(a => a.clientId === client._id))
                      .map(client => (
                        <div key={client._id} className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-primary/20 hover:border-primary/40 hover:shadow-md transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-paragraph text-lg font-semibold text-foreground">
                              {client.firstName} {client.lastName}
                            </span>
                          </div>
                          <Button
                            size="lg"
                            onClick={() => handleSelfAssign(client._id)}
                            className="gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6"
                          >
                            <User className="h-5 w-5" />
                            Assign to Me
                          </Button>
                        </div>
                      ))}
                    {clients.filter(client => !fileAssignments.some(a => a.clientId === client._id)).length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <p className="font-paragraph text-lg text-foreground/80 font-semibold">
                          All clients have been assigned
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

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
                      {assignment.paralegalId !== currentParalegalId && (
                        <div className="pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleSelfAssign(assignment.clientId || '')}
                            className="gap-2 bg-primary hover:bg-primary/90 text-white"
                          >
                            <User className="h-4 w-4" />
                            Assign to Me
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="filemanagement" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                File Management
              </h2>
            </div>

            {/* Document Management Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search & Filter Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="searchTerm">Search</Label>
                    <Input
                      id="searchTerm"
                      placeholder="Search by name or notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filterCategory">Category</Label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="court-order">Court Order</SelectItem>
                        <SelectItem value="evidence">Evidence</SelectItem>
                        <SelectItem value="correspondence">Correspondence</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filterDateFrom">Date From</Label>
                    <Input
                      id="filterDateFrom"
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filterDateTo">Date To</Label>
                    <Input
                      id="filterDateTo"
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Filter className="h-4 w-4" />
                  <span>Showing {filteredDocuments.length} of {documents.length} documents</span>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <div className="grid gap-4" style={{ minHeight: '400px' }}>
              {isLoading ? null : filteredDocuments.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-foreground/40 mb-4" />
                    <p className="font-paragraph text-lg text-foreground/60">
                      {documents.length === 0 ? 'No documents available' : 'No documents match your filters'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredDocuments.map((doc) => (
                  <Card key={doc._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-xl mb-2">
                            {doc.documentName}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">
                              {doc.documentCategory ? doc.documentCategory.charAt(0).toUpperCase() + doc.documentCategory.slice(1).replace('-', ' ') : 'Uncategorized'}
                            </Badge>
                            <Badge className="bg-pastelbeige text-foreground">
                              {doc.fileType?.split('/')[1]?.toUpperCase() || 'Unknown'}
                            </Badge>
                            {doc.version && (
                              <Badge className="bg-pastelgreen text-foreground">
                                v{doc.version}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-paragraph text-foreground/60">Upload Date</p>
                          <p className="font-paragraph font-semibold text-foreground">
                            {doc.uploadDate ? format(new Date(doc.uploadDate), 'MMM d, yyyy') : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-foreground/60">File Size</p>
                          <p className="font-paragraph font-semibold text-foreground">
                            {doc.fileSize ? (doc.fileSize / 1024).toFixed(2) + ' KB' : 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-foreground/60">Client</p>
                          <p className="font-paragraph font-semibold text-foreground">
                            {doc.clientEmail || 'N/A'}
                          </p>
                        </div>
                      </div>

                      {doc.notes && (
                        <div className="pt-2 border-t border-gray-200">
                          <p className="font-paragraph text-sm text-foreground/80">
                            <strong>Notes:</strong> {doc.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (doc.fileUrl) {
                              window.open(doc.fileUrl, '_blank');
                            }
                          }}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="gap-2"
                        >
                          <a href={doc.fileUrl} download={doc.documentName}>
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setIsVersionHistoryOpen(true);
                          }}
                          className="gap-2"
                        >
                          <History className="h-4 w-4" />
                          Version History
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setIsShareDialogOpen(true);
                          }}
                          className="gap-2"
                        >
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteDocument(doc._id)}
                          className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Version History Dialog */}
        <Dialog open={isVersionHistoryOpen} onOpenChange={setIsVersionHistoryOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Document Version History</DialogTitle>
            </DialogHeader>
            {selectedDocument && (
              <div className="space-y-4 py-4">
                <div className="bg-pastelbeige/20 rounded-lg p-4">
                  <h3 className="font-heading font-bold text-foreground mb-2">Current Version</h3>
                  <p className="font-paragraph text-sm text-foreground/80 mb-2">
                    <strong>Version:</strong> {selectedDocument.version || 1}
                  </p>
                  <p className="font-paragraph text-sm text-foreground/80 mb-2">
                    <strong>Upload Date:</strong> {selectedDocument.uploadDate ? format(new Date(selectedDocument.uploadDate), 'MMM d, yyyy HH:mm') : 'N/A'}
                  </p>
                  {selectedDocument.notes && (
                    <p className="font-paragraph text-sm text-foreground/80">
                      <strong>Notes:</strong> {selectedDocument.notes}
                    </p>
                  )}
                </div>

                {selectedDocument.previousVersions && selectedDocument.previousVersions.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-foreground">Previous Versions</h3>
                    {selectedDocument.previousVersions.map((version, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-paragraph text-sm text-foreground/80 mb-1">
                              <strong>Version:</strong> {version.version}
                            </p>
                            <p className="font-paragraph text-sm text-foreground/80 mb-1">
                              <strong>Date:</strong> {format(new Date(version.uploadDate), 'MMM d, yyyy HH:mm')}
                            </p>
                            {version.notes && (
                              <p className="font-paragraph text-sm text-foreground/80">
                                <strong>Notes:</strong> {version.notes}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleRevertToVersion(selectedDocument._id, index)}
                          >
                            Revert
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-paragraph text-foreground/60 text-center py-4">
                    No previous versions available
                  </p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Share Document Dialog */}
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Share Document</DialogTitle>
            </DialogHeader>
            {selectedDocument && (
              <div className="space-y-4 py-4">
                <div className="bg-pastelbeige/20 rounded-lg p-4">
                  <p className="font-heading font-bold text-foreground">
                    {selectedDocument.documentName}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shareEmail">Recipient Email *</Label>
                  <Input
                    id="shareEmail"
                    type="email"
                    placeholder="recipient@example.com"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shareMessage">Message (Optional)</Label>
                  <Textarea
                    id="shareMessage"
                    placeholder="Add a message for the recipient..."
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleShareDocument}
                    disabled={!shareEmail}
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Document
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsShareDialogOpen(false);
                      setShareEmail('');
                      setShareMessage('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
