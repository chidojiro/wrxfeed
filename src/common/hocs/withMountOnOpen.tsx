import React from 'react';
import { OpenClose } from '../types';

type OpenProps = Pick<OpenClose, 'open'>;

export const withMountOnOpen =
  <T extends OpenProps>(Component: (props: T) => JSX.Element | null) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    if (!props.open) return null;

    return <Component {...props} />;
  };
