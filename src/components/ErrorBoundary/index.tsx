// Catch and send errors to Bugsnag

import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
import * as React from 'react';
import { BUGSNAG_API_KEY } from '../../constants';
import { getPackageVersionNumber } from '../../utils';

// Bugsnag client to record user meta data
export const bugsnagClient = bugsnag({apiKey: BUGSNAG_API_KEY, appVersion: getPackageVersionNumber()});

// Error Boundary component to catch errors on component level
export const ErrorBoundary = bugsnagClient.use(createPlugin(React));
