// Tipo per il singolo gioco della Steam Web API
export interface SteamGame {
  appid: number;
  name: string;
  img_icon_url?: string;
  img_logo_url?: string;
  playtime_forever?: number;
}

// Struttura della risposta Steam
export interface SteamOwnedGamesResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}

// Tipo standardizzato per l'app
export interface Game {
  id: string;
  title: string;
  platform: string;
  image?: string;
}
