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
import { useDepartment } from '@main/hooks/department.hook';
import { DepartmentFilter } from '@api/types';
import Loading from '@common/atoms/Loading';
import DepartmentCell from '@auth/molecules/DepartmentCell';
// import { getMultiRandomInt } from '@main/utils';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});
const DEBOUNCE_WAIT = 500;

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
    yourTeams.push(userDepartment);
  };

  useEffect(() => {
    // if (identity?.token && identity?.lastLoginAt) {
    //   redirect(routes.Company.path as string);
    // }
    // const random = getMultiRandomInt(4, 0, 10);
    // console.log({ random });
  }, [redirect, identity]);

  useEffect(() => {
    if (identity?.depId) {
      getYourTeam(identity?.depId);
    }
  }, [identity?.depId]);

  const onClickIamDone = () => redirect(routes.Company.path as string);
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

  const renderSearchResults = () => {
    if (results.length === 0) return null;
    return (
      <div className="flex flex-col border-Gray-11 border-t">
        {results.map((item) => (
          <DepartmentCell key={item?.id} dept={item} isFollowed={false} />
        ))}
      </div>
    );
  };

  const renderYourTeam = () => {
    if (yourTeams.length === 0) return null;
    return (
      <div className="flex flex-col">
        <div className="flex flex-col py-4 border-Gray-11 border-b">
          <p className="text-xs text-Gray-6 text-left">Your Team</p>
        </div>
        {yourTeams.map((item) => (
          <DepartmentCell key={item?.id} dept={item} isFollowed />
        ))}
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
        {suggestedTeams.map((item) => (
          <DepartmentCell key={item?.id} dept={item} isFollowed={false} />
        ))}
      </div>
    );
  };

  return (
    <BlankLayout className="flex flex-col p-0 m-0">
      <NavBarStatic
        companyName={identity?.company?.name || 'Gravity Labs'}
        companyStyle="ml-4 sm:ml-12 md:ml-24 lg:ml-40"
      />
      <div className="flex flex-1 flex-col pt-24 items-center bg-Gray-12 overflow-hidden">
        <div className="h-auto flex flex-1 flex-col items-center overflow-hidden">
          <div className="mt-14 w-8 h-8 flex">
            <SharpSpaceDashboard className="w-8 h-8" width={32} height={32} />
          </div>
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
              className="w-[448px] text-primary h-9 text-sm text-center border border-Gray-11 focus:border-Accent-2 hover:border-Accent-2"
              placeholder="My team is…"
              onChange={debounceSearchRequest}
            />
          </div>
          <div className="w-full h-auto flex flex-1 relative flex-col mt-3 overflow-hidden">
            <div className="w-full h-4 flex justify-center items-center mb-3">
              {!!isLoading && <Loading width={12} height={12} />}
            </div>
            <div className="flex flex-col w-full overflow-y-scroll">
              {renderSearchResults()}
              {renderYourTeam()}
              {renderSuggestedTeam()}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClickIamDone}
          className="flex flex-col items-center self-center mb-20 mt-4"
        >
          <p className="text-Accent-2 text-sm">{"I'm Done —>"}</p>
          <div className="h-px bg-Accent-2 w-full" />
        </button>
      </div>
    </BlankLayout>
  );
};

export default OnboardPage;
