import { Status } from '../../assets/consts';

export interface FilterState {
  platform: number;
  genre: number;
  sort: number;
}

export interface GamesState {
  games: FullGameInList[];
  status: Status;
  currentPage: number;
}

export type FetchGamesArgs = FilterState & { currentPage: number };

export interface GameInList {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  publisher: string;
  release_date: string;
}

export interface FullGameInList extends GameInList {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  short_description: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface SystemReq {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Game extends GameInList {
  developer: string;
  screenshots: Screenshot[];
  minimum_system_requirements: SystemReq;
}

export interface FullGame extends Game {
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  platform: string;
  freetogame_profile_url: string;
}

export interface GameState {
  game: Partial<Game>;
  status: Status;
}

export interface FetchGameArgs {
  id: string;
}
