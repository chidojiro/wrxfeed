import { useDelayableState, useOnClickOutside } from '@/common/hooks';
import { Children, OpenClose } from '@/common/types';
import clsx from 'clsx';
import React, { useState } from 'react';
import { PopperProps, usePopper } from 'react-popper';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { Portal } from '../Portal';

export type PopoverPlacement = PopperProps<any>['placement'];

export type PopoverProps = Children &
  OpenClose & {
    placement?: PopoverPlacement;
    usePortal?: boolean;
    trigger: JSX.Element | HTMLElement;
    offset?: [number, number];
    closeOnClickOutside?: boolean;
  };

export const Popover = ({
  children,
  usePortal = true,
  trigger,
  placement = 'bottom-start',
  offset = [0, 8],
  closeOnClickOutside = true,
  open,
  onClose,
}: PopoverProps) => {
  const [triggerElement, setTriggerElement] = useState(null);
  const popoverRef = React.useRef(null);

  // Workaround to resolve misalignment on initial render
  const [actuallyOpen, setActuallyOpen] = useDelayableState(0, false);

  const isHTMLElementTrigger = !!(trigger as HTMLElement)?.tagName;

  const { styles, attributes } = usePopper(
    isHTMLElementTrigger ? (trigger as any) : triggerElement,
    popoverRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
    },
  );

  React.useEffect(() => {
    setActuallyOpen(!!open, true);
  }, [trigger, open, setActuallyOpen]);

  const clonedTrigger = React.useMemo(() => {
    if (isHTMLElementTrigger || !trigger) return null;

    return React.cloneElement(trigger as any, {
      ref: setTriggerElement,
    });
  }, [isHTMLElementTrigger, trigger]);

  useOnClickOutside(closeOnClickOutside && [popoverRef, triggerElement], onClose);

  return (
    <>
      {clonedTrigger}
      <ConditionalWrapper if={{ condition: usePortal, component: Portal as any }}>
        <div ref={popoverRef} style={styles.popper} {...attributes.popper} className="z-50">
          <div className={clsx({ hidden: !actuallyOpen })}>{children}</div>
        </div>
      </ConditionalWrapper>
    </>
  );
};
