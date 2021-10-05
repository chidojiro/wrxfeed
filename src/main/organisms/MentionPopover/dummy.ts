import { User, UserStatus } from '@main/entity/user.entity';

export const mentionUsers: User[] = [
  {
    id: 0,
    email: 'AbellMendez@gmail.com',
    status: UserStatus.Active,
    fullName: 'Abell Mendez',
    company: {
      id: 0,
      name: 'Apple',
    },
  },
  {
    id: 1,
    email: 'BananaMontgomery@gmail.com',
    status: UserStatus.Active,
    fullName: 'Banana Montgomery',
    company: {
      id: 0,
      name: 'Black Berry',
    },
  },
  {
    id: 2,
    email: 'CristianoReid@gmail.com',
    status: UserStatus.Active,
    fullName: 'Cristiano Reid',
    company: {
      id: 0,
      name: 'Cisco',
    },
  },
  {
    id: 3,
    email: 'DanielPobga@gmail.com',
    status: UserStatus.Active,
    fullName: 'Daniel Pobga',
    company: {
      id: 0,
      name: 'Dwarves',
    },
  },
];
