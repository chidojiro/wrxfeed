import { ModalProps } from '@/common/atoms/Modal';
import React from 'react';

type BaseModalProps = Pick<ModalProps, 'open'>;

export const withMountOnDemandModal =
  <T extends BaseModalProps>(Component: (props: T) => JSX.Element | null) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    if (!props.open) return null;

    return <Component {...props} />;
  };
