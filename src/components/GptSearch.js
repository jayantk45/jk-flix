import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
    return (
        <div>
            <div className=" fixed -z-20 blur-sm">
                <img className=' h-screen object-cover md:w-screen'
                    src={BG_URL}
                    alt="bg"
                />
            </div>

            <div className=''>
                <GptSearchBar></GptSearchBar>
                <GptMovieSuggestions></GptMovieSuggestions>
            </div>
        </div>


    )
}

export default GptSearch