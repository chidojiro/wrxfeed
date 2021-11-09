import { Category, Department, Subscription, Vendor } from '@main/entity';
import { subscriptionState } from '@main/states/subscription.state';
import { useRecoilState } from 'recoil';
import { LeftTab } from '@common/types';
import cloneDeep from 'lodash.clonedeep';
import { useMemo } from 'react';

interface SubscriptionHookValues {
  subscription: Subscription;
  subscriptionMenuRoutes: LeftTab[];
  subscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  unsubscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  isFollowing: (type: keyof Subscription, channel: Department | Category | Vendor) => boolean;
}
export function useSubscription(): SubscriptionHookValues {
  const [subscription, setSubscription] = useRecoilState(subscriptionState);

  const subscriptionMenuRoutes = useMemo(() => {
    return Object.keys(subscription).reduce<LeftTab[]>(
      (list, key) => [
        ...list,
        ...(subscription[key as keyof Subscription]?.map(
          (channel: Department | Category | Vendor) => ({
            name: channel.name,
            href: `${key}/${channel.id}`,
            icon: null,
            subscription: {
              type: key as keyof Subscription,
              item: channel,
            },
            removable: true,
          }),
        ) || []),
      ],
      [],
    );
  }, [subscription]);

  function subscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    const newSubsciption: Subscription = cloneDeep(subscription);
    switch (type) {
      case 'departments':
        if (newSubsciption.departments) {
          newSubsciption.departments.push(channel as Department);
        } else {
          newSubsciption.departments = [channel];
        }
        break;
      case 'categories':
        if (newSubsciption.categories) {
          newSubsciption.categories.push(channel as Category);
        } else {
          newSubsciption.categories = [channel as Category];
        }
        break;
      case 'vendors':
        if (newSubsciption.vendors) {
          newSubsciption.vendors.push(channel as Vendor);
        } else {
          newSubsciption.vendors = [channel];
        }
        break;
      default:
        return;
    }
    setSubscription(newSubsciption);
  }

  function unsubscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    if (!subscription[type]?.length) return;
    const newSubsciption: Subscription = cloneDeep(subscription);
    switch (type) {
      case 'departments':
        newSubsciption.departments = newSubsciption.departments?.filter(
          (sub) => sub.id !== channel.id,
        );
        break;
      case 'categories':
        newSubsciption.categories = newSubsciption.categories?.filter(
          (sub) => sub.id !== channel.id,
        );
        break;
      case 'vendors':
        newSubsciption.vendors = newSubsciption.vendors?.filter((sub) => sub.id !== channel.id);
        break;
      default:
        return;
    }
    setSubscription(newSubsciption);
  }

  function isFollowing(type: keyof Subscription, channel: Department | Category | Vendor): boolean {
    return !!subscription[type]?.some((subItem) => subItem.id === channel.id);
  }

  return {
    subscription,
    subscriptionMenuRoutes,
    subscribe,
    unsubscribe,
    isFollowing,
  };
}
