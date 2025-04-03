import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Movie, MovieDetails } from "../types/movie";

export default function MovieDetailsPage() {

  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<MovieDetails | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams<{ movieId: string }>();

  const posterPath = movie?.poster_path || movie?.backdrop_path || '';

  useEffect(() => {
    if (!movieId) return;

    const key = "aba92ef0e752f5f5f40eb3b4c5755650";
    const fetchMovieDetails = async (): Promise<void> => {
      setIsPending(true);
      try {
       
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);

        // 영화 출연진, 감독 등
        const creditsResponse = await axios.get<MovieDetails>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCredits(creditsResponse.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (!movie) {
    return <div>데이터가 없습니다.</div>;
  }


  // crew 배열에서 감독(Director) 정보만 찾음
  const director = credits?.crew.find((member) => member.job === "Director");

  const imageUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${posterPath}`

  return (
    <div className="p-10">
    
      <div
        style={{ backgroundImage: `linear-gradient(rgb(22, 20, 20), rgba(0, 0, 0, 0.3)), url(${imageUrl})`}}

        className="bg-cover bg-center h-64 md:h-96 rounded-lg mb-8 text-white">


        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="mb-4">개봉일: {movie.release_date}</p>
        <p className="mb-4">{movie.overview}</p>
        <p className="mb-4">평점: {movie.vote_average}</p>
        <p className="mb-4">상영시간: {movie.runtime}분</p>
      </div>


      {director && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">감독</h2>
          {director.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
              alt={director.name}
              className="rounded mt-2"
            />
          )}
          <p className="font-semibold">{director.name}</p>
        </div>
      )}

      {credits && credits.cast.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">출연진</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {credits.cast.slice(0, 10).map((actor) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded mb-2"
                  />
                ) : (
                  <div className="bg-gray-300 w-32 h-48 flex items-center justify-center mb-2">
                    No Image
                  </div>
                )}
                <p className="font-semibold justify-center">{actor.name}</p>
                <p className="text-sm">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
