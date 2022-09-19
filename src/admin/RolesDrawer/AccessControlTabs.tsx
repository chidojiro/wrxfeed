import { Button } from '@/common/components';
import { Tab, TabContent, Tabs } from '@/common/headless';
import clsx from 'clsx';
import React from 'react';
import { CategoriesTab } from './CategoriesTab';
import { MembersTab } from './MembersTab';
import { SearchInput } from './SearchInput';
import { TeamsTab } from './TeamsTab';
import { VendorsTab } from './VendorsTab';

export type AccessControlTabsProps = {
  //
};

export const AccessControlTabs = ({}: AccessControlTabsProps) => {
  const [keyword, setKeyWord] = React.useState<string>('');
  const tabs: { content: React.ReactNode; value: string; label: string }[] = [
    { content: <TeamsTab keyWord={keyword} />, value: 'teams', label: 'Teams' },
    {
      content: <CategoriesTab keyWord={keyword} />,
      value: 'categories',
      label: 'Categories',
    },
    { content: <VendorsTab keyWord={keyword} />, value: 'vendors', label: 'Vendors' },
    {
      content: <MembersTab keyWord={keyword} />,
      value: 'members',
      label: 'Members',
    },
  ];
  const [tab, setTab] = React.useState(tabs[0].value);

  return (
    <Tabs value={tab} onChange={setTab}>
      <div className="flex justify-between items-center border-b border-Gray-11 gap-10">
        <div className="flex gap-8">
          {tabs.map(({ content, label, value }) => (
            <Tab
              key={value}
              content={<div className="flex-1 overflow-auto py-4">{content}</div>}
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
