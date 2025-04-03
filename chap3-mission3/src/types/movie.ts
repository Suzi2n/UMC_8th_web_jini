
export type Movie = {
    audit: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    runtime: number;
};

export type MovieDetails = {
    cast: {
      id: number;
      name: string;
      profile_path: string | null;
      credit_id: string;
      character: string; // 맡은 역할 정보 추가 가능
    }[];
    crew: {
      id: number;
      name: string;
      profile_path: string | null;
      credit_id: string;
      department: string; // ex: Directing, Production 등
      job: string;        // ex: Director, Producer 등
    }[];
  };
  

export type MovieResponse = {
    page: number;
    results: Movie[];
    totalPages: number;
    total_results:number;
};