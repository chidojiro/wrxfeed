import { Bank, CategoryIcon, IntersectIcon, TeamIcon } from '@/assets';
import { Button, Tag } from '@/common/components';
import { EMPTY_ARRAY } from '@/common/constants';
import { useCategories } from '@/feed/useCategories';
import { useDepartments } from '@/team/useDepartments';
import { useVendors } from '@/vendor/useVendors';
import React from 'react';
import { TargetProps, TargetTypeProp } from '../types';
import ExceptionList from './ExceptionList';
import { PropertiesDropdown, PropertiesDropdownOption } from './PropertiesDropdown';

type PropsSectionProps = {
  reviewSentence: string;
  exceptionProps?: TargetProps[];
  error?: boolean;
};

export const PropsSection = ({ reviewSentence, exceptionProps = [], error }: PropsSectionProps) => {
  const exceptionsDropdownRef = React.useRef<any>();

  const { data: departments = EMPTY_ARRAY } = useDepartments({
    limit: 0,
    includeSub: 1,
  });

  const { data: vendors = EMPTY_ARRAY } = useVendors({
    limit: 0,
  });

  const { data: categories = EMPTY_ARRAY } = useCategories({
    limit: 0,
  });

  const vendorOptions = React.useMemo<PropertiesDropdownOption[]>(
    () =>
      vendors.map(({ id, name }) => ({
        value: `${TargetTypeProp.VENDOR}-${id}-${name}`,
        label: name,
        icon: <Bank width={14} height={14} />,
        colorScheme: 'orange',
        searchValue: name,
      })),
    [vendors],
  );

  const categoryOptions = React.useMemo<PropertiesDropdownOption[]>(
    () =>
      categories.map(({ id, name }) => ({
        value: `${TargetTypeProp.CATEGORY}-${id}-${name}`,
        label: name,
        icon: <CategoryIcon width={14} height={14} />,
        colorScheme: 'accent',
        searchValue: name,
      })),
    [categories],
  );

  const departmentOptions = React.useMemo<PropertiesDropdownOption[]>(
    () =>
      departments.map(({ id, name }) => ({
        value: `${TargetTypeProp.DEPARTMENT}-${id}-${name}`,
        label: name,
        icon: <TeamIcon width={14} height={14} />,
        colorScheme: 'cyan',
        searchValue: name,
      })),
    [departments],
  );

  const exceptionOptions = React.useMemo(
    () => [...vendorOptions, ...categoryOptions, ...departmentOptions],
    [categoryOptions, departmentOptions, vendorOptions],
  );

  return (
    <div className="flex flex-col space-y-3 px-10 py-4 w-full">
      <p className="text-primary text-xs font-semibold">
        Properties*:
        <span className="text-Gray-3 font-normal ml-1">{reviewSentence}</span>
      </p>
      <div className="flex flex-row py-1 space-x-2 px-2">
        <div className="flex items-center justify-center w-14 min-w-[50px] h-[30px]">
          <p className="text-Gray-6 text-xs">Target Is</p>
        </div>
        <PropertiesDropdown
          name="vendors"
          placeholder={
            <Tag colorScheme="orange" icon={<Bank width={14} height={14} />}>
              All Vendors
            </Tag>
          }
          searchPlaceholder="Enter a vendor"
          options={vendorOptions}
          error={error}
        />
        <div className="flex items-center justify-center w-6 h-[30px]">
          <p className="text-Gray-6 text-xs text-center">in</p>
        </div>
        <PropertiesDropdown
          name="categories"
          placeholder={
            <Tag colorScheme="accent" icon={<CategoryIcon width={14} height={14} />}>
              All Categories
            </Tag>
          }
          searchPlaceholder="Enter a category"
          options={categoryOptions}
        />
        <div className="flex items-center justify-center w-6 h-[30px]">
          <p className="text-Gray-6 text-xs text-center">for</p>
        </div>
        <PropertiesDropdown
          name="departments"
          placeholder={
            <Tag colorScheme="cyan" icon={<TeamIcon width={14} height={14} />}>
              All Teams
            </Tag>
          }
          searchPlaceholder="Enter a team"
          options={departmentOptions}
          placement="bottom-end"
        />
        <PropertiesDropdown
          ref={exceptionsDropdownRef}
          name="exceptions"
          searchPlaceholder="Enter a team, category, or vendor"
          options={exceptionOptions}
          trigger={
            <Button size="sm" variant="outline" square colorScheme="gray">
              <IntersectIcon className="w-4 h-4" width={16} height={16} />
            </Button>
          }
          placement="bottom-end"
          showOptionsOnEmptySearch={false}
        />
      </div>
      <ExceptionList
        items={exceptionProps}
        onTagRemoveClick={({ id, name, type }) => {
          exceptionsDropdownRef.current?.removeTag(`${type}-${id}-${name}`);
        }}
      />
    </div>
  );
};
