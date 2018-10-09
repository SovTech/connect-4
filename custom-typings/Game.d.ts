interface Game {
  id: string;
  status: GameStatus;
  createdAt: string;
  grid: any;
  nextPlayer: 'RED' | 'YELLOW' | null;
  winner: 'RED' | 'YELLOW' | null;
  yellowPlayer: User | null;
  redPlayer: User | null;
}
