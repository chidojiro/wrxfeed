import { useControllable } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import { uniq } from 'lodash-es';
import React from 'react';
import { Popover } from '../Popover';
import { SelectedTags } from './SelectedTags';
import { TagsSelectOptions } from './TagsSelectOptions';
import { TagsSelectProvider, TagsSelectProviderValue } from './TagsSelectProvider';
import { TagsSelectSearch } from './TagsSelectSearch';
import { Option, TagsSelectProps } from './types';

type TagsSelectComponent = (<T>(props: TagsSelectProps<T>) => React.ReactNode) & {
  Options: typeof TagsSelectOptions;
  Search: typeof TagsSelectSearch;
};

// eslint-disable-next-line react/display-name
export const TagsSelect: TagsSelectComponent = React.forwardRef(
  <T,>(props: TagsSelectProps<T>, ref: any) => {
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

    const [value, setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue: defaultValue ?? [],
    });

    const [search, setSearch] = React.useState('');
    const [options, setOptions] = React.useState<Option<T>[]>([]);

    const addTag = React.useCallback(
      (value: T) => {
        setValue((prev: T[]) => uniq([...prev, value]));
      },
      [setValue],
    );

    const removeTag = React.useCallback(
      (value: T) => {
        setValue((prev: T[]) => prev.filter((v) => v !== value));
      },
      [setValue],
    );

    const popoverDisclosure = useDisclosure();

    React.useEffect(() => {
      if (!popoverDisclosure.isOpen) {
        setSearch('');
      }
    }, [popoverDisclosure.isOpen]);

    const providerValue = React.useMemo<TagsSelectProviderValue<T>>(
      () => ({
        TagsSelectProps: props,
        value,
        onChange: setValue,
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
            <button
              type="button"
              onClick={popoverDisclosure.onToggle}
              className={clsx(
                StringUtils.withProjectClassNamePrefix('tags-select-trigger'),
                className,
              )}
            >
              {renderTrigger()}
            </button>
          }
          open={popoverDisclosure.isOpen}
          onClose={handleClose}
        >
          <div
            className={clsx(
              StringUtils.withProjectClassNamePrefix('tags-select'),
              'shadow-shadowCard border border-Gray-11 px-6 py-4 bg-white',
              'w-[400px] max-h-[240px] overflow-hidden',
              'flex flex-col',
            )}
          >
            {children}
          </div>
        </Popover>
      </TagsSelectProvider>
    );
  },
) as any;

TagsSelect.Options = TagsSelectOptions;
TagsSelect.Search = TagsSelectSearch;
