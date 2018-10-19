import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ContainerWrapper, ErrorBoundary, ErrorMessage, GameCard, H2, H3, Header } from '../../components';
import { SINGLE_GAME, SingleGameQuery } from '../../graphql/queries';

type MatchParams = {
  id: string;
}

export default class SingleGame extends React.Component<RouteComponentProps<MatchParams>> {
  render() {
    return (
      <ContainerWrapper>
        <Header />

        <Link to='/dashboard'>
          <h2>Back To Dashboard</h2>
        </Link>

        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <SingleGameQuery query={SINGLE_GAME} variables={{gameId: this.props.match.params.id}}>
            {({loading, error, data}) => {
              if (loading) {
                return <H2>Loading...</H2>;
              }
              if (error) {
                return <>
                  <H2>Error 😭</H2>
                  <H3>Mayhaps check your interwebs connection</H3>
                </>;
              }
              if (!data || !data.Game) {
                return <H2>There is no game to display 😭</H2>;
              }

              return (
                <GameCard {...data.Game} />
              );
            }}
          </SingleGameQuery>
        </ErrorBoundary>
      </ContainerWrapper>
    );
  }
}
