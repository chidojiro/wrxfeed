import {
  CategoryFeedBadgeIcon,
  InsightFeedBadgeIcon,
  TargetFeedBadgeIcon,
  TransactionFeedBadgeIcon,
} from '@/assets';
import clsx from 'clsx';
import { FeedCardBadge } from './FeedCardBadge';

export type FeedCardHeaderProps = JSX.IntrinsicElements['div'] & {
  type: 'TRANSACTION' | 'CATEGORY' | 'INSIGHT' | 'TARGET';
};

export const FeedCardHeader = ({ type }: FeedCardHeaderProps) => {
  const backgroundGradient = (() => {
    switch (type) {
      case 'TRANSACTION':
        return 'linear-gradient(90.53deg, #7BD1D1 9.6%, #59A5DE 31.55%, #2B72F2 60.12%, #2065F6 76.85%, #2065F6 97.24%, #2065F6 105.51%)';
      case 'TARGET':
        return 'linear-gradient(270.78deg, #4E3FAA -29.55%, #8A6FEC 19.81%, #9279ED 44.54%, #EBA947 132.22%)';
      case 'CATEGORY':
        return 'linear-gradient(116.55deg, #CA77B3 12.8%, #514EE7 79.48%)';
      case 'INSIGHT':
        return 'linear-gradient(90.64deg, #D98551 0.34%, #D27449 20.62%, #D7834C 40.08%, #E9AE57 65.42%, #F0C35D 80.26%, #F6D160 98.34%, #F8D85F 105.67%)';
      default:
        return '';
    }
  })();

  const badge = (() => {
    switch (type) {
      case 'TRANSACTION':
        return <TransactionFeedBadgeIcon />;
      case 'TARGET':
        return <TargetFeedBadgeIcon />;
      case 'CATEGORY':
        return <CategoryFeedBadgeIcon />;
      case 'INSIGHT':
        return <InsightFeedBadgeIcon />;
      default:
        return null;
    }
  })();

  const label = (() => {
    switch (type) {
      case 'TRANSACTION':
        return 'TRANSACTION';
      case 'TARGET':
        return 'TARGET';
      case 'CATEGORY':
        return 'CATEGORY ROLLUP';
      case 'INSIGHT':
        return 'INSIGHT';
      default:
        return null;
    }
  })();

  return (
    <div
      className={clsx(
        'pl-[88px] w-full h-[30px] rounded-t-card',
        'flex items-center',
        'text-white font-bold text-2xs',
        'relative',
      )}
      style={{
        background: backgroundGradient,
      }}
    >
      <FeedCardBadge
        style={{
          background: backgroundGradient,
        }}
      >
        {badge}
      </FeedCardBadge>
      {label}
    </div>
  );
};
