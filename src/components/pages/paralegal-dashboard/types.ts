// Shared types for Paralegal Dashboard components

export interface Appointment {
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

export interface FileAssignment {
  _id: string;
  clientId?: string;
  paralegalId?: string;
  assignedDate?: Date | string;
  assignedBy?: string;
  notes?: string;
  fileStatus?: string;
  caseType?: string;
}

export interface UserAccount {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

export interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  unitNumber?: string;
  dateOfBirth?: Date | string;
  preferredName?: string;
  preferredLanguage?: string;
  alternatePhone?: string;
  preferredContactMethod?: string;
  bestTimeToContact?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  howHeardAboutUs?: string;
  caseType?: string;
  caseDescription?: string;
  hasCourtDocuments?: boolean;
  courtDeadline?: Date | string;
  consultedOther?: boolean;
  additionalNotes?: string;
  preferredDays?: string;
  preferredTimes?: string;
  intakeCompleted?: boolean;
  intakeCompletedDate?: Date | string;
  conflictCheckCompleted?: boolean;
  conflictCheckDate?: Date | string;
  conflictCheckStatus?: string;
  opposingPartyNames?: string;
  opposingPartyRelationship?: string;
  conflictMatchesFound?: string;
  conflictAcknowledged?: boolean;
}

export interface ClientDocument {
  _id: string;
  documentName?: string;
  fileUrl?: string;
  uploadDate?: Date | string;
  clientEmail?: string;
  fileType?: string;
  fileSize?: number;
  documentCategory?: string;
  notes?: string;
  previousVersions?: Array<{
    fileUrl: string;
    uploadDate: Date | string;
    notes?: string;
  }>;
}

export interface Message {
  _id: string;
  senderEmail?: string;
  senderName?: string;
  recipientEmail?: string;
  messageContent?: string;
  sentDate?: Date | string;
  isRead?: boolean;
  conversationId?: string;
  clientId?: string;
  matterId?: string;
  priority?: string;
  attachmentUrl?: string;
}

export interface Conversation {
  conversationId: string;
  clientEmail: string;
  clientName: string;
  messages: Message[];
  unreadCount: number;
  lastMessageDate: Date;
  clientId?: string;
  matterId?: string;
  matterReference?: string;
}

// Helper functions
export const getClientName = (clients: ClientProfile[], clientId?: string): string => {
  const client = clients.find(c => c._id === clientId);
  return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
};

export const getParalegalName = (paralegals: UserAccount[], paralegalId?: string): string => {
  const paralegal = paralegals.find(p => p._id === paralegalId);
  return paralegal ? `${paralegal.firstName} ${paralegal.lastName}` : 'Unassigned';
};

export const getPriorityColor = (priority?: string): string => {
  switch (priority) {
    case 'Urgent': return 'bg-red-500 text-white';
    case 'High': return 'bg-orange-500 text-white';
    case 'Medium': return 'bg-yellow-500 text-black';
    case 'Low': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const getStatusColor = (status?: string): string => {
  switch (status) {
    case 'Completed': return 'bg-green-500 text-white';
    case 'Pending': return 'bg-blue-500 text-white';
    case 'Cancelled': return 'bg-gray-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const getFileStatusColor = (status?: string): string => {
  switch (status) {
    case 'Active': return 'bg-green-500 text-white';
    case 'Pending': return 'bg-yellow-500 text-black';
    case 'Closed': return 'bg-gray-500 text-white';
    case 'On Hold': return 'bg-orange-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};
