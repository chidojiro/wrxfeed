import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useDebounce } from '@common/hooks';
import { useSearch } from '@main/hooks/search.hook';

import { classNames, formatToCurrency } from '@common/utils';
import { getIconByResultType, getPropTypeDisplayName } from '@main/utils';
import { SearchResult } from '@main/types';
import { Target } from '@main/entity';

import Modal from '@common/atoms/Modal';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { ReactComponent as ArrowRight } from '@assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as CarbonTrashCan } from '@assets/icons/outline/carbon-trash-can.svg';
import Loading from '@common/atoms/Loading';

const DEBOUNCE_WAIT = 500;

export type AddTargetModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onCreate: (amountInput: number, tags: SearchResult[]) => void;
  onSave: (targetId: number, amountInput: number, tags: SearchResult[]) => void;
  onDelete: (targetId: number, amountInput: number, tags: SearchResult[]) => void;
  itemEditing: Target | null;
  isLoading: boolean;
};

type AddTargetTagInputHandler = React.ElementRef<typeof AddTargetTagInput>;

const AddTargetModal: React.FC<AddTargetModalProps> = ({
  open = false,
  onClose,
  onCancel,
  onCreate,
  onDelete,
  itemEditing,
}) => {
  const tagInputRef = useRef<AddTargetTagInputHandler>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const isEdit = itemEditing !== null;

  const { results, isLoading, onClear } = useSearch(keyword);

  const onSearchContact = useCallback(
    (value: string) => {
      setKeyword(value);
    },
    [setKeyword],
  );
  const debounceSearchRequest = useDebounce(onSearchContact, DEBOUNCE_WAIT, [onSearchContact]);

  const onCloseModal = () => {
    if (typeof onClose === 'function') onClose();
    onClear();
    setKeyword('');
  };
  const onClickDelete = () => {
    if (!itemEditing) return;
    const tags = tagInputRef.current?.getItems() || [];
    onDelete(itemEditing?.id, parseInt(amount, 10), tags);
  };
  const onClickCancel = () => {
    onCancel();
    onClear();
    setKeyword('');
  };
  const onClickCreateOrSave = () => {
    const tags = tagInputRef.current?.getItems() || [];
    if (tags.length === 0) {
      toast.warning('Can not create new target without any property!');
      return;
    }
    const amountInt = parseInt(amount, 10);
    if (!amountInt || amountInt < 1) {
      toast.warning('Invalid amount!');
      return;
    }
    onCreate(amountInt, tags);
    onClear();
    setKeyword('');
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatToCurrency(event.target.value, ''));
  };

  const renderResultProperty = (result: SearchResult) => {
    const IconByType = getIconByResultType(result?.type);
    return (
      <button
        onClick={() => tagInputRef.current?.addItem(result)}
        key={result?.id}
        type="button"
        className="hover:bg-Gray-12 px-12 py-2.5 flex flex-row items-center text-xs group"
      >
        <IconByType className="w-5 h-5 object-scale-down" style={{ width: 20, height: 20 }} />
        <p className="text-Gray-1 ml-8">{result?.title}</p>
        <p className="text-Gray-6 ml-2 invisible group-hover:visible">
          {`- ${getPropTypeDisplayName(result?.type)}`}
        </p>
      </button>
    );
  };

  const amountInputWidth = amount?.length > 9 ? 'w-36' : 'w-20';
  const buttonTitleCreateOrSave = itemEditing === null ? 'Create' : 'Save';

  const renderIconNextOrLoading = () => {
    if (isLoading) return <Loading width={12} height={12} color="white" className="w-4 h-4 ml-2" />;
    return (
      <ArrowRight className="w-4 h-4 ml-2 fill-current path-no-filled stroke-current path-no-stroke object-fill text-white" />
    );
  };

  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className="flex flex-col w-[523px] outline-none">
        <div className="flex flex-col px-12 pt-8 pb-5">
          <h3 className="text-base text-primary font-semibold">Monthly Target</h3>
          <p className="text-xs text-Gray-6 mt-2">Monitor spend and track performance.</p>
        </div>
        <hr className="divider divider-horizontal w-full" />
        <div className="flex flex-col pt-10 pb-6">
          <div className="px-12">
            <p className="text-primary text-xs mb-2 font-semibold">Add Properties</p>
            <AddTargetTagInput
              ref={tagInputRef}
              placeholder="Enter a team, category, or vendor"
              onTextChange={debounceSearchRequest}
              loading={isLoading}
              maxTag={40}
            />
          </div>
          <div className="flex flex-col mt-2 w-full max-h-[300px] overflow-scroll hide-scrollbar">
            {results?.map(renderResultProperty)}
          </div>
          <div className="px-12 w-full mt-6">
            <p className="text-primary text-xs mb-2 font-semibold">Target Amount</p>
            <div className="flex flex-row justify-end">
              <div className="flex flex-row items-center px-1 py-2 border-b border-Gray-11">
                <p className="text-Gray-3 text-base mr-2.5">$</p>
                <input
                  className={classNames(
                    'text-Gray-1 placeholder-Gray-6 outline-none border-none text-base',
                    amountInputWidth,
                  )}
                  placeholder="10,000"
                  onChange={onChangeInput}
                  value={amount}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="divider divider-horizontal w-full" />
        <div className="flex flex-row w-full px-12 py-4">
          {isEdit && (
            <button
              type="button"
              onClick={onClickDelete}
              className="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-Gray-12 space-x-2"
            >
              <CarbonTrashCan width={16} height={16} className="w-4 h-4" />
              <p className="text-Gray-6 text-xs font-semibold">Delete</p>
            </button>
          )}
          <button
            type="button"
            onClick={onClickCancel}
            className="flex px-4 py-2 rounded-sm hover:bg-Gray-12 mr-3 ml-auto"
          >
            <p className="text-Gray-6 text-xs font-semibold">Cancel</p>
          </button>
          <button
            type="button"
            onClick={onClickCreateOrSave}
            className="flex flex-row items-center px-4 py-2 rounded-sm bg-Gray-6 hover:bg-primary"
          >
            <p className="text-white text-xs font-semibold">{buttonTitleCreateOrSave}</p>
            {renderIconNextOrLoading()}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTargetModal;
