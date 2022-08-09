import { useControllableState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import { uniq } from 'lodash-es';
import React from 'react';
import { Button } from '../Button';
import { Popover } from '../Popover';
import { SelectedTags } from './SelectedTags';
import { TagsSelectProvider } from './TagsSelectProvider';
import { Option, TagsSelectProps, TagsSelectProviderValue } from './types';

export const TagsSelect = React.forwardRef(<TValue,>(props: TagsSelectProps<TValue>, ref: any) => {
  const {
    value: valueProp,
    onChange,
    defaultValue,
    children,
    placement = 'bottom-start',
    placeholder,
    trigger,
    className,
    onClose,
  } = props;

  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange,
    defaultValue: defaultValue ?? [],
  });

  const [search, setSearch] = React.useState('');
  const [options, setOptions] = React.useState<Option<TValue>[]>([]);

  const addTag = React.useCallback(
    (newValue: TValue) => {
      setValue({
        internal: (prev: TValue[]) => (console.log(prev) as any) || uniq([...prev, newValue]),
        external: [...value, newValue],
      });
    },
    [setValue, value],
  );

  const removeTag = React.useCallback(
    (removedValue: TValue) => {
      setValue({
        internal: (prev: TValue[]) => prev.filter((v) => v !== removedValue),
        external: value.filter((v) => v !== removedValue),
      });
    },
    [setValue, value],
  );

  const popoverDisclosure = useDisclosure();

  React.useEffect(() => {
    if (!popoverDisclosure.isOpen) {
      setSearch('');
    }
  }, [popoverDisclosure.isOpen]);

  const providerValue = React.useMemo<TagsSelectProviderValue<TValue>>(
    () => ({
      TagsSelectProps: props,
      value,
      onChange: (value) => setValue({ internal: value, external: value }),
      registerOptions: setOptions,
      addTag,
      removeTag,
      search,
      setSearch,
      isOpen: popoverDisclosure.isOpen,
    }),
    [addTag, popoverDisclosure.isOpen, props, removeTag, search, setValue, value],
  );

  React.useImperativeHandle(ref, () => ({ addTag, removeTag, open: popoverDisclosure.onOpen }), [
    addTag,
    popoverDisclosure.onOpen,
    removeTag,
  ]);

  const renderTrigger = () => {
    if (trigger) return trigger;

    return value.length && options.length ? (
      <SelectedTags options={options} value={value} onRemoveClick={removeTag} />
    ) : (
      placeholder
    );
  };

  const handleClose = () => {
    popoverDisclosure.onClose();
    onClose?.();
  };

  return (
    <TagsSelectProvider value={providerValue}>
      <Popover
        placement={placement}
        trigger={
          <Button
            onClick={popoverDisclosure.onToggle}
            className={clsx(
              StringUtils.withProjectClassNamePrefix('tags-select-trigger'),
              className,
            )}
          >
            {renderTrigger()}
          </Button>
        }
        open={popoverDisclosure.isOpen}
        onClose={handleClose}
      >
        <div
          className={clsx(
            StringUtils.withProjectClassNamePrefix('tags-select'),
            'shadow-card border border-Gray-11 px-6 py-4 bg-white',
            'w-[400px] max-h-[240px] overflow-hidden',
            'flex flex-col',
          )}
        >
          {children}
        </div>
      </Popover>
    </TagsSelectProvider>
  );
});

TagsSelect.displayName = 'TagsSelect';
