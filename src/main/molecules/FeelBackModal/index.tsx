import { Modal } from '@main/atoms';
import { Stack, Typography, Divider, Button } from '@mui/material';
import { Gray } from '@theme/colors';
import React from 'react';
import CommentBox from '@main/molecules/CommentBox';

interface FeelBackModalProps {
  style?: React.CSSProperties;
  open: boolean;
}

const FeelBackModal: React.VFC<FeelBackModalProps> = ({ style, open }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    setOpen(open);
  }, [open]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal open={isOpen} customStyle={style}>
      <Stack width="442px" height="488px" borderRadius="24px" bgcolor="white">
        <Stack paddingX="40px" flex={1}>
          <Typography fontSize="24px" color={Gray[1]} marginTop="44px" fontWeight="bold">
            {'We’re working on\n improvements!'}
          </Typography>
          <Typography marginTop="12px" color={Gray[1]} fontSize="14px" fontWeight="normal">
            The Wrxfeed team is always trying our best to improve our product and your feedback can
            help us do that.
          </Typography>
          <CommentBox
            placeholder="Your feedback here…"
            style={{ backgroundColor: 'white', marginTop: '32px' }}
            onSubmit={({ content }) => console.log({ content })}
            showAttach={false}
            showEmoji={false}
            showSend={false}
            enableMention={false}
          />
          <Typography marginTop="8px" marginLeft="auto" color={Gray[3]} fontSize="14px">
            max 200 characters
          </Typography>
        </Stack>
        <Divider />
        <Stack
          paddingX="24px"
          paddingY="16px"
          height="66px"
          justifyContent="flex-end"
          direction="row"
        >
          <Button variant="text" style={{ borderRadius: '4px' }} onClick={handleClose}>
            <Typography fontSize="14px" fontWeight={600} color={Gray[2]}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: Gray[3], borderRadius: '4px', marginLeft: '4px' }}
            onClick={handleClose}
          >
            <Typography fontSize="14px" fontWeight={600}>
              Submit
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default FeelBackModal;
