export const ServerURL = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

export const platformsList = ['All Platforms', 'Windows (PC)', 'Browser (Web)'];

export const genresList = ['All Genres', 'MMO', 'MMORPG', 'Shooter', 'Strategy', 'Moba', 'Card Games', 'Racing',
  'Sports', 'Social', 'Fighting', 'MMOFPS', 'Action RPG', 'Sandbox', 'Open World', 'Survival', 'Battle Royale',
  'MMOTPS', 'Anime', 'PvP', 'PvE', 'Pixel', 'MMORTS', 'Fantasy', 'Sci-Fi', 'Action', 'Voxel', 'Zombie', 'Turn-Based',
  'First Person View', 'Third Person View', 'Top-Down View', '3D Graphics', '2D Graphics', 'Tank', 'Space', 'Sailing',
  'Side Scroller', 'Superhero', 'Permadeath'];

export const sortsList = ['Relevance', 'Popularity', 'Release Date', 'Alphabetical'];

export const platformsListForReq = ['', 'pc', 'browser'];
export const genresListForReq = ['', 'mmo', 'mmorpg', 'shooter', 'strategy', 'moba', 'card', 'racing',
  'sports', 'social', 'fighting', 'mmofps', 'action-rpg', 'sandbox', 'open-world', 'survival', 'battle-royale',
  'mmotps', 'anime', 'pvp', 'pve', 'pixel', 'mmorts', 'fantasy', 'sci-fi', 'action', 'voxel', 'zombie', 'turn-based',
  'first-person', 'third-person', 'top-down', '3d', '2d', 'tank', 'space', 'sailing', 'side-scroller', 'superhero',
  'permadeath'];
export const sortsListForReq = ['relevance', 'popularity', 'release-date', 'alphabetical'];

export enum CategoryType {
  Platform,
  Genre,
  Sort,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
