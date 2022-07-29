import { Button } from '@/common/components';
import React from 'react';

interface NotInvitedProps {
  onBack: () => void;
}

const NotInvited: React.FC<NotInvitedProps> = ({ onBack }) => (
  <div className="flex flex-col justify-center items-center m-auto w-screen h-screen space-y-2">
    <h3 className="text-4xl font-bold text-primary text-center">Account not found.</h3>
    <p className="text-Gray-6 text-center whitespace-pre-wrap pb-4">
      {"Looks like you haven't been approved yet.\nPlease contact your admin to receive an invite."}
    </p>
    <Button
      onClick={onBack}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-Gray-3 hover:bg-Gray-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-6"
      aria-hidden
    >
      Back to Login
    </Button>
  </div>
);

export default NotInvited;
