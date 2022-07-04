import { Divider } from '@/common/components';
import React from 'react';
import { AllCompanySummary } from './AllCompanySummary';
import { AllCompanyTarget } from './AllCompanyTarget';
import { TargetCard } from './TargetCard';

const recentlyViewedTargets = [
  {
    id: 2357,
    updatedAt: '2022-07-01T07:21:24.557Z',
    isPrimary: true,
    name: 'Systems & Analytics',
    trackingStatus: 'ON_TRACK',
    department: {
      id: 522,
      name: 'Systems & Analytics',
    },
    updatedBy: {
      id: 58,
      email: 'ngoc@gravitylabs.co',
      fullName: 'ngoc@gravitylabs.co',
      avatar: null,
      title: null,
      bio: null,
      signupDate: '2022-06-17T03:44:08.062Z',
      lastLoginAt: '2022-06-20T06:19:07.710Z',
      depId: null,
      refererId: null,
    },
    props: [
      {
        id: 522,
        exclude: false,
        type: 'DEPARTMENT',
        name: 'Systems & Analytics',
      },
    ],
    periods: [
      {
        month: 12,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 11,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 10,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 9,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 8,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 7,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 6,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 5,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 4,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 3,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 2,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 1,
        year: 2022,
        amount: 999,
        threshold: 0,
      },
    ],
    spendings: [
      {
        year: 2022,
        month: 6,
        total: 742498,
      },
      {
        year: 2021,
        month: 12,
        total: 637998,
      },
    ],
    hidden: false,
  },
  {
    id: 357,
    updatedAt: '2022-07-01T07:21:24.557Z',
    isPrimary: true,
    name: 'Systems & Analytics',
    trackingStatus: 'ON_TRACK',
    department: {
      id: 522,
      name: 'Systems & Analytics',
    },
    updatedBy: {
      id: 58,
      email: 'ngoc@gravitylabs.co',
      fullName: 'ngoc@gravitylabs.co',
      avatar: null,
      title: null,
      bio: null,
      signupDate: '2022-06-17T03:44:08.062Z',
      lastLoginAt: '2022-06-20T06:19:07.710Z',
      depId: null,
      refererId: null,
    },
    props: [
      {
        id: 522,
        exclude: false,
        type: 'DEPARTMENT',
        name: 'Systems & Analytics',
      },
    ],
    periods: [
      {
        month: 12,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 11,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 10,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 9,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 8,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 7,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 6,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 5,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 4,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 3,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 2,
        year: 2022,
        amount: 0,
        threshold: 0,
      },
      {
        month: 1,
        year: 2022,
        amount: 999,
        threshold: 0,
      },
    ],
    spendings: [
      {
        year: 2022,
        month: 6,
        total: 742498,
      },
      {
        year: 2021,
        month: 12,
        total: 637998,
      },
    ],
    hidden: false,
  },
];

export const AllCompany = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <AllCompanyTarget className="col-span-3 lg:col-span-2" />
        <AllCompanySummary className="col-span-3 lg:col-span-1" />
      </div>
      <Divider className="mt-8 mb-4" />
      <p className="text-sm text-Gray-3 font-semibold">Recently Viewed</p>
      <div className="mt-5 gap-4 grid grid-cols-1 lg:grid-cols-2">
        {recentlyViewedTargets.map((target) => (
          <TargetCard key={target.id} data={target as any} className="h-[330px]" />
        ))}
      </div>
    </div>
  );
};
