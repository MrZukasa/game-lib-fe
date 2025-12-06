export interface SteamGame {
  appid: number;
  name: string;
  img_icon_url?: string;
  img_logo_url?: string;
  playtime_forever?: number;
}

export interface SteamOwnedGamesResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}

export interface Game {
  id: string;
  title: string;
  platform: string;
  image?: string;
}

export interface GameContextProps {
  loading: Loading;
  steamGames: Game[];
  gogGames: Game[];
  fetchSteamGames: () => Promise<void>;
  fetchGogGames: () => Promise<void>;
}

export interface Loading {
  [key: string]: boolean;
}
