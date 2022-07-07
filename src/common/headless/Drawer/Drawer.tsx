import { Popover, PopoverPlacement } from '@/common/components';
import { Children, OpenClose } from '@/common/types';
import React from 'react';

type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

export type DrawerProps = Children &
  Pick<OpenClose, 'open'> & {
    placement?: 'top' | 'bottom' | 'left' | 'right';
  };
const popoverPlacementMap: Record<DrawerPlacement, PopoverPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const styleMap: Record<DrawerPlacement, React.CSSProperties> = {
  top: {
    top: '0',
    left: '50%',
  },
  bottom: {
    bottom: '0',
    left: '50%',
  },
  left: {
    top: '50%',
    left: '0',
  },
  right: {
    top: '50%',
    right: '0',
  },
};

export const Drawer = ({ placement = 'right', ...restProps }: DrawerProps) => {
  return (
    <Popover
      placement={popoverPlacementMap[placement]}
      offset={[0, 0]}
      trigger={<div style={{ ...styleMap[placement], position: 'fixed' }}></div>}
      {...restProps}
    />
  );
};
