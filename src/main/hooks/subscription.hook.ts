import { Category, Department, Subscription, Vendor } from '@main/entity';
import { subscriptionState } from '@main/states/subscription.state';
import { useRecoilState } from 'recoil';
import cloneDeep from 'lodash.clonedeep';
import { useApi } from '@api';
import { toast } from 'react-toastify';

interface SubscriptionHookValues {
  subscription: Subscription | null;
  subscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  unsubscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  isFollowing: (type: keyof Subscription, channel: Department | Category | Vendor) => boolean;
}
export function useSubscription(): SubscriptionHookValues {
  const ApiClient = useApi();
  const [subscription, setSubscription] = useRecoilState(subscriptionState);

  function unsubscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    // Call API to unsubscribe follow data
    ApiClient.updateSubscriptions({ [type]: [channel.id] })
      .then(() => {
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
            newSubscription.vendors = newSubscription.vendors?.filter(
              (sub) => sub.id !== channel.id,
            );
            break;
          default:
            return;
        }
        setSubscription(newSubscription);
      })
      .catch(() => {
        toast.error(`Can not unfollow ${channel.name}. Please check your network and try again.`);
      });
  }

  function subscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    // Call API to update follow data
    ApiClient.updateSubscriptions({ [type]: [channel.id] })
      .then(() => {
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
      })
      .catch(() => {
        toast.error(`Can not follow ${channel.name}. Please check your network and try again.`);
      });
  }

  function isFollowing(type: keyof Subscription, channel: Department | Category | Vendor): boolean {
    return !!subscription[type]?.some((subItem) => subItem.id === channel.id);
  }

  return {
    subscription,
    subscribe,
    unsubscribe,
    isFollowing,
  };
}
