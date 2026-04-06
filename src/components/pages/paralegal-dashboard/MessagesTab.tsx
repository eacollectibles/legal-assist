import { useState, useRef, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, User, Search, Send, FileText, Plus, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useParalegalDashboard } from './ParalegalDashboardContext';
import type { Message } from './types';

interface AssignedClient {
  clientId: string;
  clientName: string;
  clientEmail: string;
}

export default function MessagesTab() {
  const {
    conversations,
    paralegals,
    clients,
    fileAssignments,
    currentParalegalId,
    setMessages
  } = useParalegalDashboard();

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // New message compose state
  const [isComposing, setIsComposing] = useState(false);
  const [assignedClients, setAssignedClients] = useState<AssignedClient[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [composePriority, setComposePriority] = useState('Normal');
  const [isSendingNewMessage, setIsSendingNewMessage] = useState(false);
  const [composeSuccess, setComposeSuccess] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(false);

  // Auto-scroll to newest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation]);

  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation);
    }
  }, [selectedConversation]);

  // Load assigned clients with emails when compose is opened
  const handleOpenCompose = async () => {
    setIsComposing(true);
    setSelectedConversation(null);
    setIsLoadingClients(true);

    try {
      // Get client IDs assigned to current paralegal
      const assignedClientIds = fileAssignments
        .filter(a => a.paralegalId === currentParalegalId)
        .map(a => a.clientId);

      // Fetch user accounts to get emails
      const { items: userAccounts } = await BaseCrudService.getAll<any>('useraccounts');

      const clientList: AssignedClient[] = [];
      for (const clientId of assignedClientIds) {
        if (!clientId) continue;
        const profile = clients.find(c => c._id === clientId);
        const account = userAccounts.find((u: any) => u._id === clientId);

        const name = profile
          ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
          : account?.firstName
          ? `${account.firstName || ''} ${account.lastName || ''}`.trim()
          : 'Unknown Client';

        const email = account?.email || '';

        if (email) {
          clientList.push({ clientId, clientName: name, clientEmail: email });
        }
      }

      // Sort alphabetically
      clientList.sort((a, b) => a.clientName.localeCompare(b.clientName));
      setAssignedClients(clientList);
    } catch (error) {
      console.error('Error loading assigned clients:', error);
    } finally {
      setIsLoadingClients(false);
    }
  };

  const handleCloseCompose = () => {
    setIsComposing(false);
    setSelectedClientId('');
    setComposeMessage('');
    setComposePriority('Normal');
  };

  const handleSendNewMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClientId || !composeMessage.trim()) return;

    const client = assignedClients.find(c => c.clientId === selectedClientId);
    if (!client) return;

    setIsSendingNewMessage(true);

    try {
      const paralegal = paralegals.find(p => p._id === currentParalegalId);
      const senderName = paralegal
        ? `${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim()
        : 'Paralegal';

      const newConversationId = crypto.randomUUID();

      const messageData: Message = {
        _id: crypto.randomUUID(),
        senderEmail: 'admin@legalservices.com',
        senderName: senderName,
        recipientEmail: client.clientEmail,
        messageContent: composeMessage,
        sentDate: new Date(),
        isRead: false,
        conversationId: newConversationId,
        clientId: client.clientId,
        priority: composePriority,
      };

      await BaseCrudService.create('messages', messageData);

      // Add to local state so conversation appears immediately
      setMessages(prev => [messageData, ...prev]);

      // Reset form and show success
      handleCloseCompose();
      setComposeSuccess(true);
      setTimeout(() => setComposeSuccess(false), 4000);

      // Auto-select the new conversation after a brief delay for state to update
      setTimeout(() => setSelectedConversation(newConversationId), 300);
    } catch (error) {
      console.error('Failed to send new message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSendingNewMessage(false);
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

    setMessages(prev => prev.map(msg => {
      if (msg.conversationId === conversationId && msg.senderEmail !== 'admin@legalservices.com') {
        return { ...msg, isRead: true };
      }
      return msg;
    }));
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyText.trim() || !selectedConversation) {
      return;
    }

    const conversation = conversations.find(c => c.conversationId === selectedConversation);
    if (!conversation) return;

    setIsSendingMessage(true);

    try {
      const paralegal = paralegals.find(p => p._id === currentParalegalId);
      const senderName = paralegal
        ? `${paralegal.firstName || ''} ${paralegal.lastName || ''}`.trim()
        : 'Paralegal';

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
        priority: 'Normal',
      };

      await BaseCrudService.create('messages', messageData);

      setMessages(prev => [messageData, ...prev]);
      setReplyText('');
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    conv.clientEmail.toLowerCase().includes(messageSearchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.conversationId === selectedConversation);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-3xl font-bold text-foreground">
          Client Messages
        </h2>
        <Button
          onClick={handleOpenCompose}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Message
        </Button>
      </div>

      {/* Success banner */}
      {composeSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Send className="w-5 h-5 text-green-600" />
          <p className="font-paragraph text-green-800">Message sent successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ minHeight: '600px' }}>
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversations
              {conversations.reduce((total, conv) => total + conv.unreadCount, 0) > 0 && (
                <Badge className="bg-destructive text-white ml-auto">
                  {conversations.reduce((total, conv) => total + conv.unreadCount, 0)} unread
                </Badge>
              )}
            </CardTitle>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Search conversations..."
                  value={messageSearchTerm}
                  onChange={(e) => setMessageSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.conversationId}
                  onClick={() => setSelectedConversation(conv.conversationId)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedConversation === conv.conversationId ? 'bg-primary/5 border-l-4 border-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-paragraph font-semibold text-foreground truncate">
                          {conv.clientName}
                        </p>
                        <p className="font-paragraph text-xs text-foreground/60 truncate">
                          {conv.clientEmail}
                        </p>
                      </div>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge className="bg-destructive text-white text-xs flex-shrink-0">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {conv.matterReference && (
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">
                      {conv.matterReference}
                    </p>
                  )}
                  <p className="font-paragraph text-xs text-foreground/50 mt-1">
                    {format(conv.lastMessageDate, 'MMM d, yyyy h:mm a')}
                  </p>
                </button>
              ))}
              {filteredConversations.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-foreground/20 mx-auto mb-3" />
                  <p className="font-paragraph text-foreground/60">
                    {conversations.length === 0 
                      ? 'No messages from assigned clients yet'
                      : 'No conversations match your search'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread / Compose Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-xl">
              {isComposing
                ? 'New Message'
                : selectedConv
                ? `Conversation with ${selectedConv.clientName}`
                : 'Select a conversation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* ===== COMPOSE NEW MESSAGE ===== */}
            {isComposing ? (
              <form onSubmit={handleSendNewMessage} className="space-y-5">
                {/* Client Selector */}
                <div>
                  <Label htmlFor="selectClient" className="font-paragraph font-semibold mb-2 block">
                    Select Client
                  </Label>
                  {isLoadingClients ? (
                    <div className="flex items-center gap-3 py-4">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="font-paragraph text-foreground/60">Loading clients...</span>
                    </div>
                  ) : assignedClients.length === 0 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <p className="font-paragraph text-yellow-800 text-sm">
                        No assigned clients found. Clients must be assigned to you via File Assignments before you can message them.
                      </p>
                    </div>
                  ) : (
                    <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                      <SelectTrigger id="selectClient" className="w-full">
                        <SelectValue placeholder="Choose a client to message..." />
                      </SelectTrigger>
                      <SelectContent>
                        {assignedClients.map((client) => (
                          <SelectItem key={client.clientId} value={client.clientId}>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="font-semibold">{client.clientName}</span>
                              <span className="text-foreground/50 text-xs">({client.clientEmail})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <Label htmlFor="composePriority" className="font-paragraph font-semibold mb-2 block">
                    Priority
                  </Label>
                  <Select value={composePriority} onValueChange={setComposePriority}>
                    <SelectTrigger id="composePriority" className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Body */}
                <div>
                  <Label htmlFor="composeMessage" className="font-paragraph font-semibold mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="composeMessage"
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    placeholder="Type your message to the client..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseCompose}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSendingNewMessage || !selectedClientId || !composeMessage.trim()}
                    className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                  >
                    {isSendingNewMessage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : selectedConv ? (
              <>
                {/* Messages */}
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
                  {selectedConv.messages
                    .sort((a, b) => {
                      const dateA = new Date(a.sentDate || 0).getTime();
                      const dateB = new Date(b.sentDate || 0).getTime();
                      return dateA - dateB;
                    })
                    .map((msg) => {
                      const isFromParalegal = msg.senderEmail === 'admin@legalservices.com';
                      return (
                        <div
                          key={msg._id}
                          className={`flex ${isFromParalegal ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              isFromParalegal
                                ? 'bg-primary text-white'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <p className={`font-paragraph text-sm font-semibold ${
                                isFromParalegal ? 'text-white' : 'text-foreground'
                              }`}>
                                {msg.senderName || msg.senderEmail}
                              </p>
                              {msg.priority && msg.priority !== 'Normal' && (
                                <Badge variant="outline" className="text-xs">
                                  {msg.priority}
                                </Badge>
                              )}
                            </div>
                            <p className={`font-paragraph text-sm whitespace-pre-wrap ${
                              isFromParalegal ? 'text-white' : 'text-foreground'
                            }`}>
                              {msg.messageContent}
                            </p>
                            <p className={`font-paragraph text-xs mt-2 ${
                              isFromParalegal ? 'text-white/80' : 'text-foreground/60'
                            }`}>
                              {msg.sentDate ? format(new Date(msg.sentDate), 'MMM d, yyyy h:mm a') : ''}
                            </p>
                            {msg.attachmentUrl && (
                              <a
                                href={msg.attachmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 mt-2 text-sm ${
                                  isFromParalegal ? 'text-white underline' : 'text-primary underline'
                                }`}
                              >
                                <FileText className="w-4 h-4" />
                                View Attachment
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-4">
                  <div>
                    <Label htmlFor="replyText" className="font-paragraph">Your Reply</Label>
                    <Textarea
                      id="replyText"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your message..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSendingMessage || !replyText.trim()}
                      className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                    >
                      {isSendingMessage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Reply
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <MessageSquare className="w-16 h-16 text-foreground/20 mb-4" />
                <p className="font-paragraph text-lg text-foreground/60 mb-2">
                  Select a conversation to view messages
                </p>
                <p className="font-paragraph text-sm text-foreground/40">
                  or click <strong>New Message</strong> to start a conversation
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
