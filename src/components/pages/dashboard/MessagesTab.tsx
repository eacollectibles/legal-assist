import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader, MessageSquare, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Message, CurrentUser } from './types';

interface MessagesTabProps {
  currentUser: CurrentUser;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoadingMessages: boolean;
}

export default function MessagesTab({ 
  currentUser, 
  messages, 
  setMessages, 
  isLoadingMessages 
}: MessagesTabProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError('');

    if (!newMessage.trim()) {
      setMessageError('Please enter a message');
      return;
    }

    setIsSendingMessage(true);

    try {
      const adminEmail = 'admin@legalservices.com';
      const conversationId = `${currentUser?.email}-admin`;

      const messageData: Message = {
        _id: crypto.randomUUID(),
        senderEmail: currentUser?.email || '',
        senderName: currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : currentUser?.email || '',
        recipientEmail: adminEmail,
        messageContent: newMessage,
        sentDate: new Date(),
        isRead: false,
        conversationId: conversationId,
      };

      await BaseCrudService.create('messages', messageData);

      setMessages(prev => [messageData, ...prev]);
      setNewMessage('');
      setMessageSuccess(true);

      setTimeout(() => setMessageSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessageError('Failed to send message. Please try again.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      await BaseCrudService.update('messages', { _id: messageId, isRead: true });
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  return (
    <div>
      {messageSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-bold text-green-900 mb-1">Message Sent!</h3>
            <p className="font-paragraph text-green-800">Your message has been sent to the admin team.</p>
          </div>
        </div>
      )}

      {/* Send Message Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Send a Message</CardTitle>
          <CardDescription className="font-paragraph">
            Contact our admin team with questions or concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messageError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-paragraph text-red-800">{messageError}</p>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label htmlFor="newMessage" className="block font-paragraph font-semibold text-foreground mb-2">
                Your Message
              </label>
              <textarea
                id="newMessage"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSendingMessage}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSendingMessage ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Message History */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Message History</CardTitle>
          <CardDescription className="font-paragraph">
            View your conversation with the admin team
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingMessages ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="font-paragraph text-foreground/80">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/80 mb-4">
                No messages yet. Send your first message to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(message => {
                const isFromClient = message.senderEmail === currentUser?.email;
                const isUnread = !message.isRead && !isFromClient;

                // Mark as read when viewing
                if (isUnread) {
                  markMessageAsRead(message._id);
                }

                return (
                  <div
                    key={message._id}
                    className={`rounded-lg p-6 ${
                      isFromClient
                        ? 'bg-primary/5 border border-primary/20 ml-8'
                        : 'bg-pastelbeige/20 border border-pastelbeige mr-8'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-heading font-bold text-foreground">
                          {isFromClient ? 'You' : 'Admin Team'}
                        </p>
                        <p className="font-paragraph text-sm text-foreground/60">
                          {message.sentDate instanceof Date
                            ? message.sentDate.toLocaleString()
                            : new Date(message.sentDate || '').toLocaleString()}
                        </p>
                      </div>
                      {isUnread && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-paragraph font-semibold rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="font-paragraph text-foreground whitespace-pre-wrap">
                      {message.messageContent}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
