import { LockDBIcon } from '@/assets';

export const RestrictedAccessPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[360px] mx-auto space-y-16 text-center flex flex-col justify-center items-center mt-32 md:pr-20">
        <div className="bg-white w-[200px] h-[200px] rounded-full flex justify-center items-center">
          <LockDBIcon />
        </div>
        <div className="space-y-4">
          <p className="text-3xl font-semibold tracking-tight text-primary">
            This item is restricted
          </p>
          <p className="text-sm leading-4 text-Gray-6 font-normal">
            You don’t have access to this data. Please contact an admin for more info.
          </p>
        </div>
      </div>
    </div>
  );
};
