import { LockDBIcon } from '@/assets';

export const RestrictedPage = () => {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-[360px] mx-auto space-y-16 text-center flex flex-col justify-center items-center">
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
