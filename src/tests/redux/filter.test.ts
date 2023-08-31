import filterSlice, { setFilters, setGenre, setPlatform, setSort } from '../../redux/filter/slice';
import { FilterState } from '../../types/redux/types';

let initialState: FilterState;

beforeEach(() => {
      initialState = {
        platform: 0,
        genre: 0,
        sort: 0,
      };
    }
);

describe('Filter reducers', () => {
  describe('setPlatform', () => {
    it('should change platform', () => {
      const mockPlatform = 1;
      expect(filterSlice(initialState, setPlatform(mockPlatform)).platform)
          .toEqual(mockPlatform);
    });
  });

  describe('setGenre', () => {
    it('should change genre', () => {
      const mockGenre = 2;
      expect(filterSlice(initialState, setGenre(mockGenre)).genre)
          .toEqual(mockGenre);
    });
  });

  describe('setSort', () => {
    it('should change sort', () => {
      const mockSort = 2;
      expect(filterSlice(initialState, setSort(mockSort)).sort)
          .toEqual(mockSort);
    });
  });

  describe('setFilters', () => {
    it('should change filters', () => {
      const mockFilters: FilterState = {
        platform: 1,
        genre: 12,
        sort: 3,
      };

      expect(filterSlice(initialState, setFilters(mockFilters)))
          .toEqual(mockFilters);
    });
  });

  describe('failed changed platform in setFilters', () => {
    it('should not change platform due to invalid value', () => {
      const mockFilters: FilterState = {
        platform: 1000,
        genre: 5,
        sort: 3,
      };

      const changedFilters: FilterState = {
        platform: 0,
        genre: 5,
        sort: 3,
      };

      expect(filterSlice(initialState, setFilters(mockFilters)))
          .toEqual(changedFilters);
    });
  });
});
