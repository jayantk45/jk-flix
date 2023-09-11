import React from 'react'
import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {

    const movies = useSelector(store => store.movies)

    return (
        <div className=' w-screen bg-black'>
            <div className=' -mt-72 pl-12 relative z-20'>
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}></MovieList>
                <MovieList title={"Top Rated"} movies={movies.topRatedMovies}></MovieList>
                <MovieList title={"Popular"} movies={movies.popularMovies}></MovieList>
                <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}></MovieList>
            </div>


            {/*
                MovieList - Popular
                    MovieCard * n
                MovieList - Now Playing
                MovieList - Trending
                MovieList - Horror

            */}
        </div >
    )
}

export default SecondaryContainer