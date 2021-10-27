import React from 'react';

const NotInvited: React.VFC = () => (
  <div className="flex flex-col justify-center items-center m-auto w-screen h-screen space-y-2">
    <h3 className="text-4xl font-bold text-primary text-center">Account not found.</h3>
    <p className="text-Gray-6 text-center whitespace-pre-wrap">
      {"Looks like you haven't been approved yet.\nPlease contact your admin to receive an invite."}
    </p>
  </div>
);

export default NotInvited;
