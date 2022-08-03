export const BUILD_ENV = process.env.REACT_APP_BUILD_ENV || 'dev';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';
export const GOOGLE_CLIENT_ID =
  '164577332727-kmdpa1bob2qfukfr7f02hc7ad169u6kd.apps.googleusercontent.com';
export const GOOGLE_SCOPES = 'profile email';
export const UPLOAD_FILE_ACCEPT =
  'image/*,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel';
// eslint-disable-next-line prefer-destructuring
export const MICRO_LINK_API_KEY = process.env.REACT_APP_MICRO_LINK_API_KEY || '';
export const EMAIL_SUPPORT_ADDRESS = 'support@gravitylabs.co';
// Pusher configs
export const PUSHER_APP_KEY = process.env.REACT_APP_PUSHER_APP_KEY || '';
export const PUSHER_APP_CLUSTER = process.env.REACT_APP_PUSHER_APP_CLUSTER || '';
export const TEAM_SUGGEST_RANDOM_NUMBER = 4;
export const REMOVE_LINE_ITEM_NEW_STATE_TIMEOUT = 30000;
export const MIX_PANEL_PROJECT_TOKEN = process.env.REACT_APP_MIX_PANEL_PROJECT_TOKEN || '';
export const GET_TARGETS_DASHBOARD_LIMIT = 20;

export const IS_TEST = process.env.NODE_ENV === 'test';
