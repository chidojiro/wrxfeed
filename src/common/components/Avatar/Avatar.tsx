import { ClassName } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import { Tooltip } from '../Tooltip';

type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = ClassName & {
  src?: string;
  fullName: string;
  size?: AvatarSize;
  showTooltip?: boolean;
};

export const Avatar = ({ src, className, fullName, showTooltip, size = 'sm' }: AvatarProps) => {
  const renderAvatar = () => {
    return src ? (
      <img src={src} alt="" className="object-cover w-full h-full" />
    ) : (
      <div
        className={clsx(
          'bg-purple-5 text-white font-semibold w-full h-full flex items-center justify-center',
          { 'text-3xs': size === 'sm' },
        )}
      >
        {StringUtils.getNameInitials(fullName)}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('avatar'),
        'rounded-full overflow-hidden',
        className,
        { 'w-6 h-6': size === 'sm' },
        { 'w-8 h-8': size === 'md' },
        { 'w-10 h-10': size === 'lg' },
      )}
    >
      {showTooltip ? (
        <Tooltip
          arrowClassName="absolute left-1.5 -bottom-0.5"
          placement="top-start"
          trigger={renderAvatar()}
        >
          {fullName}
        </Tooltip>
      ) : (
        renderAvatar()
      )}
    </div>
  );
};
