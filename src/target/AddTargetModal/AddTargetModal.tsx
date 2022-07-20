/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AlertRed } from '@/assets';
import { ReactComponent as ArrowRight } from '@/assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as CarbonTrashCan } from '@/assets/icons/outline/carbon-trash-can.svg';
import Loading from '@/common/atoms/Loading';
import Modal from '@/common/atoms/Modal';
import { Form, OverlayLoader } from '@/common/components';
import { defaultTargetMonths, EMPTY_ARRAY } from '@/common/constants';
import { withMountOnOpen } from '@/common/hocs/withMountOnOpen';
import { useFetcher, useHandler } from '@/common/hooks';
import { formatCurrency, round } from '@/common/utils';
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
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TargetApis } from '../apis';
import { MiniChartView } from '../MiniChartView';
import MultiMonthDropdown from './MultiMonthDropdown';
import { PropsSection } from './PropsSection';

export type AddTargetModalProps = {
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

const THIS_YEAR = new Date().getFullYear();

const getPropFromTagValue = (value: string) => {
  const [type, id, name] = value.split('-');

  return { type, id: +id, name };
};

export const AddTargetModal: React.FC<AddTargetModalProps> = withMountOnOpen(
  ({
    open,
    onClose,
    onCancel,
    departmentId,
    target,
    hidePropertyDropdowns,
    onDeleteSuccess,
    onCreateSuccess,
    onUpdateSuccess,
    onDeleteError,
    onCreateError,
    onUpdateError,
  }) => {
    const isEdit = !!target;

    const methods = useForm();
    const {
      watch,
      setValue,
      reset,
      formState: { errors, isSubmitting },
      clearErrors,
    } = methods;

    const { isValidating: isValidatingDepartments, data: departments = EMPTY_ARRAY } =
      useDepartments({
        includeSub: 1,
      });

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
    const props = React.useMemo(
      () => [vendorProps, categoryProps, departmentProps, exceptionProps].flat(),
      [categoryProps, departmentProps, exceptionProps, vendorProps],
    );

    const isValidPeriods = (periods: TargetPeriod[]) =>
      periods.some((v: TargetPeriod) => !!v.amount && v.amount > 0);

    const { isValidating: isValidatingSpendings, data: spendingsRaw = EMPTY_ARRAY } = useFetcher(
      !!props.length && isValidPeriods(periods) && ['targetSpending', props],
      () => TargetApis.getSpending({ props, periods }),
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
      setValue('props', props);
    }, [props, setValue]);

    const { handle: createTarget } = useHandler(
      (payload: CreateTargetPayload) => TargetApis.create(payload),
      {
        onSuccess: (data) => {
          onCreateSuccess?.(data);
          onClose();
        },
        onError: onCreateError,
      },
    );

    const { handle: updateTarget } = useHandler(
      (id: number, payload: UpdateTargetPayload) => TargetApis.update(id, payload),
      {
        onSuccess: (data) => {
          onUpdateSuccess?.(data);
          onClose();
        },
        onError: onUpdateError,
      },
    );

    const { isLoading: isDeleting, handle: deleteTarget } = useHandler(
      () => TargetApis.delete(target!.id),
      {
        onSuccess: () => {
          onDeleteSuccess?.(target!.id);
          onClose();
        },
        onError: onDeleteError,
      },
    );

    const handleCreate = () => {
      return createTarget({
        name,
        depId: departmentId,
        isPrimary: false,
        props,
        periods,
      });
    };

    const handleSave = () => {
      return updateTarget(target!.id, {
        name,
        departmentId,
        props,
        isPrimary: false,
        periods,
      });
    };

    const renderIconNextOrLoading = () => {
      if (isSubmitting)
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

    const isReadyToCreate = !!periods.length && !!props.length && !!name?.length;

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
                    props={props}
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
              <div className="h-[270px] px-10">
                <OverlayLoader
                  loading={!isValidatingOptions && isValidatingSpendings}
                  className="h-full"
                >
                  <div className="h-full w-full rounded-lg">
                    <MiniChartView
                      target={{
                        props,
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
                  <button
                    type="button"
                    onClick={deleteTarget}
                    className="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-Gray-12 space-x-2"
                  >
                    {renderIconDeleteOrLoading()}
                    <p className="text-Gray-6 text-xs font-semibold">Delete</p>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex px-4 py-2 rounded-sm hover:bg-Gray-12 mr-3 ml-auto"
                >
                  <p className="text-Gray-6 text-xs font-semibold">Cancel</p>
                </button>
                <button
                  type="submit"
                  className={clsx(
                    'flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary',
                    isReadyToCreate ? 'bg-primary' : 'bg-Gray-6',
                  )}
                >
                  <p className="text-white text-xs font-semibold">{isEdit ? 'Save' : 'Create'}</p>
                  {renderIconNextOrLoading()}
                </button>
              </div>
            </div>
          </Form>
        </OverlayLoader>
      </Modal>
    );
  },
);
