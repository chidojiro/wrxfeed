/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { TransactionBody } from '@/api/types';
import { AlertRed, Bank, CategoryIcon, TeamIcon } from '@/assets';
import { ReactComponent as ArrowRight } from '@/assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as CarbonTrashCan } from '@/assets/icons/outline/carbon-trash-can.svg';
import Loading from '@/common/atoms/Loading';
import Modal from '@/common/atoms/Modal';
import { defaultTargetMonths, INITIAL_CHART_DATA } from '@/common/constants';
import { classNames, formatCurrency, round } from '@/common/utils';
import { getLineChartDataInMonth, getTargetMonthsLineChartData } from '@/main/chart.utils';
import { Department } from '@/main/entity';
import { useTransaction } from '@/main/hooks';
import { useMultiMonth } from '@/main/hooks/multiMonth.hook';
import ExceptDropdown from '@/main/molecules/ExceptDropdown';
import ExceptList from '@/main/molecules/ExceptList';
import MultiMonthDropdown from '@/main/molecules/MultiMonthDropdown';
import PropertiesDropdown, { DropdownEdge } from '@/main/molecules/PropertiesDropdown';
import TargetChart from '@/main/molecules/TargetChart';
import { LineChartData, SearchResult } from '@/main/types';
import {
  decimalLogic,
  DecimalType,
  genReviewSentenceFromProperties,
  getPeriodsByYear,
  getPropsAndPeriodsFromItemSelected,
  getTargetName,
} from '@/main/utils';
import { CreateTargetPayload, UpdateTargetPayload } from '@/target/apis';
import {
  PatchCalcSpendingFilters,
  Target,
  TargetMonth,
  TargetPeriod,
  TargetProps,
  TargetTypeProp,
} from '@/target/types';
import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
import range from 'lodash.range';
import React, { KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export type AddTargetModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  deleteTarget: (id: number) => void;
  postTarget: (data: CreateTargetPayload) => void;
  putTarget: (id: number, data: UpdateTargetPayload) => void;
  itemEditing: Target | null;
  isCreatingOrSaving: boolean;
  isDeleting?: boolean;
  initTags?: SearchResult[];
  depId?: number | undefined;
  department?: Department;
  defaultTeamItemIds?: number[];
};

