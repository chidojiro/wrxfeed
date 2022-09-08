import React from 'react';
import { Tabs, Tab, TabContent } from '@/common/headless';
import { TeamsTab } from './TeamsTab';
import { Button } from '@/common/components';
import clsx from 'clsx';
import { CategoriesTab } from './CategoriesTab';

export type AccessControlTabsProps = {
  //
};

const tabs: { content: React.ReactNode; value: string; label: string }[] = [
  { content: <TeamsTab />, value: 'teams', label: 'Teams' },
  { content: <CategoriesTab />, value: 'categories', label: 'Categories' },
  { content: null, value: 'vendors', label: 'Vendors' },
  { content: null, value: 'members', label: 'Members' },
];

export const AccessControlTabs = ({}: AccessControlTabsProps) => {
  const [tab, setTab] = React.useState(tabs[0].value);

  return (
    <Tabs value={tab} onChange={setTab}>
      <div className="flex gap-8 mt-4">
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
      <TabContent />
    </Tabs>
  );
};
