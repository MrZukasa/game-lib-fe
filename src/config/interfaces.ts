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
  xboxGames: Game[];
  fetchSteamGames: () => Promise<void>;
  fetchGogGames: () => Promise<void>;
  fetchXboxGames: () => Promise<void>;
}

export interface Loading {
  [key: string]: boolean;
}

export interface XboxAuthResponse {
  IssueInstant: string
  NotAfter: string
  Token: string
  DisplayClaims: DisplayClaims
}

interface DisplayClaims {
  xui: Xui[]
}

interface Xui {
  gtg: string
  xid: string
  uhs: string
}

interface TitleDetail {
  description: string
  developerName: string
  genres: string[]
  minAge: number
  publisherName: string
  releaseDate?: string
  shortDescription?: string
}


export interface XboxGame {
  titleId: string
  pfn?: string
  name: string
  type: string
  devices: string[]
  displayImage: string
  detail: TitleDetail
}

export interface XboxTitleResponse {
  xuid: string
  titles: XboxGame[]
}

