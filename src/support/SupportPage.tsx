import { Button, Divider, Input } from '@/common/components';
import React from 'react';

export type SupportPageProps = {
  //
};

export const SupportPage = ({}: SupportPageProps) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="h-[56px] bg-primary flex items-center px-8">
        <h1 className="text-white font-bold text-lg">Gravity Labs Support & Invite Admin</h1>
      </div>
      <div className="p-16">
        <h3 className="font-bold text-[28px]">Log In As</h3>
        <p className="font-bold mt-6 text-sm">Enter email for the user you’re logging in as:</p>
        <div className="flex items-center gap-6 mt-8">
          <Input placeholder="email required*" className="w-[300px] bg-[#EDEDED] rounded-lg" />
          <Button variant="solid" colorScheme="accent" className="rounded">
            Log in
          </Button>
        </div>

        <Divider className="my-[100px]" />
      </div>
    </div>
  );
};
