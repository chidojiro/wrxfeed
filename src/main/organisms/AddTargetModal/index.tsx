/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState, KeyboardEventHandler } from 'react';

import { classNames, formatCurrency, replaceAll } from '@common/utils';

import { SearchResult } from '@main/types';
import {
  CalcSpendProp,
  PostTargetParams,
  PutTargetParams,
  TargetProp,
  TargetPropType,
} from '@api/types';
import { Target } from '@main/entity';

import Modal from '@common/atoms/Modal';
import Loading from '@common/atoms/Loading';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { ReactComponent as ArrowRight } from '@assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as CarbonTrashCan } from '@assets/icons/outline/carbon-trash-can.svg';
import { AlertRed, TeamIcon, CategoryIcon, Bank } from '@assets';
import PropertiesDropdown, { DropdownEdge } from '@main/molecules/PropertiesDropdown';
import ExceptDropdown from '@main/molecules/ExceptDropdown';
import MultiMonthDropdown from '@main/molecules/MultiMonthDropdown';
import ExceptList from '@main/molecules/ExceptList';
import { genReviewSentenceFromProperties } from '@main/utils';

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
  depId,
}) => {
  const tagInputRef = useRef<AddTargetTagInputHandler>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState<string>('');
  const [exceptItems, setExceptItems] = useState<SearchResult[]>([]);
  const [vendItems, setVendItems] = useState<SearchResult[]>([]);
  const [catItems, setCatItems] = useState<SearchResult[]>([]);
  const [teamItems, setTeamItems] = useState<SearchResult[]>([]);
  const [allProps, setAllProps] = useState<CalcSpendProp[]>([]);

  const [targetName, setTargetName] = useState<string>('');
  const [isEditName, setEditName] = useState<boolean>(false);

  const [showErrorName, setShowErrorName] = useState<boolean>(false);

  const isEdit = itemEditing !== null;
  const [defaultTags, setDefaultTags] = useState<SearchResult[]>([]);
  const [enableCreate] = useState<boolean>(false);

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
      name,
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
        setAmount('');
        setTargetName('');
        setDefaultTags([]);
      }, 400);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    const propsCheck: CalcSpendProp[] = [...vendItems, ...teamItems, ...catItems].map(
      (item: SearchResult) => {
        return {
          id: item.directoryId,
          exclude: false,
          type: item.type,
          name: item.title,
        };
      },
    );
    for (let index = 0; index < exceptItems.length; index += 1) {
      const item = exceptItems[index];
      propsCheck.push({
        id: item.directoryId,
        exclude: true,
        type: item.type,
        name: item.title,
      });
    }
    setAllProps(propsCheck);
  }, [vendItems, teamItems, catItems, exceptItems]);

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
    setTargetName(itemEditing?.name ?? '');
  }, [itemEditing]);

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
  const onChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetName(event.target.value);
    if (showErrorName) {
      setShowErrorName(false);
    }
  };
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

  const renderErrorName = () => {
    if (!showErrorName) return null;
    return (
      <div className="flex flex-row items-center px-2 space-x-1">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Target name is required</p>
      </div>
    );
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (['Enter'].includes(event.key)) {
      event.preventDefault();
      nameInputRef.current?.blur();
    }
  };

  const reviewSentence = genReviewSentenceFromProperties(
    vendItems,
    teamItems,
    catItems,
    exceptItems,
  );

  const renderReviewSentence = () => {
    return (
      <p className="text-primary text-xs font-semibold">
        Properties*:
        <span className="text-Gray-3 font-normal ml-1">{reviewSentence}</span>
      </p>
    );
  };

  const createReadyState = enableCreate ? 'bg-primary' : 'bg-Gray-6';
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center={false}
      contentClass="sm:my-24 overflow-visible"
    >
      <div className="flex flex-col w-[685px] outline-none pt-4">
        <div className="flex flex-col space-y-2 px-10 py-4 w-full">
          <p className="text-primary text-xs font-semibold">Target Name*</p>
          <div
            className={classNames(
              'flex flex-col h-[38px] px-2.5 w-auto',
              isEditName ? 'bg-Gray-12' : 'border-b border-Gray-11',
            )}
          >
            <input
              ref={nameInputRef}
              className={classNames(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="e.g Direct marketing & online advertising"
              onChange={onChangeInputName}
              value={targetName}
              onFocus={() => setEditName(true)}
              onBlur={() => setEditName(false)}
            />
          </div>
          {renderErrorName()}
        </div>
        <div className="flex flex-col space-y-3 px-10 py-4 w-full">
          {renderReviewSentence()}
          <div className="flex flex-row py-1 space-x-2 px-2">
            <div className="flex items-center justify-center w-[50px] h-[30px]">
              <p className="text-Gray-6 text-xs">Target Is</p>
            </div>
            <PropertiesDropdown
              IconComponent={Bank}
              title="All Vendors"
              type={TargetPropType.VENDOR}
              defaultItems={defaultTags.filter((item) => item.type === TargetPropType.VENDOR)}
              onChangeItems={setVendItems}
            />
            <div className="flex items-center justify-center w-6 h-[30px]">
              <p className="text-Gray-6 text-xs text-center">in</p>
            </div>
            <PropertiesDropdown
              IconComponent={CategoryIcon}
              title="All Categories"
              type={TargetPropType.CATEGORY}
              defaultItems={defaultTags.filter((item) => item.type === TargetPropType.CATEGORY)}
              onChangeItems={setCatItems}
            />
            <div className="flex items-center justify-center w-6 h-[30px]">
              <p className="text-Gray-6 text-xs text-center">for</p>
            </div>
            <PropertiesDropdown
              IconComponent={TeamIcon}
              title="Consumer Products"
              type={TargetPropType.DEPARTMENT}
              dropdownEdge={DropdownEdge.RIGHT}
              defaultItems={defaultTags.filter((item) => item.type === TargetPropType.DEPARTMENT)}
              onChangeItems={setTeamItems}
            />
            <ExceptDropdown
              title="Except"
              onItemAdd={(item: SearchResult) => setExceptItems((pre) => [...pre, item])}
            />
          </div>
          <ExceptList
            items={exceptItems}
            onRemoveItem={(itemRemove: SearchResult) => {
              setExceptItems((pre) =>
                pre.filter((item: SearchResult) => item.id !== itemRemove.id),
              );
            }}
          />
        </div>
        <div className="flex flex-row pt-2 px-10 justify-between">
          <div className="flex flex-row items-center space-x-2 py-3">
            <p className="text-primary text-xs font-semibold w-14">Months*</p>
            <MultiMonthDropdown props={allProps} />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="w-4 h-1 bg-Accent-2" />
              <p className="text-xs text-Gray-6">Current Spend</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="w-4 h-1 dashed-line-target" />
              <p className="text-xs text-Gray-6">Target</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="w-4 h-1 bg-Gray-11" />
              <p className="text-xs text-Gray-6">Last Year's Spend</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-auto mx-6 py-8 h-[271px] border border-Gray-12 rounded-2.5xl">
          <p>Chart</p>
        </div>
        <div className="flex flex-row pt-4 pb-6 px-10 space-x-4 items-center justify-end text-primary text-xs font-semibold">
          <p className="">
            Current Spend:
            <span className="text-Gray-3 font-normal ml-1">$0</span>
          </p>
          <p className="">
            Total Target Amount:
            <span className="text-Gray-3 font-normal ml-1">$0</span>
          </p>
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
