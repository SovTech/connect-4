interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  _gamesCreatedMeta: {
    count: number;
  }
  _gamesCancelledMeta: {
    count: number;
  }
  _redPlayerGamesMeta: {
    count: number;
  }
  _yellowPlayerGamesMeta: {
    count: number;
  }
}
