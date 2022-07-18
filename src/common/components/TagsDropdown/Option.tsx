import { useDelayableState } from '@/common/hooks';
import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { useTagsDropdownContext } from './TagsDropdownProvider';

type OptionProps<T = string> = Children &
  ClassName & {
    value: T;
    label: React.ReactNode;
  };

export const Option = ({ children, value: valueProp, label, className }: OptionProps) => {
  const { value, addOption, addTag } = useTagsDropdownContext();
  const [delayableOpen, setDelayableOpen] = useDelayableState(0, false);

  React.useEffect(() => {
    addOption({ value: valueProp, label });
  }, [addOption, label, valueProp]);

  const isOpen = !value.includes(valueProp);

  React.useEffect(() => {
    setDelayableOpen(!!isOpen, !isOpen);
  }, [isOpen, setDelayableOpen]);

  if (!delayableOpen) return null;

  return (
    <button
      onClick={() => addTag(valueProp)}
      className={clsx('h-10 px-7 hover:bg-Gray-12 flex items-center', className)}
    >
      {children}
    </button>
  );
};
