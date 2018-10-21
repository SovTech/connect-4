// OAuth Page to complete the Slack login

import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { ContainerWrapper, H2 } from '../../components';
import { bugsnagClient } from '../../components/ErrorBoundary';
import { JWT_LOCAL_STORAGE_KEY } from '../../constants';
import { SLACK_LOGIN_MUTATION } from '../../graphql/mutations';
import { getLoggedInUserId, getUrlParameterByName } from '../../utils';

interface Props extends RouteComponentProps<{}> {
  mutate: Function;
}

type State = {
  error: string;
  loading: boolean;
}

type Response = {
  slackLogin: {
    token: string;
  }
}

const withData = graphql<{}, Response, { token: string }>(SLACK_LOGIN_MUTATION);

class OAuth extends React.PureComponent<ChildProps<Props, Response>, State> {
  state = {
    error: '',
    loading: true
  };

  componentWillMount() {
    this.slackLogin(getUrlParameterByName('code') as string);
  }

  async slackLogin(token: string): Promise<void> {
    try {
      const data = await this.props.mutate({
        variables: {
          token
        }
      });
      const userToken = data.data.slackLogin.token;
      window.localStorage.setItem(JWT_LOCAL_STORAGE_KEY, userToken);
      bugsnagClient.user = {id: getLoggedInUserId(userToken)};
      this.setState({loading: false});
      this.props.history.replace('/dashboard');

    } catch (e) {
      // Some kind of error was returned -- display it in the console
      console.error('GraphQL error: ', e);
      this.setState({loading: false, error: e.message});
    }
  }

  render() {
    return (
      <ContainerWrapper>
        <H2>{this.state.loading ? 'Loading...' : 'Error 😭'}</H2>
      </ContainerWrapper>
    );
  }
}

export default withData(OAuth as any);
