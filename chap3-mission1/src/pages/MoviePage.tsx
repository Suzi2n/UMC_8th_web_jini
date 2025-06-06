import { useEffect, useState } from "react";
import axios from 'axios';
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() : void => {

        const key = "aba92ef0e752f5f5f40eb3b4c5755650";

        const fetchMovies = async () : Promise<void> => {
            const {data} = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    
                    },
                }
            );

            setMovies(data.results);
          
        };
        fetchMovies();
    }, []);


    return (
        <div className='grid grap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-5 xl:grid-cols-6'>
            {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />

            )}

        </div>
    );
}