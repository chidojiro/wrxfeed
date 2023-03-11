import { Link } from 'react-router-dom';

export const SomethingWentWrong = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-4xl font-extrabold text-Gray-2 tracking-tight sm:text-5xl text-center">
              Something Went Wrong!
            </h1>
            <p className="mt-1 text-base text-Gray-6 text-center">Please try again later.</p>
          </div>
          <Link
            to="/dashboard/all-company"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-Gray-3 hover:bg-Gray-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-6 mt-10"
          >
            Go back home
          </Link>
        </main>
      </div>
    </div>
  );
};
