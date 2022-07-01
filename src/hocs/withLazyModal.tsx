import { ModalProps } from '@/common/atoms/Modal';
import React from 'react';

type BaseModalProps = Pick<ModalProps, 'open'>;

export const withLazyModal =
  <T extends BaseModalProps>(Component: (props: T) => JSX.Element) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    if (!props.open) return null;

    return <Component {...props} />;
  };
