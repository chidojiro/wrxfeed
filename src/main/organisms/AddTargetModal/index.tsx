import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@common/hooks';
import { useSearch } from '@main/hooks/search.hook';

import { classNames, formatCurrency, replaceAll } from '@common/utils';
import { getIconByResultType, getPropTypeDisplayName, getUniqueListBy } from '@main/utils';

import { SearchResult } from '@main/types';
import { PostTargetParams, PutTargetParams, TargetProp } from '@api/types';
import { Target } from '@main/entity';

import Modal from '@common/atoms/Modal';
import Loading from '@common/atoms/Loading';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { ReactComponent as ArrowRight } from '@assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as CarbonTrashCan } from '@assets/icons/outline/carbon-trash-can.svg';
import { AlertRed } from '@assets';

const DEBOUNCE_WAIT = 0;

export type AddTargetModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  deleteTarget: (id: number) => void;
  postTarget: (data: PostTargetParams) => void;
  putTarget: (id: number, data: PutTargetParams) => void;
  itemEditing: Target | null;
  isCreatingOrSaving: boolean;
  isDeleting: boolean;
  initTags?: SearchResult[];
  depId?: number | undefined;
};

type AddTargetTagInputHandler = React.ElementRef<typeof AddTargetTagInput>;

const AddTargetModal: React.FC<AddTargetModalProps> = ({
  open = false,
  onClose,
  onCancel,
  deleteTarget,
  putTarget,
  postTarget,
  itemEditing,
  isCreatingOrSaving,
  isDeleting,
  initTags = [],
  depId,
}) => {
  const tagInputRef = useRef<AddTargetTagInputHandler>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [targetName, setTargetName] = useState<string>('');
  const [showErrorProperty, setShowErrorProperty] = useState<boolean>(false);
  const [showErrorName, setShowErrorName] = useState<boolean>(false);

  const isEdit = itemEditing !== null;
  const [defaultTags, setDefaultTags] = useState<SearchResult[]>([]);
  const [enableCreate, setEnableCreate] = useState<boolean>(false);

  const { results, isLoading: isSearching, onClear } = useSearch({ keyword });

  const onCreateTarget = (amountInput: number | null, tags: SearchResult[], name: string) => {
    const props: TargetProp[] = tags.map((tag: SearchResult) => {
      return {
        id: tag?.directoryId,
        type: tag?.type,
        name: tag?.title ?? '',
      };
    });
    postTarget({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      amount: amountInput,
      dep: depId,
      props,
      title: name,
    });
  };
  const onDeleteTarget = (targetId: number) => {
    deleteTarget(targetId);
  };
  const onSaveTarget = (
    targetId: number,
    amountInput: number,
    tags: SearchResult[],
    name: string,
  ) => {
    const props: TargetProp[] = tags.map((tag: SearchResult) => {
      return {
        id: tag?.directoryId,
        type: tag?.type,
        name: tag?.title ?? '',
      };
    });
    putTarget(targetId, {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      amount: amountInput,
      dep: depId,
      props,
      title: name,
    });
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!open) {
      timeout = setTimeout(() => {
        onClear();
        setKeyword('');
        setAmount('');
        setTargetName('');
        setDefaultTags([]);
      }, 400);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [onClear, open]);

  useEffect(() => {
    if (itemEditing && itemEditing?.props.length > 0) {
      const defaultTagsTemp = itemEditing?.props.map((prop: TargetProp) => {
        return {
          id: `${prop?.type.toUpperCase()}-${prop?.id}`,
          title: prop?.name,
          type: prop?.type,
          directoryId: prop?.id,
        };
      });
      setDefaultTags(defaultTagsTemp);
    }
    setAmount(formatCurrency(itemEditing?.amount?.toString() || '', '0,0', '0'));
    setTargetName(itemEditing?.title ?? '');
  }, [itemEditing]);

  const onSearchContact = useCallback(
    (value: string) => {
      setKeyword(value);
      setShowErrorProperty(false);
    },
    [setKeyword],
  );
  const debounceSearchRequest = useDebounce(onSearchContact, DEBOUNCE_WAIT, [onSearchContact]);

  const onCloseModal = () => {
    if (typeof onClose === 'function') onClose();
  };
  const onClickDelete = () => {
    if (!itemEditing) return;
    onDeleteTarget(itemEditing?.id);
  };
  const onClickCancel = () => {
    onCancel();
  };
  const onClickCreateOrSave = () => {
    const tags = tagInputRef.current?.getItems() || [];
    if (tags.length === 0) {
      setShowErrorProperty(true);
      return;
    }
    if (targetName.length === 0) {
      setShowErrorName(true);
      return;
    }
    const amountNumber = replaceAll(amount, ',', '');
    const amountInt = parseInt(amountNumber, 10);
    if (isEdit) {
      onSaveTarget(itemEditing?.id, amountInt, tags, targetName);
      return;
    }
    onCreateTarget(amountInt, tags, targetName);
  };
  const onChangeInputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatCurrency(event.target.value, '0,0', '0'));
  };
  const onChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetName(event.target.value);
    if (showErrorName) {
      setShowErrorName(false);
    }
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
        <div className="flex w-5 h-5 justify-center items-center">
          <IconByType
            className="w-5 h-5 object-scale-down"
            style={{ width: 20, height: 20 }}
            viewBox="2 2 20 20"
          />
        </div>
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
    if (isCreatingOrSaving)
      return <Loading width={12} height={12} color="white" className="w-4 h-4 ml-2" />;
    return (
      <ArrowRight className="w-4 h-4 ml-2 fill-current path-no-filled stroke-current path-no-stroke object-fill text-white" />
    );
  };

  const renderIconDeleteOrLoading = () => {
    if (isDeleting) {
      return <Loading width={12} height={12} color="primary" className="w-4 h-4" />;
    }
    return <CarbonTrashCan width={16} height={16} className="w-4 h-4" />;
  };

  const renderErrorProperty = () => {
    if (!showErrorProperty) return null;
    return (
      <div className="flex flex-row items-center px-2 space-x-1">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Targets need at least one property</p>
      </div>
    );
  };

  const renderErrorName = () => {
    if (!showErrorName) return null;
    return (
      <div className="flex flex-row items-center px-2 space-x-1">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Target name is required</p>
      </div>
    );
  };

  const createReadyState = enableCreate ? 'bg-primary' : 'bg-Gray-6';
  return (
    <Modal open={open} onClose={onCloseModal} center={false} contentClass="sm:my-24">
      <div className="flex flex-col w-[523px] outline-none">
        <div className="flex flex-col space-y-2 px-12 pt-8 pb-6">
          <h3 className="text-base text-primary font-semibold">Monthly Target</h3>
          <p className="text-sm text-Gray-6">Monitor spend and track performance.</p>
        </div>
        <hr className="divider divider-horizontal w-full" />
        <div className="flex flex-col py-8">
          <div className="px-12 space-y-2">
            <p className="text-primary text-xs font-semibold">Properties*</p>
            <AddTargetTagInput
              ref={tagInputRef}
              placeholder="Enter a team, category, or vendor"
              onTextChange={debounceSearchRequest}
              loading={isSearching}
              maxTag={40}
              defaultItems={getUniqueListBy([...defaultTags, ...(initTags ?? [])], 'id')}
              autoFocus
              onItemsChange={(items: SearchResult[]) => {
                if (items.length > 0) {
                  setEnableCreate(true);
                } else {
                  setEnableCreate(false);
                }
              }}
            />
            {renderErrorProperty()}
          </div>
          <div className="flex flex-col mt-2 w-full max-h-[200px] overflow-y-scroll hide-scrollbar">
            {results?.map(renderResultProperty)}
          </div>
          <div className="flex flex-col space-y-2 px-12 w-full mt-6">
            <p className="text-primary text-xs font-semibold">Target Name*</p>
            <div className="flex flex-col p-2 border-b border-Gray-11">
              <input
                className={classNames(
                  'text-Gray-1 flex-1 placeholder-Gray-6 outline-none border-none text-sm w-auto',
                )}
                placeholder="Ex: Direct marketing & online advertising"
                onChange={onChangeInputName}
                value={targetName}
              />
            </div>
            {renderErrorName()}
          </div>
          <div className="px-12 w-full mt-6 space-y-2">
            <p className="text-primary text-xs font-semibold">Amount</p>
            <div className="flex flex-row items-center px-1 py-2 border-b border-Gray-11">
              <p className="text-Gray-3 text-base mr-2.5">$</p>
              <input
                className={classNames(
                  'text-Gray-1 placeholder-Gray-6 outline-none border-none text-base',
                  amountInputWidth,
                )}
                placeholder="10,000"
                onChange={onChangeInputAmount}
                value={amount}
              />
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
              {renderIconDeleteOrLoading()}
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
            className={classNames(
              'flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary',
              createReadyState,
            )}
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
