import { Status } from '../../assets/consts';

export interface FilterState {
  platform: number;
  genre: number;
  sort: number;
}

export interface GamesState {
  games: Game[];
  status: Status;
}

export type FetchGamesArgs = FilterState;

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  gameProfileUrl: string;
  genre: string;
  publisher: string;
  releaseDate: string;
}
