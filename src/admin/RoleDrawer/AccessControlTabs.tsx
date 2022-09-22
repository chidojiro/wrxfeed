import { Button } from '@/common/components';
import { Tab, TabContent, Tabs } from '@/common/headless';
import clsx from 'clsx';
import React from 'react';
import { CategoriesTab } from './CategoriesTab';
import { MembersTab } from './MembersTab';
import { SearchInput } from './SearchInput';
import { DepartmentsTab } from './DepartmentsTab';
import { VendorsTab } from './VendorsTab';

export type AccessControlTabsProps = {
  isBase?: boolean;
  isUpdate?: boolean;
};

export const AccessControlTabs = ({ isBase, isUpdate }: AccessControlTabsProps) => {
  const [keyword, setKeyWord] = React.useState<string>('');
  const tabs: { content: React.ReactNode; value: string; label: string }[] = [
    { content: <DepartmentsTab keyWord={keyword} />, value: 'teams', label: 'Teams' },
    {
      content: <CategoriesTab keyWord={keyword} />,
      value: 'categories',
      label: 'Categories',
    },
    { content: <VendorsTab keyWord={keyword} />, value: 'vendors', label: 'Vendors' },
    {
      content: <MembersTab keyWord={keyword} isBase={isBase} isUpdate={isUpdate} />,
      value: 'members',
      label: 'Members',
    },
  ];
  const [tab, setTab] = React.useState(tabs[0].value);

  return (
    <Tabs value={tab} onChange={setTab}>
      <div className="flex justify-between items-center border-b border-Gray-11 gap-10 mt-4">
        <div className="flex gap-8">
          {tabs.map(({ content, label, value }) => (
            <Tab
              key={value}
              content={
                <div
                  className={clsx('flex-1 py-4', {
                    'overflow-auto': value !== 'members',
                    'overflow-hidden': value === 'members',
                  })}
                >
                  {content}
                </div>
              }
              value={value}
            >
              {({ isActive, onClick }) => (
                <Button
                  onClick={onClick}
                  className={clsx('text-sm py-4 border-b-4 border-transparent', {
                    'font-semibold border-solid border-Gray-3': isActive,
                  })}
                >
                  {label}
                </Button>
              )}
            </Tab>
          ))}
        </div>
        <SearchInput
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder={tab !== 'members' ? 'Search list here' : 'Search by name or team'}
        />
      </div>
      <TabContent />
    </Tabs>
  );
};
