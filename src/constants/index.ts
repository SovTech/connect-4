// Testing
export const IS_TEST = process.env.NODE_ENV === 'test';

// JWT
export const JWT_LOCAL_STORAGE_KEY = process.env.JWT_LOCAL_STORAGE_KEY;

// GraphQL
export const GRAPHCOOL_HTTP_ENDPOINT = 'https://api.graph.cool/simple/v1/' + process.env.GRAPHCOOL_ALIAS;
export const GRAPHCOOL_WS_ENDPOINT = 'wss://subscriptions.graph.cool/v1/' + process.env.GRAPHCOOL_ALIAS;

// Slack Login
export const SLACK_CLIENT_URL = `https://slack.com/oauth/authorize` +
  `?scope=identity.basic,identity.avatar,identity.team,identity.email` +
  `&client_id=` + process.env.SLACK_CLIENT_ID +
  `&redirect_uri=${encodeURIComponent(process.env.SITE_URL + '/oauth')}`;

// Bugsnag
export const BUGSNAG_API_KEY = process.env.BUGSNAG_API_KEY;
