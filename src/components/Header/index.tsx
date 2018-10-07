// Header that contains the room status icon and the new game button

import * as React from 'react';
import { JOIN_GAME, SET_ROOM_STATUS, SetRoomStatusMutation } from '../../graphql/mutations';
import { Mutation, Query, Subscription } from 'react-apollo';
import { Button, RoomStatusButton } from '../index';
import { ROOM_STATUS_SUBSCRIPTION } from '../../graphql/subscriptions';
import { LATEST_ROOM_STATUS } from '../../graphql/queries';
import { Link } from 'react-router-dom';
import { HeaderButton, HeaderInner, HeaderOuter } from './styles';

function getRoomStatus(data: any, subData: any, loading: boolean): RoomStatus {
  if (loading) {
    return 'LOADING';
  } else if (subData) {
    return subData.RoomStatusEntry.node.status;
  } else if (data && data.allRoomStatusEntries) {
    return data.allRoomStatusEntries[0].status;
  } else {
    return 'OFFLINE';
  }
}

const Header: React.SFC<{}> = () => {
  return (
    <HeaderOuter id='header'>
      <HeaderInner>
        {window.location.pathname === '/leaderboard'
          ? <HeaderButton title='Dashboard'>
            <Link to='/dashboard'>
              🏠
            </Link>
          </HeaderButton>
          : <HeaderButton title='Leaderboard'>
            <Link to='/leaderboard'>
              🏆
            </Link>
          </HeaderButton>}
        <Mutation mutation={JOIN_GAME}>
          {(createGame: Function) => (
            <Button onClick={() => createGame()} text='LETS CONNECT!' title='Start or join a game'/>
          )}
        </Mutation>
        <Subscription subscription={ROOM_STATUS_SUBSCRIPTION}>
          {({data: subData}) =>
            <Query query={LATEST_ROOM_STATUS}>
              {({loading, error, data}) =>
                <SetRoomStatusMutation mutation={SET_ROOM_STATUS}>
                  {(setRoomStatus: Function) => (
                    <RoomStatusButton
                      onClick={() =>
                        setRoomStatus({
                          variables:
                            {
                              status: getRoomStatus(data, subData, loading) === 'FREE'
                                ? 'BUSY'
                                : 'FREE'
                            }
                        })}
                      status={getRoomStatus(data, subData, loading)}
                    />
                  )}
                </SetRoomStatusMutation>}
            </Query>}
        </Subscription>
      </HeaderInner>
    </HeaderOuter>
  );
};

export default Header;
