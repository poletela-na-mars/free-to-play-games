import { configureStore } from '@reduxjs/toolkit';

import { fetchGame } from '../../redux/game/asyncActions';
import gameSlice, { setGame } from '../../redux/game/slice';

import { Status } from '../../assets/consts';
import { FetchGameArgs, FullGame, GameState } from '../../types/redux/types';

let initialState: GameState;

beforeEach(() => {
      initialState = {
        game: {},
        status: Status.LOADING,
      };
    }
);

let fetchParams: FetchGameArgs = {
  id: '451',
};

let mockGame: FullGame = {
  id: 451,
  title: "Crystal Clash",
  thumbnail: "https://www.freetogame.com/g/451/thumbnail.jpg",
  status: "Live",
  short_description: "A free-to-play fantasy RTS developed by Crunchy Leaf Games. ",
  description: `Crystal Clash is a free-to-play fantasy RTS developed by Crunchy Leaf Games. Players collect units and spells to build a deck to use in both PvP matches and PvE challenges.

  Currently the game offers 1v1 matches between players with plans for 2v2 and ranked in the near future. There are three playable Legions to choose from — White, Green, and Black. The White Legion is healing and defense-oriented. It utilizes archers and knights for its offensive work, overwhelming the opponent.

    The Green Legion makes heavy use of heal-over-time effects, rooting enemies and swarming them with hordes of Saplings that and evolve into more powerful creatures.

    Finally, the Black Legion uses freezing spells and abilities in addition to ripping out the souls of the enemy units.`,
  game_url: "https://www.freetogame.com/open/crystal-clash",
  genre: "Strategy",
  platform: "Windows",
  publisher: "Crunchy Leaf Games",
  developer: "Crunchy Leaf Games",
  release_date: "2019-08-30",
  freetogame_profile_url: "https://www.freetogame.com/crystal-clash",
  minimum_system_requirements: {
    os: "Windows 7",
    processor: "?",
    memory: "4 GB RAM",
    graphics: "Any with at least 1GB VRAM",
    storage: "2 GB available space"
  },
  screenshots: [
    {
      id: 1121,
      image: "https://www.freetogame.com/g/451/Rise_of_Legions-1.jpg"
    },
    {
      id: 1122,
      image: "https://www.freetogame.com/g/451/Rise_of_Legions-2.jpg"
    },
    {
      id: 1123,
      image: "https://www.freetogame.com/g/451/Rise_of_Legions-3.jpg"
    }
  ]
};

describe('Game reducers', () => {
  describe('fetchGame', () => {
    it('should set status to LOADING in fetchGame.pending', () => {
      initialState.status = Status.SUCCESS;

      expect(gameSlice(initialState, { type: fetchGame.pending.type, payload: fetchParams }).status)
          .toEqual(Status.LOADING);
    });

    it('should set game to {} in fetchProducts.pending', () => {
      expect(gameSlice(initialState, { type: fetchGame.pending.type, payload: fetchParams }).game)
          .toEqual({});
    });

    it('should set status to ERROR in fetchGame.rejected', () => {
      initialState.status = Status.LOADING;

      expect(gameSlice(initialState, { type: fetchGame.rejected.type, payload: fetchParams }).status)
          .toEqual(Status.ERROR);
    });

    it('should set game to {} in fetchGame.rejected', () => {
      expect(gameSlice(initialState, { type: fetchGame.rejected.type, payload: fetchParams }).game)
          .toEqual({});
    });

    it('should set status to SUCCESS in fetchGame.fulfilled', () => {
      initialState.status = Status.LOADING;

      expect(gameSlice(initialState, { type: fetchGame.fulfilled.type, payload: fetchParams }).status)
          .toEqual(Status.SUCCESS);
    });

    it('should set game successfully', async () => {
      const store = configureStore({ reducer: gameSlice });
      store.dispatch(setGame(mockGame));
      expect(store.getState().game).toEqual(mockGame);
    });
  });
});
