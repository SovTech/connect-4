interface Game {
  id: string;
  status: GameStatus;
  createdAt: string;
  grid: any;
  nextPlayer: SideColor;
  winner: SideColor | null;
  yellowPlayer: User | null;
  redPlayer: User | null;
}
