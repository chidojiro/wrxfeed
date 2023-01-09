export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const BUILD_ENV = process.env.REACT_APP_BUILD_ENV ?? 'dev';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';

export const MIX_PANEL_PROJECT_TOKEN = process.env.REACT_APP_MIX_PANEL_PROJECT_TOKEN ?? '';

export const PUSHER_APP_KEY = process.env.REACT_APP_PUSHER_APP_KEY ?? '';
export const PUSHER_APP_CLUSTER = process.env.REACT_APP_PUSHER_APP_CLUSTER ?? '';

export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_PROD = BUILD_ENV === 'production';
export const IS_DEV = BUILD_ENV === 'dev';
export const IS_DEMO = BUILD_ENV === 'demo';
export const IS_STAGING = BUILD_ENV === 'staging';
