import { useControllable } from '@/common/hooks';
import { Option as TOption } from '@/common/types';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { uniq, uniqBy } from 'lodash-es';
import React from 'react';
import { Popover } from '../Popover';
import { Option } from './Option';
import { SelectedTags } from './SelectedTags';
import { Tag } from './Tag';
import { TagsDropdownProvider, TagsDropdownProviderValue } from './TagsDropdownProvider';
import { TagsDropdownProps } from './types';

export const TagsDropdown = <T,>(props: TagsDropdownProps<T>) => {
  const {
    value: valueProp,
    onChange,
    defaultValue,
    children,
    placement = 'bottom-start',
    placeholder,
    colorScheme,
  } = props;

  const [options, setOptions] = React.useState<TOption<T>[]>([]);

  const [value, setValue] = useControllable({
    value: valueProp,
    onChange,
    defaultValue: defaultValue ?? [],
  });

  const addOption = React.useCallback((option: TOption<T>) => {
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
    () => ({ TagsDropdownProps: props, value, onChange: setValue, addOption, addTag, removeTag }),
    [addOption, addTag, props, removeTag, setValue, value],
  );

  const popoverDisclosure = useDisclosure();

  const hasSelectedAllOptions = value.length && value.length === options.length;

  return (
    <TagsDropdownProvider value={providerValue}>
      <Popover
        placement={placement}
        trigger={
          <button onClick={popoverDisclosure.onToggle}>
            {value.length ? (
              <SelectedTags
                colorScheme={colorScheme}
                options={options}
                value={value}
                onRemoveClick={removeTag}
              />
            ) : (
              <Tag colorScheme={colorScheme}>{placeholder}</Tag>
            )}
          </button>
        }
        open={popoverDisclosure.isOpen}
        onClose={popoverDisclosure.onClose}
      >
        {!hasSelectedAllOptions && (
          <div className="shadow-shadowCard border border-Gray-11 px-6 py-4 bg-white">
            {children}
          </div>
        )}
      </Popover>
    </TagsDropdownProvider>
  );
};

TagsDropdown.Option = Option;
