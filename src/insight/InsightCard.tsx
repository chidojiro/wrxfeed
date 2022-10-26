import { EssentialsSendEnableIcon } from '@/assets';
import { Button, Divider, Input } from '@/common/components';
import { CommentBox } from '@/feed/CommentBox';
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
import { useFormContext } from 'react-hook-form';
import { InsightApis } from './apis';
import { useInsightSpendings } from './useInsightSpendings';

export type InsightCardProps = {
  groupBy: Entities;
  dateRange: DateRangeFilter;
  props: Property[];
};

const fallbackData = { curYearSpends: [], prevYearSpends: [] };

export const InsightCard = ({ groupBy, dateRange, props }: InsightCardProps) => {
  const [hoveredItemId, setHoveredItemId] = React.useState<number>();
  const { insightSpendings = fallbackData } = useInsightSpendings({
    props,
    periods: [],
    dateRange,
    groupBy,
  });

  const { handleSubmit } = useFormContext();

  const { curYearSpends, prevYearSpends } = insightSpendings;

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  const { mentions } = useMentions();

  return (
    <div className={clsx('rounded-card border-card shadow-card overflow-hidden', 'bg-white')}>
      <div
        className="h-3"
        style={{ background: 'linear-gradient(138.74deg, #395BD4 -12.96%, #82B2B3 100%)' }}
      ></div>
      <div className="py-6 px-8">
        <Input
          value="Sales team spend on Delta"
          variant="underline"
          className="font-bold text-lg"
        />
        <div className="flex gap-4 relative top-5">
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
        <div className="flex gap-8 h-full items-stretch">
          <div className="h-[400px] mt-8 flex-1 border border-Gray-12 rounded-lg px-4 pt-10 pb-6">
            {!groupBy ? (
              <SpendingBarChart thisYearData={curYearSpends} lastYearData={prevYearSpends} />
            ) : (
              <GroupedSpendingChart data={insightSpendings} highlightedItemId={hoveredItemId} />
            )}
          </div>
          {!!groupBy && (
            <GroupedSpendingChartLegends
              spendings={curYearSpends}
              groupBy={groupBy}
              highlightedItemId={hoveredItemId}
              onItemMouseEnter={setHoveredItemId}
              onItemMouseLeave={() => setHoveredItemId(undefined)}
            />
          )}
        </div>
      </div>
      <Divider />
      <div className="py-4 px-18">
        <CommentBox
          alwaysShowTools
          mentionData={mentions}
          onSubmit={() => handleSubmit((data: any) => InsightApis.create(data))()}
          className="!rounded-lg"
          placeholder="@mention people or teams to your share insights"
          renderSubmitButton={({ disabled, onClick }) => (
            <Button
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
    </div>
  );
};
