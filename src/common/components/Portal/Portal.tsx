import { Children } from '@/common/types';
import { createPortal } from 'react-dom';

export type PortalProps = Children & {
  asChildOf?: HTMLElement | null;
};

export const Portal = ({ children, asChildOf }: PortalProps) => {
  return createPortal(children, asChildOf ?? document.getElementById('root') ?? document.body);
};
