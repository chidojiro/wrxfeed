import { TargetProp } from '@api/types';

export type Target = {
  id: number;
  month: number;
  year: number;
  amount: number | null;
  total: number | null;
  props: TargetProp[];
};
