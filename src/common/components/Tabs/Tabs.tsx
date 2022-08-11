import clsx from 'clsx';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '../../headless';
import { ClassName } from '../../types';
import { StringUtils } from '../../utils';
import { Button, ButtonProps } from '../Button';
import { ConditionalWrapper } from '../ConditionalWrapper';

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
      <div className={clsx(StringUtils.withProjectClassNamePrefix('tabs'), className)}>
        <nav className="flex items-center mb-4" aria-label="Tabs">
          {items.map((tab, idx) => (
            <HeadlessTabs.Item key={tab.value ?? idx} content={tab.content} value={tab.value}>
              {({ isActive, onClick }) => (
                <ConditionalWrapper
                  conditions={[
                    {
                      condition: !!tab.href,
                      component: (props: Partial<LinkProps>) => <Link {...props} to={tab.href!} />,
                    },
                    {
                      component: (props: Partial<ButtonProps>) => <Button {...props} />,
                    },
                  ]}
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
