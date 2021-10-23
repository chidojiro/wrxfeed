import { Pagination, PostTargetParams, PutTargetParams, TargetFilter } from '@api/types';
import { BasicsDownSmall } from '@assets';
import Loading from '@common/atoms/Loading';
import { Department, Target } from '@main/entity';
import { useTarget } from '@main/hooks';
import { useDepartment } from '@main/hooks/department.hook';
import { TargetRow } from '@main/molecules';
import { classNames } from '@main/utils';
import React from 'react';

export interface TargetPanelProps {
  title?: string;
}

const GET_TARGETS_LIMIT = 10;
const GET_DEPARTMENT_LIMIT = 10;

const TargetPanel: React.VFC<TargetPanelProps> = () => {
  const [filter] = React.useState<TargetFilter>({
    offset: 0,
    limit: GET_TARGETS_LIMIT,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [pageDepartment] = React.useState<Pagination>({
    offset: 0,
    limit: GET_DEPARTMENT_LIMIT,
  });

  const [isExpanded, setExpanded] = React.useState<boolean>(false);
  const { targets, isGetTargets, postTarget, putTarget, isPostTarget, isPutTarget } =
    useTarget(filter);
  const { departments, isLoading: isLoadingInactive } = useDepartment(pageDepartment);
  const [inactiveTargets, setInactiveTargets] = React.useState<Target[]>([]);

  // React.useEffect(() => {
  //   console.log(`Check new active targets = ${JSON.stringify(targets)}`);
  // }, [targets]);

  React.useEffect(() => {
    const newInactive: Target[] = departments.map((item: Department) => {
      return {
        month: 0,
        year: 0,
        amount: 0,
        current: 0,
        department: item,
      };
    });
    setInactiveTargets(newInactive);
  }, [departments]);

  const handleClickExpand = () => {
    if (isLoadingInactive) return;
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

  const renderInactiveTargets = () => {
    if (isLoadingInactive) {
      if (!isGetTargets) {
        return (
          <div className="flex h-32 w-full justify-center items-center">
            <Loading width={15} height={15} />
          </div>
        );
      }
      return null;
    }
    return (
      <div>
        {inactiveTargets.map((item: Target, index: number) => (
          <TargetRow
            key={`renderTargetRow-${item.department.name}`}
            target={item}
            index={index}
            isActive={false}
            onPostTarget={handlePostTarget}
            onPutTarget={handlePutTarget}
            isPostTarget={isPostTarget}
            isPutTarget={isPutTarget}
          />
        ))}
      </div>
    );
  };

  const renderActiveTargets = () => {
    if (isGetTargets) {
      return (
        <div className="flex w-full justify-center items-center">
          <Loading width={15} height={15} />
        </div>
      );
    }
    // if (targets.length === 0) {
    //   return (
    //     <div className="flex h-32 w-full justify-center items-center">
    //       <div className="flex text-gray-400 text-sm font-medium mx-4 text-center">
    //         {'There are currently no active targets! \n 🎯'}
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div className="flex flex-col">
        {targets.map((item: Target, index: number) => (
          <TargetRow
            key={`renderTargetRow-${item.department.name}`}
            target={item}
            index={index}
            isActive
            onPostTarget={handlePostTarget}
            onPutTarget={handlePutTarget}
            isPostTarget={isPostTarget}
            isPutTarget={isPutTarget}
          />
        ))}
      </div>
    );
  };

  const renderListTargets = () => {
    return (
      <div className="flex mt-2 flex-col overflow-y-scroll">
        {renderActiveTargets()}
        {renderInactiveTargets()}
      </div>
    );
  };

  // min-h-[80vh]
  // max-h-[80vh]
  const heightExpand = isExpanded ? 'max-h-[80vh]' : 'max-h-[40vh]';
  return (
    <div className={classNames('flex flex-1 pt-12', heightExpand)} style={{ width: '330px' }}>
      <div className="flex flex-col w-72 bg-white pt-6 pb-2 max-h-106 drop-shadow-md">
        <div className="flex text-Gray-2 text-lg font-semibold px-6">Monthly Targets</div>
        {renderListTargets()}
        {renderExpandedIcon()}
      </div>
    </div>
  );
};

export default TargetPanel;
