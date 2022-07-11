import { Category, Department, Subscription, Vendor } from '@/main/entity';
import React, { FunctionComponent, SVGAttributes } from 'react';

export interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}

export type LeftTab = {
  name: string;
  location: Partial<Omit<Location, 'pathname'>> & { pathname: string; pathMatch?: string };
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  subscription?: {
    type: keyof Subscription;
    item: Department | Category | Vendor;
  };
  removable?: boolean;
  isShowCounter?: boolean;
  strict?: boolean; // When true, Left tab is marked as selected only if route equals to left tab location.
};

export type GroupTab = {
  name: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  tabs?: LeftTab[];
  addItemRoute?: string;
  isOpened?: boolean;
  enable: boolean;
};

export type SectionTab = {
  name: string;
  groups: GroupTab[];
  tabs: LeftTab[];
};

export type Children = {
  children?: React.ReactNode;
};

export type BitBoolean = 1 | 0;

export type ClassName = {
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn = (...arg: any[]) => any;

export type HTMLElementOrHTMLElementRef = HTMLElement | React.RefObject<HTMLElement>;

export type HTMLDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type HTMLTextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
