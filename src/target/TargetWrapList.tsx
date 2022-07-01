import React from 'react';
import { TargetWrapListItem } from './TargetWrapListItem';
import { Target } from './types';

export type TargetWrapListProps = {
  targets: Target[];
  onEditClick?: (target: Target) => void;
  onDeleteSuccess?: (id: number) => void;
};

export const TargetWrapList: React.VFC<TargetWrapListProps> = ({
  targets = [],
  onEditClick,
  onDeleteSuccess,
}) => {
  return (
    <>
      {targets.map((item: Target) => {
        return (
          <TargetWrapListItem
            key={item.id}
            data={item}
            onEditClick={onEditClick}
            onDeleteSuccess={onDeleteSuccess}
          />
        );
      })}
    </>
  );
};
