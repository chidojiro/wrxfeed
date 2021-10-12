import { MentionData, MentionPluginTheme } from '@draft-js-plugins/mention';
import React, { MouseEventHandler } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ReactComponent as AvatarIcon } from '@assets/icons/outline/avatar.svg';
import { Gray, Highlight } from '@theme/colors';

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

const MentionEntry: React.VFC<EntryComponentProps> = (props) => {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <Box
      component="div"
      {...parentProps}
      sx={{
        padding: '0px',
        justifyContent: 'left',
        backgroundColor: isFocused ? Highlight : 'transparent',
        borderRadius: '0px',
      }}
    >
      <Stack direction="row" alignItems="center" paddingX="16px" paddingY="8px">
        <AvatarIcon fill={isFocused ? Gray[1] : Gray[3]} />
        <Typography fontSize="14px" marginLeft="8px" color={Gray[1]} fontWeight="600">
          {mention.name}
        </Typography>
      </Stack>
    </Box>
  );
};

export default MentionEntry;
