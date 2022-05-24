import { TargetProp, TargetPeriod } from '@api/types';
import { User } from '@main/entity/user.entity';

export type Target = {
  id: number;
  isPrimary?: boolean;
  name: string | null;
  periods: TargetPeriod[];
  props: TargetProp[];
  creator: User;
  updater: User;
};

export type TargetMonth = {
  month: number;
  amount?: number;
};
