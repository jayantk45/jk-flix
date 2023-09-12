import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
    return (
        <div>
            <div className=" absolute -z-20 blur-sm">
                <img
                    src={BG_URL}
                    alt="bg"
                />
            </div>

            <GptSearchBar></GptSearchBar>
            <GptMovieSuggestions></GptMovieSuggestions>
        </div>
    )
}

export default GptSearch