import { useDelayableState, useOnEventOutside } from '@/common/hooks';
import { Children, OpenClose } from '@/common/types';
import { AssertUtils } from '@/common/utils';
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
    trigger: React.ReactElement | HTMLElement;
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
  const [triggerElement, setTriggerElement] = useState<React.ReactElement>();
  const popoverRef = React.useRef(null);

  // Workaround to resolve misalignment on initial render
  const [actuallyOpen, setActuallyOpen] = useDelayableState({ delayBy: 0, defaultState: false });

  const { styles, attributes, forceUpdate } = usePopper(
    AssertUtils.isHTMLElement(trigger) ? (trigger as any) : triggerElement,
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

  const clonedTrigger = React.useMemo(() => {
    if (!trigger || AssertUtils.isHTMLElement(trigger)) return null;

    return React.Children.map(trigger, (child) =>
      React.cloneElement(child, {
        ref: (node: React.ReactElement) => {
          setTriggerElement(node);

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
  }, [trigger]);

  React.useEffect(() => {
    setActuallyOpen({ state: !!open, shouldDelay: true });
    forceUpdate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, open, setActuallyOpen, (trigger as HTMLElement)?.innerHTML]);

  useOnEventOutside('click', closeOnClickOutside && [popoverRef, triggerElement as any], onClose);

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
