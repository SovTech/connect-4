// Header that contains the new game button

import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { JOIN_GAME } from '../../graphql/mutations';
import { Button } from '../index';
import { HeaderButton, HeaderInner, HeaderOuter } from './styles';

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
            <Button onClick={() => createGame()} text='LETS CONNECT!' title='Start or join a game' />
          )}
        </Mutation>
      </HeaderInner>
    </HeaderOuter>
  );
};

export default Header;
