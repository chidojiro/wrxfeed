import { createContext } from 'react';
import { ConfirmFn } from '../types';

export default createContext<ConfirmFn | undefined>(undefined);
