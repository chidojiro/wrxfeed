import { isApiError } from '@/error/utils';
import { useProfile } from '@/profile/useProfile';
import { Category, Department, Subscription } from '@/main/entity';
import { subscriptionState } from '@/main/states/subscription.state';
import { SubscriptionApis } from '@/subscription/apis';
import { UpdateSubscriptionPayload } from '@/subscription/types';
import { Vendor } from '@/vendor/types';
import { cloneDeep } from 'lodash-es';
import mixpanel from 'mixpanel-browser';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

interface SubscribeCallback {
  onFollowSuccess?: () => void;
  onFollowError?: (error: unknown) => void;
  onUnfollowSuccess?: () => void;
  onUnfollowError?: (error: unknown) => void;
}
interface SubscriptionHookValues {
  subscription: Subscription | null;
  isFollowLoading: boolean;
  isUnfollowLoading: boolean;
  subscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  batchSubscribe: (subs: Subscription) => void;
  unsubscribe: (type: keyof Subscription, channel: Department | Category | Vendor) => void;
  batchUnsubscribe: (subs: Subscription) => void;
  isFollowing: (type: keyof Subscription, channel: Department | Category | Vendor) => boolean;
}
export function useSubscription(callback?: SubscribeCallback): SubscriptionHookValues {
  const [subscription, setSubscription] = useRecoilState(subscriptionState);
  const [isFollowLoading, setFollowLoading] = useState<boolean>(false);
  const [isUnfollowLoading, setUnfollowLoading] = useState<boolean>(false);

  const { profile } = useProfile();

  function unsubscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    // Call API to unsubscribe follow data
    setUnfollowLoading(true);
    SubscriptionApis.delete({ [type]: [channel.id] })
      .then(() => {
        if (callback && callback.onUnfollowSuccess) callback?.onUnfollowSuccess();
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

        mixpanel.track(`${type} Remove Subscription`, {
          user_id: profile?.id,
          email: profile?.email,
          company: profile?.company?.id,
        });
      })
      .catch((error: unknown) => {
        if (isApiError(error)) {
          toast.error(error.details?.message);
        } else {
          toast.error(`Can not unfollow ${channel.name}. Please check your network and try again.`);
        }
        if (callback && callback.onUnfollowError) callback?.onUnfollowError(error);
      })
      .finally(() => {
        setUnfollowLoading(false);
      });
  }

  function batchUnsubscribe(subs: Subscription) {
    setUnfollowLoading(true);
    const params: UpdateSubscriptionPayload = {
      departments: subs.departments?.map((dep) => dep.id) || [],
      categories: subs.categories?.map((cat) => cat.id) || [],
      vendors: subs.vendors?.map((vendor) => vendor.id) || [],
    };
    SubscriptionApis.delete(params)
      .then(() => {
        if (callback && callback.onUnfollowSuccess) callback?.onUnfollowSuccess();
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
      .catch((error: unknown) => {
        if (isApiError(error)) {
          if (error.details?.message) toast.error(error.details?.message);
        } else {
          toast.error('Can not follow these channels. Please check your network and try again.');
        }
        if (callback && callback.onUnfollowError) callback?.onUnfollowError(error);
      })
      .finally(() => {
        setUnfollowLoading(false);
      });
  }

  function subscribe(type: keyof Subscription, channel: Department | Category | Vendor) {
    setFollowLoading(true);
    // Call API to update follow data
    SubscriptionApis.update({ [type]: [channel.id] })
      .then(() => {
        if (callback && callback.onFollowSuccess) callback?.onFollowSuccess();
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

        mixpanel.track(`${type} Add Subscription`, {
          user_id: profile?.id,
          email: profile?.email,
          company: profile?.company?.id,
        });
      })
      .catch((error: unknown) => {
        if (isApiError(error)) {
          toast.error(error.details?.message);
        } else {
          toast.error(`Can not follow ${channel.name}. Please check your network and try again.`);
        }
        if (callback && callback.onFollowError) callback?.onFollowError(error);
      })
      .finally(() => {
        setFollowLoading(false);
      });
  }

  function batchSubscribe(subs: Subscription) {
    setFollowLoading(true);
    const params: UpdateSubscriptionPayload = {
      departments: subs.departments?.map((dep) => dep.id) || [],
      categories: subs.categories?.map((cat) => cat.id) || [],
      vendors: subs.vendors?.map((vendor) => vendor.id) || [],
    };
    SubscriptionApis.update(params)
      .then(() => {
        if (callback && callback.onFollowSuccess) callback?.onFollowSuccess();
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
      .catch((error: unknown) => {
        if (isApiError(error)) {
          if (error.details?.message) toast.error(error.details?.message);
        } else {
          toast.error('Can not follow these channels. Please check your network and try again.');
        }
        if (callback && callback.onFollowError) callback?.onFollowError(error);
      })
      .finally(() => {
        setFollowLoading(false);
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
    isFollowLoading,
    isUnfollowLoading,
  };
}
