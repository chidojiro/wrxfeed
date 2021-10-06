import React, { ElementType } from 'react';
import Box from '@mui/material/Box';
import Modal, { ModalProps } from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';

import { SxProps, styled } from '@mui/system';
import { ReactComponent as CloseIcon } from '@assets/icons/outline/close.svg';
import { Accent, Gray, Neutral } from '@theme/colors';

interface ConfirmModalProps extends ModalProps {
  icon?: ElementType;
  title: string;
  cancelLabel?: string;
  okLabel?: string;
  onCancel?: () => void;
  onOk?: () => void;
}

const style: SxProps = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: '3px',
  boxShadow: 24,
  padding: '20px 16px',
};

const DotDivider = styled(Box)`
  width: 3px;
  height: 3px;
  flex-grow: 0;
  border-radius: 1.5px;
  background-color: ${Neutral.Light};
`;

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  children,
  open,
  icon,
  title,
  cancelLabel,
  okLabel,
  onCancel,
  onOk,
  ...rest
}) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted={false}
      {...rest}
    >
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          {icon && <SvgIcon sx={{ width: 24, height: 24 }} component={icon} />}
          <Typography
            id="modal-modal-title"
            variant="h5"
            fontWeight={600}
            component="h5"
            flexGrow={1}
            color={Gray[2]}
          >
            {title}
          </Typography>
          <CloseIcon onClick={onCancel} />
        </Stack>
        <Stack pl={5} pr={5} pt={0.5} spacing={1.5}>
          {children}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              sx={{ cursor: 'pointer' }}
              variant="h5"
              fontWeight={600}
              component="a"
              color={Gray[3]}
              onClick={onCancel}
            >
              {cancelLabel}
            </Typography>
            <DotDivider />
            <Typography
              sx={{ cursor: 'pointer' }}
              variant="h5"
              fontWeight={600}
              component="a"
              color={Accent[1]}
              onClick={onOk}
            >
              {okLabel}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  icon: undefined,
  cancelLabel: 'Cancel',
  okLabel: 'OK',
  onCancel: () => undefined,
  onOk: () => undefined,
};

export default React.memo(ConfirmModal);
