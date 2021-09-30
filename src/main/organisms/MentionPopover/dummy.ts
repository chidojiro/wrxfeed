import { User, UserStatus } from '@main/entity/user.entity';

export const mentionUsers: User[] = [
  {
    id: 0,
    email: 'AbbieMendez@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Amazon',
    },
  },
  {
    id: 1,
    email: 'ArielMontgomery@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Amazon',
    },
  },
  {
    id: 2,
    email: 'AlexReid@gmail.com',
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Amazon',
    },
  },
];
