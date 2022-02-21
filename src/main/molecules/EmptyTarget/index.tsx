/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/quotes */
import React from 'react';
import { classNames } from '@common/utils';

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
          {`That's all for this team 🎯`}
          <br />
          <span className="text-Gray-3 underline">Create a new target</span>
        </p>
      </button>
    </div>
  );
};

export default EmptyTarget;
