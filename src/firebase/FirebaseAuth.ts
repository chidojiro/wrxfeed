import React from 'react';
import * as firebase from 'firebase/app';
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  getAuth,
  Auth,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
  Unsubscribe,
  AuthProvider,
} from 'firebase/auth';
import { Identity } from '@identity';

export interface FirebaseKeys {
  API_KEY: string;
  AUTH_DOMAIN: string;
  DATABASE_URL: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
  MEASUREMENT_ID: string;
}

/**
 * Context that will be use to inject our firebase
 * encapsulation class object to be easily reusable by
 * our application.
 */
export const FirebaseContext = React.createContext(null);

export const AUTHENTICATION_LOADING = 'AUTHENTICATION_LOADING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATED_ANONYMOUSLY = 'AUTHENTICATED_ANONYMOUSLY';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

type SupportedAuthProvider =
  | AuthProvider
  | GoogleAuthProvider
  | FacebookAuthProvider
  | EmailAuthProvider;

// const supportedPopupSignInMethods: string[] = [
//   GoogleAuthProvider.PROVIDER_ID,
//   FacebookAuthProvider.PROVIDER_ID,
//   EmailAuthProvider.PROVIDER_ID,
// ];

export class FirebaseAuth {
  protected readonly auth: Auth;

  protected readonly googleLoginProvider: GoogleAuthProvider;

  protected readonly facebookLoginProvider: FacebookAuthProvider;

  protected readonly emailAuthProvider: EmailAuthProvider;

  constructor(firebaseKeys: FirebaseKeys) {
    // Do not initialize the app if this step was already done.
    if (!firebase.getApps().length) {
      firebase.initializeApp({
        apiKey: firebaseKeys.API_KEY,
        authDomain: firebaseKeys.AUTH_DOMAIN,
        databaseURL: firebaseKeys.DATABASE_URL,
        projectId: firebaseKeys.PROJECT_ID,
        storageBucket: firebaseKeys.STORAGE_BUCKET,
        messagingSenderId: firebaseKeys.MESSAGING_SENDER_ID,
        appId: firebaseKeys.APP_ID,
        measurementId: firebaseKeys.MEASUREMENT_ID,
      });
    }

    this.googleLoginProvider = new GoogleAuthProvider();
    this.facebookLoginProvider = new FacebookAuthProvider();
    this.emailAuthProvider = new EmailAuthProvider();
    this.auth = getAuth();
  }

