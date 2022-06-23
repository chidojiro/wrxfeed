import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { EmojiData, Picker } from 'emoji-mart';
import { Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import EventEmitter, { EventName } from '@/main/EventEmitter';

const PortalRoot = document.querySelector('#portal-root');

export interface EmojiPickerProps {
  onSelectEmoji?: (emoji: EmojiData) => void;
  anchorEl: Element | null;
  onHover?: (isHover: boolean) => void;
}

const EmojiPicker = {
  open(props: EmojiPickerProps): void {
    EventEmitter.dispatch(EventName.OPEN_EMOJI_PICKER, props);
  },
  close(): void {
    EventEmitter.dispatch(EventName.CLOSE_EMOJI_PICKER);
  },
};

export const EmojiPickerContainer: React.VFC = () => {
  const referenceElement = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<(emoji: EmojiData) => void>();
  const onHoverRef = useRef<(isHover: boolean) => void>();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { styles, attributes, update } = usePopper(anchorEl, referenceElement?.current, {
    placement: 'top-end',
    modifiers: [{ name: 'offset', options: { offset: [20, 4] } }],
  });

  const handleOpenPicker = (props: EmojiPickerProps | unknown) => {
    if (props && typeof props === 'object') {
      const emojiProps = props as EmojiPickerProps;
      setOpen(true);
      setAnchorEl(emojiProps.anchorEl);
      callbackRef.current = emojiProps.onSelectEmoji;
      onHoverRef.current = emojiProps.onHover;
    }
  };

  const handleClosePicker = () => {
    setOpen(false);
  };

  useEffect(() => {
    EventEmitter.subscribe(EventName.OPEN_EMOJI_PICKER, handleOpenPicker);
    EventEmitter.subscribe(EventName.CLOSE_EMOJI_PICKER, handleClosePicker);
    return () => {
      EventEmitter.unsubscribe(EventName.OPEN_EMOJI_PICKER, handleOpenPicker);
      EventEmitter.unsubscribe(EventName.CLOSE_EMOJI_PICKER, handleClosePicker);
    };
  }, []);

  useEffect(() => {
    if (update) {
      update().then();
    }
  }, [open, anchorEl, update]);

  const renderPopover = () => (
    <div
      ref={referenceElement}
      style={styles.popper}
      {...attributes.popper}
      className="z-50"
      onMouseEnter={() => onHoverRef.current && onHoverRef.current(true)}
      onMouseLeave={() => onHoverRef.current && onHoverRef.current(false)}
    >
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Picker
          showPreview={false}
          showSkinTones={false}
          emoji=""
          color="#0F0D15"
          style={{ width: 358 }}
          onSelect={callbackRef.current}
          title="Pick your emoji…"
        />
      </Transition>
    </div>
  );
  return ReactDOM.createPortal(renderPopover(), PortalRoot as Element);
};

export default EmojiPicker;
