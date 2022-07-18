import { AlertRed } from '@/assets';
import {
  Form,
  TagColorScheme,
  TagProps,
  TagsDropdown,
  TagsDropdownOptionProps,
  TagsDropdownProps,
} from '@/common/components';
import { useDebounce } from '@/common/hooks';
import clsx from 'clsx';
import React from 'react';

type PropertiesName = 'vendors' | 'categories' | 'departments' | 'exceptions';

export type PropertiesDropdownOption = Pick<TagProps, 'colorScheme'> &
  Pick<TagsDropdownOptionProps, 'searchValue'> & {
    value: string;
    icon: React.ReactNode;
    label: React.ReactNode;
  };

type PropertiesDropdownProps = Pick<TagsDropdownProps, 'placement'> & {
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
      <Form.TagsDropdown
        ref={internalRef}
        className="max-w-[140px] h-[fit-content] flex-shrink-0"
        trigger={trigger}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        placement={placement}
      >
        <TagsDropdown.Search
          placeholder={searchPlaceholder}
          onChange={(e) => setSearchDebounced(e.target.value)}
        />
        {!!error && (
          <div className="flex flex-row items-center px-2 space-x-1 mb-2">
            <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
            <p className="text-xs text-Gray-6">Targets need at least one property</p>
          </div>
        )}
        <div className={clsx({ 'min-h-[200px]': !showOptionsOnEmptySearch })}>
          <div className={clsx({ hidden: !showOptionsOnEmptySearch && !search })}>
            {options.map(({ value, icon, label, colorScheme, searchValue }) => (
              <TagsDropdown.Option
                key={value}
                icon={
                  <div className={clsx('w-5 h-5', ColorByColorScheme[colorScheme])}>{icon}</div>
                }
                tagProps={{
                  colorScheme,
                  icon,
                  children: (
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {label}
                    </span>
                  ),
                }}
                value={value}
                searchValue={searchValue}
              >
                <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">{label}</div>
              </TagsDropdown.Option>
            ))}
          </div>
        </div>
      </Form.TagsDropdown>
    );
  },
);

PropertiesDropdown.displayName = 'PropertiesDropdown';
