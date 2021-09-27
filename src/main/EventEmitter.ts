// export default {
//   _events: {},
//   dispatch(event, data) {
//     if (!this._events[event]) return;
//     this._events[event].forEach((callback) => callback(data));
//   },
//   subscribe(event, callback) {
//     if (typeof callback !== 'function') {
//       throw Error(`${event}: Event Callback must be a function`);
//     }
//     if (!this._events[event]) this._events[event] = [];
//     this._events[event].push(callback);
//   },
//   unsubscribe(event, callback) {
//     if (typeof callback !== 'function') {
//       throw Error(`${event}: Event Callback must be a function`);
//     }
//     if (!this._events[event]) return;
//     this._events[event] = this._events[event].filter((cb) => cb !== callback);
//   },
// };
