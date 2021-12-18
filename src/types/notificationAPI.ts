export type NotificationEvent = () => void;

export type Notification = {
  title: string;
  body: string;
  delay?: number;
  events?: {
    [K in keyof NotificationEventMap]?: NotificationEvent
  },
  onClick?: (this: Notification, ev: Event) => any;
  onClose?: (this: Notification, ev: Event) => any;
  onError?: (this: Notification, ev: Event) => any;
  onShow?: (this: Notification, ev: Event) => any;
} & NotificationOptions;