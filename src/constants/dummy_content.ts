// Dummy content used for testing
export const TEST_AVATAR_URL = 'https://avatars.slack-edge.com/2018-01-24/304961715815_8725e6fc5dc6150e084b_192.png';

export const PLAYER_100: User = {
  id: '100',
  email: 'jono',
  firstName: 'Jonathan',
  lastName: 'Irwin',
  avatarUrl: TEST_AVATAR_URL,
  _gamesCreatedMeta: {
    count: 10
  },
  _redPlayerGamesMeta: {
    count: 10
  },
  _yellowPlayerGamesMeta: {
    count: 10
  },
  _gamesCancelledMeta: {
    count: 10
  }
};
export const PLAYER_101: User = {
  id: '101',
  email: 'deepak',
  firstName: 'Deepak',
  lastName: 'Narahare',
  avatarUrl: TEST_AVATAR_URL,
  _gamesCreatedMeta: {
    count: 5
  },
  _redPlayerGamesMeta: {
    count: 5
  },
  _yellowPlayerGamesMeta: {
    count: 5
  },
  _gamesCancelledMeta: {
    count: 5
  }
};

export const NOT_STARTED_GAME: Game = {
  yellowPlayer: null,
  redPlayer: null,
  winner: null,
  createdAt: '',
  id: '100',
  status: 'NOT_STARTED'
};

export const IN_PROGRESS_GAME: Game = {
  yellowPlayer: PLAYER_100,
  redPlayer: PLAYER_100,
  winner: null,
  createdAt: '',
  id: '101',
  status: 'IN_PROGRESS'
};

export const FINISHED_GAME: Game = {
  yellowPlayer: PLAYER_100,
  redPlayer: PLAYER_100,
  winner: 'RED',
  createdAt: '',
  id: '102',
  status: 'FINISHED'
};

export const CANCELLED_GAME: Game = {
  yellowPlayer: PLAYER_100,
  redPlayer: null,
  winner: null,
  createdAt: '',
  id: '103',
  status: 'CANCELLED'
};
