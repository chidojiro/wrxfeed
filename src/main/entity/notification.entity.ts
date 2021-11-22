import { Profile } from '@auth/types';

export type NotificationData = {
  commentId: number;
  transactionId: number;
};

export type Notification = {
  id: number;
  content: string;
  type: string;
  status: string;
  data: NotificationData;
  createdAt: string;
  causedByUser: Profile;
};

export enum NotifyStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}
