import { Bank, CategoryIcon, IntersectIcon, TeamIcon } from '@/assets';
import { useCategories } from '@/category/useCategories';
import { Button, Tag } from '@/common/components';
import { ClassName } from '@/common/types';
import { TargetProps, TargetTypeProp } from '@/target/types';
import { useDepartments } from '@/team/useDepartments';
import { useVendors } from '@/vendor/useVendors';
import clsx from 'clsx';
import React from 'react';
import { PropertiesDropdown, PropertiesDropdownOption } from './PropertiesDropdown';
import ExceptionList from './PropertiesExceptionList';

type PropertiesSectionProps = ClassName & {
  reviewSentence?: string;
  exceptionProps?: TargetProps[];
  error?: boolean;
};

export const PropertiesSection = ({
  reviewSentence,
  exceptionProps = [],
  error,
  className,
}: PropertiesSectionProps) => {
  const exceptionsDropdownRef = React.useRef<any>();

  const { departments } = useDepartments({ limit: 0 });

  const { vendors } = useVendors({
    limit: 0,
  });

  const { categories } = useCategories({
    limit: 0,
  });

  const vendorOptions = React.useMemo<PropertiesDropdownOption[]>(
    () =>
      vendors.map(({ id, name }) => ({
        value: `${TargetTypeProp.VENDOR}-${id}-${name}`,
        name,
        label: (
          <div className="flex items center w-full">
            <span className="max-w-[220px] truncate">{name}</span>
            <span className="invisible group-hover:visible text-Gray-6">&nbsp;- Vendor</span>
          </div>
        ),
        icon: <Bank width={14} height={14} />,
        colorScheme: 'orange',
        searchValue: name,
        className: 'group',
      })),
    [vendors],
  );

  const categoryOptions = React.useMemo<PropertiesDropdownOption[]>(
    () =>
      categories.map(({ id, name }) => ({
        value: `${TargetTypeProp.CATEGORY}-${id}-${name}`,
        name,
        label: (
          <div className="flex items center w-full">
            <span className="max-w-[220px] truncate">{name}</span>
            <span className="invisible group-hover:visible text-Gray-6">&nbsp;- Category</span>
          </div>
        ),
        icon: <CategoryIcon width={14} height={14} />,
        colorScheme: 'accent',
        searchValue: name,
        className: 'group',
      })),
    [categories],
  );

  const departmentOptions = React.useMemo<PropertiesDropdownOption[]>(
    () =>
      departments.map(({ id, name }) => ({
        value: `${TargetTypeProp.DEPARTMENT}-${id}-${name}`,
        name,
        label: (
          <div className="flex items center w-full">
            <span className="max-w-[220px] truncate">{name}</span>
            <span className="invisible group-hover:visible text-Gray-6">&nbsp;- Team</span>
          </div>
        ),
        icon: <TeamIcon width={14} height={14} />,
        colorScheme: 'cyan',
        searchValue: name,
        className: 'group',
      })),
    [departments],
  );

  const exceptionOptions = React.useMemo(
    () => [...vendorOptions, ...categoryOptions, ...departmentOptions],
    [categoryOptions, departmentOptions, vendorOptions],
  );

  return (
    <div className={clsx('flex flex-col space-y-3 w-full', className)}>
      {!!reviewSentence && (
        <p className="text-primary text-xs font-semibold">
          Properties*:
          <span className="text-Gray-3 font-normal ml-1">{reviewSentence}</span>
        </p>
      )}
      <div className="flex flex-row py-1 space-x-2">
        <div className="flex items-center justify-center min-w-[50px] h-[30px]">
          <p className="text-Gray-6 text-xs">Select:</p>
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
          description={
            <div className="flex items-center text-xs mb-2 text-Gray-6">
              <p className="font-semibold text-Gray-1">Except</p> - Specify any properties not to
              include
            </div>
          }
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
