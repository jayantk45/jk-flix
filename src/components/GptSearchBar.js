import React from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from "../utils/openai"
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice"

const GptSearchBar = () => {

    const dispatch = useDispatch()

    const langKey = useSelector(store => store.config.lang);

    const searchText = useRef(null);

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json()

        return json.results;
    }

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);

        //MAke an API call to GPT API and get movie Results

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: " +
            searchText.current.value +
            ". only give me name of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Gangs Of Wasseypur, Golmaal";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if (!gptResults.choices) {
            // error handle karo
            <p>No results found☹️</p>
        }
        console.log(gptResults.choices?.[0]?.message.content);
        // 'Andaz Apna Apna, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan, Angoor'
        const gptMovies = gptResults.choices?.[0]?.message.content.split(",")

        // ["Andaz Apna Apna", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan", "Angoor"]

        // For each movie i will search TMDB API
        const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
        // [Promise, Promise, Promise, Promise, Promise]

        const tmbdResults = await Promise.all(promiseArray);
        console.log(tmbdResults);

        dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmbdResults }));
    }

    return (
        <div className="pt-[10%] flex justify-center">
            <form className=" bg-black w-1/2 grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} className=" p-4 m-4 col-span-9" type="text" placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className=" py-2 px-4 col-span-3 m-4 bg-red-600 hover:bg-red-500 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    );
};

export default GptSearchBar;
