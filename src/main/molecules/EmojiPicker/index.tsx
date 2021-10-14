import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { EmojiData, Picker } from 'emoji-mart';
import { Gray } from '@theme/colors';
import { Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

const PortalRoot = document.querySelector('#portal-root');

export interface EmojiPickerProps {
  open: boolean;
  onSelectEmoji: (emoji: EmojiData) => void;
  anchorEl: Element | null;
}

const EmojiPicker: React.VFC<EmojiPickerProps> = ({ open, onSelectEmoji, anchorEl }) => {
  const referenceElement = useRef<HTMLDivElement>(null);
  const { styles, attributes, update } = usePopper(anchorEl, referenceElement?.current, {
    placement: 'top-end',
    modifiers: [{ name: 'offset', options: { offset: [20, 4] } }],
  });

  useEffect(() => {
    if (update) {
      update().then();
    }
  }, [open, update]);

  const renderPopover = () => (
    <div ref={referenceElement} style={styles.popper} {...attributes.popper}>
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
          color={Gray[1]}
          style={{ width: 358 }}
          onSelect={onSelectEmoji}
          title="Pick your emoji…"
        />
      </Transition>
    </div>
  );
  return ReactDOM.createPortal(renderPopover(), PortalRoot as Element);
};

export default EmojiPicker;
