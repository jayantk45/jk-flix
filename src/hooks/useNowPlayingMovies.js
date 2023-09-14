import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
    // fetch data from TMDB API & update the store with all those movies
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addNowPlayingMovies(json.results))
    }

    useEffect(() => {
        // call getNowPlayingMovies only when getNowPlaying movies does not have data.
        // We do this to prevent from making unnessarcy API calls.
        // this concept is called as MEMOIZATION 
        if (!nowPlayingMovies) getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
