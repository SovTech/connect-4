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
import Connect4 from '../../lib';
import { CardInner, ColorText, PlayerDiv, PlayersDiv, TeamDiv, TeamsContainer } from './styles';

interface GameCardProps extends Game {
  style?: React.CSSProperties;
}

export default class GameCard extends React.Component<GameCardProps> {
  state = {
    board: new Connect4.Board()
  };

  handleGameRestart = () => {
    this.setState({
      board: new Connect4.Board()
    });
  };

  /**
   * Function called when each cell is clicked, adding piece and re-render UI
   */
  handleGameAddPiece = (columnIndex: number, piece: string) => {
    // Does nothing if board is inactive
    if (!this.state.board.isActive) {
      return null;
    }

    // Add piece
    this.state.board.addPiece(columnIndex, piece);

    // Refresh state with newly changed
    return this.setState({
      board: this.state.board
    });
  };

  render() {
    return (
      <Card
        style={this.props.style}
        contentPadding={true}
        title={formatEnum(this.props.status)}
        date={this.props.createdAt}
      >
        <CardInner>
          <TeamsContainer>
            <TeamDiv>
              <Link to={'/dashboard/' + this.props.id}>
                <PlayersDiv>
                  <PlayerDiv>
                    <Avatar
                      size={50}
                      imageUrl={
                        this.props.redPlayer
                          ? this.props.redPlayer.avatarUrl
                          : null
                      }
                    />
                    {this.props.redPlayer ? this.props.redPlayer.firstName : '-'}
                  </PlayerDiv>
                </PlayersDiv>
              </Link>
              <ColorText>Yellow {this.props.winner === 'YELLOW' ? <span>🏆</span> : null}</ColorText>
            </TeamDiv>
            <H3>VS</H3>
            <TeamDiv>
              <Link to={'/dashboard/' + this.props.id}>
                <PlayersDiv>
                  <PlayerDiv>
                    <Avatar
                      size={50}
                      imageUrl={
                        this.props.yellowPlayer
                          ? this.props.yellowPlayer.avatarUrl
                          : null
                      }
                    />
                    {this.props.yellowPlayer ? this.props.yellowPlayer.firstName : '-'}
                  </PlayerDiv>
                </PlayersDiv>
              </Link>
              <ColorText>Red {this.props.winner === 'RED' ? <span>🏆</span> : null}</ColorText>
            </TeamDiv>
          </TeamsContainer>

          {/* Connect 4 Board */}
          <BoardStatus board={this.state.board} restart={this.handleGameRestart} />
          <Board board={this.state.board} addPiece={this.handleGameAddPiece} />

          {/* Buttons at the bottom */}
          {this.props.status === 'NOT_STARTED' ?
            <CancelGameMutation mutation={CANCEL_GAME}>
              {(cancelGame: Function) => (
                <Button
                  noMargin={true}
                  onClick={() => cancelGame({variables: {gameId: this.props.id}})}
                  text='Cancel Game'
                />
              )}
            </CancelGameMutation>
            : this.props.status === 'IN_PROGRESS' ?
              <Mutation mutation={SET_GAME_WINNER}>
                {(setGameWinner: Function) => (
                  <TeamsContainer>
                    <Button
                      noMargin={true}
                      onClick={() => setGameWinner({
                        variables: {
                          gameId: this.props.id,
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
                          gameId: this.props.id,
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
