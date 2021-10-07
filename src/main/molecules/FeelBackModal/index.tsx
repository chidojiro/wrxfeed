import { Modal } from '@main/atoms';
import { Stack, Typography, Divider, Button } from '@mui/material';
import { Gray, Accent } from '@theme/colors';
import React from 'react';
import CommentBox from '@main/molecules/CommentBox';
import { useFormControl } from '@mui/material/FormControl';

interface FeelBackModalProps {
  style?: React.CSSProperties;
  open: boolean;
  onClose: () => void;
}

const FeelBackModal: React.VFC<FeelBackModalProps> = ({ style, open, onClose }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const { filled } = useFormControl() || {};
  React.useEffect(() => {
    setOpen(open);
  }, [open]);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  return (
    <Modal open={isOpen} customStyle={style} onClose={handleClose}>
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
            rows={6}
            alwaysFocus
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
            style={{
              backgroundColor: filled ? Accent[2] : Gray[3],
              borderRadius: '4px',
              marginLeft: '4px',
            }}
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
