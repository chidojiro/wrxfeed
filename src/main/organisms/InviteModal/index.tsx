import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useRecoilState } from 'recoil';
import { Stack, Typography } from '@mui/material';
import { Gray } from '@theme/colors';
import SearchBox from '@main/molecules/SearchBox';
import { Contact } from '@main/entity/contact.entity';
// import CommentBox from '@main/molecules/CommentBox';
import { GetContactsFilter } from '@api/types';
import { useGetContacts } from '@main/hooks/contact.hook';
import InviteContactItem from '@main/molecules/InviteContactItem';
import { showInviteModalState } from './states';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export type InviteModalProps = {
  style?: React.CSSProperties;
  open?: boolean;
};

const LIMIT = 20;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const InviteModal: React.FC<InviteModalProps> = ({ style, open = false }) => {
  const [isOpen, setIsOpen] = useRecoilState(showInviteModalState);
  const handleClose = () => setIsOpen(false);
  const [filterKeyword, setFilterKeyword] = useState('');

  const [filter, setFilter] = useState<GetContactsFilter>({
    text: '',
    pagination: INIT_PAGINATION,
  });
  const { contacts } = useGetContacts(filter);

  useEffect(() => {
    setFilter({
      text: filterKeyword,
      pagination: INIT_PAGINATION,
    });
  }, [filterKeyword]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <StyledModal
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      onBackdropClick={handleClose}
      style={style}
    >
      <Stack
        style={{
          display: 'flex',
          width: '620px',
          height: '630px',
          borderRadius: '24px',
          backgroundColor: 'white',
          borderWidth: '0px',
          outline: 'none',
        }}
      >
        <Stack paddingTop="44px" paddingX="40px" alignItems="center">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="24px">
            Invite collaborators
          </Typography>
          <Typography color={Gray[2]} marginTop="6px" fontSize="14px">
            Collaborators will get an email that gives them access to the workspace.
          </Typography>
        </Stack>
        <Stack flex={1} overflow="scroll">
          <Stack width="430px" height="56px" alignSelf="center" marginY="30px">
            <SearchBox
              onSubmit={() => undefined}
              onSearch={(text: string) => setFilterKeyword(text)}
            />
          </Stack>
          <Stack flex={1} alignItems="center" overflow="scroll">
            {contacts.map((contact: Contact, index: number) => (
              <React.Fragment key={contact?.email}>
                <InviteContactItem contact={contact} index={index} />
              </React.Fragment>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </StyledModal>
  );
};

export default InviteModal;
