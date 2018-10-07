interface Game {
  id: string;
  status: GameStatus;
  createdAt: string;
  winner: 'RED' | 'YELLOW' | null;
  yellowPlayer: User | null;
  redPlayer: User | null;
}
