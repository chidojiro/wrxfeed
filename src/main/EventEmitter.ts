export enum EventName {
  EXAMPLE = 'EXAMPLE',
  ON_KEY_DOWN = 'ON_KEY_DOWN',
  ON_KEY_UP = 'ON_KEY_UP',
}

type Callback = (...args: unknown[]) => unknown;
interface EventObj {
  [index: string]: Callback[];
}

export default {
  events: <EventObj>{},
  dispatch(event: EventName, data?: unknown): void {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  },
  subscribe(event: EventName, callback: Callback): void {
    if (typeof callback !== 'function') {
      throw Error(`${event}: Event Callback must be a function`);
    }
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  unsubscribe(event: EventName, callback: Callback): void {
    if (typeof callback !== 'function') {
      throw Error(`${event}: Event Callback must be a function`);
    }
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  },
};
