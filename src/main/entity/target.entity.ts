import { TargetProp } from '@api/types';

export type Target = {
  id: number;
  title: string;
  month: number;
  year: number;
  amount: number | null;
  total: number | null;
  props: TargetProp[];
  isPrimary?: boolean;
};
