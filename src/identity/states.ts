import { AuthApis } from '@/auth/apis';
import { AuthProfile } from '@/auth/types';
import { atom, AtomEffect, selector } from 'recoil';
import { Identity } from './types';

const localStorageEffect: AtomEffect<Identity | undefined> = ({ setSelf, onSet }) => {
  const key = 'identity';
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    if (newValue === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

export const identityState = atom<Identity | undefined>({
  key: 'common/identity', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
  effects_UNSTABLE: [localStorageEffect],
});

export const authProfileState = selector<AuthProfile | null>({
  key: 'admin/authProfile',
  get: async ({ get }) => {
    get(identityState);
    try {
      return await AuthApis.getProfile();
    } catch {
      return null;
    }
  },
});
