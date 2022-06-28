import { Children } from '@/common/types';
import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { Popover } from '../Popover';
import { PopoverProps } from '../Popover/Popover';

export type TooltipProps = Children &
  Omit<PopoverProps, 'trigger' | 'open'> & { trigger: JSX.Element };

export const Tooltip: React.FC<TooltipProps> = ({
  trigger,
  children,
  placement = 'top',
  ...restProps
}) => {
  const disclosure = useDisclosure();

  const clonedTrigger = React.useMemo(() => {
    return React.cloneElement(trigger as any, {
      onMouseEnter: disclosure.onOpen,
      onMouseLeave: disclosure.onClose,
    });
  }, [disclosure.onOpen, disclosure.onClose, trigger]);

  return (
    <Popover open={disclosure.isOpen} trigger={clonedTrigger} placement={placement} {...restProps}>
      <div>
        <div className="flex flex-col items-center">
          <span className="z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
            {children}
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600" />
        </div>
      </div>
    </Popover>
  );
};
