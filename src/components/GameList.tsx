// src/components/GameList.tsx
import GameCard from "./GameCard";

interface Game {
  id: string;
  title: string;
  platform: string;
  image?: string;
}

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
