import { EyeHideIcon } from '@/assets';
import { classNames, distanceToNow } from '@/common/utils';
import EditorAvatar from '@/main/atoms/EditorAvatar';
import TargetFeedName from '@/main/atoms/TargetFeedName';
import { Target } from '@/target/types';
import React from 'react';

export interface TargetFeedTitleProps {
  className?: string;
  isHidden?: boolean;
  target: Target;
  lastInteraction: string;
}

const TargetFeedTitle: React.VFC<TargetFeedTitleProps> = ({
  className = '',
  isHidden = false,
  target,
  lastInteraction,
}) => {
  const gradientBg = 'linear-gradient(125.45deg, #CA77B3 18.62%, #514EE7 74.47%)';

  return (
    <div className={classNames('flex flex-col', className)}>
      <div
        className="h-4 w-full rounded-t-card"
        style={{
          background: gradientBg,
        }}
      />
      <div
        className={classNames(
          isHidden ? 'bg-purple-8' : 'bg-white',
          'flex-col space-y-2 px-8 py-6',
        )}
      >
        <div className="flex flex-row items-center space-x-2">
          <div className="flex items-center min-w-0 flex-1">
            <TargetFeedName target={target} />
            {isHidden && (
              <div className="flex flex-row items-center bg-Gray-3-50 py-0.5 px-2 ml-2 rounded-full">
                <EyeHideIcon
                  viewBox="-2 -2 19 19"
                  className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert mr-1"
                />
                <span className="text-xs font-medium text-white px-1">Hidden</span>
              </div>
            )}
          </div>
          {/* <div className="flex-row space-x-2 self-center flex items-center">
            <h2 id={`question-title-${curFeed?.id}`} className="text-xs text-Gray-6">
              {curFeed?.month && dayjs().format('MMMM YYYY')}
            </h2>
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-Gray-12 flex justify-center items-center"
            >
              <CalendarMinus className="w-3 h-3" width={12} height={12} />
            </button>
          </div> */}
        </div>
        <div className="flex flex-row space-x-2 items-center h-6">
          <EditorAvatar updater={target?.updatedBy} />
          <h2 id={`question-title-${target?.id}`} className="mt-1 text-xs font-normal text-Gray-6">
            {`edited ${distanceToNow(lastInteraction)}`}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TargetFeedTitle;
