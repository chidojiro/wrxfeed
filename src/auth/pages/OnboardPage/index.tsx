/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useState } from 'react';

import { useApi } from '@api';
import { useIdentity } from '@identity/hooks';
import { useDebounce, useNavUtils } from '@common/hooks';

import routes from '@src/routes';
import { Department } from '@main/entity';

import BlankLayout from '@common/templates/BlankLayout';
import NavBarStatic from '@common/organisms/NavBarStatic';
import { ReactComponent as SharpSpaceDashboard } from '@assets/icons/solid/sharp-space-dashboard.svg';
import { ReactComponent as BasicsTickSmall } from '@assets/icons/solid/basics-tick-small.svg';
import { useDepartment } from '@main/hooks/department.hook';
import { DepartmentFilter } from '@api/types';
import Loading from '@common/atoms/Loading';
// import { ReactComponent as BasicsAddSmall } from '@assets/icons/solid/basics-add-small.svg';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});
const DEBOUNCE_WAIT = 300;

const OnboardPage: React.VFC = () => {
  const identity = useIdentity();
  const { redirect } = useNavUtils();
  const { getDepartmentById } = useApi();
  const [filter, setFilter] = useState<DepartmentFilter>({
    ...INIT_PAGINATION,
    term: '',
  });
  const { departments: results, onClear, isLoading } = useDepartment(filter);

  const [yourTeams] = useState<Department[]>([]);
  const [suggestedTeams] = useState<Department[]>([]);

  const getYourTeam = async (depId: number) => {
    const userDepartment = await getDepartmentById(depId);
    // console.log({ userDepartment });
    yourTeams.push(userDepartment);
  };

  useEffect(() => {
    // if (identity?.token && identity?.lastLoginAt) {
    //   redirect(routes.Company.path as string);
    // }
  }, [redirect, identity]);

  useEffect(() => {
    if (identity?.depId) {
      getYourTeam(identity?.depId);
    }
  }, [identity?.depId]);

  const onClickIamDone = () => redirect(routes.Company.path as string);
  // const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilter({
  //     ...INIT_PAGINATION,
  //     term: event.target.value,
  //   });
  // };
  const onSearchTeam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length > 0) {
        setFilter({
          term: event.target.value,
          ...INIT_PAGINATION,
        });
      } else {
        onClear();
      }
    },
    [setFilter],
  );
  const debounceSearchRequest = useDebounce(onSearchTeam, DEBOUNCE_WAIT, [onSearchTeam]);

  const renderTeam = (item: Department) => {
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

  const renderSearchResults = () => {
    if (results.length === 0) return null;
    return <div className="flex flex-col border-Gray-11 border-t">{results.map(renderTeam)}</div>;
  };

  const renderYourTeam = () => {
    if (yourTeams.length === 0) return null;
    return (
      <div className="flex flex-col">
        <div className="flex flex-col py-4 border-Gray-11 border-b">
          <p className="text-xs text-Gray-6 text-left">Your Team</p>
        </div>
        {yourTeams.map(renderTeam)}
      </div>
    );
  };

  const renderSuggestedTeam = () => {
    if (suggestedTeams.length === 0) return null;
    return (
      <div className="flex flex-col">
        <div className="flex flex-col py-4 border-Gray-11 border-b">
          <p className="text-xs text-Gray-6 text-left">Suggested Teams</p>
        </div>
        {suggestedTeams.map(renderTeam)}
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
              onChange={debounceSearchRequest}
            />
          </div>
          <div className="w-full h-full flex flex-col mt-3">
            <div className="w-full h-4 flex justify-center items-center mb-3">
              {!!isLoading && <Loading className="ml-4" width={12} height={12} />}
            </div>
            <div className="flex flex-col w-full overflow-y-scroll h-[360px]">
              {renderSearchResults()}
              {renderYourTeam()}
              {renderSuggestedTeam()}
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
