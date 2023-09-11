import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className=' absolute w-screen aspect-video pt-[15%] px-24 text-white bg-gradient-to-r from-black'>
            <h1 className=' text-6xl font-bold'>{title}</h1>
            <p className=' py-6 text-lg w-1/4'>{overview}</p>

            <div className=' '>
                <button className=' bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-90'>▶️ Play</button>
                <button className=' mx-3 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-70 rounded-lg hover:bg-opacity-90'>ℹ️ More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle