import React from 'react';
import Pusher from 'pusher-js';

export default React.createContext<Pusher | undefined>(undefined);
