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
          (channel: Department | Category | Vendor) => {
            const newHref = `/${key}/${channel.id}`;
            return {
              name: channel.name,
              href: newHref,
              icon: null,
              subscription: {
                type: key as keyof Subscription,
                item: channel,
              },
              removable: true,
            };
          },
        ) || []),
      ],
      [],
    );
  }, [subscription]);

  function subscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    const newSubscription: Subscription = cloneDeep(subscription);
    switch (type) {
      case 'departments':
        if (newSubscription.departments) {
          newSubscription.departments.push(channel as Department);
        } else {
          newSubscription.departments = [channel];
        }
        break;
      case 'categories':
        if (newSubscription.categories) {
          newSubscription.categories.push(channel as Category);
        } else {
          newSubscription.categories = [channel as Category];
        }
        break;
      case 'vendors':
        if (newSubscription.vendors) {
          newSubscription.vendors.push(channel as Vendor);
        } else {
          newSubscription.vendors = [channel];
        }
        break;
      default:
        return;
    }
    setSubscription(newSubscription);
  }

  function unsubscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    if (!subscription[type]?.length) return;
    const newSubscription: Subscription = cloneDeep(subscription);
    switch (type) {
      case 'departments':
        newSubscription.departments = newSubscription.departments?.filter(
          (sub) => sub.id !== channel.id,
        );
        break;
      case 'categories':
        newSubscription.categories = newSubscription.categories?.filter(
          (sub) => sub.id !== channel.id,
        );
        break;
      case 'vendors':
        newSubscription.vendors = newSubscription.vendors?.filter((sub) => sub.id !== channel.id);
        break;
      default:
        return;
    }
    setSubscription(newSubscription);
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
