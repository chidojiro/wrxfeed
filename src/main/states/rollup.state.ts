import { atom } from 'recoil';
import { Rollup, STATUS, Visibility } from '@main/entity';

export const rollupsState = atom<Rollup[]>({
  key: 'main/rollups', // unique ID (with respect to other atoms/selectors)
  default: [
    // DUMMY DATA
    {
      id: 1493,
      startTime: '2021-10-25',
      amount: 32.95,
      currency: 'USD',
      commentCount: 0,
      department: {
        id: 11,
        name: 'Market Management',
        parent: { id: 3, name: 'Global Operations' },
      },
      category: { id: 18, name: 'The Supply Shoppe', visibility: Visibility.VISIBLE },
      vendor: { id: 122, name: 'Schnell Shipping co' },
      transactions: [
        {
          id: 1,
          description: 'Maranata Transport',
          transDate: '2021-10-25',
          status: STATUS.NEW,
          amount: 32.95,
          currency: 'USD',
          commentCount: 3,
          department: {
            id: 11,
            name: 'Market Management',
            parent: { id: 3, name: 'Global Operations' },
          },
          category: { id: 18, name: 'The Supply Shoppe', visibility: Visibility.VISIBLE },
          vendor: { id: 122, name: 'Schnell Shipping co' },
        },
        {
          id: 2,
          description: 'Matt Moves Stuff & Transport',
          transDate: '2021-10-25',
          amount: 32.95,
          currency: 'USD',
          commentCount: 0,
          department: {
            id: 11,
            name: 'Market Management',
            parent: { id: 3, name: 'Global Operations' },
          },
          category: { id: 18, name: 'The Supply Shoppe', visibility: Visibility.VISIBLE },
          vendor: { id: 122, name: 'Schnell Shipping co' },
        },
        {
          id: 3,
          description: 'Schnell’s Global Transport',
          transDate: '2021-10-25',
          amount: 32.95,
          currency: 'USD',
          commentCount: 0,
          department: {
            id: 11,
            name: 'Market Management',
            parent: { id: 3, name: 'Global Operations' },
          },
          category: { id: 18, name: 'The Supply Shoppe', visibility: Visibility.VISIBLE },
          vendor: { id: 122, name: 'Schnell Shipping co' },
        },
      ],
    },
    {
      id: 1492,
      startTime: '2021-10-25',
      amount: 32.95,
      currency: 'USD',
      commentCount: 0,
      department: {
        id: 11,
        name: 'Market Management',
        parent: { id: 3, name: 'Global Operations' },
      },
      category: { id: 18, name: 'The Supply Shoppe', visibility: Visibility.VISIBLE },
      vendor: { id: 122, name: 'Schnell Shipping co' },
    },
    {
      id: 1490,
      startTime: '2021-10-25',
      amount: 32.95,
      currency: 'USD',
      commentCount: 0,
      department: {
        id: 11,
        name: 'Market Management',
        parent: { id: 3, name: 'Global Operations' },
      },
      category: { id: 18, name: 'The Supply Shoppe' },
      vendor: { id: 122, name: 'Schnell Shipping co' },
    },
  ],
});
