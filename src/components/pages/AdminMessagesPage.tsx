import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { MessageSquare, Send, Loader, AlertCircle, CheckCircle, Search, User } from 'lucide-react';

interface Message {
  _id: string;
  senderEmail?: string;
  senderName?: string;
  recipientEmail?: string;
  messageContent?: string;
  sentDate?: Date | string;
  isRead?: boolean;
  conversationId?: string;
}

interface Conversation {
  conversationId: string;
  clientEmail: string;
  clientName: string;
  messages: Message[];
  unreadCount: number;
  lastMessageDate: Date;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      organizeConversations();
    }
  }, [messages]);

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

    messages.forEach(msg => {
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
      const messageData: Message = {
        _id: crypto.randomUUID(),
        senderEmail: 'admin@legalservices.com',
        senderName: 'Admin Team',
        recipientEmail: conversation.clientEmail,
        messageContent: replyText,
        sentDate: new Date(),
        isRead: false,
        conversationId: selectedConversation,
      };

      await BaseCrudService.create('messages', messageData);

      setMessages(prev => [messageData, ...prev]);
      setReplyText('');
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
          {sendSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-green-900 mb-1">Reply Sent!</h3>
                <p className="font-paragraph text-green-800">Your message has been sent to the client.</p>
              </div>
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
                    <div className="pt-4">
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
                      <CardTitle className="font-heading text-2xl">
                        Conversation with {selectedConv.clientName}
                      </CardTitle>
                      <CardDescription className="font-paragraph">
                        {selectedConv.clientEmail}
                      </CardDescription>
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
                                <p className="font-heading font-bold text-foreground text-sm">
                                  {isFromAdmin ? 'Admin Team' : msg.senderName}
                                </p>
                                <p className="font-paragraph text-xs text-foreground/60">
                                  {msg.sentDate instanceof Date
                                    ? msg.sentDate.toLocaleString()
                                    : new Date(msg.sentDate || '').toLocaleString()}
                                </p>
                              </div>
                              <p className="font-paragraph text-foreground whitespace-pre-wrap">
                                {msg.messageContent}
                              </p>
                            </div>
                          );
                        })}
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
