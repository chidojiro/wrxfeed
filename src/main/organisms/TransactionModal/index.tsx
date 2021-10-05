import React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useRecoilState } from 'recoil';
import { Stack } from '@mui/material';
import TransactionItem from '@main/molecules/TransactionItem';
import { showTransactionModalState } from './states';

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

export type TransactionModalProps = {
  style?: React.CSSProperties;
};

const TransactionModal: React.FC<TransactionModalProps> = ({ style }) => {
  const [transactionState, setTransactionModalState] = useRecoilState(showTransactionModalState);
  const handleClose = () => setTransactionModalState({ transaction: null });
  const { transaction } = transactionState;
  // React.useEffect(() => {
  //   console.log(`Check new transactionState = ${JSON.stringify(transactionState)}`);
  // }, [transactionState]);

  // if (!transactionState.transaction) return null;

  return (
    <StyledModal
      open={transaction !== null}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      onBackdropClick={handleClose}
      style={style}
    >
      <Stack
        style={{
          display: 'flex',
          borderRadius: '24px',
          backgroundColor: 'white',
          borderWidth: '0px',
          outline: 'none',
        }}
        maxWidth="884px"
        maxHeight="620px"
        minWidth="375px"
        minHeight="300px"
        padding="24px"
        overflow="scroll"
      >
        {!!transaction && <TransactionItem transaction={transaction} />}
      </Stack>
    </StyledModal>
  );
};

export default TransactionModal;
