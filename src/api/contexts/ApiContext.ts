import React from 'react';
import { ApiClient } from '../types';

export default React.createContext<ApiClient | undefined>(undefined);
