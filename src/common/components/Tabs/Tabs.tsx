import React from 'react';

import { ClassName } from '../../types';
import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '../../headless';
import clsx from 'clsx';
import { withProjectClassNamePrefix } from '../../utils';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { Link } from 'react-router-dom';

export type Tab = {
  value?: string;
  href?: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

export type TabsProps = HeadlessTabsProps &
  ClassName & {
    items: Tab[];
  };

export const Tabs = ({ value, onChange, items, className }: TabsProps) => {
  return (
    <HeadlessTabs value={value} onChange={onChange}>
      <div className={clsx(withProjectClassNamePrefix('tabs'), className)}>
        <nav className="flex items-center mb-4" aria-label="Tabs">
          {items.map((tab, idx) => (
            <HeadlessTabs.Item key={tab.value ?? idx} content={tab.content} value={tab.value}>
              {({ isActive, onClick }) => (
                <ConditionalWrapper
                  if={{ condition: !!tab.href, component: Link as any, props: { to: tab.href } }}
                  else={{ component: 'button' }}
                  onClick={onClick}
                  className={clsx(
                    isActive && 'font-semibold border-b border-Gray-3',
                    'transition-colors whitespace-nowrap',
                    'text-sm text-Gray-3',
                    'py-1 px-1 mr-3 ml-1',
                    'hover:text-Gray-3',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                </ConditionalWrapper>
              )}
            </HeadlessTabs.Item>
          ))}
        </nav>
        <div className="py-2">
          <HeadlessTabs.Content />
        </div>
      </div>
    </HeadlessTabs>
  );
};
