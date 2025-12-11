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
  amazonGames: Game[];
  fetchSteamGames: () => Promise<void>;
  fetchGogGames: () => Promise<void>;
  fetchXboxGames: () => Promise<void>;
  fetchAmazonGames: () => Promise<void>;
}

export interface Loading {
  [key: string]: boolean;
}

// PERF: Xbox Interfaces
// ************************************
export interface XboxAuthResponse {
  IssueInstant: string
  NotAfter: string
  Token: string
  DisplayClaims: DisplayClaims
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
// ************************************
// PERF: Amazon Interfaces
// ************************************

export interface AmazonTitleResponse {
  entitlements: AmazonGame[]
  nextToken: string
}

export interface AmazonGame {
  __type: string
  channelId: string
  entitlementDateFromEpoch: string
  id: string
  lastModifiedDate: number
  product: Product
  signature: string
  state: string
}

export interface Product {
  asinVersion: number
  description: string
  domainId: string
  id: string
  productDetail: ProductDetail
  productLine: string
  sku: string
  title: string
  vendorId: string
}

export interface ProductDetail {
  details: Details
  iconUrl: string
}

export interface Details {
  backgroundUrl1: string
  backgroundUrl2: string
  developer: string
  esrbRating: string
  gameModes: string[]
  genres: string[]
  keywords: string[]
  legacyProductIds: string[]
  logoUrl: string
  otherDevelopers: string[]
  pegiRating: string
  pgCrownImageUrl: string
  publisher: string
  releaseDate: string
  screenshots: string[]
  shortDescription: string
  uskRating: string
  websites: Websites
}

export interface Websites {
  OFFICIAL: string
}

export interface AmazonAuthResponse {
  access_token: string
  age_classification: AgeClassification
  response: Response
  token_type: string
  expires_in: number
  request_id: string
}

interface AgeClassification {
  age_classification: string
}

interface Response {
  token_expires_in: string
  token_type: string
  token: string
}

