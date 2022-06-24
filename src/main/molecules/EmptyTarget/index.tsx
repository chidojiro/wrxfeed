/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { classNames } from '@/common/utils';

interface EmptyTargetProps {
  className?: string;
  onClickNewTarget: () => void;
}

const EmptyTarget: React.VFC<EmptyTargetProps> = ({ className, onClickNewTarget }) => {
  return (
    <div
      className={classNames(
        'flex flex-1 flex-col justify-center items-center w-full bg-purple-12 px-6 py-6',
        className ?? '',
      )}
    >
      <button type="button" onClick={onClickNewTarget}>
        <p className="text-Gray-6 text-xs text-center">
          Thats all of the teams targets 🎯
          <br />
          <span className="text-Gray-3 underline">create a new target</span>
        </p>
      </button>
    </div>
  );
};

export default EmptyTarget;
