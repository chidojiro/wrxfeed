import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface AuthStateProps {
  signOut: () => void;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    name: string,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => void;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => void;
  signInWithFacebook: (
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => void;
  signInWithGoogle: (callback: (user: User | null | undefined) => void) => void;
  updateEmailAddress: (email: string, callback: (user: User | null | undefined) => void) => void;
  sendPasswordResetEmail: (
    email: string,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => void;
  sendEmailVerification: (
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => void;
  userHasOnlyEmailProvider: () => void;
}

export default createContext<AuthStateProps | undefined>(undefined);
