import { AuthApis } from '@/auth/apis';
import { Button, Divider, Input } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import React from 'react';

export type SupportPageProps = {
  //
};

export const SupportPage = ({}: SupportPageProps) => {
  const [email, setEmail] = React.useState('');

  const hasLoginError = useDisclosure();

  const handleLoginClick = async () => {
    if (email) {
      try {
        await AuthApis.switch(email);
        (window as any).location = '/dashboard';
      } catch (e: any) {
        if (e.code === 404) {
          hasLoginError.open();
        }
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="h-[56px] bg-primary flex items-center px-8">
        <h1 className="text-white font-bold text-lg">Gravity Labs Support & Invite Admin</h1>
      </div>
      <div className="p-16">
        <h3 className="font-bold text-[28px]">Log In As</h3>
        <p className="font-bold mt-6 text-sm">Enter email for the user you’re logging in as:</p>
        <div className="flex items-center gap-6 mt-8">
          <Input
            placeholder="email required*"
            type="email"
            className="w-[300px] bg-[#EDEDED] rounded-lg"
            value={email}
            onChange={(e) => {
              hasLoginError.close();
              setEmail(e.target.value);
            }}
            error={hasLoginError.isOpen}
          />
          <Button
            variant="solid"
            colorScheme="accent"
            className="rounded"
            onClick={handleLoginClick}
          >
            Log in
          </Button>
        </div>
        {hasLoginError.isOpen && (
          <p className="text-danger text-sm mt-1">
            The account you are trying to switch to does not exist
          </p>
        )}

        <Divider className="my-[100px]" />
      </div>
    </div>
  );
};
