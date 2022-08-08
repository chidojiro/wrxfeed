import { AlertRed } from '@/assets';
import {
  Form,
  TagColorScheme,
  TagProps,
  TagsSelectOption,
  TagsSelectOptions,
  TagsSelectProps,
  TagsSelectSearch,
} from '@/common/components';
import { useDebounce } from '@/common/hooks';
import clsx from 'clsx';
import React from 'react';

type PropertiesName = 'vendors' | 'categories' | 'departments' | 'exceptions';

export type PropertiesDropdownOption = Pick<TagProps, 'colorScheme'> &
  Pick<TagsSelectOption, 'searchValue'> & {
    value: string;
    icon: React.ReactNode;
    label: React.ReactNode;
  };

type PropertiesDropdownProps = Pick<TagsSelectProps, 'placement'> & {
  name: PropertiesName;
  placeholder?: React.ReactNode;
  options: PropertiesDropdownOption[];
  searchPlaceholder: string;
  trigger?: React.ReactNode;
  onChange?: (value: string[]) => void;
  showOptionsOnEmptySearch?: boolean;
  error?: boolean;
};

const ColorByColorScheme: Record<TagColorScheme, string> = {
  accent: 'text-Accent-2',
  cyan: 'text-cyan-1',
  orange: 'text-orange-1',
};

export const PropertiesDropdown = React.forwardRef(
  (
    {
      name,
      placeholder,
      options,
      searchPlaceholder,
      trigger,
      onChange,
      placement,
      showOptionsOnEmptySearch = true,
      error,
    }: PropertiesDropdownProps,
    ref: any,
  ) => {
    const internalRef = React.useRef<any>();
    const [search, setSearch] = React.useState('');
    const setSearchDebounced = useDebounce(setSearch, 300);

    React.useImperativeHandle(ref, () => internalRef.current);

    React.useEffect(() => {
      if (error) {
        internalRef.current?.open();
      }
    }, [error, internalRef]);

    return (
      <Form.TagsSelect
        ref={internalRef}
        className="max-w-[140px] h-[fit-content] flex-shrink-0"
        trigger={trigger}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        placement={placement}
        onClose={() => setSearch('')}
      >
        <TagsSelectSearch
          placeholder={searchPlaceholder}
          onChange={(e) => setSearchDebounced(e.target.value)}
        />
        {!!error && (
          <div className="flex flex-row items-center px-2 space-x-1 mb-2">
            <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
            <p className="text-xs text-Gray-6">Targets need at least one property</p>
          </div>
        )}
        <div
          className={clsx('invisible-scrollbar flex-1 overflow-auto', {
            'min-h-[150px]': !showOptionsOnEmptySearch,
          })}
        >
          <div className={clsx({ hidden: !showOptionsOnEmptySearch && !search })}>
            <TagsSelectOptions
              options={options.map(({ value, icon, label, colorScheme, searchValue }) => ({
                tagProps: {
                  colorScheme,
                  icon,
                  children: (
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {label}
                    </span>
                  ),
                },
                value,
                icon: (
                  <div className={clsx('w-5 h-5', ColorByColorScheme[colorScheme])}>{icon}</div>
                ),
                searchValue,
                children: (
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">{label}</div>
                ),
              }))}
            />
          </div>
        </div>
      </Form.TagsSelect>
    );
  },
);

PropertiesDropdown.displayName = 'PropertiesDropdown';
