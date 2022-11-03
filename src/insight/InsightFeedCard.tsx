import { InsightCard } from './InsightCard';
import { InsightFeedItem } from './types';

export type InsightFeedCardProps = {
  feed: InsightFeedItem;
  onInsightDeleteSuccess?: () => void;
};

export const InsightFeedCard = ({ feed, onInsightDeleteSuccess }: InsightFeedCardProps) => {
  return <InsightCard feed={feed} onDeleteSuccess={onInsightDeleteSuccess} />;
};
