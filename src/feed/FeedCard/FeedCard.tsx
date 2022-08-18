import { TargetFeedCard, TargetFeedCardProps } from './TargetFeedCard';
import { TransactionsFeedCard, TransactionsFeedCardProps } from './TransactionsFeedCard';

export type FeedCardProps = TransactionsFeedCardProps | TargetFeedCardProps;

export const FeedCard = (props: FeedCardProps) => {
  const type = props.feed.type;

  if (type === 'target') return <TargetFeedCard {...(props as any)} />;

  return <TransactionsFeedCard {...props} />;
};
