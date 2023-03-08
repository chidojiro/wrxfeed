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
  Pick<TagsSelectOption, 'searchValue' | 'className'> & {
    value: string;
    icon: React.ReactNode;
    label: React.ReactNode;
    name: string;
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
  description?: React.ReactNode;
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
      description,
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
        {description}
        <TagsSelectSearch
          placeholder={searchPlaceholder}
          onChange={(e) => setSearchDebounced(e.target.value)}
        />
        <div
          className={clsx('invisible-scrollbar flex-1 overflow-auto', {
            'min-h-[150px]': !showOptionsOnEmptySearch,
          })}
        >
          <div className={clsx({ hidden: !showOptionsOnEmptySearch && !search })}>
            <TagsSelectOptions
              options={options.map(({ icon, label, colorScheme, name, ...restOptions }) => ({
                tagProps: {
                  colorScheme,
                  icon,
                  children: (
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {name}
                    </span>
                  ),
                },
                icon: (
                  <div className={clsx('w-5 h-5', ColorByColorScheme[colorScheme])}>{icon}</div>
                ),
                children: (
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                    {label}
                  </div>
                ),
                ...restOptions,
              }))}
            />
          </div>
        </div>
      </Form.TagsSelect>
    );
  },
);

PropertiesDropdown.displayName = 'PropertiesDropdown';
