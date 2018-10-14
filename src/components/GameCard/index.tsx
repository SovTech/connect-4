// Games fragment - loops through a given list of games

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../../custom-typings/Game';
import { CANCEL_GAME, CancelGameMutation } from '../../graphql/mutations';
import { formatEnum } from '../../utils';
import Avatar from '../Avatar';
import { H3 } from '../HeaderText';
import { Board, Button, Card } from '../index';
import { CardInner, ColorText, PlayerDiv, TeamDiv, TeamsContainer } from './styles';

interface GameCardProps extends Game {
  style?: React.CSSProperties;
  grid: any;
}

export default class GameCard extends React.Component<GameCardProps> {
  render() {
    const {id, redPlayer, yellowPlayer, winner, status, grid, style, createdAt, nextPlayer} = this.props;
    return (
      <Card
        style={style}
        contentPadding={true}
        title={formatEnum(status)}
        date={createdAt}
      >
        <CardInner>
          <TeamsContainer>
            <TeamDiv>
              <Link to={'/dashboard/' + id}>
                <PlayerDiv>
                  <Avatar
                    activeColor={nextPlayer === 'YELLOW' ? 'YELLOW' : undefined}
                    size={50}
                    imageUrl={
                      redPlayer
                        ? redPlayer.avatarUrl
                        : null
                    }
                  />
                  {redPlayer ? redPlayer.firstName : '-'}
                </PlayerDiv>
              </Link>
              <ColorText>Yellow {winner === 'YELLOW' && <span>🏆</span>}</ColorText>
            </TeamDiv>
            <H3>VS</H3>
            <TeamDiv>
              <Link to={'/dashboard/' + id}>
                <PlayerDiv>
                  <Avatar
                    activeColor={nextPlayer === 'RED' ? 'RED' : undefined}
                    size={50}
                    imageUrl={
                      yellowPlayer
                        ? yellowPlayer.avatarUrl
                        : null
                    }
                  />
                  {yellowPlayer ? yellowPlayer.firstName : '-'}
                </PlayerDiv>
              </Link>
              <ColorText>Red {winner === 'RED' && <span>🏆</span>}</ColorText>
            </TeamDiv>
          </TeamsContainer>

          <Board gameId={id} grid={grid} isActive={status === 'IN_PROGRESS'} />

          {status === 'NOT_STARTED' &&
          <CancelGameMutation mutation={CANCEL_GAME}>
            {(cancelGame: Function) => (
              <Button
                noMargin={true}
                onClick={() => cancelGame({variables: {gameId: id}})}
                text='Cancel Game'
              />
            )}
          </CancelGameMutation>}
        </CardInner>
      </Card>
    );
  }
}
