// Site config
export const PROD_URL = '';
export const LOCAL_URL = 'http://localhost:3000';

// Development
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_PROD = process.env.NODE_ENV === 'production';

// JWT
export const JWT_LOCAL_STORAGE_KEY = 'Connect4.JWT';

// GraphQL
const GRAPHCOOL_PROJECT_ALIAS = IS_PROD ? '' : '';
export const GRAPHCOOL_HTTP_ENDPOINT = 'https://api.graph.cool/simple/v1/' + GRAPHCOOL_PROJECT_ALIAS;
export const GRAPHCOOL_WS_ENDPOINT = 'wss://subscriptions.graph.cool/v1/' + GRAPHCOOL_PROJECT_ALIAS;

// Slack Login
const SLACK_CLIENT_ID = '';
export const SLACK_CLIENT_URL = `https://slack.com/oauth/authorize` +
  `?scope=identity.basic,identity.avatar,identity.team,identity.email` +
  `&client_id=` + SLACK_CLIENT_ID +
  `&redirect_uri=${IS_PROD ? encodeURIComponent(PROD_URL + '/oauth') : encodeURIComponent(LOCAL_URL + '/oauth')}`;

// Bugsnag
export const BUGSNAG_API_KEY = '';
