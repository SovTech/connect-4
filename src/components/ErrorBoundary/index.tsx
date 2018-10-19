// ErrorBoundary to catch and send errors to Bugsnag

import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
import * as React from 'react';
import { BUGSNAG_API_KEY } from '../../constants';

const bugsnagClient = bugsnag(BUGSNAG_API_KEY);
export const ErrorBoundary = bugsnagClient.use(createPlugin(React));
