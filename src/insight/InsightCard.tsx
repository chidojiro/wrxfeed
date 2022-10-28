import { AlertRed, EssentialsSendEnableIcon } from '@/assets';
import { Button, Divider, Form, Input } from '@/common/components';
import { CommentBox } from '@/feed/CommentBox';
import { CommentsSection } from '@/feed/FeedCard/CommentsSection';
import { DateRangeFilter, Property } from '@/feed/types';
import { getDisplayUsdAmount } from '@/main/utils';
import { useMentions } from '@/misc/useMentions';
import { GroupedSpendingChart } from '@/spending/GroupedSpendingChart';
import { GroupedSpendingChartLegends } from '@/spending/GroupedSpendingChartLegends';
import { SpendingBarChart } from '@/spending/SpendingBarChart';
import { Entities } from '@/types';
import clsx from 'clsx';
import { sumBy } from 'lodash-es';
import React from 'react';
import { InsightCardActionMenu } from './InsightCardActionMenu';
import { InsightFeedItem } from './types';
import { useInsightSpendings } from './useInsightSpendings';

export type InsightCardProps = {
  groupBy?: Entities;
  errors?: any;
  dateRange?: DateRangeFilter;
  props?: Property[];
  onPost?: (data: any) => void;
  feed?: InsightFeedItem;
  onDeleteSuccess?: () => void;
  posting?: boolean;
};

const fallbackData = { curYearSpends: [], prevYearSpends: [] };

export const InsightCard = ({
  groupBy: groupByProp,
  dateRange: dateRangeProp,
  props: propsProp,
  onPost,
  onDeleteSuccess,
  feed,
  posting,
  errors,
}: InsightCardProps) => {
  const [hoveredItemId, setHoveredItemId] = React.useState<number>();

  const {
    insight: {
      dateRange = dateRangeProp,
      groupBy = groupByProp,
      props = propsProp,
      name = '',
    } = {},
  } = feed ?? {};

  const { insightSpendings = fallbackData } = useInsightSpendings({
    props: props!,
    periods: [],
    dateRange: dateRange!,
    groupBy: groupBy!,
  });

  const { curYearSpends, prevYearSpends } = insightSpendings;

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  const { mentions } = useMentions();

  const hasNameError = !!errors.name;

  const renderErrorName = () => {
    return (
      <div className="flex flex-row items-center px-2 space-x-1 my-1">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Insight name is required</p>
      </div>
    );
  };

  return (
    <div className={clsx('rounded-card border-card shadow-card overflow-hidden', 'bg-white')}>
      <div
        className="h-3"
        style={{ background: 'linear-gradient(138.74deg, #395BD4 -12.96%, #82B2B3 100%)' }}
      ></div>
      <div className={clsx('py-6 px-8')}>
        <div className="grid grid-cols-10">
          {feed ? (
            <>
              <Input
                readOnly
                value={name}
                variant="underline"
                className="font-bold text-lg col-span-7"
              />
              <div className="col-span-3 flex items-center justify-end">
                <InsightCardActionMenu feed={feed} onDeleteSuccess={onDeleteSuccess} />
              </div>
            </>
          ) : (
            <Form.Input
              name="name"
              rules={{
                required: true,
                validate: {
                  required: (value) => !!value.length,
                },
              }}
              readOnly={!!feed}
              variant="underline"
              className="font-bold text-lg col-span-7"
              placeholder="Name this insight..."
            />
          )}
        </div>
        {hasNameError && renderErrorName()}
        <div className={clsx('relative top-5', 'grid grid-cols-10 gap-4')}>
          <div className="col-span-7">
            <div className="flex gap-4 h-10">
              <div>
                <div className="flex gap-1 items-center text-xs text-Gray-6">
                  <div className="w-1.5 h-1.5 rounded bg-Accent-2"></div>
                  <span>Spend</span>
                </div>
                <p className="text-primary font-bold font-sm">{getDisplayUsdAmount(totalSpend)}</p>
              </div>
              <div>
                <div className="flex gap-1 items-center text-xs text-Gray-6">
                  <div className="w-1.5 h-1.5 rounded bg-Gray-6"></div>
                  <span>Last Year</span>
                </div>
                <p className="text-primary font-bold font-sm">
                  {getDisplayUsdAmount(totalSpendLastYear)}
                </p>
              </div>
            </div>
            <div className="h-[400px] mt-3 flex-1 border border-Gray-12 rounded-lg px-4 pt-10 pb-6">
              {!groupBy ? (
                <SpendingBarChart thisYearData={curYearSpends} lastYearData={prevYearSpends} />
              ) : (
                <GroupedSpendingChart data={insightSpendings} highlightedItemId={hoveredItemId} />
              )}
            </div>
          </div>
          {!!groupBy && (
            <GroupedSpendingChartLegends
              spendings={curYearSpends}
              groupBy={groupBy}
              highlightedItemId={hoveredItemId}
              onItemMouseEnter={setHoveredItemId}
              onItemMouseLeave={() => setHoveredItemId(undefined)}
              className="col-span-3 w-auto"
            />
          )}
        </div>
      </div>
      <Divider />
      {feed ? (
        <CommentsSection feed={feed} />
      ) : (
        <div className="py-4 px-18">
          <CommentBox
            allowEmpty
            alwaysShowTools
            mentionData={mentions}
            onSubmit={onPost}
            className="!rounded-lg"
            placeholder="@mention people or teams to your share insights"
            renderSubmitButton={({ disabled, onClick }) => (
              <Button
                loading={posting}
                variant="solid"
                colorScheme="accent"
                size="sm"
                disabled={disabled}
                onClick={onClick}
                iconRight={<EssentialsSendEnableIcon />}
                className="px-6"
              >
                Post
              </Button>
            )}
          />
        </div>
      )}
    </div>
  );
};
