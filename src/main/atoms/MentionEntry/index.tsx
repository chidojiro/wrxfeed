import { MentionData, MentionPluginTheme } from '@draft-js-plugins/mention';
import React, { MouseEventHandler } from 'react';
import { ReactComponent as AvatarIcon } from '@/assets/icons/outline/avatar.svg';
import clsx from 'clsx';
import { TeamIcon } from '@/assets';

export interface EntryComponentProps {
  className?: string;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onMouseUp: MouseEventHandler<HTMLDivElement>;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  role: string;
  id: string;
  'aria-selected'?: boolean | 'false' | 'true';
  theme?: MentionPluginTheme;
  mention: MentionData;
  isFocused: boolean;
  searchValue?: string;
}

const MentionEntry: React.FC<EntryComponentProps> = (props) => {
  const { mention, theme, isFocused, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className={theme?.mentionSuggestionsEntry}>
        {mention.type === 'DEPARTMENT' ? (
          <TeamIcon
            width={15}
            height={15}
            className={clsx(
              isFocused ? 'text-white opacity-100' : 'text-Gray-6 opacity-50',
              'fill-current path-no-filled',
            )}
          />
        ) : (
          <AvatarIcon
            width={15}
            height={15}
            viewBox="2 2 16 16"
            className={clsx(
              isFocused ? 'text-white opacity-100' : 'text-Gray-6 opacity-50',
              'fill-current path-no-filled',
            )}
          />
        )}

        <p
          className={
            isFocused
              ? theme?.mentionSuggestionsEntryTextFocused
              : theme?.mentionSuggestionsEntryText
          }
        >
          {mention.name}
        </p>
      </div>
    </div>
  );
};

export default MentionEntry;
