import { STATUS } from '@common/atoms/StatusTag';
import { Transaction } from '@main/types';

export const transactions: Transaction[] = [
  {
    id: '1',
    owner: {
      name: 'Professional Services',
    },
    date: Date.now(),
    amount: 17000.5,
    description: 'Google Analytics-Adservices',
    status: STATUS.NEW,
    comments: [
      {
        id: '1',
        owner: {
          name: 'Steve Schnell',
        },
        commentDate: Date.now(),
        content: 'Hey <mention userid="785" tagname="JohnnyBravo"/>!',
      },
      {
        id: '2',
        owner: {
          name: 'Alex Sivilay',
        },
        commentDate: Date.now() - 2 * 60 * 60,
        content:
          '<mention userid="123" tagname="Matt lock"/> Of course! We’ll ramp up for the Q4 push.',
      },
    ],
  },
  {
    id: '2',
    owner: {
      name: 'Rent',
    },
    date: Date.now() - 24 * 60 * 60 * 1000,
    amount: 4000.78,
    description: 'LA Brea Av3016865252',
    comments: [
      {
        id: '1',
        owner: {
          name: 'Steve Schnell',
        },
        commentDate: Date.now(),
        content: 'was this for the ugc campaign?',
      },
    ],
  },
  {
    id: '3',
    owner: {
      name: 'Matt',
    },
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    amount: 1045,
    description: 'GCP Sept Billings',
  },
  {
    id: '4',
    owner: {
      name: 'Join Wick',
    },
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    amount: 200.78,
    description: 'AWS Sept Billing',
  },
  {
    id: '5',
    owner: {
      name: 'An Tran',
    },
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    amount: 500.78,
    description: 'Google Admod',
  },
  {
    id: '6',
    owner: {
      name: 'Harry',
    },
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    amount: 700.8,
    description: 'AWS Sept Billing',
  },
  {
    id: '7',
    owner: {
      name: 'Lam',
    },
    date: Date.now(),
    amount: 800.4,
    description: 'AWS Sept Billing',
  },
];
