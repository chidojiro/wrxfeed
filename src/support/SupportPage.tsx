import { AuthApis } from '@/auth/apis';
import { Button, Divider, Form, Input, Tooltip } from '@/common/components';
import { useDisclosure, useHandler } from '@/common/hooks';
import { CompanyApis } from '@/company/apis';
import { useInvite } from '@/main/hooks';
import { useClipboard } from '@dwarvesf/react-hooks';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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

  const companyFormMethods = useForm();

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
    setLoading(true);
    setInviteEmail(watch('invite-email'));
    await sendInvitation({ email });
    reset();
    setLoading(false);
  };

  const { handle: createCompany, data: createdCompany } = useHandler(
    (data) => CompanyApis.create(data),
    {
      onError: (error: any) => {
        toast.error(
          Object.values(error?.details?.details ?? {})[0] ?? (error as any).details?.message,
        );

        return false;
      },
    },
  );

  const { onCopy } = useClipboard((createdCompany as any)?.token);

  const handleCopyToken = () => {
    onCopy();
    toast.success('Token was copied to clipboard!');
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

        <Divider className="my-12" />

        <h3 className="font-bold text-[28px]">Invite</h3>
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

        <Divider className="my-12" />

        <h3 className="font-bold text-[28px]">New company</h3>
        <Form
          methods={companyFormMethods}
          onSubmit={async (data: any) => {
            await createCompany(data);
            toast.success('Company was created!');
          }}
        >
          <div className="flex gap-6">
            <div className="flex flex-col gap-6 mt-8 w-[300px] flex-shrink-0">
              <Form.Input
                className="bg-[#EDEDED] rounded-lg"
                name="name"
                required
                placeholder="Name"
              />
              <Form.Input
                className="bg-[#EDEDED] rounded-lg"
                name="fullName"
                required
                placeholder="Admin name"
              />
              <Form.Input
                className="bg-[#EDEDED] rounded-lg"
                name="adminEmail"
                required
                type="email"
                placeholder="Admin email"
              />
              <Form.Input
                className="=bg-[#EDEDED] rounded-lg"
                name="domain"
                required
                placeholder="Company domain"
              />
              <Button type="submit" variant="solid" colorScheme="accent" className="rounded">
                Create
              </Button>
            </div>
            {companyFormMethods.formState.isSubmitSuccessful && (
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Token</p>
                  <Tooltip
                    trigger={
                      <Button onClick={handleCopyToken}>
                        <ClipboardCopyIcon width={16} />
                      </Button>
                    }
                  >
                    Copy to clipboard
                  </Tooltip>
                </div>
                <p className="p-4 rounded border border-gray-400 break-all max-w-[500px] mt-2 h-full">
                  {(createdCompany as any)?.token}
                </p>
              </div>
            )}
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
