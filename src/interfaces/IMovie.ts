export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

interface Genre {
  id: string;
  name: string;
}

interface GenresData {
  genres: Genre[];
}

export interface GenreTabsProps {
  genresData: GenresData;
  handleGenreChange: (genreId: string | null) => void;
}

export interface SearchState {
  term: string;
}

export interface IRootState {
  search: SearchState;
}
