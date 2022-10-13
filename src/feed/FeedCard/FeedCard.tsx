import { TargetFeedCard, TargetFeedCardProps } from './TargetFeedCard';
import { TransactionFeedItemCard, TransactionFeedItemCardProps } from './TransactionFeedItemCard';
import { TransactionsFeedCard, TransactionsFeedCardProps } from './TransactionsFeedCard';

export type FeedCardProps =
  | TransactionsFeedCardProps
  | TargetFeedCardProps
  | TransactionFeedItemCardProps;

export const FeedCard = (props: FeedCardProps) => {
  const type = props.feed.type;

  if (type === 'target') return <TargetFeedCard {...(props as any)} />;

  if (type === 'transaction') return <TransactionFeedItemCard {...(props as any)} />;

  return <TransactionsFeedCard {...props} />;
};
