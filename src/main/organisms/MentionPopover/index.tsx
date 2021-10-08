import React, { useEffect, useState } from 'react';
import { Stack, Typography, Button, Divider, PopoverProps } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Gray, Highlight, LightBG } from '@theme/colors';
import { ReactComponent as AvatarIcon } from '@assets/icons/outline/avatar.svg';
import { User } from '@main/entity/user.entity';
import { showInviteModalState } from '@main/organisms/InviteModal/states';
import { useSetRecoilState } from 'recoil';
import { InviteIcon } from '@assets/index';
import EventEmitter, { EventName } from '@main/EventEmitter';
import { useGetUsers } from '@main/hooks/users.hook';
import { GetUsersFilter } from '@api/types';

const MENTION_MODAL_MIN_WIDTH = 336;
const MENTION_MODAL_MAX_WIDTH = 300;

export interface MentionPopoverProps extends PopoverProps {
  onSelectUser?: (user: User) => void;
  inputElement: HTMLFormElement | null;
  onClose: () => void;
}

export type MentionSelect = {
  user: User;
  index: number;
};

const LIMIT = 20;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const MentionPopover: React.VFC<MentionPopoverProps> = ({
  onSelectUser,
  inputElement,
  onClose,
  ...rest
}) => {
  const [modalWidth, setModalWidth] = useState<string>(`${MENTION_MODAL_MIN_WIDTH}px`);
  const setInviteModal = useSetRecoilState(showInviteModalState);
  const [mentionSelect, setMentionSelect] = useState<MentionSelect>();
  const [filterKeyword, setFilterKeyword] = useState('');

  const [filter, setFilter] = useState<GetUsersFilter>({
    text: '',
    pagination: INIT_PAGINATION,
  });
  const { users } = useGetUsers(filter);

  useEffect(() => {
    setFilter({
      text: filterKeyword,
      pagination: INIT_PAGINATION,
    });
  }, [filterKeyword]);

  useEffect(() => {
    console.log('Check new users = ', users);
  }, [users]);

  useEffect(() => {
    if (
      !inputElement?.clientWidth ||
      inputElement?.clientWidth > MENTION_MODAL_MAX_WIDTH ||
      inputElement?.clientWidth < MENTION_MODAL_MIN_WIDTH
    ) {
      return;
    }
    const newWidth = `${inputElement.clientWidth}px`;
    setModalWidth(newWidth);
  }, [inputElement]);

  useEffect(() => {
    console.log('Check new users = ', users);
  }, [users]);

  const handleKeyDown = () => {
    console.log('Check handleKeyDown');
    if (!mentionSelect) {
      if (users.length > 0) {
        setMentionSelect({
          index: 0,
          user: users[0],
        });
      }
      return;
    }
    if (users.length > mentionSelect?.index + 1) {
      setMentionSelect({
        user: users[mentionSelect?.index + 1],
        index: mentionSelect?.index + 1,
      });
    }
  };

  const handleKeyUp = () => {
    console.log('Check handleKeyUp');
    if (!mentionSelect) {
      if (users.length > 0) {
        setMentionSelect({
          index: 0,
          user: users[0],
        });
      }
      return;
    }
    if (mentionSelect?.index > 0) {
      setMentionSelect({
        user: users[mentionSelect?.index - 1],
        index: mentionSelect?.index - 1,
      });
    }
  };

  useEffect(() => {
    EventEmitter.subscribe(EventName.ON_KEY_UP, handleKeyUp);
    return () => {
      EventEmitter.unsubscribe(EventName.ON_KEY_UP, handleKeyUp);
    };
  }, []);

  useEffect(() => {
    EventEmitter.subscribe(EventName.ON_KEY_DOWN, handleKeyDown);
    return () => {
      EventEmitter.unsubscribe(EventName.ON_KEY_DOWN, handleKeyDown);
    };
  }, []);

  // const handleClick = (event: MouseEvent) => {
  //   setMentionState(event.currentTarget);
  // };

  const handleClose = () => {
    onClose();
  };

  const onMouseOver = (user: User, index: number) => {
    setMentionSelect({
      user,
      index,
    });
  };

  const onClickInvite = () => {
    handleClose();
    setInviteModal(true);
  };

  // const renderReactMentions = () => {
  //   return (
  //     <MentionsInput value={null} onChange={() => {}}>
  //       <Mention
  //         trigger="@"
  //         data={[]}
  //         renderSuggestion={() => {
  //           return <div />;
  //         }}
  //       />
  //     </MentionsInput>
  //   );
  // };

  const onClickMentionRow = (user: User) => {
    EventEmitter.dispatch(EventName.SELECT_MENTION, user);
    if (onSelectUser) {
      onSelectUser(user);
    }
  };

  if (!inputElement) return null;

  const open = Boolean(inputElement?.element) || false;
  const id = open ? 'simple-popover' : undefined;
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Popover
        PaperProps={{
          sx: { backgroundColor: 'transparent' },
        }}
        id={id}
        disableAutoFocus
        disableEnforceFocus
        anchorEl={inputElement}
        onClose={onClose}
        anchorPosition={{
          top: 10,
          left: 10,
        }}
        elevation={0}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted={false}
        {...rest}
      >
        <Stack
          width={modalWidth}
          maxWidth="336p"
          height="300px"
          borderRadius="24px"
          bgcolor={LightBG}
          margin="5px"
          style={{
            filter:
              'drop-shadow(0px 3px 5px rgba(39, 50, 64, 0.2)) drop-shadow(0px 0px 1px rgba(39, 50, 64, 0.3))',
            border: '1px solid #273240',
          }}
        >
          <Stack height="36px" paddingX="16px" paddingY="8px" marginTop="8px">
            <Typography fontSize="14px" color={Gray[3]}>
              Suggested users
            </Typography>
          </Stack>
          <Stack height="108px" overflow="scroll">
            {users.map((item: User, index: number) => {
              const isSelect = item.id === mentionSelect?.user?.id;
              const bgColor = isSelect ? Highlight : 'transparent';
              const contentColor = isSelect ? Gray[1] : Gray[3];
              return (
                <Button
                  type="button"
                  key={item.id}
                  onMouseOver={() => onMouseOver(item, index)}
                  onClick={() => onClickMentionRow(item)}
                  style={{
                    padding: '0px',
                    justifyContent: 'left',
                    backgroundColor: bgColor,
                    borderRadius: '0px',
                  }}
                >
                  <Stack direction="row" alignItems="center" paddingX="16px" paddingY="8px">
                    <AvatarIcon fill={contentColor} />
                    <Typography
                      fontSize="14px"
                      marginLeft="8px"
                      color={Gray[1]}
                      fontWeight="600"
                      style={{ textTransform: 'lowercase' }}
                    >
                      {item?.email}
                    </Typography>
                  </Stack>
                </Button>
              );
            })}
          </Stack>
          <Divider style={{ marginTop: '8px' }} />
          <Stack paddingX="16px" paddingY="8px" marginTop="24px">
            <Typography
              fontSize="14px"
              lineHeight="17px"
              fontWeight="600"
              textAlign="center"
              style={{}}
            >
              Invite collaborators via email
            </Typography>
          </Stack>
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '8px 16px 8px 16px',
              width: '240px',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Gray[2],
              borderRadius: '4px',
            }}
            onClick={onClickInvite}
          >
            <InviteIcon style={{ marginRight: '4px' }} />
            <Typography fontSize="14px" lineHeight="17px" fontWeight="600" color="white">
              Invite
            </Typography>
          </Button>
        </Stack>
      </Popover>
    </div>
  );
};

export default MentionPopover;
