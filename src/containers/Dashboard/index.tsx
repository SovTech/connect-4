import * as React from 'react';
import { Subscription } from 'react-apollo';
import { ContainerWrapper, Games, H2, H3, Header } from '../../components';
import { ALL_GAMES, AllGamesQuery } from '../../graphql/queries';
import { GAME_CREATED_SUBSCRIPTION, GAMES_SUBSCRIPTION } from '../../graphql/subscriptions';
import { showToast, uniqueArray } from '../../utils';

export default class Dashboard extends React.Component {
  render() {
    return (
      <ContainerWrapper>
        <Header />
        <Subscription subscription={GAME_CREATED_SUBSCRIPTION}>
          {({data}) => {
            if (data) {
              showToast('A new game has been created! 📯', 5000);
              return null;
            } else {
              return null;
            }
          }}
        </Subscription>

        <AllGamesQuery query={ALL_GAMES}>
          {({loading, error, data, subscribeToMore}) => {
            if (loading) {
              return <H2>Loading...</H2>;
            }
            if (error) {
              return <>
                <H2>Error 😭</H2>
                <H3>Mayhaps check your interwebs connection</H3>
              </>;
            }
            if (!data) {
              return <>
                <H2>There are no games to display 😭</H2>
              </>;
            }

            return (
              <Games
                games={data.allGames}
                subscribeToNewGames={() =>
                  subscribeToMore({
                    document: GAMES_SUBSCRIPTION,
                    updateQuery: (prev, {subscriptionData}) => {

                      if (!subscriptionData.data) {
                        return prev;
                      }
                      // @ts-ignore
                      const newFeedItem = subscriptionData.data.Game.node;

                      return Object.assign({}, prev, {
                        allGames: uniqueArray([newFeedItem, ...prev.allGames], 'id')
                      });
                    }
                  })
                }
              />
            );
          }}
        </AllGamesQuery>
      </ContainerWrapper>
    );
  }
}
