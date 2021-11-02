/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
// import { useQuery } from '@common/hooks';
import { useHistory, useParams } from 'react-router-dom';
import TransactionCard from '@main/molecules/TransactionCard';
import { Transaction } from '@main/entity';
import { useApi } from '@api';
import { isBadRequest } from '@error/utils';
import { useErrorHandler } from 'react-error-boundary';
import { toast } from 'react-toastify';
import Loading from '@common/atoms/Loading';

const FeedPage: React.VFC = () => {
  const history = useHistory();
  const ApiClient = useApi();
  const { id: transactionId } = useParams<{ id: string }>();
  const [transSelect, setTransSelect] = React.useState<Transaction | undefined>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const errorHandler = useErrorHandler();

  const getTrans = async (id: number) => {
    try {
      setLoading(true);
      const trans = await ApiClient.getTransactionById(id);
      setTransSelect(trans);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get this transaction 🤦!');
      } else {
        errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getTrans(parseInt(transactionId, 10));
  }, [transactionId]);

  const onClickGoBack = (): void => {
    history.goBack();
  };

  const renderFeed = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 w-full h-[300px] justify-center items-center">
          <Loading width={60} height={60} />
        </div>
      );
    }

    if (!transSelect) {
      return (
        <div className="flex flex-1 w-full h-[300px] justify-center items-center px-16">
          <span className="flex text-2xl text-Gray-1 font-semibold text-center">
            An error occurred loading this item 😞
            <br />
            please try again later!
          </span>
        </div>
      );
    }

    return (
      <div className="w-full h-full overflow-scroll">
        <ul>
          <TransactionCard transaction={transSelect} />
        </ul>
      </div>
    );
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Transaction</h1>
      <div className="flex items-center space-x-4 pb-8">
        <ChevronLeftIcon onClick={onClickGoBack} />
        <h1 className="text-Gray-1 text-xl font-bold">Company</h1>
      </div>
      {renderFeed()}
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default FeedPage;
