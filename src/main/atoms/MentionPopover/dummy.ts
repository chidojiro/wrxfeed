import { User, UserStatus } from '@main/entity/user.entity';

export const mentionUsers: User[] = [
  {
    id: 0,
    email: 'AbbieMendez@gmail.com',
    signupDate: new Date(),
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Amazon',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    account: {
      id: 0,
      roles: ['admin'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    email: 'ArielMontgomery@gmail.com',
    signupDate: new Date(),
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Amazon',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    account: {
      id: 0,
      roles: ['admin'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'AlexReid@gmail.com',
    signupDate: new Date(),
    status: UserStatus.Active,
    company: {
      id: 0,
      name: 'Amazon',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    account: {
      id: 0,
      roles: ['admin'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
