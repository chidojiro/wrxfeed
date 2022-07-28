/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AlertRed } from '@/assets';
import { ReactComponent as ArrowRight } from '@/assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as CarbonTrashCan } from '@/assets/icons/outline/carbon-trash-can.svg';
import Modal from '@/common/atoms/Modal';
import { Button, Form, OverlayLoader } from '@/common/components';
import { defaultTargetMonths, EMPTY_ARRAY } from '@/common/constants';
import { withMountOnOpen } from '@/common/hocs/withMountOnOpen';
import { useFetcher, useHandler } from '@/common/hooks';
import { AssertUtils, formatCurrency, round } from '@/common/utils';
import { useCategories } from '@/feed/useCategories';
import { genReviewSentenceFromProperties, getPeriodsFromTargetMonths } from '@/main/utils';
import {
  CreateTargetPayload,
  Target,
  TargetPeriod,
  TargetProps,
  TargetSpending,
  TargetTypeProp,
  UpdateTargetPayload,
} from '@/target/types';
import { useDepartments } from '@/team/useDepartments';
import { useVendors } from '@/vendor/useVendors';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TargetApis } from '../apis';
import { MiniChartView } from '../MiniChartView';
import MultiMonthDropdown from './MultiMonthDropdown';
import { PropsSection } from './PropsSection';

type AddTargetModalBaseProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  target?: Target | null;
  departmentId?: number;
  hidePropertyDropdowns?: boolean;
  onCreateSuccess?: (newTarget: Target) => void;
  onUpdateSuccess?: (updatedTarget: Target) => void;
  onDeleteSuccess?: (id: number) => void;
  onCreateError?: () => void;
  onUpdateError?: () => void;
  onDeleteError?: () => void;
};

export type AddTargetModalWithDefaultApisProps = AddTargetModalBaseProps & {
  useDefaultApis?: true;
};

export type AddTargetModalWithoutDefaultApisProps = AddTargetModalBaseProps & {
  useDefaultApis: false;
  onCreate?: (payload: CreateTargetPayload) => Promise<Target>;
  onUpdate?: (id: number, payload: UpdateTargetPayload) => Promise<Target>;
  onDelete?: (id: number) => Promise<unknown>;
};

export type AddTargetModalProps =
  | AddTargetModalWithDefaultApisProps
  | AddTargetModalWithoutDefaultApisProps;

const THIS_YEAR = new Date().getFullYear();

const getPropFromTagValue = (value: string) => {
  const [type, id, name] = value.split('-');

  return { type, id: +id, name };
};

