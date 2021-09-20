import { useContext } from 'react';
import { ConfirmFn } from '../types';
import ConfirmContext from '../contexts/ConfirmContext';

export function useConfirm(): ConfirmFn {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('ConfirmProvider is missing in component tree');
  }
  return context;
}
