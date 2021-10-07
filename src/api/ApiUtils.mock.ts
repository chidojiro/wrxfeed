import { UserToken } from '@identity/types';
import { Comment, Transaction } from '@main/entity';
import { Identity } from '@identity';
import { sleep } from '@common/utils';

export const fakeApiUtils = {
  login: async () => {
    const fakeIdenity: Identity = {
      id: 1,
      fullName: 'Admin',
      token: '',
      expireAt: new Date().toISOString(),
      email: '',
    };
    return fakeIdenity;
  },

  signInWithGoogle: async () => {
    const userToken: UserToken = {
      token: '',
      expireAt: new Date().toISOString(),
    };
    return userToken;
  },

  logout: async () => undefined,

  getProfile: async () => {
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

  updateProfile: async () => {
    return {
      id: 1,
      email: 'antran@gmail.com',
      fullName: 'An Tran',
      title: 'Admin',
      department: 'Dev',
      signupDate: new Date().toISOString(),
    };
  },

  changePassword: async () => undefined,

  forgotPassword: async () => undefined,

  resetPassword: async () => undefined,

  async getTransactions(): Promise<Transaction[]> {
    return [];
  },

  async getComments(): Promise<Comment[]> {
    return [];
  },
};
