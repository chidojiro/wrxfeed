import { Button } from '@/common/components';
import { Tab, TabContent, Tabs } from '@/common/headless';
import clsx from 'clsx';
import React from 'react';
import { CategoriesTab } from './CategoriesTab';
import MembersSearchBar from './MembersSearchbar';
import { MembersTab } from './MembersTab';
import RolesSearchBar from './RolesSearchBar';
import { TeamsTab } from './TeamsTab';
import { VendorsTab } from './VendorsTab';

export type AccessControlTabsProps = {
  //
};

const tabs: { content: React.ReactNode; value: string; label: string }[] = [
  { content: <TeamsTab />, value: 'teams', label: 'Teams' },
  { content: <CategoriesTab />, value: 'categories', label: 'Categories' },
  { content: <VendorsTab />, value: 'vendors', label: 'Vendors' },
  { content: <MembersTab />, value: 'members', label: 'Members' },
];

export const AccessControlTabs = ({}: AccessControlTabsProps) => {
  const [tab, setTab] = React.useState(tabs[0].value);

  console.log(tab);

  return (
    <Tabs value={tab} onChange={setTab}>
      <div className="flex justify-between items-center border-b border-Gray-11 space-x-10">
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
        {tab !== 'members' ? <RolesSearchBar /> : <MembersSearchBar />}
      </div>
      <TabContent />
    </Tabs>
  );
};
