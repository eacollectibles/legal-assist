import { useState, useRef, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, User, Search, Send, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useParalegalDashboard } from './ParalegalDashboardContext';
import type { Message } from './types';

export default function MessagesTab() {
  const { 
    conversations, 
    paralegals, 
    currentParalegalId,
    setMessages
  } = useParalegalDashboard();

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      </div>

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

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-xl">
              {selectedConv
                ? `Conversation with ${selectedConv.clientName}`
                : 'Select a conversation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedConv ? (
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
                <p className="font-paragraph text-lg text-foreground/60">
                  Select a conversation to view messages
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
