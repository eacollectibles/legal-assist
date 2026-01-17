import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { MessageSquare, Send, Loader, AlertCircle, CheckCircle, Search, User, Plus, Trash2, Paperclip, Flag, FileText, Filter } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-service';
import { sendEmail } from '@/lib/email-service';

interface Message {
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

interface Conversation {
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

export default function AdminMessagesPage() {
  const currentUser = getCurrentUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // New message states
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [newMessageEmail, setNewMessageEmail] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageClientId, setNewMessageClientId] = useState('');
  const [newMessageMatterId, setNewMessageMatterId] = useState('');
  const [newMessagePriority, setNewMessagePriority] = useState('Normal');

  // Reply states
  const [replyPriority, setReplyPriority] = useState('Normal');
  const [replyAttachment, setReplyAttachment] = useState('');

  // Filter states
  const [filterClientId, setFilterClientId] = useState('');
  const [filterMatterId, setFilterMatterId] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Message templates
  const messageTemplates = [
    { label: 'Select a template...', value: '' },
    { label: 'Thank you for contacting us', value: 'Thank you for contacting us. We have received your message and will respond within 24 hours.' },
    { label: 'Request for more information', value: 'Thank you for your inquiry. To better assist you, could you please provide more details about your situation?' },
    { label: 'Document received', value: 'We have received your documents. Our team is reviewing them and will get back to you shortly.' },
    { label: 'Appointment confirmation', value: 'Your appointment has been confirmed. We look forward to meeting with you.' },
    { label: 'Follow-up required', value: 'This matter requires follow-up. Please provide the requested information at your earliest convenience.' },
    { label: 'Case update', value: 'We wanted to update you on the progress of your case. Please let us know if you have any questions.' },
  ];

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      organizeConversations();
    }
  }, [messages, filterClientId, filterMatterId]);

  // Auto-scroll to newest message when conversation changes or new message arrives
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation, messages]);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<Message>('messages');
      // Sort by date, newest first
      const sortedMessages = (items || []).sort((a, b) => {
        const dateA = new Date(a.sentDate || 0).getTime();
        const dateB = new Date(b.sentDate || 0).getTime();
        return dateB - dateA;
      });
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const organizeConversations = () => {
    const conversationMap = new Map<string, Conversation>();

    // Filter messages based on clientId and matterId filters
    const filteredMessages = messages.filter(msg => {
      if (filterClientId && msg.clientId !== filterClientId) return false;
      if (filterMatterId && msg.matterId !== filterMatterId) return false;
      return true;
    });

    filteredMessages.forEach(msg => {
      const convId = msg.conversationId || '';
      if (!convId) return;

      if (!conversationMap.has(convId)) {
        conversationMap.set(convId, {
          conversationId: convId,
          clientEmail: msg.senderEmail === 'admin@legalservices.com' ? msg.recipientEmail || '' : msg.senderEmail || '',
          clientName: msg.senderEmail === 'admin@legalservices.com' ? msg.recipientEmail || '' : msg.senderName || msg.senderEmail || '',
          messages: [],
          unreadCount: 0,
          lastMessageDate: new Date(msg.sentDate || 0),
          clientId: msg.clientId,
          matterId: msg.matterId,
          matterReference: msg.matterId ? `Matter #${msg.matterId.slice(0, 8)}` : undefined,
        });
      }

      const conv = conversationMap.get(convId)!;
      conv.messages.push(msg);

      // Count unread messages from clients (not from admin)
      if (!msg.isRead && msg.senderEmail !== 'admin@legalservices.com') {
        conv.unreadCount++;
      }

      // Update last message date
      const msgDate = new Date(msg.sentDate || 0);
      if (msgDate > conv.lastMessageDate) {
        conv.lastMessageDate = msgDate;
      }
    });

    // Convert to array and sort by last message date
    const conversationsArray = Array.from(conversationMap.values()).sort(
      (a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime()
    );

    setConversations(conversationsArray);

    // Auto-select first conversation if none selected
    if (!selectedConversation && conversationsArray.length > 0) {
      setSelectedConversation(conversationsArray[0].conversationId);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');

    if (!replyText.trim() || !selectedConversation) {
      setSendError('Please enter a message');
      return;
    }

    const conversation = conversations.find(c => c.conversationId === selectedConversation);
    if (!conversation) return;

    setIsSending(true);

    try {
      const senderName = currentUser?.firstName && currentUser?.lastName
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : currentUser?.firstName || 'Admin Team';

      const messageData: Message = {
        _id: crypto.randomUUID(),
        senderEmail: 'admin@legalservices.com',
        senderName: senderName,
        recipientEmail: conversation.clientEmail,
        messageContent: replyText,
        sentDate: new Date(),
        isRead: false,
        conversationId: selectedConversation,
        clientId: conversation.clientId,
        matterId: conversation.matterId,
        priority: replyPriority,
        attachmentUrl: replyAttachment || undefined,
      };

      await BaseCrudService.create('messages', messageData);

      // Send email notification to client
      try {
        await sendEmail({
          to: conversation.clientEmail,
          subject: `New message from ${senderName}`,
          body: `You have received a new message:\n\n${replyText}\n\nPlease log in to your account to view and respond.`,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails
      }

      setMessages(prev => [messageData, ...prev]);
      setReplyText('');
      setReplyPriority('Normal');
      setReplyAttachment('');
      setSendSuccess(true);

      setTimeout(() => setSendSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to send reply:', error);
      setSendError('Failed to send reply. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const markConversationAsRead = async (conversationId: string) => {
    const conversation = conversations.find(c => c.conversationId === conversationId);
    if (!conversation) return;

    const unreadMessages = conversation.messages.filter(
      msg => !msg.isRead && msg.senderEmail !== 'admin@legalservices.com'
    );

    for (const msg of unreadMessages) {
      try {
        await BaseCrudService.update('messages', { _id: msg._id, isRead: true });
      } catch (error) {
        console.error('Failed to mark message as read:', error);
      }
    }

    // Update local state
    setMessages(prev => prev.map(msg => {
      if (msg.conversationId === conversationId && msg.senderEmail !== 'admin@legalservices.com') {
        return { ...msg, isRead: true };
      }
      return msg;
    }));
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await BaseCrudService.delete('messages', messageId);
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    } catch (error) {
      console.error('Failed to delete message:', error);
      setSendError('Failed to delete message. Please try again.');
    }
  };

  const handleSendNewMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');

    if (!newMessageEmail.trim() || !newMessageContent.trim()) {
      setSendError('Please enter both email and message');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMessageEmail)) {
      setSendError('Please enter a valid email address');
      return;
    }

    setIsSending(true);

    try {
      const senderName = currentUser?.firstName && currentUser?.lastName
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : currentUser?.firstName || 'Admin Team';

      const conversationId = crypto.randomUUID();
      const messageData: Message = {
        _id: crypto.randomUUID(),
        senderEmail: 'admin@legalservices.com',
        senderName: senderName,
        recipientEmail: newMessageEmail,
        messageContent: newMessageContent,
        sentDate: new Date(),
        isRead: false,
        conversationId: conversationId,
        clientId: newMessageClientId || undefined,
        matterId: newMessageMatterId || undefined,
        priority: newMessagePriority,
      };

      await BaseCrudService.create('messages', messageData);

      // Send email notification to client
      try {
        await sendEmail({
          to: newMessageEmail,
          subject: `New message from ${senderName}`,
          body: `You have received a new message:\n\n${newMessageContent}\n\nPlease log in to your account to view and respond.`,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails
      }

      setMessages(prev => [messageData, ...prev]);
      setNewMessageEmail('');
      setNewMessageContent('');
      setNewMessageClientId('');
      setNewMessageMatterId('');
      setNewMessagePriority('Normal');
      setShowNewMessageForm(false);
      setSendSuccess(true);

      setTimeout(() => setSendSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setSendError('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const selectedConv = conversations.find(c => c.conversationId === selectedConversation);

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation);
    }
  }, [selectedConversation]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
            Client Messages
          </h1>
          <p className="font-paragraph text-lg text-foreground/80">
            View and respond to messages from your clients
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {/* New Message Button */}
          <div className="mb-6">
            <Button
              onClick={() => setShowNewMessageForm(!showNewMessageForm)}
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {showNewMessageForm ? 'Cancel New Message' : 'New Message to User'}
            </Button>
          </div>

          {/* New Message Form */}
          {showNewMessageForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Send New Message to User</CardTitle>
                <CardDescription className="font-paragraph">
                  Start a new conversation with a client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendNewMessage} className="space-y-4">
                  <div>
                    <Label htmlFor="newMessageEmail" className="font-paragraph">Client Email *</Label>
                    <Input
                      id="newMessageEmail"
                      type="email"
                      value={newMessageEmail}
                      onChange={(e) => setNewMessageEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="newMessageClientId" className="font-paragraph">Client ID (Optional)</Label>
                      <Input
                        id="newMessageClientId"
                        type="text"
                        value={newMessageClientId}
                        onChange={(e) => setNewMessageClientId(e.target.value)}
                        placeholder="client-123"
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newMessageMatterId" className="font-paragraph">Matter ID (Optional)</Label>
                      <Input
                        id="newMessageMatterId"
                        type="text"
                        value={newMessageMatterId}
                        onChange={(e) => setNewMessageMatterId(e.target.value)}
                        placeholder="matter-456"
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newMessagePriority" className="font-paragraph">Priority</Label>
                      <Select value={newMessagePriority} onValueChange={setNewMessagePriority}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="Follow-up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newMessageContent" className="font-paragraph">Message *</Label>
                    <textarea
                      id="newMessageContent"
                      value={newMessageContent}
                      onChange={(e) => setNewMessageContent(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {sendSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-green-900 mb-1">Message Sent!</h3>
                <p className="font-paragraph text-green-800">Your message has been sent to the client.</p>
              </div>
            </div>
          )}

          {sendError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-red-800">{sendError}</p>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="font-paragraph text-foreground/80">Loading messages...</p>
            </div>
          ) : conversations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-paragraph text-foreground/80">
                  No messages yet. Messages from clients will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Conversations</CardTitle>
                    <div className="pt-4 space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search clients..."
                          className="pl-10 border-gray-300"
                        />
                      </div>

                      {/* Filters */}
                      <div>
                        <Button
                          onClick={() => setShowFilters(!showFilters)}
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <Filter className="w-4 h-4" />
                          {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>

                        {showFilters && (
                          <div className="mt-3 space-y-3 p-3 bg-gray-50 rounded-lg">
                            <div>
                              <Label htmlFor="filterClientId" className="font-paragraph text-xs">Filter by Client ID</Label>
                              <Input
                                id="filterClientId"
                                type="text"
                                value={filterClientId}
                                onChange={(e) => setFilterClientId(e.target.value)}
                                placeholder="client-123"
                                className="border-gray-300 text-sm"
                              />
                            </div>
                            <div>
                              <Label htmlFor="filterMatterId" className="font-paragraph text-xs">Filter by Matter ID</Label>
                              <Input
                                id="filterMatterId"
                                type="text"
                                value={filterMatterId}
                                onChange={(e) => setFilterMatterId(e.target.value)}
                                placeholder="matter-456"
                                className="border-gray-300 text-sm"
                              />
                            </div>
                            {(filterClientId || filterMatterId) && (
                              <Button
                                onClick={() => {
                                  setFilterClientId('');
                                  setFilterMatterId('');
                                }}
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                Clear Filters
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto">
                      {filteredConversations.map(conv => (
                        <button
                          key={conv.conversationId}
                          onClick={() => setSelectedConversation(conv.conversationId)}
                          className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                            selectedConversation === conv.conversationId ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <p className="font-heading font-bold text-foreground">
                                {conv.clientName}
                              </p>
                            </div>
                            {conv.unreadCount > 0 && (
                              <span className="px-2 py-1 bg-primary text-white text-xs font-paragraph font-semibold rounded-full">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          {conv.matterReference && (
                            <div className="flex items-center gap-1 mb-1">
                              <FileText className="w-3 h-3 text-gray-400" />
                              <p className="font-paragraph text-xs text-foreground/60">
                                {conv.matterReference}
                              </p>
                            </div>
                          )}
                          <p className="font-paragraph text-sm text-foreground/60 truncate">
                            {conv.messages[0]?.messageContent}
                          </p>
                          <p className="font-paragraph text-xs text-foreground/40 mt-1">
                            {conv.lastMessageDate.toLocaleDateString()} {conv.lastMessageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conversation Detail */}
              <div className="lg:col-span-2">
                {selectedConv ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-heading text-2xl">
                            Conversation with {selectedConv.clientName}
                          </CardTitle>
                          <CardDescription className="font-paragraph">
                            {selectedConv.clientEmail}
                          </CardDescription>
                          {selectedConv.matterReference && (
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {selectedConv.matterReference}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Messages */}
                      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
                        {selectedConv.messages.slice().reverse().map(msg => {
                          const isFromAdmin = msg.senderEmail === 'admin@legalservices.com';
                          return (
                            <div
                              key={msg._id}
                              className={`rounded-lg p-4 ${
                                isFromAdmin
                                  ? 'bg-primary/5 border border-primary/20 ml-8'
                                  : 'bg-white border border-gray-200 mr-8'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-heading font-bold text-foreground text-sm">
                                      {isFromAdmin ? (msg.senderName || 'Admin Team') : msg.senderName}
                                    </p>
                                    {msg.priority && msg.priority !== 'Normal' && (
                                      <Badge 
                                        variant={msg.priority === 'Urgent' ? 'destructive' : 'default'}
                                        className="flex items-center gap-1 text-xs"
                                      >
                                        <Flag className="w-3 h-3" />
                                        {msg.priority}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="font-paragraph text-xs text-foreground/60">
                                    {msg.sentDate instanceof Date
                                      ? msg.sentDate.toLocaleString()
                                      : new Date(msg.sentDate || '').toLocaleString()}
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleDeleteMessage(msg._id)}
                                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                  title="Delete message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="font-paragraph text-foreground whitespace-pre-wrap">
                                {msg.messageContent}
                              </p>
                              {msg.attachmentUrl && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <a
                                    href={msg.attachmentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-sm"
                                  >
                                    <Paperclip className="w-4 h-4" />
                                    View Attachment
                                  </a>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Reply Form */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-heading text-lg font-bold text-foreground mb-4">Send Reply</h3>

                        {sendError && (
                          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="font-paragraph text-red-800">{sendError}</p>
                          </div>
                        )}

                        <form onSubmit={handleSendReply} className="space-y-4">
                          {/* Message Templates */}
                          <div>
                            <Label htmlFor="messageTemplate" className="font-paragraph">Quick Response Templates</Label>
                            <Select 
                              value="" 
                              onValueChange={(value) => {
                                if (value) setReplyText(value);
                              }}
                            >
                              <SelectTrigger className="border-gray-300">
                                <SelectValue placeholder="Select a template..." />
                              </SelectTrigger>
                              <SelectContent>
                                {messageTemplates.map((template, index) => (
                                  <SelectItem key={index} value={template.value}>
                                    {template.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="replyPriority" className="font-paragraph">Priority</Label>
                              <Select value={replyPriority} onValueChange={setReplyPriority}>
                                <SelectTrigger className="border-gray-300">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Urgent">Urgent</SelectItem>
                                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="replyAttachment" className="font-paragraph">Attachment URL (Optional)</Label>
                              <Input
                                id="replyAttachment"
                                type="url"
                                value={replyAttachment}
                                onChange={(e) => setReplyAttachment(e.target.value)}
                                placeholder="https://example.com/file.pdf"
                                className="border-gray-300"
                              />
                            </div>
                          </div>

                          <div>
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Type your reply here..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                              rows={4}
                              required
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={isSending}
                            className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            {isSending ? 'Sending...' : 'Send Reply'}
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/80">
                        Select a conversation to view messages
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
