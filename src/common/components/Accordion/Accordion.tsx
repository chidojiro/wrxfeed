import { AssertUtils, ReactUtils } from '@/common/utils';
import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { Children, ClassName, OpenClose } from '../../types';
import { Button as BaseButton } from '../Button';

export type AccordionProps = Children & Omit<OpenClose, 'onClose'>;

const [AccordionProvider, useAccordionContext] = ReactUtils.createContext<{
  open?: boolean;
  internalDisclosure: ReturnType<typeof useDisclosure>;
}>();

export const Accordion = ({ open, defaultOpen, children }: AccordionProps) => {
  const internalDisclosure = useDisclosure({ defaultIsOpen: defaultOpen });

  const value = React.useMemo(() => ({ open, internalDisclosure }), [internalDisclosure, open]);

  return <AccordionProvider value={value}>{children}</AccordionProvider>;
};

type ButtonProps = Children & ClassName;

const Button = ({
  className,
  children,
}: Omit<ButtonProps, 'children'> & {
  children: (props: { isOpen: boolean }) => React.ReactNode;
}) => {
  const { open, internalDisclosure } = useAccordionContext();

  const isOpen = open ?? internalDisclosure.isOpen;

  return (
    <BaseButton
      className={className}
      onClick={AssertUtils.isNullOrUndefined(open) ? internalDisclosure.onToggle : undefined}
    >
      {children({ isOpen })}
    </BaseButton>
  );
};

type ContentProps = Children & ClassName;

const Content = ({ children, className }: ContentProps) => {
  const { open, internalDisclosure } = useAccordionContext();

  const isOpen = open ?? internalDisclosure.isOpen;

  if (!isOpen) return null;

  return <div className={className}>{children}</div>;
};

Accordion.Button = Button;
Accordion.Content = Content;
