/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { toast } from 'react-toastify';

import { useApi } from '@/api';
import { useIdentity } from '@/identity/hooks';
import { useDebounce, useNavUtils, useQuery } from '@/common/hooks';
import { useSubscription } from '@/main/hooks/subscription.hook';
import { useErrorHandler } from '@/error/hooks';
import { isApiError } from '@/error/utils';
import { useSearch } from '@/main/hooks/search.hook';

import routes from '@/routes';
import { getMultiRandomInt, getUniqueListBy } from '@/main/utils';
import { TEAM_SUGGEST_RANDOM_NUMBER } from '@/config';
import { Department } from '@/main/entity';
import { SearchResult } from '@/main/types';

import BlankLayout from '@/common/templates/BlankLayout';
import NavBarStatic from '@/common/organisms/NavBarStatic';
import Loading from '@/common/atoms/Loading';
import DepartmentCell from '@/auth/molecules/DepartmentCell';

import { ReactComponent as SharpSpaceDashboard } from '@/assets/icons/solid/sharp-space-dashboard.svg';
import { ReactComponent as QuestionCircle } from '@/assets/icons/solid/question-circle.svg';

const DEBOUNCE_WAIT = 500;

const OnboardPage: React.VFC = () => {
  const identity = useIdentity();
  const { redirect } = useNavUtils();
  const { updateProfile } = useApi();
  const errorHandler = useErrorHandler();
  const query = useQuery();

  const autoDirectString: string = query.get('autoDirect') ?? '1';
  const authDirect: boolean = parseInt(autoDirectString, 10) === 1;

  const { isFollowing } = useSubscription();

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [yourTeams, setYourTeams] = useState<Department[]>([]);
  const [suggestedTeams, setSuggestedTeams] = useState<Department[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isDoneOnboard, setDoneOnboard] = useState(false);
  const [isHandlingAction, setHandlingAction] = useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = useState(false);

  const {
    results: departments,
    isLoading,
    onClear,
  } = useSearch({
    keyword,
    searchCate: false,
    searchVend: false,
    ignoreEmptyKeyword: ignoreEmpty,
  });

  useEffect(() => {
    setSearchResults(departments);
  }, [departments]);

  useEffect(() => {
    if (identity?.token && identity?.lastLoginAt && authDirect) {
      redirect(routes.ForYou.path as string);
    }
  }, [redirect, identity]);

  useEffect(() => {
    if (suggestedTeams.length > 0 || keyword?.length > 0) return;
    const teamNotFollowYet: Department[] = [];
    const followed: Department[] = [];

    departments.forEach((item) => {
      const tempDepartment = { id: item?.directoryId, name: item?.title };
      if (isFollowing('departments', tempDepartment)) {
        if (yourTeams.includes(tempDepartment)) return;
        followed.push(tempDepartment);
      } else if (item?.id !== identity?.depId) {
        teamNotFollowYet.push(tempDepartment);
      }
    });

    setYourTeams((pre) => [...pre, ...followed]);

    if (teamNotFollowYet.length > 4) {
      const random = getMultiRandomInt(TEAM_SUGGEST_RANDOM_NUMBER, 0, teamNotFollowYet.length - 1);
      const randomSuggest: Department[] = [];
      random.forEach((item) => randomSuggest.push(teamNotFollowYet[item]));
      setSuggestedTeams(randomSuggest);
    } else {
      setSuggestedTeams(teamNotFollowYet);
    }
    setIgnoreEmpty(true);
  }, [departments]);

  const onClickIamDone = async () => {
    try {
      setDoneOnboard(true);
      const currentTime = new Date();
      const updates = {
        ...identity,
        companyName: identity?.company?.name || '',
        title: identity?.title,
        bio: identity?.bio || '',
        lastLoginAt: currentTime.toISOString(),
      };
      await updateProfile(updates);
      redirect(routes.ForYou.path as string);
    } catch (error: unknown) {
      if (isApiError(error)) {
        toast.error(error?.details?.message);
      } else {
        await errorHandler(error);
      }
    } finally {
      setDoneOnboard(false);
    }
  };

  const onSearchTeam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value.toString());
      onClear();
    },
    [setKeyword],
  );

  const debounceSearchRequest = useDebounce(onSearchTeam, DEBOUNCE_WAIT, [onSearchTeam]);

  const onFollowedTeam = (depts: Department[]) => {
    setHandlingAction(false);
    const newSuggested = cloneDeep(suggestedTeams);
    setSuggestedTeams(
      newSuggested.filter((item: Department) => {
        return depts.findIndex((dept: Department) => dept?.id === item?.id) === -1;
      }),
    );

    setYourTeams((pre) => getUniqueListBy([...pre, ...depts], 'id'));
  };

  const onUnfollowedTeam = (depts: Department[]) => {
    setHandlingAction(false);
    const newYourTeams = cloneDeep(yourTeams);
    setYourTeams(
      newYourTeams.filter((item: Department) => {
        return depts.findIndex((dept: Department) => dept?.id === item?.id) === -1;
      }),
    );
    if (keyword.length === 0) {
      setSuggestedTeams((pre) => getUniqueListBy([...pre, ...depts], 'id'));
    }
  };

  const renderSearchResults = () => {
    if (keyword.trim().length === 0) {
      return null;
    }
    if (searchResults.length === 0) {
      return (
        <div className="flex mx-6 w-full flex-row items-center justify-center space-x-3 py-1 h-6 self-center">
          <QuestionCircle width={15} height={15} />
          <p className="text-sm text-Gray-3">No teams found.</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col border-Gray-11 border-t">
        {searchResults.map((item) => (
          <DepartmentCell
            key={item?.id}
            dept={{ id: item?.directoryId, name: item?.title }}
            onFollowedTeam={onFollowedTeam}
            onFollowTeamFail={() => setHandlingAction(false)}
            onUnfollowedTeam={onUnfollowedTeam}
            onUnfollowTeamFail={() => setHandlingAction(false)}
            onFollow={() => setHandlingAction(true)}
            onUnfollow={() => setHandlingAction(true)}
            enableAction={!isHandlingAction}
          />
        ))}
      </div>
    );
  };

  const renderYourTeam = () => {
    if (yourTeams.length === 0 || keyword.length > 0) return null;
    return (
      <div className="flex flex-col">
        <div className="flex flex-col py-4 border-Gray-11 border-b">
          <p className="text-xs text-Gray-6 text-left">Your Team</p>
        </div>
        {yourTeams.map((item) => (
          <DepartmentCell
            key={item?.id}
            dept={item}
            onFollowedTeam={onFollowedTeam}
            onFollowTeamFail={() => setHandlingAction(false)}
            onUnfollowedTeam={onUnfollowedTeam}
            onUnfollowTeamFail={() => setHandlingAction(false)}
            onFollow={() => setHandlingAction(true)}
            onUnfollow={() => setHandlingAction(true)}
            enableAction={!isHandlingAction}
          />
        ))}
      </div>
    );
  };

  const renderSuggestedTeam = () => {
    if (suggestedTeams.length === 0 || keyword.length > 0) return null;
    if (yourTeams.length >= 3) return null;

    return (
      <div className="flex flex-col">
        <div className="flex flex-col py-4 border-Gray-11 border-b">
          <p className="text-xs text-Gray-6 text-left">Suggested Teams</p>
        </div>
        {suggestedTeams.map((item) => (
          <DepartmentCell
            key={item?.id}
            dept={item}
            onFollowedTeam={onFollowedTeam}
            onFollowTeamFail={() => setHandlingAction(false)}
            onUnfollowedTeam={onUnfollowedTeam}
            onUnfollowTeamFail={() => setHandlingAction(false)}
            onFollow={() => setHandlingAction(true)}
            onUnfollow={() => setHandlingAction(true)}
            enableAction={!isHandlingAction}
          />
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
        <div className="h-auto w-full px-4 sm:px-0 sm:w-auto flex flex-1 flex-col items-center overflow-hidden">
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
          <div className="bg-white mt-6 flex">
            <input
              className="w-full sm:w-[348px] md:w-[448px] text-primary h-9 text-sm text-center border border-Gray-11 focus:border-Accent-2 hover:border-Accent-2"
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
        <div className="flex flex-row self-center mb-12 sm:mb-20 mt-4">
          {isDoneOnboard && <Loading width={12} height={12} className="mr-4" />}
          <button type="button" onClick={onClickIamDone} className="flex flex-col items-center">
            <p className="text-Accent-2 text-sm">{"I'm Done —>"}</p>
            <div className="h-px bg-Accent-2 w-full" />
          </button>
        </div>
      </div>
    </BlankLayout>
  );
};

export default OnboardPage;
