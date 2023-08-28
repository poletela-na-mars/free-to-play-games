import { Status } from '../../assets/consts';

export interface FilterState {
  platform: number;
  genre: number;
  sort: number;
}

export interface GamesState {
  games: FullGameData[];
  status: Status;
  currentPage: number;
}

export type FetchGamesArgs = FilterState & { currentPage: number };

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  publisher: string;
  release_date: string;
}

export interface FullGameData extends Game {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  short_description: string;
}
