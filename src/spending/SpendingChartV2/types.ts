import { LabelListProps } from 'recharts';

export type BaseChartInfo = {
  dataKey: string;
  title?: string;
  color: string;
  legendIcon?: React.ReactNode;
  width?: number;
  formatter?: (v: any) => string;
  labelProps?: Omit<LabelListProps<any>, 'dataKey'>;
};

export type BarChartInfo = Omit<BaseChartInfo, 'dataKey'> & {
  type: 'BAR';
  stackedBars?: Omit<BaseChartInfo, 'width'>[];
  color?: string;
  dataKey?: string;
  stackId?: string;
};

export type ChartInfo = BarChartInfo;