  getProvider(providerId: string): SupportedAuthProvider | Error {
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        return this.googleLoginProvider;
      case FacebookAuthProvider.PROVIDER_ID:
        return this.facebookLoginProvider;
      case EmailAuthProvider.PROVIDER_ID:
        return this.emailAuthProvider;
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  /* Updates the authentication everytime a change is received */
  authState = (setAuthState: (identity: Identity | unknown) => void): Unsubscribe =>
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthState({
          status: user.isAnonymous ? AUTHENTICATED_ANONYMOUSLY : AUTHENTICATED,
          user,
          email: user.email,
          displayName: user.displayName,
          token,
        });
        // } else {
        // await this.signInAnonymously(setAuthState);
      }
    });

  signInWithGoogle = async (
    setAuthState: (identity: Identity | unknown) => void,
    callback: (user: User | null | undefined) => void,
  ): Promise<void> => {
    try {
      await signInWithPopup(this.auth, this.googleLoginProvider);
      const user = this.auth.currentUser;
      const token = await user?.getIdToken();
      console.log(user);
      setAuthState({
        status: user?.isAnonymous ? AUTHENTICATED_ANONYMOUSLY : AUTHENTICATED,
        user,
        email: user?.email,
        displayName: user?.displayName,
        token,
      });
      callback(user);
    } catch (error) {
      setAuthState({ status: UNAUTHENTICATED, error });
      console.log('signInWithGoogle failed: ', error);
    }
  };

  /*
   * Returns providers for currently signed in user.
   */
  providersForEmail = async (email: string): Promise<string[]> => {
    return fetchSignInMethodsForEmail(this.auth, email);
  };

  /*
   * Returns whether the user is only logged in using password provider.
   */
  userHasOnlyEmailProvider = async (email: string | null): Promise<boolean> => {
    let providers;
    if (email) {
      providers = await this.providersForEmail(email);
    } else {
      const user = this.auth.currentUser;
      if (!user || !user.email) {
        return false;
      }
      providers = await this.providersForEmail(user.email);
    }
    return providers.length === 1 && providers[0] === EmailAuthProvider.PROVIDER_ID;
  };

  /**
   * Links an email with their credential from provider A to already existing provider B.
   * This is needed when a user uses the same email to login with google and subsequently with
   * facebook for example.
   */
  // linkProviders = async (email: string, credential) => {
  //   const providers = await fetchSignInMethodsForEmail(this.auth, email);
  //   const firstPopupProviderMethod = providers.find((p) => supportedPopupSignInMethods.includes(p));
  //   if (!firstPopupProviderMethod) {
  //     throw new Error("Your account is linked to a provider that isn't supported.");
  //   }
  //   const linkedProvider = this.getProvider(firstPopupProviderMethod);
  //   linkedProvider.setCustomParameters({ login_hint: email });
  //   try {
  //     const result = await signInWithPopup(this.auth, linkedProvider);
  //     result.user.linkWithCredential(credential);
  //   } catch (error) {
  //     console.log('linkWithCredentials failed: ', error);
  //   }
  // };

  signInWithFacebook = async (
    setAuthState: (identity: Identity | unknown) => void,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ): Promise<void> => {
    try {
      setAuthState({ status: AUTHENTICATION_LOADING });
      await signInWithPopup(this.auth, this.facebookLoginProvider);
    } catch (error: any) {
      // if (error?.code === 'auth/account-exists-with-different-credential') {
      //   const userHasOnlyEmailProvider = await this.userHasOnlyEmailProvider(error.email);
      //   // TODO: Handle link facebook with email provider.
      //   if (userHasOnlyEmailProvider) {
      //     onError(error);
      //     setAuthState({ status: UNAUTHENTICATED });
      //   } else {
      //     await this.linkProviders(error.email, error.credential);
      //   }
      // } else {
      onError(error);
      setAuthState({ status: UNAUTHENTICATED });
      console.log('signInWithFacebook failed: ', error);
      // }
    }
  };

  // updateEmailAddress = async (email: string, callback: () => void): Promise<void> => {
  //   const user = this.auth.currentUser;
  //   try {
  //     await user?.updateEmail(email);
  //     callback();
  //   } catch (error) {
  //     console.log('updateEmail failed: ', error);
  //   }
  // };

  sendPasswordResetEmail = async (
    email: string,
    callback: () => void,
    onError: (error: any) => void,
  ): Promise<void> => {
    try {
      await sendPasswordResetEmail(this.auth, email);
      callback();
    } catch (error) {
      onError(error);
      console.log('sendPasswordResetEmail failed: ', error);
    }
  };

  // sendEmailVerification = async (
  //   callback: () => void,
  //   onError: (error: any) => void,
  // ): Promise<void> => {
  //   const user = this.auth?.currentUser;
  //   try {
  //     await user.sendEmailVerification({
  //       url: window.location.href,
  //       handleCodeInApp: true,
  //     });
  //     callback && callback();
  //   } catch (error) {
  //     onError && onError(error);
  //     console.log('sendEmailVerification failed: ', error.message);
  //   }
  // };

  // updateUserDisplayName = async (name) => {
  //   const user = this.auth?.currentUser;
  //   try {
  //     await user.updateProfile({
  //       displayName: name,
  //     });
  //   } catch (error) {
  //     console.log('updateUserDisplayName failed: ', error);
  //   }
  // };

  /* Creates a user using email and password. This  method also goes ahead and updates the username */
  signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
    setAuthState: (identity: Identity | unknown) => void,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ): Promise<void> => {
    setAuthState({ status: AUTHENTICATION_LOADING });
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      // await this.sendEmailVerification();
      // await this.updateUserDisplayName(name);
      const user = this.auth?.currentUser;
      callback(user);
    } catch (error) {
      onError(error);
      console.log('signUpWithEmailAndPassword failed: ', error);
    }
  };

  signInWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
    setAuthState: (identity: Identity | unknown) => void,
    callback: (user: User | null | undefined) => void,
    onError: (error: any) => void,
  ): Promise<void> => {
    try {
      setAuthState({ status: AUTHENTICATION_LOADING });
      await signInWithEmailAndPassword(this.auth, email, password);
      const user = this.auth?.currentUser;
      callback(user);
    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        throw new Error('Email already used for authentication.');
      } else if (!onError) {
        throw new Error('signInWithEmailAndPassword failed');
      } else {
        onError(error);
      }
    }
  };

  signOut = async (setAuthState: (identity: Identity | unknown) => void): Promise<void> => {
    try {
      setAuthState({ status: AUTHENTICATION_LOADING });
      await signOut(this.auth);
      // await this.signInAnonymously(setAuthState);
    } catch (error) {
      console.log('signOut failed: ', error);
      setAuthState({ status: UNAUTHENTICATED, error });
    }
  };
}

export default FirebaseAuth;
