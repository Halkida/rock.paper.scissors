type EventCallback = (...params: unknown[]) => void;

export default class EventBus {
  listeners: {
    [key: string]: EventCallback[],
  };

  constructor() {
    this.listeners = {};
  }

  on(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  emit(eventName: string, ...args: unknown[]): void {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  detach(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Нет события: ${eventName}`);
    }

    this.listeners[eventName] = this.listeners[eventName]
      .filter((item) => item !== callback);

    if (this.listeners[eventName].length === 0) {
      delete this.listeners[eventName];
    }
  }
}
