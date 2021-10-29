import { UserToken, Identity } from '@identity/types';
import { Comment, Transaction } from '@main/entity';
import { sleep } from '@common/utils';
import { Profile } from '@auth/types';

export const fakeApiUtils = {
  login: async (): Promise<Identity> => {
    return {
      id: 1,
      fullName: 'Admin',
      token: '',
      expireAt: new Date().toISOString(),
      email: '',
    };
  },

  signInWithGoogle: async (): Promise<UserToken> => {
    return {
      token: '',
      expireAt: new Date().toISOString(),
    };
  },

  logout: async (): Promise<void> => undefined,

  getProfile: async (): Promise<Profile> => {
    await sleep(1000);
    return {
      id: 1,
      email: 'antran@gmail.com',
      fullName: 'An Tran',
      title: 'Admin',
      department: 'Dev',
      signupDate: new Date().toISOString(),
    };
  },

  resetPassword: async (): Promise<void> => undefined,

  async getTransactions(): Promise<Transaction[]> {
    return [];
  },

  async getComments(): Promise<Comment[]> {
    return [];
  },
};
