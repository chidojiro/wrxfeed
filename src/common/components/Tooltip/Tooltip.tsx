import { useOnEventOutside } from '@/common/hooks';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import React from 'react';
import { Popover } from '../Popover';
import { PopoverProps } from '../Popover/Popover';

export type TooltipProps = Omit<PopoverProps, 'trigger' | 'open'> & {
  trigger: JSX.Element;
  arrowClassName?: string;
};

export const Tooltip = ({
  trigger,
  children,
  placement = 'top',
  arrowClassName,
  ...restProps
}: TooltipProps) => {
  const disclosure = useDisclosure();
  const triggerElementRef = React.useRef<any>();

  useOnEventOutside('mouseover', triggerElementRef, disclosure.onClose);

  const clonedTrigger = React.useMemo(() => {
    return React.Children.map(trigger, (child) =>
      React.cloneElement(child as any, {
        ref: (node: Element) => {
          triggerElementRef.current = node;

          if (node) {
            node.addEventListener('mouseenter', disclosure.onOpen);
          }

          // Call the original ref, if any
          const { ref } = child as any;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        },
      }),
    );
  }, [disclosure, trigger]);

  return (
    <Popover
      open={disclosure.isOpen}
      trigger={clonedTrigger as any}
      placement={placement}
      offset={[0, 8]}
      {...restProps}
    >
      <div>
        <div className="flex flex-col items-center">
          <span className="z-10 p-2 text-2xs leading-none text-white whitespace-no-wrap bg-primary shadow-lg rounded-sm">
            {children}
          </span>
          <div className={clsx('w-3 h-3 -mt-2 rotate-45 bg-primary', arrowClassName)} />
        </div>
      </div>
    </Popover>
  );
};
