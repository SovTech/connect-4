// Starting point of application includes routing

// Load the env config
require('dotenv').config();

import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Normalize } from 'styled-normalize';
import { client } from './apollo';
import { ErrorBoundary, ErrorScreen } from './components';
import { JWT_LOCAL_STORAGE_KEY } from './constants';
import Dashboard from './containers/Dashboard';
import Leaderboard from './containers/Leaderboard';
import Login from './containers/Login';
import OAuth from './containers/OAuth';
import { PageNotFound } from './containers/PageNotFound';
import SingleGame from './containers/SingleGame';
import { GlobalStyle } from './globalStyles';
import registerServiceWorker from './registerServiceWorker';
import { isTokenValid, showToast } from './utils';

const PrivateRoute = ({component: Component, ...rest}: any) => (
  <Route
    {...rest}
    render={props => (
      isLoggedIn()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />
    )}
  />
);

const LoginRoute = ({component: Component, ...rest}: any) => (
  <Route
    {...rest}
    render={props => (
      !isLoggedIn()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />
    )}
  />
);

function isLoggedIn() {
  return isTokenValid(window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY));
}

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <ApolloProvider client={client}>
      <Normalize />
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <LoginRoute exact={true} path='/' component={Login} />
          <Route path='/oauth' component={OAuth} />
          <PrivateRoute exact={true} path='/dashboard' component={Dashboard} />
          <PrivateRoute exact={true} path='/dashboard/:id' component={SingleGame} />
          <PrivateRoute exact={true} path='/leaderboard' component={Leaderboard} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
    <ToastContainer />
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement);
registerServiceWorker((message: string) => showToast(<a onClick={() => location.reload()}>{message}</a>, false));
