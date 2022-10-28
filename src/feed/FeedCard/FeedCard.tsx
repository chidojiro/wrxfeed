import { InsightFeedCard, InsightFeedCardProps } from '@/insight/InsightFeedCard';
import { TargetFeedCard, TargetFeedCardProps } from './TargetFeedCard';
import { TransactionFeedItemCard, TransactionFeedItemCardProps } from './TransactionFeedItemCard';
import { TransactionsFeedCard, TransactionsFeedCardProps } from './TransactionsFeedCard';

export type FeedCardProps =
  | TransactionsFeedCardProps
  | TargetFeedCardProps
  | TransactionFeedItemCardProps
  | InsightFeedCardProps;

export const FeedCard = (props: FeedCardProps) => {
  const type = props.feed.type;

  if (type === 'target') return <TargetFeedCard {...(props as any)} />;

  if (type === 'transaction') return <TransactionFeedItemCard {...(props as any)} />;

  if (type === 'insight') return <InsightFeedCard {...(props as any)} />;

  return <TransactionsFeedCard {...(props as any)} />;
};
