import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BaseCrudService } from '@/integrations';
import { EMAIL_PRIMARY } from '@/lib/contact';

// Recognise both the historical placeholder admin email and the
// firm's real address as "admin/firm" mail. Lets us treat older data
// alongside new outgoing mail uniformly.
const LEGACY_ADMIN_EMAIL = 'admin@legalservices.com';
const isAdminSender = (email: string | undefined | null): boolean => {
  if (!email) return false;
  const e = email.toLowerCase();
  return e === LEGACY_ADMIN_EMAIL || e === EMAIL_PRIMARY.toLowerCase();
};
import type {
  Appointment,
  FileAssignment,
  UserAccount,
  ClientProfile,
  ClientDocument,
  GeneratedDocument,
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
  generatedDocuments: GeneratedDocument[];
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
  setGeneratedDocuments: React.Dispatch<React.SetStateAction<GeneratedDocument[]>>;
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
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentParalegalId, setCurrentParalegalId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Wrap each call with timeout + error catch so nothing blocks the dashboard
      const safeGet = <T,>(collection: string, timeoutMs = 10000) => {
        const timeout = new Promise<{ items: T[] }>((resolve) =>
          setTimeout(() => {
            console.warn(`[Dashboard] Timeout loading ${collection} after ${timeoutMs}ms`);
            resolve({ items: [] as T[] });
          }, timeoutMs)
        );
        // `as any`: safeGet's T is intentionally unconstrained (callers pass
        // plain view models), but getAllPages requires T extends WixDataItem.
        const fetcher = (BaseCrudService.getAllPages as any)(collection).catch(
          (err: any) => {
            console.warn(`[Dashboard] Failed to load ${collection}:`, err);
            return { items: [] as T[] };
          }
        ) as Promise<{ items: T[] }>;
        return Promise.race([fetcher, timeout]);
      };

      const [appointmentsRes, assignmentsRes, usersRes, clientsRes, documentsRes, generatedDocsRes, messagesRes, caseDocsRes] = await Promise.all([
        safeGet<Appointment>('appointments'),
        safeGet<FileAssignment>('fileassignments'),
        safeGet<UserAccount>('useraccounts'),
        safeGet<ClientProfile>('clientprofiles'),
        safeGet<ClientDocument>('clientdocuments'),
        safeGet<GeneratedDocument>('generateddocuments'),
        safeGet<Message>('messages'),
        safeGet<any>('casedocuments'),
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

      // Merge clientdocuments with casedocuments from the LSO compliance page
      // so they all show up in the File Management tab
      const existingDocIds = new Set(documentsRes.items.map((d: any) => d._id));
      const caseDocs: ClientDocument[] = (caseDocsRes.items || [])
        .filter((cd: any) => !existingDocIds.has(cd._id))
        .map((cd: any) => ({
          _id: cd._id,
          documentName: cd.documentName || cd.title || 'Case Document',
          fileUrl: cd.fileUrl || cd.documentUrl || '',
          uploadDate: cd.uploadDate || cd._createdDate || new Date().toISOString(),
          clientEmail: cd.clientEmail || '',
          documentCategory: cd.documentCategory || cd.category || 'case',
          fileType: cd.fileType || '',
          fileSize: cd.fileSize || 0,
          notes: cd.notes || '',
        }));
      setDocuments([...documentsRes.items, ...caseDocs]);
      setGeneratedDocuments(generatedDocsRes.items);
      
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

        // Determine the actual client email: if the message was sent BY the admin/paralegal,
        // the client email is the recipientEmail; otherwise it's the senderEmail
        const isFromAdmin = isAdminSender(msg.senderEmail);
        const clientEmail = isFromAdmin
          ? (msg.recipientEmail || '')
          : (msg.senderEmail || '');

        conversationMap.set(convId, {
          conversationId: convId,
          clientEmail,
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
      
      if (!msg.isRead && !isAdminSender(msg.senderEmail)) {
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
    generatedDocuments,
    messages,
    conversations,
    currentParalegalId,
    isLoading,
    setAppointments,
    setFileAssignments,
    setClients,
    setDocuments,
    setGeneratedDocuments,
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
