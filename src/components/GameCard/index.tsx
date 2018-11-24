// Games fragment - loops through a given list of games

import * as React from 'react';
import { Link } from 'react-router-dom';
import { CANCEL_GAME, CancelGameMutation } from '../../graphql/mutations';
import { formatEnum, getLoggedInUserId } from '../../utils';
import Avatar from '../Avatar';
import ErrorMessage from '../ErrorMessage';
import { H3 } from '../HeaderText';
import { Board, Button, Card, ErrorBoundary } from '../index';
import { CardInner, ColorText, PlayerDiv, TeamDiv, TeamsContainer } from './styles';

interface GameCardProps extends Game {
  style?: React.CSSProperties;
  grid: any;
}

export default class GameCard extends React.Component<GameCardProps> {
  private static renderPlayerName(player: User | null) {
    if (!player) {
      return '-';
    }
    if (player.id === getLoggedInUserId()) {
      return 'You';
    }
    return player.firstName;
  }

  private static isGamePlayable(status: GameStatus, redPlayer: User | null, yellowPlayer: User | null) {
    if (status !== 'IN_PROGRESS') {
      return false;
    }
    if (!redPlayer || !yellowPlayer) {
      return false;
    }
    return redPlayer.id === getLoggedInUserId() || yellowPlayer.id === getLoggedInUserId();
  }

  render() {
    const {id, redPlayer, yellowPlayer, winner, status, grid, style, createdAt, nextPlayer} = this.props;
    return (
      // TODO change message to message in card
      <ErrorBoundary FallbackComponent={ErrorMessage}>
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
                      activeColor={status === 'IN_PROGRESS' && nextPlayer === 'RED' ? 'RED' : undefined}
                      size={50}
                      imageUrl={
                        redPlayer
                          ? redPlayer.avatarUrl
                          : undefined
                      }
                    />
                    {GameCard.renderPlayerName(redPlayer)}
                  </PlayerDiv>
                </Link>
                <ColorText>Red {winner === 'RED' && <span>🏆</span>}</ColorText>
              </TeamDiv>
              <H3>VS</H3>
              <TeamDiv>
                <Link to={'/dashboard/' + id}>
                  <PlayerDiv>
                    <Avatar
                      activeColor={status === 'IN_PROGRESS' && nextPlayer === 'YELLOW' ? 'YELLOW' : undefined}
                      size={50}
                      imageUrl={
                        yellowPlayer
                          ? yellowPlayer.avatarUrl
                          : undefined
                      }
                    />
                    {GameCard.renderPlayerName(yellowPlayer)}
                  </PlayerDiv>
                </Link>
                <ColorText>Yellow {winner === 'YELLOW' && <span>🏆</span>}</ColorText>
              </TeamDiv>
            </TeamsContainer>

            <Board gameId={id} grid={grid} isActive={GameCard.isGamePlayable(status, redPlayer, yellowPlayer)} />

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
      </ErrorBoundary>
    );
  }
}
