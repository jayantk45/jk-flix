import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

    useNowPlayingMovies();

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