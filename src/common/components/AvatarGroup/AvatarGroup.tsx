import { ClassName } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import { Avatar, AvatarProps } from '../Avatar/Avatar';

export type AvatarGroupProps = ClassName & {
  items: AvatarProps[];
  trailingComponent?: React.ReactNode;
};

export const AvatarGroup = ({ items, trailingComponent }: AvatarGroupProps) => {
  return (
    <div className={clsx(StringUtils.withProjectClassNamePrefix('avatar-group'), 'relative h-7')}>
      {items.map((item, index) => (
        <Avatar
          className={clsx(`absolute left-0 border-2 border-white h-7 w-7`, {
            'z-10 ml-3': index === 1,
            'z-20 ml-6': index === 2,
            'z-30 ml-9': index === 3,
          })}
          key={item.fullName ?? item.src ?? index}
          src={item.src as string}
          fullName={item.fullName as string}
        />
      ))}
      {!!trailingComponent && (
        <div
          className={clsx('z-50 absolute', {
            'left-9 xl:right-6': items.length === 3,
            'left-6 xl:right-9': items.length === 2,
            'left-3 xl:right-12': items.length === 1,
          })}
        >
          {trailingComponent}
        </div>
      )}
    </div>
  );
};
