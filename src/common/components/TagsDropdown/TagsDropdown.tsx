import { useControllable, useDebounce } from '@/common/hooks';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { uniq, uniqBy } from 'lodash-es';
import React from 'react';
import { Popover } from '../Popover';
import { TagsDropdownOption } from './TagsDropdownOption';
import { SelectedTags } from './SelectedTags';
import { TagsDropdownProvider, TagsDropdownProviderValue } from './TagsDropdownProvider';
import { Option, TagsDropdownProps } from './types';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';
import { TagsDropdownSearch } from './TagsDropdownSearch';

type TTagsDropdown = (<T>(props: TagsDropdownProps<T>) => React.ReactNode) & {
  Option: typeof TagsDropdownOption;
  Search: typeof TagsDropdownSearch;
};

// eslint-disable-next-line react/display-name
export const TagsDropdown: TTagsDropdown = React.forwardRef(
  <T,>(props: TagsDropdownProps<T>, ref: any) => {
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

    const providerValue = React.useMemo<TagsDropdownProviderValue<T>>(
      () => ({
        TagsDropdownProps: props,
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
      <TagsDropdownProvider value={providerValue}>
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
      </TagsDropdownProvider>
    );
  },
) as any;

TagsDropdown.Option = TagsDropdownOption;
TagsDropdown.Search = TagsDropdownSearch;
