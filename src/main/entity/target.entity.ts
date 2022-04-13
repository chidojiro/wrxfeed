import { TargetProp } from '@api/types';
import { User } from '@main/entity/user.entity';

export type Target = {
  id: number;
  name: string | null;
  month: number;
  year: number;
  amount: number | null;
  total: number | null;
  props: TargetProp[];
  isPrimary?: boolean;
  creator: User;
  updater: User;
};

export type TargetMonth = {
  month: number;
  amount: number;
};
