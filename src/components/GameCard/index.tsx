// Games fragment - loops through a given list of games

import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CANCEL_GAME, CancelGameMutation, SET_GAME_WINNER } from '../../graphql/mutations';
import { formatEnum } from '../../utils';
import Avatar from '../Avatar';
import BoardStatus from '../BoardStatus';
import { H3 } from '../HeaderText';
import { Board, Button, Card } from '../index';
import { CardInner, ColorText, PlayerDiv, PlayersDiv, TeamDiv, TeamsContainer } from './styles';

interface GameCardProps extends Game {
  style?: React.CSSProperties;
  grid: any;
}

export default class GameCard extends React.Component<GameCardProps> {
  render() {
    const {id, redPlayer, yellowPlayer, winner, status, grid, style, createdAt} = this.props;
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
                <PlayersDiv>
                  <PlayerDiv>
                    <Avatar
                      size={50}
                      imageUrl={
                        redPlayer
                          ? redPlayer.avatarUrl
                          : null
                      }
                    />
                    {redPlayer ? redPlayer.firstName : '-'}
                  </PlayerDiv>
                </PlayersDiv>
              </Link>
              <ColorText>Yellow {winner === 'YELLOW' ? <span>🏆</span> : null}</ColorText>
            </TeamDiv>
            <H3>VS</H3>
            <TeamDiv>
              <Link to={'/dashboard/' + id}>
                <PlayersDiv>
                  <PlayerDiv>
                    <Avatar
                      size={50}
                      imageUrl={
                        yellowPlayer
                          ? yellowPlayer.avatarUrl
                          : null
                      }
                    />
                    {yellowPlayer ? yellowPlayer.firstName : '-'}
                  </PlayerDiv>
                </PlayersDiv>
              </Link>
              <ColorText>Red {winner === 'RED' ? <span>🏆</span> : null}</ColorText>
            </TeamDiv>
          </TeamsContainer>

          {/* Connect 4 Board */}
          <BoardStatus isActive={true} nextPlayer='RED' />
          <Board gameId={id} grid={grid} isActive={true} />

          {/* Buttons at the bottom TODO move to own component */}
          {status === 'NOT_STARTED' ?
            <CancelGameMutation mutation={CANCEL_GAME}>
              {(cancelGame: Function) => (
                <Button
                  noMargin={true}
                  onClick={() => cancelGame({variables: {gameId: id}})}
                  text='Cancel Game'
                />
              )}
            </CancelGameMutation>
            : status === 'IN_PROGRESS' ?
              <Mutation mutation={SET_GAME_WINNER}>
                {(setGameWinner: Function) => (
                  <TeamsContainer>
                    <Button
                      noMargin={true}
                      onClick={() => setGameWinner({
                        variables: {
                          gameId: id,
                          winner: 'YELLOW'
                        }
                      })}
                      text='Yellow Won'
                    />
                    <div style={{width: '20px'}} />
                    <Button
                      noMargin={true}
                      onClick={() => setGameWinner({
                        variables: {
                          gameId: id,
                          winner: 'RED'
                        }
                      })}
                      text='Red Won'
                    />
                  </TeamsContainer>
                )}
              </Mutation>
              : null}
        </CardInner>
      </Card>
    );
  }
}
