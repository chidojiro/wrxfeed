import { Category, Department, Subscription, Vendor } from '@main/entity';
import { subscriptionState } from '@main/states/subscription.state';
import { useRecoilState } from 'recoil';
import cloneDeep from 'lodash.clonedeep';
import { useApi } from '@api';
import { toast } from 'react-toastify';
import { SubscriptionParams } from '@api/types';

interface SubscriptionHookValues {
  subscription: Subscription | null;
  subscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  batchSubscribe: (subs: Subscription) => void;
  unsubscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  batchUnsubscribe: (subs: Subscription) => void;
  isFollowing: (type: keyof Subscription, channel: Department | Category | Vendor) => boolean;
}
export function useSubscription(): SubscriptionHookValues {
  const ApiClient = useApi();
  const [subscription, setSubscription] = useRecoilState(subscriptionState);

  function unsubscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    // Call API to unsubscribe follow data
    ApiClient.deleteSubscriptions({ [type]: [channel.id] })
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

  function batchUnsubscribe(subs: Subscription) {
    const params: SubscriptionParams = {
      departments: subs.departments?.map((dep) => dep.id) || [],
      categories: subs.categories?.map((cat) => cat.id) || [],
      vendors: subs.vendors?.map((vendor) => vendor.id) || [],
    };
    ApiClient.deleteSubscriptions(params)
      .then(() => {
        const newSubscription: Subscription = cloneDeep(subscription);
        // Merge remove departments
        newSubscription.departments = newSubscription.departments?.filter(
          (dep) => !params.departments?.includes(dep.id),
        );
        // Merge remove categories
        newSubscription.categories = newSubscription.categories?.filter(
          (cat) => !params.categories?.includes(cat.id),
        );
        // Merge new vendors
        newSubscription.vendors = newSubscription.vendors?.filter(
          (vendor) => !params.vendors?.includes(vendor.id),
        );
        setSubscription(newSubscription);
      })
      .catch(() => {
        toast.error('Can not follow these channels. Please check your network and try again.');
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

  function batchSubscribe(subs: Subscription) {
    const params: SubscriptionParams = {
      departments: subs.departments?.map((dep) => dep.id) || [],
      categories: subs.categories?.map((cat) => cat.id) || [],
      vendors: subs.vendors?.map((vendor) => vendor.id) || [],
    };
    ApiClient.updateSubscriptions(params)
      .then(() => {
        const newSubscription: Subscription = cloneDeep(subscription);
        // Merge new departments
        if (subs.departments?.length) {
          const depMap = new Map();
          newSubscription.departments?.forEach((dep) => depMap.set(dep.id, true));
          subs.departments?.forEach((dep) => {
            if (!depMap.has(dep.id)) {
              if (newSubscription.departments) {
                newSubscription.departments.push(dep);
              } else {
                newSubscription.departments = [dep];
              }
            }
          });
        }
        // Merge new categories
        if (subs.categories?.length) {
          const catMap = new Map();
          newSubscription.categories?.forEach((cat) => catMap.set(cat.id, true));
          subs.categories?.forEach((cat) => {
            if (!catMap.has(cat.id)) {
              if (newSubscription.categories) {
                newSubscription.categories.push(cat);
              } else {
                newSubscription.categories = [cat];
              }
            }
          });
        }
        // Merge new vendors
        if (subs.vendors?.length) {
          const vendorMap = new Map();
          newSubscription.vendors?.forEach((vendor) => vendorMap.set(vendor.id, true));
          subs.vendors?.forEach((vendor) => {
            if (!vendorMap.has(vendor.id)) {
              if (newSubscription.vendors) {
                newSubscription.vendors.push(vendor);
              } else {
                newSubscription.vendors = [vendor];
              }
            }
          });
        }
        setSubscription(newSubscription);
      })
      .catch(() => {
        toast.error('Can not follow these channels. Please check your network and try again.');
      });
  }

  function isFollowing(type: keyof Subscription, channel: Department | Category | Vendor): boolean {
    return !!subscription[type]?.some((subItem) => subItem.id === channel.id);
  }

  return {
    subscription,
    subscribe,
    batchSubscribe,
    unsubscribe,
    batchUnsubscribe,
    isFollowing,
  };
}
