import React from 'react';
import { useRecoilState } from 'recoil';
import TransactionCard from '@main/molecules/TransactionCard';
import Modal from '@common/atoms/Modal';
import { classNames } from '@common/utils';
import { showTransactionModalState } from './states';

export type TransactionModalProps = {
  className?: string;
};

const TransactionModal: React.FC<TransactionModalProps> = ({ className }) => {
  const [transactionState, setTransactionModalState] = useRecoilState(showTransactionModalState);
  const handleClose = () => setTransactionModalState({ transaction: null });
  const { transaction } = transactionState;
  // React.useEffect(() => {
  //   console.log(`Check new transactionState = ${JSON.stringify(transactionState)}`);
  // }, [transactionState]);

  // if (!transactionState.transaction) return null;

  return (
    <Modal open={transaction !== null} onClose={handleClose}>
      <div
        className={classNames(
          'flex bg-white max-w-4xl max-h-[40rem] min-w-[30rem] min-h-[15rem] p-6',
          className ?? '',
        )}
      >
        {!!transaction && <TransactionCard transaction={transaction} />}
      </div>
    </Modal>
  );
};

export default TransactionModal;
