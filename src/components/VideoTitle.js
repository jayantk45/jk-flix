import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className=' absolute w-screen aspect-video pt-[13%] px-6 md:px-24 text-white bg-gradient-to-r from-black'>
            <h1 className=' text-4xl md:text-6xl font-bold'>{title}</h1>
            <p className=' hidden md:inline-block  py-6 text-lg w-1/4'>{overview}</p>

            <div className=' my-4 md:m-0 '>
                <button className='  bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-90'>▶️ Play</button>
                <button className=' hidden md:inline-block mx-3 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-70 rounded-lg hover:bg-opacity-90'>ℹ️ More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle