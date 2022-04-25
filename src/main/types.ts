import { TargetPropType } from '@api/types';
import { EditorState } from 'draft-js';

export type CommentFormModel = {
  content: EditorState;
  attachment?: string;
};

export type Emoji = {
  id: number | string | undefined;
  emoji: string;
  emojiGroupId?: number | string | undefined;
  name?: string;
};

export type GroupEmoji = {
  id: number | string;
  emojiRepresent: string | React.FC<React.SVGAttributes<SVGElement>>;
  name?: string;
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
  type: TargetPropType;
  directoryId: number;
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
