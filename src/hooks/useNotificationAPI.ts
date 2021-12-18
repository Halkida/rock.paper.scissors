import { useCallback, useState } from 'react';
import { Notification } from '@/types';

export const useNotificationAPI = () => {
  const [permisstion, setPermisstion] = useState<string>(Notification.permission);

  if (permisstion === 'default' || permisstion !== 'denied') {
    Notification.requestPermission().then((result) => {
      setPermisstion(result);
    });
  }

  const notify = useCallback((options: Notification) => {
    if (permisstion === 'granted') {
      const {title, body, ...NotificationOptions} = options;
      console.log(NotificationOptions);

      const notification = new Notification(title, {
        body,
        ...NotificationOptions
      });

      if (options.events) {
        Object.entries(options.events).forEach(([eventType, handler]) => {
          notification.addEventListener(eventType, handler);
        });
      }
    }
  }, []);

  return {
    notify
  };
};