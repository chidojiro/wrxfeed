import { rest } from 'msw';
import { TargetApiEndpoints } from './apis';
import { Target, TargetStatusType, TargetTypeProp } from './types';

export const defaultMockTarget: Target = {
  id: 1,
  updatedAt: '2022-07-05T07:24:46.612Z',
  isPrimary: true,
  name: 'Community Operations',
  trackingStatus: TargetStatusType.OnTrack,
  updatedBy: {
    id: 1,
    email: 'support@gravitylabs.co',
    fullName: 'Gravity Assistant',
    avatar: 'https://gravity-asset-bucket.s3.us-east-2.amazonaws.com/ga-avatar.png',
    title: 'Assistant',
    bio: undefined,
    signupDate: '2022-04-19T09:26:23.040Z',
    lastLoginAt: undefined,
    depId: undefined,
  },
  department: {
    id: 1,
    name: 'Community Operations',
  },
  props: [
    {
      id: 1,
      exclude: false,
      type: TargetTypeProp.DEPARTMENT,
      name: 'Community Operations',
    },
  ],
  periods: Array.from(new Int16Array(12)).map((_, index) => ({
    month: 12 - index - 1,
    year: 2022,
    amount: 0,
    threshold: 0,
  })),
  spendings: [],
};

const getList = () =>
  rest.get(TargetApiEndpoints.getList(), (req, res, ctx) => {
    return res(ctx.json([defaultMockTarget]));
  });

export const TargetMockHandlers = { getList };
