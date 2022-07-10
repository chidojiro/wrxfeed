import React from 'react';
import { useDelayableState } from '../hooks';
import { OpenClose } from '../types';

type OpenProps = OpenClose;

export const withMountOnOpen =
  <T extends OpenProps>(Component: (props: T) => JSX.Element | null) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const [tempProps, setTempProps] = React.useState<T | Record<string, never>>(props);
    const [delayabeOpen, setDelayableOpen] = useDelayableState(500, props.open);

    React.useEffect(() => {
      setDelayableOpen(!!props.open, !props.open);
    }, [props.open, setDelayableOpen]);

    React.useEffect(() => {
      if (delayabeOpen) {
        setTempProps(props);
      } else {
        setTempProps({});
      }
    }, [delayabeOpen, props]);

    if (!delayabeOpen) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { open, onClose, ...restProps } = tempProps;

    return <Component {...(restProps as any)} onClose={props.onClose} open={props.open} />;
  };
