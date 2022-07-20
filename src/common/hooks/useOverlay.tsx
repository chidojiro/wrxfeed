import React from 'react';
import ReactDom from 'react-dom';
import { v4 as UUID } from 'uuid';
import { AssertUtils, StringUtils } from '../utils';

export type UseOverlayProps = {
  active: boolean;
  asChildOf: React.RefObject<HTMLElement> | HTMLElement | null;
  component?: React.ReactNode;
};

const OVERLAYING_SPINNER_CLASS_NAME = StringUtils.withProjectClassNamePrefix('overlaying-spinner');
const OVERLAYING_SPINNER_DATA_SPINNER_IDS = 'data-spinnerids';

export const useOverlay = ({ active, asChildOf: asChildOfProp, component }: UseOverlayProps) => {
  const idRef = React.useRef(UUID());

  const getParentElement = React.useCallback(() => {
    return AssertUtils.isRef(asChildOfProp) ? asChildOfProp.current : asChildOfProp;
  }, [asChildOfProp]);

  const getOverlayingSpinnerContainer = React.useCallback(
    () => getParentElement()?.getElementsByClassName(OVERLAYING_SPINNER_CLASS_NAME)[0],
    [getParentElement],
  );

  const registerSpinnerId = React.useCallback(() => {
    const foundSpinnerContainer = getOverlayingSpinnerContainer();
    if (!foundSpinnerContainer) return;

    const dataSpinnerIds = (
      foundSpinnerContainer.getAttribute(OVERLAYING_SPINNER_DATA_SPINNER_IDS) || ''
    )
      .split(' ')
      .filter(Boolean);

    const newDataSpinnerIds = Array.from(new Set([...dataSpinnerIds, idRef.current]));

    foundSpinnerContainer.setAttribute(
      OVERLAYING_SPINNER_DATA_SPINNER_IDS,
      newDataSpinnerIds.join(' '),
    );
  }, [getOverlayingSpinnerContainer]);

  const unregisterSpinnerId = React.useCallback(() => {
    const foundSpinnerContainer = getOverlayingSpinnerContainer();
    if (!foundSpinnerContainer) return;

    const dataSpinnerIds = (
      foundSpinnerContainer.getAttribute(OVERLAYING_SPINNER_DATA_SPINNER_IDS) || ''
    )
      .split(' ')
      .filter(Boolean)
      .filter((id) => id !== idRef.current)
      .join(' ');

    if (!dataSpinnerIds.length) foundSpinnerContainer.remove();

    foundSpinnerContainer.setAttribute(OVERLAYING_SPINNER_DATA_SPINNER_IDS, dataSpinnerIds);
  }, [getOverlayingSpinnerContainer]);

  React.useEffect(() => {
    const parentElement = getParentElement();

    if (!parentElement) return;

    if (active) {
      const foundSpinner = getOverlayingSpinnerContainer();

      if (foundSpinner) {
        registerSpinnerId();
        return;
      }

      const containerPosition = window.getComputedStyle(parentElement).position || 'static';

      if (containerPosition === 'static') {
        parentElement.style.setProperty('position', 'relative', 'important');
      }

      const overlayingSpinnerContainer = document.createElement('div');
      overlayingSpinnerContainer.classList.add(OVERLAYING_SPINNER_CLASS_NAME);
      overlayingSpinnerContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `;
      registerSpinnerId();

      parentElement.appendChild(overlayingSpinnerContainer);

      ReactDom.render(<>{component}</>, overlayingSpinnerContainer);
    } else {
      unregisterSpinnerId();
    }
  }, [
    active,
    getOverlayingSpinnerContainer,
    registerSpinnerId,
    component,
    unregisterSpinnerId,
    getParentElement,
  ]);

  React.useEffect(() => {
    return () => {
      unregisterSpinnerId();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
