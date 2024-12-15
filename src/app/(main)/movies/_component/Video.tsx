import React from 'react'
interface VideoProps {
    ytKey: string;
    name: string;
}

const Video: React.FC<VideoProps> = ({ ytKey, name }) => {
    console.log(ytKey, name)
    return (
        <div className=' '>
            <div className=' text-lg py-3 font-semibold h-20'>{name}</div>
            <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${ytKey}`}
                title={name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default Video