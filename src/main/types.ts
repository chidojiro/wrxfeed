import { TargetTypeProp } from '@/target/types';
import { EditorState } from 'draft-js';

export type CommentFormModel = {
  content: EditorState;
  attachment?: string;
};

export interface InviteFormModel {
  email: string;
}

export interface FeedBackFormModel {
  content: string;
}

export enum FeedBackType {
  Rollup = 1,
  LineItem = 2,
}

export type SearchResult = {
  id: number | string;
  title: string;
  type: TargetTypeProp;
  directoryId: number;
  parentId?: any;
};

// Chart types
export type ChartDataPoint<T = undefined> = {
  name: string;
  [key: string]: number | string | T;
};

export type ChartLegend = {
  id: number | string;
  color: string;
  name: string;
  type?: string;
};

export type ChartLineProps = {
  name: string;
  type: string;
  dataKey: string;
  strokeWidth: number;
  stroke: string;
  strokeDasharray?: string;
  dot: boolean;
  fill?: string;
  opacity?: number;
};

export type ChartLevel = {
  id: number;
  value: number;
  title: string | number;
  isTarget?: boolean;
};

export type LineChartData<T = undefined> = {
  data: ChartDataPoint<T>[];
  legends: ChartLegend[];
  lines: ChartLineProps[];
  maxValue: number;
  metadata?: {
    [key: string]: string | number | undefined;
  };
};
