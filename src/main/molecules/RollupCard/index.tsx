import React, { useRef, useState } from 'react';
import { Category, Department, Rollup, Vendor, Visibility } from '@main/entity';
import { useMention } from '@main/hooks';
import { GetUploadTokenBody, UploadTypes } from '@api/types';
import { classNames, formatCurrency, formatDate } from '@common/utils';
// Tailwind components
import { Menu } from '@headlessui/react';
import DepartmentColorSection from '@main/atoms/DepartmentColorSection';
import NotifyBanner from '@common/molecules/NotifyBanner';
import CommentBox from '@main/molecules/CommentBox';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import FeedBackModal from '@main/organisms/FeelBackModal';
import AttachmentModal from '@main/organisms/CommentAttachmentModal';
import ConfirmModal from '@main/atoms/ConfirmModal';
// Icons
import { ReactComponent as ExclamationCircle } from '@assets/icons/solid/exclamation-circle.svg';
import { ReactComponent as MoreVerticalIcon } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as EyeHideIcon } from '@assets/icons/outline/eye-hide.svg';
import { usePermission } from '@identity/hooks';
import { ProtectedFeatures } from '@identity/constants';
import RollupTransactions from '../RollupTransactions';

export interface RollupCardProps {
  rollup: Rollup;
  onClickDepartment?: (department?: Department) => void;
  onClickVendor?: (vendor?: Vendor) => void;
  onClickCategory?: (category?: Category) => void;
  onClickRootDept?: (rootDept?: Department) => void;
  updateCategory?: (category: Partial<Category>) => Promise<void>;
}

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmAction: () => void;
  confirmLabel: string;
}

