import { atom } from 'recoil';
import { FeedItem } from '@/main/entity';
import { ChartDataPoint } from '@/main/types';

export const rollupsState = atom<FeedItem[]>({
  key: 'main/rollups',
  default: [],
});

export const dummyChartData: ChartDataPoint[] = [
  {
    name: '2021-11-01',
    '1': 0,
    '2': 0,
    '3': 0,
  },
  {
    name: 'Feb 8',
    '1': 87,
    '2': 69,
    '3': 300,
  },
  {
    name: 'Feb 12',
    '1': 620,
    '2': 400,
    '3': 600,
  },
  {
    name: 'Feb 16',
    '1': 1670,
    '2': 780,
    '3': 1520,
  },
  {
    name: 'Feb 20',
    '1': 2181,
    '2': 1890,
  },
  {
    name: 'Feb 24',
    '1': 2500,
    '2': 2390,
  },
  {
    name: 'Feb 28',
    '1': 2800,
    '2': 3490,
  },
];
