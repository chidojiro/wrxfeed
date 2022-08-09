import { AssertUtils } from '@/common/utils';
import React from 'react';

type UseControllableProps<TValue, TOnChangeValue> = {
  value?: TValue;
  defaultValue: TValue;
  onChange?: (valueOrEvent: TOnChangeValue) => void;
};

type SetControllableStateParams<TInternalValue, TOnChangeValue> = {
  internal: TInternalValue | ((value: TInternalValue) => TInternalValue);
  external: TOnChangeValue;
};

export type SetControllableState<TValue, TOnChangeValue = unknown> = (
  value: TValue | SetControllableStateParams<TValue, TOnChangeValue>,
) => void;

export const useControllableState = <TValue, TOnChangeValue>({
  value: valueProp,
  onChange,
  defaultValue,
}: UseControllableProps<TValue, TOnChangeValue>): [
  TValue,
  SetControllableState<TValue, TOnChangeValue>,
] => {
  const isControlled = !AssertUtils.isNullOrUndefined(valueProp);
  const prevValueRef = React.useRef(defaultValue);

  const [internalState, setInternalState] = React.useState(defaultValue);

  const state = React.useMemo(
    () => (isControlled ? valueProp : internalState),
    [internalState, isControlled, valueProp],
  );

  const setState: SetControllableState<TValue, TOnChangeValue> = React.useCallback(
    (newState) => {
      let computedInternal;
      let computedExternal;

      if ('internal' in newState && 'external' in newState) {
        const { external, internal } = newState;
        computedInternal = AssertUtils.isFunction(internal)
          ? internal(prevValueRef.current)
          : internal;
        computedExternal = external;
      } else {
        computedInternal = newState;
        computedExternal = AssertUtils.isFunction(newState)
          ? newState(prevValueRef.current)
          : newState;
      }

      if (!isControlled) {
        setInternalState(computedInternal);
      }
      onChange?.(computedExternal);

      prevValueRef.current = internalState;
    },
    [internalState, isControlled, onChange],
  );

  return React.useMemo(() => [state, setState], [state, setState]);
};
