import { AuthApis } from '@/auth/apis';
import { Button, Divider, Form, Input } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import { useInvite } from '@/main/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type SupportPageProps = {
  //
};

export const SupportPage = ({}: SupportPageProps) => {
  const { sendInvitation, isSent, inviteLink } = useInvite();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const methods = useForm({ mode: 'onChange' });
  const { reset, watch } = methods;

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

  const sendInvite = async (email: string) => {
    console.log(email);
    setLoading(true);
    setInviteEmail(watch('invite-email'));
    await sendInvitation({ email });
    reset();
    setLoading(false);
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

        <h3 className="font-bold text-[28px] mt-24">Invite</h3>
        <p className="font-bold mt-6 text-sm">Enter email for the user you want to invite</p>
        <Form methods={methods} onSubmit={() => sendInvite(watch('invite-email'))}>
          <div className="flex items-center gap-6 mt-8">
            <Form.Input
              className="w-[300px] bg-[#EDEDED] rounded-lg"
              name="invite-email"
              type="email"
              required={true}
              placeholder="email required*"
            />
            <Button
              type="submit"
              variant="solid"
              colorScheme="accent"
              className="rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Invite'}
            </Button>
          </div>
        </Form>
        {isSent && (
          <div className="space-y-4 mt-[60px]">
            <p className="text-lg leading-5 font-semibold">Invite was sent to: {inviteEmail}</p>
            <p className="text-lg leading-5 font-semibold">Invite link: {inviteLink}</p>
          </div>
        )}
      </div>
    </div>
  );
};