export const AddTargetModal = withMountOnOpen((props: AddTargetModalProps) => {
  const {
    open,
    onClose,
    onCancel,
    departmentId,
    target,
    hidePropertyDropdowns,
    useDefaultApis = true,
  } = props;
  const isEdit = !!target;

  const methods = useForm();
  const {
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
  } = methods;

  const { isValidating: isValidatingDepartments, data: departments = EMPTY_ARRAY } = useDepartments(
    {
      includeSub: 1,
    },
  );

  const { isValidating: isValidatingVendors } = useVendors();

  const { isValidating: isValidatingCategories } = useCategories();

  React.useEffect(() => {
    const getTagValueFromProps = ({ id, name, type }: TargetProps) => `${type}-${id}-${name}`;

    if (isEdit) {
      const {
        vendorProps = [],
        categoryProps = [],
        departmentProps = [],
      } = target?.props.reduce(
        (acc, cur) => {
          return {
            vendorProps:
              cur.type === TargetTypeProp.VENDOR
                ? [...acc.vendorProps, getTagValueFromProps(cur)]
                : acc.vendorProps,
            categoryProps:
              cur.type === TargetTypeProp.CATEGORY
                ? [...acc.categoryProps, getTagValueFromProps(cur)]
                : acc.categoryProps,
            departmentProps:
              cur.type === TargetTypeProp.DEPARTMENT
                ? [...acc.departmentProps, getTagValueFromProps(cur)]
                : acc.departmentProps,
          };
        },
        {
          vendorProps: [] as string[],
          categoryProps: [] as string[],
          departmentProps: [] as string[],
        },
      ) ?? {};

      reset({
        name: target?.name,
        vendors: vendorProps,
        categories: categoryProps,
        departments: departmentProps,
        props: target?.props,
        periods: target?.periods,
      });
    } else {
      const foundDepartment = departments.find(({ id }) => id === departmentId);

      reset({
        name: '',
        departments: [
          foundDepartment &&
            `${TargetTypeProp.DEPARTMENT}-${foundDepartment.id}-${foundDepartment.name}`,
        ].filter(Boolean),
        props: [departments.find(({ id }) => id === departmentId)].filter(Boolean),
        periods: defaultTargetMonths,
      });
    }
  }, [departmentId, departments, isEdit, reset, target]);

  const name = watch('name');
  const selectedVendors = (watch('vendors') ?? []) as string[];
  const selectedCategories = (watch('categories') ?? []) as string[];
  const selectedDepartments = (watch('departments') ?? []) as string[];
  const selectedExceptions = (watch('exceptions') ?? []) as string[];
  const periods = (watch('periods') ?? []) as TargetPeriod[];

  const vendorProps = selectedVendors.map(
    (value) => ({ ...getPropFromTagValue(value), exclude: false } as TargetProps),
  );
  const categoryProps = selectedCategories.map(
    (value) => ({ ...getPropFromTagValue(value), exclude: false } as TargetProps),
  );
  const departmentProps = selectedDepartments.map(
    (value) => ({ ...getPropFromTagValue(value), exclude: false } as TargetProps),
  );
  const exceptionProps = selectedExceptions.map(
    (value) => ({ ...getPropFromTagValue(value), exclude: true } as TargetProps),
  );
  const targetProps = React.useMemo(
    () => [vendorProps, categoryProps, departmentProps, exceptionProps].flat(),
    [categoryProps, departmentProps, exceptionProps, vendorProps],
  );

  const isValidPeriods = (periods: TargetPeriod[]) =>
    periods.some((v: TargetPeriod) => !AssertUtils.isNullOrUndefined(v.amount));

  const { isValidating: isValidatingSpendings, data: spendingsRaw = EMPTY_ARRAY } = useFetcher(
    !!targetProps.length && isValidPeriods(periods) && ['targetSpending', targetProps],
    () => TargetApis.getSpending({ props: targetProps, periods }),
  );

  const spendings = new Array(12)
    .fill(null)
    .map((_, index) => {
      const currentMonth = index + 1;

      const spendingsRawForCurrentMonth = spendingsRaw.filter(
        ({ month }) => month === currentMonth,
      );

      if (!spendingsRawForCurrentMonth.length) return;

      return {
        year: THIS_YEAR,
        month: currentMonth,
        total: spendingsRawForCurrentMonth.reduce((acc, cur) => cur.total + acc, 0),
      };
    })
    .filter((item): item is TargetSpending => !!item);

  React.useEffect(() => {
    setValue('props', targetProps);
  }, [targetProps, setValue]);

  const {
    onCreateSuccess,
    onCreateError,
    onUpdateSuccess,
    onUpdateError,
    onDeleteSuccess,
    onDeleteError,
  } = props as AddTargetModalWithDefaultApisProps;

  const { onCreate, onUpdate, onDelete } = props as AddTargetModalWithoutDefaultApisProps;

  const createApi = useDefaultApis ? TargetApis.create : onCreate;
  const updateApi = useDefaultApis ? TargetApis.update : onUpdate;
  const deleteApi = useDefaultApis ? TargetApis.delete : onDelete;

  const { handle: createTarget } = useHandler(
    (payload: CreateTargetPayload) => createApi!(payload),
    {
      onSuccess: (data) => {
        onCreateSuccess?.(data);
        onClose();
      },
      onError: onCreateError,
    },
  );

  const { handle: updateTarget } = useHandler(
    (id: number, payload: UpdateTargetPayload) => updateApi!(id, payload),
    {
      onSuccess: (data) => {
        onUpdateSuccess?.(data);
        onClose();
      },
      onError: onUpdateError,
    },
  );

  const { isLoading: isDeleting, handle: deleteTarget } = useHandler(() => deleteApi!(target!.id), {
    onSuccess: () => {
      onDeleteSuccess?.(target!.id);
      onClose();
    },
    onError: onDeleteError,
  });

  const renderErrorName = () => {
    return (
      <div className="flex flex-row items-center px-2 space-x-1">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Target name is required</p>
      </div>
    );
  };

  const totalTargetAmount = round(
    periods.reduce((total, target) => total + (target.amount ?? 0), 0),
  );
  const totalCurrentSpend =
    target?.spendings
      ?.filter(({ year }) => year === THIS_YEAR)
      .reduce((total, target) => total + (target.total ?? 0), 0) ?? 0;

  const isReadyToCreate = isValidPeriods(periods) && !!targetProps.length && !!name?.length;

  const renderNoMonthError = () => {
    return (
      <div className="flex flex-row items-center px-12 space-x-1 mb-2">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Select at least one month</p>
      </div>
    );
  };

  const reviewSentence = genReviewSentenceFromProperties(
    vendorProps,
    categoryProps,
    departmentProps,
    exceptionProps,
  );

  const isValidatingOptions =
    isValidatingDepartments || isValidatingCategories || isValidatingVendors;

  const hasNameError = !!errors.name;
  const hasPeriodsError = !!errors.periods;
  const hasPropsError = !!errors.props;

  const handleCreate = () => {
    const payload = {
      name,
      depId: departmentId,
      isPrimary: false,
      props: targetProps,
      periods,
    };

    return createTarget(payload);
  };

  const handleSave = () => {
    const payload = {
      name,
      depId: departmentId,
      props: targetProps,
      isPrimary: false,
      periods,
    };

    return updateTarget(target!.id, payload);
  };

  const handleDelete = deleteTarget;

  return (
    <Modal open={open} onClose={onClose} center={false}>
      <OverlayLoader loading={isValidatingOptions}>
        <Form methods={methods} onSubmit={isEdit ? handleSave : handleCreate}>
          <Form.Input
            name="props"
            rules={{ validate: { required: (value: TargetProps[]) => !!value.length } }}
            readOnly
            className="w-0 h-0 overflow-hidden"
          />
          <Form.Input
            name="periods"
            rules={{
              validate: {
                required: isValidPeriods,
              },
            }}
            readOnly
            className="w-0 h-0 overflow-hidden"
          />
          <div className="flex flex-col w-[685px] outline-none">
            <div className="flex flex-col space-y-2 px-10 py-4 w-full">
              <p className="text-primary text-xs font-semibold">Target Name*</p>
              <Form.Input
                name="name"
                variant="underline"
                placeholder="e.g Direct marketing & online advertising"
                rules={{ required: true }}
              />
              {hasNameError && renderErrorName()}
            </div>
            {!hidePropertyDropdowns && (
              <PropsSection
                reviewSentence={reviewSentence}
                exceptionProps={exceptionProps}
                error={hasPropsError}
              />
            )}
            <div className="flex flex-row pt-2 px-10 justify-between">
              <div className="flex flex-row items-center space-x-2 py-3">
                <p className="text-primary text-xs font-semibold w-14">Months*</p>
                <MultiMonthDropdown
                  props={targetProps}
                  periods={periods}
                  year={THIS_YEAR}
                  lastYearData={
                    periods.filter((item) => item.year === new Date().getFullYear() - 1) ?? []
                  }
                  onApply={(data) => {
                    setValue('periods', getPeriodsFromTargetMonths(data, THIS_YEAR));
                    clearErrors('periods');
                  }}
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
            {!!hasPeriodsError && renderNoMonthError()}
            <div className="h-[270px] px-6">
              <OverlayLoader
                loading={!isValidatingOptions && isValidatingSpendings}
                className="h-full"
              >
                <div className="h-full w-full rounded-lg">
                  <MiniChartView
                    target={{
                      props: targetProps,
                      periods,
                      spendings,
                      trackingStatus: target?.trackingStatus,
                    }}
                    overallTarget={isValidPeriods(periods) ? 1 : 0}
                  />
                </div>
              </OverlayLoader>
            </div>
            <div className="flex flex-row pt-4 pb-6 px-10 space-x-4 items-center justify-end text-primary text-xs font-semibold">
              <p className="">
                Current Spend:
                <span className="text-Gray-3 font-normal ml-1">
                  {`$${formatCurrency({
                    value: totalCurrentSpend,
                    format: '0,0',
                    defaultValue: '0',
                  })}`}
                </span>
              </p>
              <p className="">
                Total Target Amount:
                <span className="text-Gray-3 font-normal ml-1">
                  {`$${formatCurrency({
                    value: totalTargetAmount,
                    format: '0,0',
                    defaultValue: '0',
                  })}`}
                </span>
              </p>
            </div>
            <hr className="divider divider-horizontal w-full" />
            <div className="flex flex-row w-full px-12 py-4">
              {!!isEdit && (
                <Button
                  variant="ghost"
                  loading={isDeleting}
                  colorScheme="gray"
                  type="button"
                  iconLeft={<CarbonTrashCan width={16} height={16} className="w-4 h-4" />}
                  onClick={handleDelete}
                >
                  <p className="text-Gray-6 text-xs font-semibold">Delete</p>
                </Button>
              )}
              <div className="flex gap-3 ml-auto">
                <Button variant="ghost" colorScheme="gray" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  variant="solid"
                  colorScheme={isReadyToCreate ? 'primary' : 'gray'}
                  className="hover:bg-primary"
                  iconRight={
                    <ArrowRight className="fill-current path-no-filled stroke-current path-no-stroke object-fill text-white" />
                  }
                >
                  {isEdit ? 'Save' : 'Create'}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </OverlayLoader>
    </Modal>
  );
});
