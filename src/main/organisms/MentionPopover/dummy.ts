import { User, UserStatus } from '@main/entity/user.entity';

export const mentionUsers: User[] = [
  {
    id: 0,
    email: 'AbellMendez@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Apple',
    },
  },
  {
    id: 1,
    email: 'BananaMontgomery@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Black Berry',
    },
  },
  {
    id: 2,
    email: 'CristinoReid@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Cisco',
    },
  },
  {
    id: 3,
    email: 'DritneyReid@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Dwarves',
    },
  },
];
