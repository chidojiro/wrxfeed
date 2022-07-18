import { useControllable, useDebounce } from '@/common/hooks';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { uniq, uniqBy } from 'lodash-es';
import React from 'react';
import { Popover } from '../Popover';
import { TagsSelectOption } from './TagsSelectOption';
import { SelectedTags } from './SelectedTags';
import { TagsSelectProvider, TagsSelectProviderValue } from './TagsSelectProvider';
import { Option, TagsSelectProps } from './types';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';
import { TagsSelectSearch } from './TagsSelectSearch';

type TagsSelectComponent = (<T>(props: TagsSelectProps<T>) => React.ReactNode) & {
  Option: typeof TagsSelectOption;
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
    } = props;

    const [value, setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue: defaultValue ?? [],
    });

    const [search, setSearch] = React.useState('');
    const [options, setOptions] = React.useState<Option<T>[]>([]);

    const setSearchDebounced = useDebounce(setSearch, 300);

    const addOption = React.useCallback((option: Option<T>) => {
      setOptions((prev) => uniqBy([...prev, option], 'value'));
    }, []);

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

    const providerValue = React.useMemo<TagsSelectProviderValue<T>>(
      () => ({
        TagsSelectProps: props,
        value,
        onChange: setValue,
        addOption,
        addTag,
        removeTag,
        search,
        setSearch,
        setSearchDebounced,
      }),
      [addOption, addTag, props, removeTag, search, setSearchDebounced, setValue, value],
    );

    const popoverDisclosure = useDisclosure();

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

    React.useEffect(() => {
      if (!popoverDisclosure.isOpen) {
        setSearch('');
      }
    }, [popoverDisclosure.isOpen]);

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
          onClose={popoverDisclosure.onClose}
        >
          <div
            className={clsx(
              StringUtils.withProjectClassNamePrefix('tags-select-dropdown'),
              'shadow-shadowCard border border-Gray-11 px-6 py-4 bg-white',
              'w-[400px] max-h-[240px] overflow-auto',
            )}
          >
            {children}
          </div>
        </Popover>
      </TagsSelectProvider>
    );
  },
) as any;

TagsSelect.Option = TagsSelectOption;
TagsSelect.Search = TagsSelectSearch;
