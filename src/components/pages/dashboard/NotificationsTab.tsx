import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader, Bell, FileText, User, Save } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Notification } from './types';

interface NotificationsTabProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  isLoadingNotifications: boolean;
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function NotificationsTab({ 
  notifications, 
  setNotifications, 
  isLoadingNotifications, 
  unreadCount,
  setUnreadCount 
}: NotificationsTabProps) {

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await BaseCrudService.update('notifications', { _id: notificationId, isRead: true });
      setNotifications(prev => prev.map(notif => 
        notif._id === notificationId ? { ...notif, isRead: true } : notif
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.isRead);
      for (const notif of unreadNotifications) {
        await BaseCrudService.update('notifications', { _id: notif._id, isRead: true });
      }
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading text-2xl flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Notifications
            </CardTitle>
            <CardDescription className="font-paragraph">
              Stay updated on changes and uploads to your account
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllNotificationsAsRead}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Mark All as Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingNotifications ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80 mb-4">
              No notifications yet. You'll be notified when there are updates to your account.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => {
              const isUnread = !notification.isRead;

              return (
                <div
                  key={notification._id}
                  className={`rounded-lg p-5 border transition-all cursor-pointer ${
                    isUnread
                      ? 'bg-primary/5 border-primary/30 shadow-sm'
                      : 'bg-white border-gray-200'
                  }`}
                  onClick={() => {
                    if (isUnread) {
                      markNotificationAsRead(notification._id);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {notification.notificationType === 'document_upload' && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isUnread ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${isUnread ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                      )}
                      {notification.notificationType === 'profile_update' && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isUnread ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <User className={`w-5 h-5 ${isUnread ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                      )}
                      {notification.notificationType === 'account_update' && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isUnread ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <Save className={`w-5 h-5 ${isUnread ? 'text-purple-600' : 'text-gray-600'}`} />
                        </div>
                      )}
                      {!['document_upload', 'profile_update', 'account_update'].includes(notification.notificationType || '') && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isUnread ? 'bg-primary/20' : 'bg-gray-100'
                        }`}>
                          <Bell className={`w-5 h-5 ${isUnread ? 'text-primary' : 'text-gray-600'}`} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-heading text-base font-semibold ${
                          isUnread ? 'text-foreground' : 'text-foreground/80'
                        }`}>
                          {notification.notificationTitle}
                        </h3>
                        {isUnread && (
                          <Badge className="ml-2 bg-primary text-white">New</Badge>
                        )}
                      </div>
                      
                      <p className={`font-paragraph text-sm mb-3 ${
                        isUnread ? 'text-foreground' : 'text-foreground/70'
                      }`}>
                        {notification.notificationMessage}
                      </p>
                      
                      <p className="font-paragraph text-xs text-foreground/60">
                        {notification.createdDate 
                          ? new Date(notification.createdDate).toLocaleString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
