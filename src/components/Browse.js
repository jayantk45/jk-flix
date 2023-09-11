import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';

const Browse = () => {

    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    return (
        <div>
            <Header></Header>
            <MainContainer></MainContainer>
            <SecondaryContainer></SecondaryContainer>

            {/*
                Main Container
                    - Video Background
                    - Video Title
                Secondary Continer
                    - MovieList * n
                    - cards * n


            */}
        </div>
    )
}

export default Browse