const THIS_YEAR = new Date().getFullYear();
const THIS_YEAR_INIT_FILTER = Object.freeze({
  props: [],
  periods: getPeriodsByYear(THIS_YEAR),
});
const LAST_YEAR_INIT_FILTER = Object.freeze({
  props: [],
  periods: getPeriodsByYear(THIS_YEAR - 1),
});

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
  department,
  initTags,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [exceptItems, setExceptItems] = useState<SearchResult[]>([]);
  const [vendItems, setVendItems] = useState<SearchResult[]>([]);
  const [catItems, setCatItems] = useState<SearchResult[]>([]);
  const [teamItems, setTeamItems] = useState<SearchResult[]>([]);
  const [allProps, setAllProps] = useState<TargetProps[]>([]);

  const [openMultiMonth, setOpenMultiMonth] = useState<boolean>(false);
  const [targetMonths, setTargetMonths] = useState<TargetMonth[]>(defaultTargetMonths);
  const [showNoMonthError, setNoMonthError] = useState<boolean>(false);
  const [curYear, setCurYear] = useState(THIS_YEAR);

  const [targetName, setTargetName] = useState<string>('');
  const [isEditName, setEditName] = useState<boolean>(false);
  const [showErrorName, setShowErrorName] = useState<boolean>(false);

  const [defaultTags, setDefaultTags] = useState<SearchResult[]>([]);
  const [showErrorProp, setShowErrorProp] = useState<boolean>(false);
  const checkGetPreFillData = useRef(false);

  const [thisYearSpendFilter, setThisYearFilter] =
    useState<PatchCalcSpendingFilters>(THIS_YEAR_INIT_FILTER);
  const [lastYearSpendFilter, setLastYearFilter] =
    useState<PatchCalcSpendingFilters>(LAST_YEAR_INIT_FILTER);
  const {
    months: thisYearSpendData = [],
    fetch: fetchThisYearSpendData,
    isLoading: thisYearDataLoading,
  } = useMultiMonth(thisYearSpendFilter, true);
  const {
    months: lastYearSpendData = [],
    isLoading: lastYearDataLoading,
    fetch: fetchLastYearSpendData,
  } = useMultiMonth(lastYearSpendFilter, true);

  const [lastYearTransPayload, setLastYearTransPayload] = useState<TransactionBody>();
  const { transactions: lastYearTrans } = useTransaction(lastYearTransPayload);
  const [thisYearTransPayload, setThisYearTransPayload] = useState<TransactionBody>();
  const { transactions: thisYearTrans } = useTransaction(thisYearTransPayload);

  const updatedTargetMonths = targetMonths.filter((target) => target?.amount !== undefined);
  const startMonth = updatedTargetMonths[0]?.month ?? 1;
  const endMonth = updatedTargetMonths[updatedTargetMonths.length - 1]?.month ?? 12;

  const isEdit = itemEditing !== null;
  const chartData: LineChartData = useMemo(() => {
    if (startMonth === endMonth) {
      return getLineChartDataInMonth(thisYearTrans, lastYearTrans, targetMonths[startMonth - 1]);
    }
    return getTargetMonthsLineChartData(thisYearSpendData, lastYearSpendData, targetMonths);
  }, [thisYearSpendData, lastYearSpendData, targetMonths, lastYearTrans, thisYearTrans]);

  // Variables
  const totalTarget = round(
    targetMonths.reduce((total, target) => total + (target.amount ?? 0), 0),
  );
  const totalCurrentSpend = round(chartData.metadata?.currentSpend ?? 0);

  useEffect(() => {
    if (department) {
      const addDept = {
        id: `${TargetTypeProp.DEPARTMENT.toUpperCase()}-${department.id}`,
        title: department.name,
        type: TargetTypeProp.DEPARTMENT,
        directoryId: department.id,
      };
      if (defaultTags.filter((item) => item.id === addDept.id).length === 0) {
        setDefaultTags((pre) => [...pre, addDept]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, open]);

  useEffect(() => {
    if (checkGetPreFillData.current) {
      setThisYearFilter({
        props: allProps,
        periods: getPeriodsByYear(curYear),
      });
      setLastYearFilter({
        props: allProps,
        periods: getPeriodsByYear(curYear - 1),
      });
    }
  }, [allProps, curYear]);

  const onCreateTarget = (name: string, propSelected: SearchResult[], excepts: SearchResult[]) => {
    const { props, periods } = getPropsAndPeriodsFromItemSelected(
      propSelected,
      excepts,
      targetMonths,
      curYear,
    );
    postTarget({
      name,
      depId,
      isPrimary: false,
      props,
      periods,
    });
  };
  const onDeleteTarget = (targetId: number) => {
    deleteTarget(targetId);
  };
  const onSaveTarget = (
    targetId: number,
    name: string,
    propSelected: SearchResult[],
    excepts: SearchResult[],
  ) => {
    const { props, periods } = getPropsAndPeriodsFromItemSelected(
      propSelected,
      excepts,
      targetMonths,
      curYear,
    );
    putTarget(targetId, {
      name,
      depId,
      props,
      isPrimary: false,
      periods,
    });
  };

  useEffect(() => {
    let timeout: number;
    if (open) {
      // fetch data
      fetchThisYearSpendData();
      fetchLastYearSpendData();
    } else {
      timeout = setTimeout(() => {
        setTargetName('');
        setDefaultTags([]);
        setTargetMonths([]);
        checkGetPreFillData.current = false;
      }, 400);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [fetchThisYearSpendData, fetchLastYearSpendData, open]);

  useEffect(() => {
    const vendors = vendItems.length ? vendItems : [];
    const teams = teamItems.length ? teamItems : [];
    const categories = catItems.length ? catItems : [];
    const propsCheck: TargetProps[] = [
      ...vendors,
      ...teams,
      ...categories,
      ...(initTags ?? []),
    ].map((item: SearchResult) => {
      return {
        id: item.directoryId,
        exclude: false,
        type: item.type,
        name: item.title,
      };
    });
    for (let index = 0; index < exceptItems.length; index += 1) {
      const item = exceptItems[index];
      propsCheck.push({
        id: item.directoryId,
        exclude: true,
        type: item.type,
        name: item.title,
      });
    }
    if (initTags && initTags?.length > 0) {
      checkGetPreFillData.current = true;
    }
    const propsCheckUnique = propsCheck.filter(
      (value, index, self) => index === self.findIndex((prop) => prop.id === value.id),
    );
    setAllProps(propsCheckUnique);
  }, [vendItems, teamItems, catItems, exceptItems, initTags]);

  const applyDataThenGenChart = (data: TargetMonth[], year: number) => {
    setTargetMonths(data);
    setCurYear(year);
    if (data.length > 0) {
      setNoMonthError(false);
    }
  };

  useEffect(() => {
    if (itemEditing && itemEditing?.props?.length > 0) {
      const defaultTagsTemp = itemEditing?.props.map((prop: TargetProps) => {
        return {
          id: `${prop?.type.toUpperCase()}-${prop?.id}`,
          title: prop?.name,
          type: prop?.type,
          directoryId: prop?.id,
        };
      });
      setDefaultTags(defaultTagsTemp);
    }
    setTargetName(itemEditing ? getTargetName(itemEditing) : '');
  }, [itemEditing]);

  useEffect(() => {
    if (itemEditing && itemEditing?.periods?.length > 0 && itemEditing?.props?.length > 0) {
      setThisYearFilter({
        props: itemEditing?.props,
        periods: getPeriodsByYear(THIS_YEAR),
      });
      setLastYearFilter({
        props: itemEditing?.props,
        periods: getPeriodsByYear(THIS_YEAR - 1),
      });
      const dataMonth = cloneDeep(defaultTargetMonths);
      itemEditing?.periods.forEach((period: TargetPeriod) => {
        if (
          period?.amount !== undefined &&
          dataMonth[period?.month - 1] &&
          dataMonth[period?.month - 1]
        ) {
          dataMonth[period?.month - 1].amount = period?.amount;
        }
      });
      setTargetMonths(dataMonth);
      checkGetPreFillData.current = true;
    }
  }, [itemEditing]);

  useEffect(() => {
    if (targetMonths?.length && startMonth === endMonth) {
      const props = allProps.length ? allProps : itemEditing?.props;
      const thisYear = dayjs().year();
      setLastYearTransPayload({
        periods: [{ month: startMonth, year: thisYear - 1 }],
        props,
      });
      setThisYearTransPayload({
        periods: [{ month: startMonth, year: thisYear }],
        props,
      });
    }
  }, [startMonth, endMonth, allProps]);

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
    const propSelected = [...vendItems, ...catItems, ...teamItems];
    if (targetName.length === 0) {
      setShowErrorName(true);
      return;
    }
    if (propSelected.length === 0) {
      setShowErrorProp(true);
      return;
    }
    if (targetMonths.length === 0) {
      setNoMonthError(true);
      return;
    }
    if (isEdit) {
      if (itemEditing) {
        onSaveTarget(itemEditing.id, targetName, propSelected, exceptItems);
      }
      return;
    }
    onCreateTarget(targetName, propSelected, exceptItems);
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

  const createReadyState =
    targetMonths.length > 0 && allProps.length > 0 && targetName.length > 0
      ? 'bg-primary'
      : 'bg-Gray-6';

  const renderXAxis = () => {
    const targetDate = dayjs().set('month', startMonth - 1);
    return startMonth === endMonth ? (
      <div className="flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[90px]">
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(7).format('MMM D')}</p>
        </div>
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(14).format('MMM D')}</p>
        </div>
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(21).format('MMM D')}</p>
        </div>
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(28).format('MMM D')}</p>
        </div>
      </div>
    ) : (
      <div className="flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[38px]">
        {range(startMonth, endMonth + 1).map((month: number) => (
          <div
            key={`x-${month}`}
            className="w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end"
          >
            <p>
              {dayjs()
                .month(month - 1)
                .format('MMM')}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderTooltipContent = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload } = props;
    const thisYear = dayjs().year();
    if (active && payload) {
      const dataPoints = payload[0]?.payload;
      const thisYearLabel = `${dataPoints?.name ?? 'unknown'}, ${thisYear}`;
      const lastYearLabel = `${dataPoints?.name ?? 'unknown'}, ${thisYear - 1}`;
      return (
        <div className="flex bg-primary p-2 rounded-sm">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <p className="text-white text-3xs font-semibold">{thisYearLabel}</p>
            </div>
            <div
              key="target"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <p className="text-white text-2xs">Target Amount</p>
              <p className="text-white text-2xs text-right">
                {decimalLogic(dataPoints?.target ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
            <div
              key="this-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <p className="text-white text-2xs">Current Spend</p>
              <p className="text-white text-2xs text-right">
                {decimalLogic(dataPoints?.thisYear ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>

            <div className="flex flex-row items-center mt-1">
              <p className="text-Gray-6 text-3xs font-semibold">{lastYearLabel}</p>
            </div>
            <div
              key="last-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <p className="text-Gray-6 text-2xs">Last Year's Spend</p>
              <p className="text-Gray-6 text-2xs text-right">
                {decimalLogic(dataPoints?.lastYear ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderNoMonthError = () => {
    if (!showNoMonthError) return null;
    return (
      <div className="flex flex-row items-center px-12 space-x-1 mb-2">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Select at least one month</p>
      </div>
    );
  };

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
            <div className="flex items-center justify-center w-14 min-w-[50px] h-[30px]">
              <p className="text-Gray-6 text-xs">Target Is</p>
            </div>
            <PropertiesDropdown
              showError={showErrorProp}
              closeError={() => setShowErrorProp(false)}
              placeholder="Enter a vendor"
              IconComponent={Bank}
              title="All Vendors"
              type={TargetTypeProp.VENDOR}
              defaultItems={defaultTags.filter((item) => item.type === TargetTypeProp.VENDOR)}
              onChangeItems={setVendItems}
            />
            <div className="flex items-center justify-center w-6 h-[30px]">
              <p className="text-Gray-6 text-xs text-center">in</p>
            </div>
            <PropertiesDropdown
              placeholder="Enter a category"
              IconComponent={CategoryIcon}
              title="All Categories"
              type={TargetTypeProp.CATEGORY}
              defaultItems={defaultTags.filter((item) => item.type === TargetTypeProp.CATEGORY)}
              onChangeItems={setCatItems}
            />
            <div className="flex items-center justify-center w-6 h-[30px]">
              <p className="text-Gray-6 text-xs text-center">for</p>
            </div>
            <PropertiesDropdown
              placeholder="Enter a team"
              IconComponent={TeamIcon}
              title="All Teams"
              type={TargetTypeProp.DEPARTMENT}
              dropdownEdge={DropdownEdge.RIGHT}
              defaultItems={defaultTags.filter((item) => item.type === TargetTypeProp.DEPARTMENT)}
              onChangeItems={setTeamItems}
            />
            <ExceptDropdown
              title="Except"
              placeholder="Enter a team, category, or vendor"
              selected={[...vendItems, ...catItems, ...teamItems]}
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
            <MultiMonthDropdown
              open={openMultiMonth}
              setOpen={setOpenMultiMonth}
              props={allProps}
              periods={itemEditing?.periods}
              targetMonths={targetMonths}
              year={curYear}
              lastYearData={lastYearSpendData}
              isLoadingData={lastYearDataLoading || thisYearDataLoading}
              onApply={applyDataThenGenChart}
            />
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
        {renderNoMonthError()}
        <div className="relative flex justify-center items-center w-auto mx-6 px-4 py-6 h-[271px] border border-Gray-12 rounded-2.5xl">
          <TargetChart
            containerClass="mb-4 mt-6"
            chartData={thisYearSpendData.length > 0 ? chartData : INITIAL_CHART_DATA}
            renderTooltip={renderTooltipContent}
            renderXAxis={renderXAxis}
            loading={lastYearDataLoading || thisYearDataLoading}
          />
        </div>
        <div className="flex flex-row pt-4 pb-6 px-10 space-x-4 items-center justify-end text-primary text-xs font-semibold">
          <p className="">
            Current Spend:
            <span className="text-Gray-3 font-normal ml-1">
              {`$${formatCurrency({ value: totalCurrentSpend, format: '0,0', defaultValue: '0' })}`}
            </span>
          </p>
          <p className="">
            Total Target Amount:
            <span className="text-Gray-3 font-normal ml-1">
              {`$${formatCurrency({ value: totalTarget, format: '0,0', defaultValue: '0' })}`}
            </span>
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
