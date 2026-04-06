import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BaseCrudService } from '@/integrations';
import type { 
  Appointment, 
  FileAssignment, 
  UserAccount, 
  ClientProfile, 
  ClientDocument,
  Message,
  Conversation
} from './types';

interface ParalegalDashboardContextType {
  // Data
  appointments: Appointment[];
  fileAssignments: FileAssignment[];
  paralegals: UserAccount[];
  clients: ClientProfile[];
  documents: ClientDocument[];
  messages: Message[];
  conversations: Conversation[];
  currentParalegalId: string;
  
  // Loading states
  isLoading: boolean;
  
  // Setters for updating data
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setFileAssignments: React.Dispatch<React.SetStateAction<FileAssignment[]>>;
  setClients: React.Dispatch<React.SetStateAction<ClientProfile[]>>;
  setDocuments: React.Dispatch<React.SetStateAction<ClientDocument[]>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  
  // Refresh function
  refreshData: () => Promise<void>;
}

const ParalegalDashboardContext = createContext<ParalegalDashboardContextType | null>(null);

export function useParalegalDashboard() {
  const context = useContext(ParalegalDashboardContext);
  if (!context) {
    throw new Error('useParalegalDashboard must be used within ParalegalDashboardProvider');
  }
  return context;
}

interface ProviderProps {
  children: ReactNode;
}

export function ParalegalDashboardProvider({ children }: ProviderProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fileAssignments, setFileAssignments] = useState<FileAssignment[]>([]);
  const [paralegals, setParalegals] = useState<UserAccount[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentParalegalId, setCurrentParalegalId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [appointmentsRes, assignmentsRes, usersRes, clientsRes, documentsRes, messagesRes] = await Promise.all([
        BaseCrudService.getAll<Appointment>('appointments'),
        BaseCrudService.getAll<FileAssignment>('fileassignments'),
        BaseCrudService.getAll<UserAccount>('useraccounts'),
        BaseCrudService.getAll<ClientProfile>('clientprofiles'),
        BaseCrudService.getAll<ClientDocument>('clientdocuments'),
        BaseCrudService.getAll<Message>('messages')
      ]);

      setAppointments(appointmentsRes.items);
      setFileAssignments(assignmentsRes.items);
      
      const adminUsers = usersRes.items.filter(u => u.isAdmin);
      setParalegals(adminUsers);
      
      // Set current paralegal
      if (adminUsers.length > 0) {
        setCurrentParalegalId(adminUsers[0]._id);
      }
      
      setClients(clientsRes.items);
      setDocuments(documentsRes.items);
      
      // Sort messages by date
      const sortedMessages = (messagesRes.items || []).sort((a, b) => {
        const dateA = new Date(a.sentDate || 0).getTime();
        const dateB = new Date(b.sentDate || 0).getTime();
        return dateA - dateB;
      });
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error loading paralegal dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Organize conversations when messages or assignments change
  useEffect(() => {
    if (messages.length > 0 && currentParalegalId && fileAssignments.length >= 0) {
      organizeConversations();
    }
  }, [messages, currentParalegalId, fileAssignments, clients]);

  const organizeConversations = () => {
    // Get client IDs assigned to current paralegal
    const assignedClientIds = fileAssignments
      .filter(a => a.paralegalId === currentParalegalId)
      .map(a => a.clientId);

    // Filter messages for assigned clients only
    const filteredMessages = messages.filter(msg => 
      msg.clientId && assignedClientIds.includes(msg.clientId)
    );

    const conversationMap = new Map<string, Conversation>();

    for (const msg of filteredMessages) {
      const convId = msg.conversationId || '';
      
      if (!conversationMap.has(convId)) {
        const client = clients.find(c => c._id === msg.clientId);
        const clientName = client 
          ? `${client.firstName} ${client.lastName}`
          : msg.senderName || 'Unknown';
        
        conversationMap.set(convId, {
          conversationId: convId,
          clientEmail: msg.senderEmail || '',
          clientName,
          messages: [],
          unreadCount: 0,
          lastMessageDate: new Date(0),
          clientId: msg.clientId,
          matterId: msg.matterId
        });
      }

      const conv = conversationMap.get(convId)!;
      conv.messages.push(msg);
      
      if (!msg.isRead && msg.senderEmail !== 'admin@legalservices.com') {
        conv.unreadCount++;
      }
      
      const msgDate = new Date(msg.sentDate || 0);
      if (msgDate > conv.lastMessageDate) {
        conv.lastMessageDate = msgDate;
      }
    }

    const conversationsArray = Array.from(conversationMap.values()).sort(
      (a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime()
    );

    setConversations(conversationsArray);
  };

  useEffect(() => {
    loadData();
  }, []);

  const value: ParalegalDashboardContextType = {
    appointments,
    fileAssignments,
    paralegals,
    clients,
    documents,
    messages,
    conversations,
    currentParalegalId,
    isLoading,
    setAppointments,
    setFileAssignments,
    setClients,
    setDocuments,
    setMessages,
    setConversations,
    refreshData: loadData
  };

  return (
    <ParalegalDashboardContext.Provider value={value}>
      {children}
    </ParalegalDashboardContext.Provider>
  );
}
