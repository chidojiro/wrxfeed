import { TargetProp } from '@api/types';

export type Target = {
  id: number;
  amount: number | null;
  depId: number;
  total: number | null;
  name: string;
  props: TargetProp;
};
