import { DEV_SLACK_CHANNEL, LOCAL_URL, PROD_ALIAS, PROD_URL, SLACK_CHANNEL } from '../constants';

/**
 * Returns the ENV name - don't show on PROD
 * @param alias
 */
export function getSlackChannelFromAlias(alias: string) {
  switch (alias) {
    case PROD_ALIAS:
      return SLACK_CHANNEL;
    default:
      return DEV_SLACK_CHANNEL;
  }
}

/**
 * Returns the url give the alias
 * @param alias
 */
export function getSiteURLFromAlias(alias: string) {
  switch (alias) {
    case PROD_ALIAS:
      return PROD_URL;
    default:
      return LOCAL_URL;
  }
}
