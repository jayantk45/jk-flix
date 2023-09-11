import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
    // fetch data from TMDB API & update the store with all those movies
    const dispatch = useDispatch();

    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addUpcomingMovies(json.results))
    }

    useEffect(() => {
        getTopRatedMovies();
    }, []);
};

export default useUpcomingMovies;
