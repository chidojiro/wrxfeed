import { CategoryIcon, ChartIcon, TeamIcon, VendorIcon } from '@/assets';
import { Form } from '@/common/components';
import { EMPTY_ARRAY } from '@/common/constants';
import { Field } from '@/common/headless';
import { genReviewSentenceFromProperties } from '@/main/utils';
import { PropertiesSection } from '@/property/PropertiesSection';
import { DateRangeSelect } from '@/team/DateRangeSelect';
import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const getPropFromTagValue = (value: string) => {
  const [type, id, name] = value.split('-');

  return { type, id: +id, name };
};

export const InsightHeader = () => {
  const { watch, setValue } = useFormContext();

  const selectedVendors = (watch('vendors') ?? EMPTY_ARRAY) as string[];
  const selectedCategories = (watch('categories') ?? EMPTY_ARRAY) as string[];
  const selectedDepartments = (watch('departments') ?? EMPTY_ARRAY) as string[];

  const vendorProps = React.useMemo(
    () =>
      selectedVendors.map((value) => ({ ...getPropFromTagValue(value), exclude: false } as any)),
    [selectedVendors],
  );
  const categoryProps = React.useMemo(
    () =>
      selectedCategories.map((value) => ({ ...getPropFromTagValue(value), exclude: false } as any)),
    [selectedCategories],
  );
  const departmentProps = React.useMemo(
    () =>
      selectedDepartments.map(
        (value) => ({ ...getPropFromTagValue(value), exclude: false } as any),
      ),
    [selectedDepartments],
  );
  const selectedExceptions = (watch('exceptions') ?? EMPTY_ARRAY) as string[];
  const exceptionProps = React.useMemo(
    () =>
      selectedExceptions.map((value) => ({ ...getPropFromTagValue(value), exclude: true } as any)),
    [selectedExceptions],
  );
  const targetProps = React.useMemo(
    () => [vendorProps, categoryProps, departmentProps, exceptionProps].flat(),
    [categoryProps, departmentProps, exceptionProps, vendorProps],
  );

  React.useEffect(() => {
    setValue('props', targetProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(targetProps), setValue]);

  const reviewSentence = genReviewSentenceFromProperties(
    vendorProps,
    categoryProps,
    departmentProps,
    exceptionProps,
    (vendorSen, catSen, teamSen, exceptSen) =>
      `You're looking at all spend ${vendorSen} ${catSen} ${teamSen}${exceptSen}`,
  );

  return (
    <div
      className={clsx('rounded-lg', 'relative', 'pt-[84px]', 'bg-white')}
      style={{ boxShadow: 'linear-gradient(138.74deg, #2B45A1 -12.96%, #82B2B3 100%)' }}
    >
      <div
        className={clsx(
          'h-[84px] p-6 flex items-center space-x-4 rounded-lg',
          'absolute w-full top-0 left-0',
        )}
        style={{ background: 'linear-gradient(138.74deg, #2B45A1 -12.96%, #82B2B3 100%)' }}
      >
        <div className="border border-white rounded-full p-2 w-9 h-9 flex justify-center items-center">
          <ChartIcon className="text-white" />
        </div>
        <div className="flex items-baseline space-x-1">
          <p className="text-white text-base font-semibold">Insights</p>
          <p className="text-white text-sm">- Drill down by team, category or vendor.</p>
        </div>
      </div>
      <div className="py-4 px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">Properties:</span>
            <span className="text-Gray-6 text-xs">{reviewSentence}</span>
          </div>
          <PropertiesSection className="mt-2" exceptionProps={exceptionProps as any} />
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm">Date Range</label>
            <Field name="dateRange" component={DateRangeSelect} variant="outline"></Field>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block font-bold text-sm">Group By</label>
            <Form.Select
              name="groupBy"
              options={[
                {
                  label: (
                    <div className="flex items-center gap-2">
                      <TeamIcon />
                      Team
                    </div>
                  ),
                  value: 'DEPARTMENT',
                },
                {
                  label: (
                    <div className="flex items-center gap-2">
                      <CategoryIcon />
                      Category
                    </div>
                  ),
                  value: 'CATEGORY',
                },
                {
                  label: (
                    <div className="flex items-center gap-2">
                      <VendorIcon />
                      Vendor
                    </div>
                  ),
                  value: 'VENDOR',
                },
              ]}
            ></Form.Select>
          </div>
        </div>
      </div>
    </div>
  );
};