const RollupCard: React.VFC<RollupCardProps> = ({
  rollup,
  onClickDepartment,
  onClickCategory,
  onClickRootDept,
  updateCategory,
}) => {
  // Recoil states
  const transaction = rollup.transactions?.length ? rollup.transactions[0] : undefined;
  // Refs
  const containerRef = useRef<HTMLLIElement>(null);
  // Local states
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);
  const [attachFileComment, setAttachFileComment] = useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = useState<GetUploadTokenBody>();
  // Data hooks
  const { mentions } = useMention();
  const { checkPermission } = usePermission();
  // Variables
  const isHidden = transaction?.category.visibility === Visibility.HIDDEN;
  const hideCategoryPermission = checkPermission(ProtectedFeatures.HideCategory);
  const [isLoadMore, setLoadMore] = useState(false);

  const handleHideCategory = async () => {
    setConfirmModal(undefined);
    if (updateCategory) {
      await updateCategory({ id: transaction?.category.id, visibility: Visibility.HIDDEN });
    }
    NotifyBanner.info('You have hidden this transaction');
  };

  const openHideCategoryConfirmation = () => {
    setConfirmModal({
      title: 'Hide this from the entire company?',
      description:
        'Only you will be able to see this category. Other teammates will not be able to see this.',
      confirmAction: handleHideCategory,
      confirmLabel: 'Hide',
    });
  };

  const handleShowCategory = async () => {
    setConfirmModal(undefined);
    if (updateCategory) {
      await updateCategory({ id: transaction?.category.id, visibility: Visibility.VISIBLE });
    }
    NotifyBanner.info('You have unhidden this transaction');
  };

  const openShowCategoryConfirmation = () => {
    setConfirmModal({
      title: 'Unhide this category?',
      description: 'This will unhide the category and it will be visible to the entire company.',
      confirmAction: handleShowCategory,
      confirmLabel: 'Unhide',
    });
  };

  const handleShareFeedback = () => {
    openFeedbackModal(true);
  };

  const handleAttachFile = (file: File) => {
    setUploadFileOptions({
      filename: `${transaction?.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: UploadTypes.Attachments,
    });
    setAttachFileComment(file);
  };

  const renderMenuItems = () => {
    const items = [];
    if (hideCategoryPermission) {
      items.push(
        isHidden ? (
          <PopoverMenuItem
            key="show-category"
            value="show-category"
            label="Show Category"
            onClick={openShowCategoryConfirmation}
          />
        ) : (
          <PopoverMenuItem
            key="hide-category"
            value="hide-category"
            label="Hide Category"
            onClick={openHideCategoryConfirmation}
          />
        ),
      );
    }
    items.push(
      <PopoverMenuItem
        key="share-feedback"
        value="share-feedback"
        label="Share Feedback"
        onClick={handleShareFeedback}
      />,
    );
    return items;
  };

  const onLoadMoreTransaction = () => {
    setLoadMore(true);
    setTimeout(() => {
      // call API
      setLoadMore(false);
    }, 3000);
  };

  return (
    <>
      <article
        ref={containerRef}
        key={rollup.id}
        className="bg-white flex flex-col filter shadow-md"
        aria-labelledby={`rollup-title-${rollup.id}`}
      >
        {/* Rollup detail */}
        <div className="flex flex-row">
          <DepartmentColorSection department={rollup.department.parent} onClick={onClickRootDept} />
          <div
            className={classNames(
              isHidden ? 'bg-purple-8' : 'bg-white',
              'flex-grow w-4/5 px-6 py-5 border-b border-Gray-11',
            )}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center min-w-0 flex-1">
                <p className="text-xs text-Gray-6">
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={() => {
                      return onClickDepartment && onClickDepartment(rollup.department);
                    }}
                  >
                    {rollup.department.name}
                  </button>
                </p>
                {isHidden && (
                  <>
                    <EyeHideIcon
                      viewBox="-2 -2 19 19"
                      className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert ml-3 mr-1"
                    />
                    <span className="text-xs text-Gray-6">Hidden</span>
                  </>
                )}
              </div>
              <div className="flex-shrink-0 self-center flex items-center">
                <h2
                  id={`question-title-${rollup.id}`}
                  className="text-base font-semibold text-Gray-2 mr-3"
                >
                  {`$ ${formatCurrency(rollup.amount)}`}
                </h2>
                <Menu as="div" className="relative inline-block z-10 text-left">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <MoreVerticalIcon aria-hidden="true" viewBox="0 0 15 15" />
                    </Menu.Button>
                  </div>
                  <PopoverMenu>{renderMenuItems()}</PopoverMenu>
                </Menu>
              </div>
            </div>
            <h2
              aria-hidden="true"
              id={`question-title-${rollup.id}`}
              className="mt-1 text-base font-semibold text-Gray-2 cursor-pointer hover:underline"
              onClick={() => onClickCategory && onClickCategory(rollup.category)}
            >
              {rollup.category.name}
            </h2>
            <p className="mt-1 text-xs text-Gray-6">
              <time dateTime={rollup.startTime}>{formatDate(rollup.startTime)}</time>
              {' • '}
              <time dateTime={rollup.endTime}>
                {rollup.endTime ? formatDate(rollup.endTime) : 'Present'}
              </time>
            </p>
          </div>
        </div>
        {/* Zeplin design: rollupsClass="bg-Gray-18" */}
        <RollupTransactions
          transactions={rollup.transactions}
          rollupsClass="bg-white"
          className="mb-1 sm:mb-2.5"
          hasMore
          onLoadMore={onLoadMoreTransaction}
          isLoadMore={isLoadMore}
        />
        <div className="px-4 sm:px-6 lg:px-12 py-1.5 mb-2 sm:mb-4 mt-1 sm:mt-2">
          {/* Transaction list */}
          {/* Comment section */}
          <CommentBox
            id={rollup.id.toString()}
            className="bg-white"
            onAttachFile={handleAttachFile}
            mentionData={mentions}
          />
        </div>
      </article>

      <ConfirmModal
        open={!!confirmModal}
        icon={<ExclamationCircle />}
        title={confirmModal?.title || ''}
        okLabel={confirmModal?.confirmLabel}
        onClose={() => setConfirmModal(undefined)}
        onOk={confirmModal?.confirmAction}
      >
        <p id="modal-modal-description" className="text-Gray-6 text-sm">
          {confirmModal?.description}
        </p>
      </ConfirmModal>
      <FeedBackModal
        open={isOpenFeedbackModal}
        onClose={() => openFeedbackModal(false)}
        transactionId={rollup.id}
      />
      <AttachmentModal
        transaction={transaction}
        open={!!attachFileComment}
        file={attachFileComment}
        mentionData={mentions}
        uploadOptions={uploadFileOptions}
        onClose={() => setAttachFileComment(null)}
        onFileUploaded={() => undefined}
      />
    </>
  );
};

export default React.memo(RollupCard);
