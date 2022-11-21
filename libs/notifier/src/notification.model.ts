export class NotificationModel {
  payload?: any;
  notification: Notification;
  image?: string;
  link?: string;
  icon?: string;
  color?: string;
  badge?: number;
  actions?: Action[];
}

class Action {
  action: string;
  title: string;
  icon?: string;
}

class Notification {
  title: string;
  body: string;
  image?: string;
}
