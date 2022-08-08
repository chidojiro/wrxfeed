import { AssertUtils } from '@/common/utils';
import React from 'react';

type UseControllableProps<TValue, TOnChangeValue> = {
  value?: TValue;
  defaultValue: TValue;
  onChange?: (valueOrEvent: TOnChangeValue) => void;
};

export type SetControllableState<TInternalValue, TOnChangeValue> = (params: {
  internal: TInternalValue | ((value: TInternalValue) => TInternalValue);
  external: TOnChangeValue;
}) => void;

export const useControllable = <TValue, TOnChangeValue>({
  value: valueProp,
  onChange,
  defaultValue,
}: UseControllableProps<TValue, TOnChangeValue>) => {
  const isControlled = !AssertUtils.isNullOrUndefined(valueProp);
  const prevValueRef = React.useRef(defaultValue);

  const [internalState, setInternalState] = React.useState(defaultValue);

  const state = React.useMemo(
    () => (isControlled ? valueProp : internalState),
    [internalState, isControlled, valueProp],
  );

  const setState: SetControllableState<TValue, TOnChangeValue> = React.useCallback(
    ({ internal, external }) => {
      const internalState = AssertUtils.isFunction(internal)
        ? internal(prevValueRef.current)
        : internal;

      if (!isControlled) {
        setInternalState(internalState);
      }
      onChange?.(external);

      prevValueRef.current = internalState;
    },
    [isControlled, onChange],
  );

  return React.useMemo(
    () => [state, setState] as [typeof state, typeof setState],
    [state, setState],
  );
};
