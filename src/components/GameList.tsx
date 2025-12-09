import type { Game } from "../config/interfaces";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
}

export default function GameList({ games }: GameListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {games.map(game => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
