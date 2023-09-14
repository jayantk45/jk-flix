import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
    // fetch data from TMDB API & update the store with all those movies
    const dispatch = useDispatch();

    const popularMovies = useSelector(store => store.movies.popularMovies);

    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addPopularMovies(json.results))
    }

    useEffect(() => {
        if (!popularMovies) getPopularMovies();
    }, []);
};

export default usePopularMovies;
