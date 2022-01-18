/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import BlankLayout from '@common/templates/BlankLayout';
import { useIdentity } from '@identity/hooks';
import { useNavUtils } from '@common/hooks';
import NavBarStatic from '@common/organisms/NavBarStatic';
import { ReactComponent as SharpSpaceDashboard } from '@assets/icons/solid/sharp-space-dashboard.svg';
import { ReactComponent as BasicsTickSmall } from '@assets/icons/solid/basics-tick-small.svg';
import routes from '@src/routes';
// import { ReactComponent as BasicsAddSmall } from '@assets/icons/solid/basics-add-small.svg';

export type TeamSuggest = {
  id?: number;
  name?: string;
};

const OnboardPage: React.VFC = () => {
  const identity = useIdentity();
  const { redirect } = useNavUtils();
  const [yourTeams] = useState<TeamSuggest[]>([
    {
      id: 0,
      name: 'Community Operations',
    },
  ]);
  const [suggestedTeams] = useState<TeamSuggest[]>([
    {
      id: 1,
      name: 'Brand and Design',
    },
    {
      id: 2,
      name: 'Information Technology',
    },
    {
      id: 3,
      name: 'Community Operations',
    },
    {
      id: 4,
      name: 'Community Operations',
    },
    {
      id: 5,
      name: 'Community Operations',
    },
    {
      id: 6,
      name: 'Community Operations',
    },
    {
      id: 7,
      name: 'Community Operations',
    },
  ]);

  useEffect(() => {
    // if (identity?.token && identity?.lastLoginAt) {
    //   redirect(routes.Company.path as string);
    // }
  }, [redirect, identity]);

  const onClickIamDone = () => redirect(routes.Company.path as string);
  // const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   return null;
  // };

  const renderTeam = (item: TeamSuggest) => {
    return (
      <div
        key={item?.id}
        className="flex flex-row items-center justify-between py-4 border-Gray-11 border-b"
      >
        <p className="text-sm font-medium text-Gray-3">{item?.name}</p>
        <button
          type="button"
          className="flex flex-row items-center px-3 py-2 space-x-1.5 bg-Accent-2 rounded-full"
        >
          <BasicsTickSmall
            width={20}
            height={20}
            className="w-5 h-5 stroke-current path-no-stroke text-white object-cover"
          />
          <p className="text-white text-sm">Following</p>
        </button>
      </div>
    );
  };

  return (
    <BlankLayout className="flex flex-col p-0 m-0">
      <NavBarStatic
        companyName={identity?.company?.name || 'Gravity Labs'}
        companyStyle="ml-4 sm:ml-12 md:ml-24 lg:ml-40"
      />
      <div className="flex flex-1  h-screen flex-col pt-24 items-center bg-Gray-12">
        <div className="w-[448px] h-auto flex flex-col items-center">
          <SharpSpaceDashboard className="mt-14 w-8 h-8" width={32} height={32} />
          <div className="text-center">
            <h1 className="text-primary text-2xl font-semibold mt-4">What team are you on?</h1>
            <p className="text-Gray-6 text-sm mt-1">
              This is how we'll determine what content is most applicable to you
              <br />
              You can always change this later.
            </p>
          </div>
          <div className="bg-white mt-6">
            <input
              className="w-[448px] h-9 text-sm text-center border border-Gray-11 focus:border-Accent-2 hover:border-Accent-2"
              placeholder="My team is…"
              // onChange={onChangeKeyword}
            />
          </div>
          <div className="w-full h-full flex flex-col mt-6">
            <div className="flex flex-col overflow-y-scroll h-[360px]">
              <div className="flex flex-col">
                <div className="flex flex-col py-4 border-Gray-11 border-b">
                  <p className="text-xs text-Gray-6 text-left">Your Team</p>
                </div>
                {yourTeams.map(renderTeam)}
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col py-4 border-Gray-11 border-b">
                  <p className="text-xs text-Gray-6 text-left">Suggested Teams</p>
                </div>
                {suggestedTeams.map(renderTeam)}
              </div>
            </div>
            <button type="button" onClick={onClickIamDone}>
              <p className="text-Accent-2 text-sm self-center mb-20 mt-4">{"I'm Done —>"}</p>
            </button>
          </div>
        </div>
      </div>
    </BlankLayout>
  );
};

export default OnboardPage;
