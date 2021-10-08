import React from 'react';
import { Contact } from '@main/entity';
import { Gray, Highlight } from '@theme/colors';
import { Stack, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useInvite } from '@main/hooks';
import { TickCircleIcon } from '@assets/index';

export interface InviteContactItemProps {
  contact: Contact;
  index?: number;
}

const InviteContactItem: React.VFC<InviteContactItemProps> = ({ contact }) => {
  const { isSent, postAddInvitation } = useInvite();

  // React.useEffect(() => {
  //   console.log('Check new isSent = ', isSent);
  // }, [isSent]);

  const onClickInvite = () => {
    if (!contact) {
      toast.error('Cannot sent this invite, please try it later!');
      return;
    }
    postAddInvitation(contact);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="32px"
      width="403px"
    >
      <Stack>
        <Typography color={Gray[2]} fontSize="14px" lineHeight="17px" fontWeight={600}>
          {contact?.name}
        </Typography>
        <Typography color={Gray[3]} fontSize="14px" lineHeight="20px">
          {contact?.email}
        </Typography>
      </Stack>
      <Button
        onClick={onClickInvite}
        style={{
          backgroundColor: isSent ? Gray[2] : Highlight,
          padding: '8px 20px 8px 20px',
          borderRadius: '100px',
          marginTop: '5px',
        }}
      >
        {!!isSent && <TickCircleIcon style={{ marginRight: '10px' }} />}
        <Typography
          color={isSent ? 'white' : Gray[1]}
          fontSize="14px"
          lineHeight="17px"
          fontWeight={600}
          style={{ textTransform: 'capitalize' }}
        >
          Send Invite
        </Typography>
      </Button>
    </Stack>
  );
};

export default InviteContactItem;
