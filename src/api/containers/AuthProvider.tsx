import React, { useContext, useState, useEffect } from 'react';
import AuthStateContext from '@api/contexts/AuthContext';
import { User } from 'firebase/auth';
import { Identity, useSetIdentity } from '@identity';

interface AuthStateProviderProps {
  Firebase: any;
}

const AuthStateProvider: React.FC<AuthStateProviderProps> = ({ children, Firebase }) => {
  const [authState, setAuthState] = useState<Identity>();
  const setIdentity = useSetIdentity();

  const signOut = () => Firebase.signOut(setAuthState);
  const signUpWithEmailAndPassword = (
    email: string,
    password: string,
    name: string,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => {
    const expandedOnError = (error: any) => {
      // If there is an error with the login we will rollback to the last auth state.
      setAuthState(authState);
      onError(error);
    };
    Firebase.signUpWithEmailAndPassword(
      email,
      password,
      name,
      setAuthState,
      callback,
      expandedOnError,
    );
  };

  const signInWithEmailAndPassword = (
    email: string,
    password: string,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => {
    const expandedOnError = (error: any) => {
      // If there is an error with the login we will rollback to the last auth state.
      setAuthState(authState);
      onError(error);
    };
    Firebase.signInWithEmailAndPassword(email, password, setAuthState, callback, expandedOnError);
  };
  const signInWithFacebook = (
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => Firebase.signInWithFacebook(setAuthState, callback, onError);

  const signInWithGoogle = (callback: (user: User | null | undefined) => void) => {
    Firebase.signInWithGoogle(setIdentity, callback);
  };

  const updateEmailAddress = (email: string, callback: (user: User | null | undefined) => void) =>
    Firebase.updateEmailAddress(email, callback);

  const sendPasswordResetEmail = (
    email: string,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => Firebase.sendPasswordResetEmail(email, callback, onError);

  const sendEmailVerification = (
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ) => Firebase.sendEmailVerification(callback, onError);

  const userHasOnlyEmailProvider = () => Firebase.userHasOnlyEmailProvider();
  useEffect(() => {
    const unsubscribe = Firebase.authState(setAuthState);
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthStateContext.Provider
      value={{
        signOut,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithFacebook,
        signInWithGoogle,
        updateEmailAddress,
        sendPasswordResetEmail,
        sendEmailVerification,
        userHasOnlyEmailProvider,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export default AuthStateProvider;

export const useAuthStateContext = () => useContext(AuthStateContext);
