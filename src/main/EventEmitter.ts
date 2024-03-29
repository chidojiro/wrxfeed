export enum EventName {
  OPEN_EMOJI_PICKER = 'OPEN_EMOJI_PICKER',
  CLOSE_EMOJI_PICKER = 'CLOSE_EMOJI_PICKER',
  OPEN_NOTIFY_BANNER = 'OPEN_NOTIFY_BANNER',
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
