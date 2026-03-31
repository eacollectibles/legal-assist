import { useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, User, FileText, Plus, AlertCircle, CheckCircle, 
  UserPlus, Mail, ClipboardList, ArrowRight, ArrowLeft, Printer, X 
} from 'lucide-react';
import { format } from 'date-fns';
import { useParalegalDashboard } from './ParalegalDashboardContext';
import { getClientName, getParalegalName, type ClientProfile } from './types';

export default function AssignmentsTab() {
  const { 
    fileAssignments, 
    clients, 
    paralegals, 
    currentParalegalId,
    isLoading,
    setFileAssignments,
    setClients,
    refreshData
  } = useParalegalDashboard();

  // Dialog states
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isIntakeDialogOpen, setIsIntakeDialogOpen] = useState(false);
  
  // Client creation wizard states
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [clientCreationSuccess, setClientCreationSuccess] = useState(false);
  const [newClientId, setNewClientId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [viewingIntakeClient, setViewingIntakeClient] = useState<ClientProfile | null>(null);

  // Form states
  const [newAssignment, setNewAssignment] = useState({
    clientId: '',
    paralegalId: '',
    fileStatus: 'Active',
    caseType: '',
    notes: ''
  });

  const [newClient, setNewClient] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    caseType: '',
    fileStatus: 'Active',
    initialNotes: ''
  });

  const validateClientForm = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!newClient.firstName.trim()) errors.firstName = 'First name is required';
      if (!newClient.lastName.trim()) errors.lastName = 'Last name is required';
      if (!newClient.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newClient.email)) {
        errors.email = 'Invalid email format';
      }
      if (!newClient.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
      if (!newClient.password.trim()) {
        errors.password = 'Password is required';
      } else if (newClient.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    } else if (step === 2) {
      if (!newClient.streetAddress.trim()) errors.streetAddress = 'Street address is required';
      if (!newClient.city.trim()) errors.city = 'City is required';
      if (!newClient.state.trim()) errors.state = 'Province/State is required';
      if (!newClient.zipCode.trim()) errors.zipCode = 'Postal/Zip code is required';
    } else if (step === 3) {
      if (!newClient.caseType.trim()) errors.caseType = 'Case type is required';
      if (!newClient.fileStatus.trim()) errors.fileStatus = 'File status is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateClientForm(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    setValidationErrors({});
  };

  const handleAddClient = async () => {
    if (!validateClientForm(3)) return;

    setIsCreatingClient(true);
    try {
      const userAccountId = crypto.randomUUID();
      await BaseCrudService.create('useraccounts', {
        _id: userAccountId,
        clientId: userAccountId,
        email: newClient.email,
        passwordHash: newClient.password,
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        phoneNumber: newClient.phoneNumber,
        isAdmin: false
      });

      const clientProfileId = crypto.randomUUID();
      await BaseCrudService.create('clientprofiles', {
        _id: clientProfileId,
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        phoneNumber: newClient.phoneNumber,
        streetAddress: newClient.streetAddress,
        city: newClient.city,
        state: newClient.state,
        zipCode: newClient.zipCode,
        emergencyContactName: newClient.emergencyContactName,
        emergencyContactPhone: newClient.emergencyContactPhone,
        caseType: newClient.caseType,
        intakeCompleted: false
      });

      await BaseCrudService.create('fileassignments', {
        _id: crypto.randomUUID(),
        clientId: clientProfileId,
        paralegalId: currentParalegalId,
        assignedDate: new Date().toISOString(),
        assignedBy: currentParalegalId,
        fileStatus: newClient.fileStatus,
        caseType: newClient.caseType,
        notes: newClient.initialNotes
      });

      setNewClientId(clientProfileId);
      setClientCreationSuccess(true);
      refreshData();
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsCreatingClient(false);
    }
  };

  const resetClientForm = () => {
    setNewClient({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      caseType: '',
      fileStatus: 'Active',
      initialNotes: ''
    });
    setCurrentStep(1);
    setValidationErrors({});
    setClientCreationSuccess(false);
    setNewClientId(null);
    setIsAddClientOpen(false);
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
      refreshData();
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  const handleSelfAssign = async (clientId: string) => {
    try {
      const existingAssignment = fileAssignments.find(a => a.clientId === clientId);
      
      if (existingAssignment) {
        await BaseCrudService.update('fileassignments', existingAssignment._id, {
          paralegalId: currentParalegalId,
          assignedDate: new Date().toISOString(),
          assignedBy: currentParalegalId
        });
      } else {
        await BaseCrudService.create('fileassignments', {
          _id: crypto.randomUUID(),
          clientId,
          paralegalId: currentParalegalId,
          assignedDate: new Date().toISOString(),
          assignedBy: currentParalegalId,
          fileStatus: 'Active'
        });
      }
      refreshData();
    } catch (error) {
      console.error('Error self-assigning:', error);
    }
  };

  const handleViewIntake = (clientId: string) => {
    const client = clients.find(c => c._id === clientId);
    if (client) {
      setViewingIntakeClient(client);
      setIsIntakeDialogOpen(true);
    }
  };

  const handlePrintIntake = () => {
    window.print();
  };

  const handleEmailCredentials = () => {
    console.log('Email credentials to:', newClient.email);
    alert(`Login credentials would be emailed to ${newClient.email}`);
  };

  const handleStartNewDocument = () => {
    resetClientForm();
    // Navigate to document workflow
  };

  const handleScheduleAppointment = () => {
    resetClientForm();
    // Navigate to appointments tab
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">
          File Assignments
        </h2>
        <div className="flex gap-2">
          {/* Add New Client Dialog */}
          <Dialog open={isAddClientOpen} onOpenChange={(open) => {
            if (!open) resetClientForm();
            setIsAddClientOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <UserPlus className="h-4 w-4" />
                New Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">
                  {clientCreationSuccess ? 'Client Created Successfully!' : 'Add New Client'}
                </DialogTitle>
              </DialogHeader>

              {clientCreationSuccess ? (
                <div className="space-y-6 py-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-green-900 mb-2">
                      Client Account Created!
                    </h3>
                    <p className="font-paragraph text-green-800 mb-4">
                      {newClient.firstName} {newClient.lastName} has been successfully added.
                    </p>
                    <div className="bg-white rounded-lg p-4 text-left space-y-2">
                      <p className="font-paragraph text-sm"><strong>Email:</strong> {newClient.email}</p>
                      <p className="font-paragraph text-sm"><strong>Case Type:</strong> {newClient.caseType}</p>
                      <p className="font-paragraph text-sm"><strong>Status:</strong> {newClient.fileStatus}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-paragraph text-foreground/80 text-center">
                      What would you like to do next?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button onClick={handleEmailCredentials} variant="outline" className="gap-2 h-auto py-4 flex-col">
                        <Mail className="h-6 w-6 text-primary" />
                        <span className="font-paragraph font-semibold">Email Login Credentials</span>
                      </Button>
                      <Button onClick={handleStartNewDocument} variant="outline" className="gap-2 h-auto py-4 flex-col">
                        <FileText className="h-6 w-6 text-primary" />
                        <span className="font-paragraph font-semibold">Start New Document</span>
                      </Button>
                      <Button onClick={handleScheduleAppointment} variant="outline" className="gap-2 h-auto py-4 flex-col">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span className="font-paragraph font-semibold">Schedule Appointment</span>
                      </Button>
                    </div>
                    <Button onClick={resetClientForm} className="w-full bg-primary hover:bg-primary/90">
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  {/* Step Indicator */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          currentStep === step ? 'bg-primary text-white' :
                          currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`} />}
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {currentStep === 1 && 'Step 1: Client Account Information'}
                      {currentStep === 2 && 'Step 2: Client Profile Details'}
                      {currentStep === 3 && 'Step 3: Case/Matter Information'}
                    </h3>
                  </div>

                  {/* Step 1: Account Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name <span className="text-destructive">*</span></Label>
                          <Input
                            value={newClient.firstName}
                            onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                            placeholder="John"
                            className={validationErrors.firstName ? 'border-destructive' : ''}
                          />
                          {validationErrors.firstName && <p className="text-xs text-destructive">{validationErrors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name <span className="text-destructive">*</span></Label>
                          <Input
                            value={newClient.lastName}
                            onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                            placeholder="Doe"
                            className={validationErrors.lastName ? 'border-destructive' : ''}
                          />
                          {validationErrors.lastName && <p className="text-xs text-destructive">{validationErrors.lastName}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email <span className="text-destructive">*</span></Label>
                        <Input
                          type="email"
                          value={newClient.email}
                          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                          placeholder="john.doe@example.com"
                          className={validationErrors.email ? 'border-destructive' : ''}
                        />
                        {validationErrors.email && <p className="text-xs text-destructive">{validationErrors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number <span className="text-destructive">*</span></Label>
                        <Input
                          type="tel"
                          value={newClient.phoneNumber}
                          onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
                          placeholder="(555) 123-4567"
                          className={validationErrors.phoneNumber ? 'border-destructive' : ''}
                        />
                        {validationErrors.phoneNumber && <p className="text-xs text-destructive">{validationErrors.phoneNumber}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Password <span className="text-destructive">*</span></Label>
                        <Input
                          type="password"
                          value={newClient.password}
                          onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                          placeholder="Minimum 6 characters"
                          className={validationErrors.password ? 'border-destructive' : ''}
                        />
                        {validationErrors.password && <p className="text-xs text-destructive">{validationErrors.password}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Profile Info */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Street Address <span className="text-destructive">*</span></Label>
                        <Input
                          value={newClient.streetAddress}
                          onChange={(e) => setNewClient({ ...newClient, streetAddress: e.target.value })}
                          placeholder="123 Main Street"
                          className={validationErrors.streetAddress ? 'border-destructive' : ''}
                        />
                        {validationErrors.streetAddress && <p className="text-xs text-destructive">{validationErrors.streetAddress}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City <span className="text-destructive">*</span></Label>
                          <Input
                            value={newClient.city}
                            onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                            placeholder="London"
                            className={validationErrors.city ? 'border-destructive' : ''}
                          />
                          {validationErrors.city && <p className="text-xs text-destructive">{validationErrors.city}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Province/State <span className="text-destructive">*</span></Label>
                          <Input
                            value={newClient.state}
                            onChange={(e) => setNewClient({ ...newClient, state: e.target.value })}
                            placeholder="Ontario"
                            className={validationErrors.state ? 'border-destructive' : ''}
                          />
                          {validationErrors.state && <p className="text-xs text-destructive">{validationErrors.state}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Postal/Zip Code <span className="text-destructive">*</span></Label>
                        <Input
                          value={newClient.zipCode}
                          onChange={(e) => setNewClient({ ...newClient, zipCode: e.target.value })}
                          placeholder="N6A 1A1"
                          className={validationErrors.zipCode ? 'border-destructive' : ''}
                        />
                        {validationErrors.zipCode && <p className="text-xs text-destructive">{validationErrors.zipCode}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Emergency Contact Name</Label>
                          <Input
                            value={newClient.emergencyContactName}
                            onChange={(e) => setNewClient({ ...newClient, emergencyContactName: e.target.value })}
                            placeholder="Jane Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Emergency Contact Phone</Label>
                          <Input
                            value={newClient.emergencyContactPhone}
                            onChange={(e) => setNewClient({ ...newClient, emergencyContactPhone: e.target.value })}
                            placeholder="(555) 987-6543"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Case Info */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Case Type <span className="text-destructive">*</span></Label>
                        <Select
                          value={newClient.caseType}
                          onValueChange={(value) => setNewClient({ ...newClient, caseType: value })}
                        >
                          <SelectTrigger className={validationErrors.caseType ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select case type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Landlord-Tenant">Landlord-Tenant</SelectItem>
                            <SelectItem value="Small Claims">Small Claims</SelectItem>
                            <SelectItem value="Traffic">Traffic</SelectItem>
                            <SelectItem value="Human Rights">Human Rights</SelectItem>
                            <SelectItem value="Employment">Employment</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {validationErrors.caseType && <p className="text-xs text-destructive">{validationErrors.caseType}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>File Status <span className="text-destructive">*</span></Label>
                        <Select
                          value={newClient.fileStatus}
                          onValueChange={(value) => setNewClient({ ...newClient, fileStatus: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Initial Notes</Label>
                        <Textarea
                          value={newClient.initialNotes}
                          onChange={(e) => setNewClient({ ...newClient, initialNotes: e.target.value })}
                          placeholder="Brief description of the matter..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    {currentStep > 1 ? (
                      <Button variant="outline" onClick={handlePrevStep} className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Previous
                      </Button>
                    ) : <div />}
                    
                    {currentStep < 3 ? (
                      <Button onClick={handleNextStep} className="gap-2 bg-primary hover:bg-primary/90">
                        Next <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleAddClient} 
                        className="gap-2 bg-primary hover:bg-primary/90"
                        disabled={isCreatingClient}
                      >
                        {isCreatingClient ? 'Creating...' : 'Create Client'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Add Assignment Dialog */}
          <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create File Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Client</Label>
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
                  <Label>Paralegal</Label>
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
                    <Label>File Status</Label>
                    <Select
                      value={newAssignment.fileStatus}
                      onValueChange={(value) => setNewAssignment({ ...newAssignment, fileStatus: value })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Case Type</Label>
                    <Input
                      value={newAssignment.caseType}
                      onChange={(e) => setNewAssignment({ ...newAssignment, caseType: e.target.value })}
                      placeholder="e.g., Small Claims"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
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
      </div>

      {/* Unassigned Clients Section */}
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
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewIntake(client._id)} className="gap-2">
                        <ClipboardList className="h-4 w-4" />
                        View Intake
                      </Button>
                      <Button size="lg" onClick={() => handleSelfAssign(client._id)} className="gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6">
                        <User className="h-5 w-5" />
                        Assign to Me
                      </Button>
                    </div>
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

      {/* Assigned Files List */}
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
                      {getClientName(clients, assignment.clientId)}
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
                      Paralegal: {getParalegalName(paralegals, assignment.paralegalId)}
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

      {/* View Intake Dialog */}
      <Dialog open={isIntakeDialogOpen} onOpenChange={setIsIntakeDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center gap-2">
              <ClipboardList className="h-6 w-6" />
              Client Intake Information
            </DialogTitle>
          </DialogHeader>
          {viewingIntakeClient && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground/60">Full Name</Label>
                  <p className="font-paragraph font-semibold">{viewingIntakeClient.firstName} {viewingIntakeClient.lastName}</p>
                </div>
                <div>
                  <Label className="text-foreground/60">Phone</Label>
                  <p className="font-paragraph font-semibold">{viewingIntakeClient.phoneNumber || 'N/A'}</p>
                </div>
              </div>
              <div>
                <Label className="text-foreground/60">Address</Label>
                <p className="font-paragraph font-semibold">
                  {viewingIntakeClient.streetAddress}, {viewingIntakeClient.city}, {viewingIntakeClient.state} {viewingIntakeClient.zipCode}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground/60">Case Type</Label>
                  <p className="font-paragraph font-semibold">{viewingIntakeClient.caseType || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-foreground/60">Intake Status</Label>
                  <Badge className={viewingIntakeClient.intakeCompleted ? 'bg-green-500' : 'bg-yellow-500'}>
                    {viewingIntakeClient.intakeCompleted ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              </div>
              {viewingIntakeClient.caseDescription && (
                <div>
                  <Label className="text-foreground/60">Case Description</Label>
                  <p className="font-paragraph">{viewingIntakeClient.caseDescription}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button onClick={handlePrintIntake} variant="outline" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button onClick={() => setIsIntakeDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
