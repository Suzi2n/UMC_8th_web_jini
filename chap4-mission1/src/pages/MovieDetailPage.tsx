
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetailResponse } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailsPage = () => {

  const params = useParams();

  const key = "aba92ef0e752f5f5f40eb3b4c5755650";
  const { movieId } = useParams<{ movieId: string }>();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=ko-KR`;

  const {isPending, isError, data: movie} = useCustomFetch<MovieDetailResponse>(url,"ko-KR"
  );

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (!movie) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      MovieDetailPage{params.movieId}
      {movie?.id}
      {movie?.production_companies.map((company) => company.name)}
      {movie?.original_title}
      {movie?.overview}
      
    </div>
    );
};

export default MovieDetailsPage;