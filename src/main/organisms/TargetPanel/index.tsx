import React from 'react';

import { PostTargetParams, PutTargetParams, TargetFilter } from '@api/types';
import { BasicsDownSmall } from '@assets';
import Loading from '@common/atoms/Loading';
import { Target } from '@main/entity';
import { useTarget } from '@main/hooks';
import { TargetRow } from '@main/molecules';
import { classNames } from '@common/utils';

export interface TargetPanelProps {
  title?: string;
}

const GET_TARGETS_LIMIT = 30;

const initFilter = {
  offset: 0,
  limit: GET_TARGETS_LIMIT,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  timestamp: Date.now(),
};

const TargetPanel: React.VFC<TargetPanelProps> = () => {
  const [filter, setFilter] = React.useState<TargetFilter>(initFilter);
  const [isExpanded, setExpanded] = React.useState<boolean>(false);
  const onPostSuccess = () => {
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onPostError = () => {};
  const onPutSuccess = () => {
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onPutError = () => {};
  const { targets, isGetTargets, postTarget, putTarget, isPostTarget, isPutTarget } = useTarget(
    filter,
    { onSuccess: onPostSuccess, onError: onPostError },
    { onSuccess: onPutSuccess, onError: onPutError },
  );

  // React.useEffect(() => {
  //   if (targets.length > 0) {
  //     setTargetsRecoil(targets);
  //   }
  // }, [setTargetsRecoil, targets]);

  const handleClickExpand = () => {
    if (isGetTargets) return;
    setExpanded(!isExpanded);
  };

  const renderExpandedIcon = () => {
    // if (targets.length === 0) return null;
    const expandStyle = isExpanded ? { transform: 'rotate(180deg)' } : {};
    return (
      <div className="flex flex-row h-4 items-center">
        <div className="flex flex-1 h-px bg-Gray-11 mr-1" />
        <button type="button" onClick={handleClickExpand}>
          <BasicsDownSmall className="flex" style={expandStyle} />
        </button>
        <div className="flex flex-1 h-px bg-Gray-11 ml-1" />
      </div>
    );
  };

  const handlePostTarget = (data: PostTargetParams) => {
    postTarget(data);
  };

  const handlePutTarget = (id: number, data: PutTargetParams) => {
    putTarget(id, data);
  };

  const renderTargets = () => {
    if (isGetTargets && targets?.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <Loading width={15} height={15} />
        </div>
      );
    }
    if (targets.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <div className="flex text-gray-400 text-sm font-medium mx-4 text-center">
            {'There are currently no active targets! \n 🎯'}
          </div>
        </div>
      );
    }
    return (
      <ul className="flex flex-col">
        {targets.map((item: Target, index: number) => (
          <TargetRow
            key={`target-${item?.name}-${item?.depId}`}
            target={item}
            index={index}
            onPostTarget={handlePostTarget}
            onPutTarget={handlePutTarget}
            isPostTarget={isPostTarget}
            isPutTarget={isPutTarget}
          />
        ))}
      </ul>
    );
  };

  const renderListTargets = () => {
    const overflow = isExpanded ? 'overflow-scroll hide-scrollbar' : 'overflow-hidden';
    return <ul className={classNames('flex mt-2 flex-col', overflow)}>{renderTargets()}</ul>;
  };

  const heightExpand = isExpanded ? 'max-h-[85vh]' : 'max-h-[450px]';
  return (
    <div className={classNames('flex flex-1 pt-12 w-[330px]', heightExpand)}>
      <div className="flex flex-col w-full bg-white pt-6 pb-2 max-h-106 drop-shadow-md overflow-auto">
        <div className="flex text-Gray-2 text-base font-semibold px-6">Monthly Targets</div>
        {renderListTargets()}
        {renderExpandedIcon()}
      </div>
    </div>
  );
};

export default TargetPanel;
