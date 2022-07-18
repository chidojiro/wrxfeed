/// <reference types="node" />

declare module '*.module.css' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg' {
  import React from 'react';

  export const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;
  const src: string;
  export default src;
}

declare module '@microlink/react';
