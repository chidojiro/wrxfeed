import { useOnClickOutside } from '@/common/hooks';
import { Children, OpenClose } from '@/common/types';
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
  offset = [0, 4],
  closeOnClickOutside = true,
  open,
  onClose,
}: PopoverProps) => {
  const [triggerElement, setTriggerElement] = useState(null);
  const popoverRef = React.useRef(null);

  const isHTMLElementTrigger = !!(trigger as HTMLElement)?.tagName;

  const { styles, attributes, forceUpdate } = usePopper(
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
    if (open) {
      forceUpdate?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, forceUpdate, (trigger as HTMLElement)?.innerHTML, open]);

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
        <div ref={popoverRef} style={styles.popper} {...attributes.popper}>
          {!!open && <div>{children}</div>}
        </div>
      </ConditionalWrapper>
    </>
  );
};
