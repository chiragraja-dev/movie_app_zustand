"use client"
import { useMovieStore } from '@/app/store/useMovie'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { CircleUserRound } from 'lucide-react'
import Video from '../_component/Video'

const MovieDetails = () => {
    const id = useParams<{ details: string }>();

    const {
        loadingDetails,
        movieDetails,
        fetchMovieDetails,
        isLoading,
        crew,
        cast,
        fetchMovieData,
        movieVideo,
        // fetchMovieVideo
    } = useMovieStore()


    useEffect(() => {
        fetchMovieDetails(parseInt(id.details))
        fetchMovieData(id.details)


    }, [])
    const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

    function formatRuntime(runtime: number): string {
        const hours = Math.floor(runtime / 60); // Calculate hours
        const minutes = runtime % 60; // Calculate remaining minutes
        return `${hours}h ${minutes}m`; // Format as "Xh Ym"
    }

    console.log(movieVideo?.message?.results?.slice(0, 2)?.map((i) => i.key))
    return (

        <>
            {
                (loadingDetails || isLoading) ? <>Loading.....</> :
                    <>
                        <div className="p-10 bg-slate-800 flex flex-col md:flex-row gap-10 shadow-lg">
                            <Image
                                src={`${TMDB_IMAGE_BASE}/w500${movieDetails?.poster_path}`}
                                alt={movieDetails?.title || "Movie Poster"}
                                width={300}
                                height={450}
                                className="w-56 h-[300px] md:w-[300px] md:h-[450px] rounded-lg object-cover shadow-md"
                            />

                            <div className="flex flex-col text-slate-200 space-y-4 md:space-y-6">
                                <div>
                                    <h1 className="text-4xl font-bold">{movieDetails?.title}</h1>
                                    <p className="text-sm italic text-slate-400">{movieDetails?.tagline ?? ""}</p>
                                </div>

                                <div className="text-base">
                                    <span className="font-semibold">Release Date:</span>{" "}
                                    {new Date(movieDetails?.release_date ?? "").toDateString()}{" "}
                                    <span className="font-light">({movieDetails?.origin_country?.join(", ")})</span>
                                </div>

                                <div className="flex flex-wrap gap-2 items-center text-sm">
                                    <span className="font-semibold">Genres:</span>
                                    <span>{movieDetails?.genres?.map((i) => i.name).join(", ")}</span>
                                    <span className="text-slate-400">{'|'}</span>
                                    {movieDetails?.runtime && (
                                        <span className="font-light">{formatRuntime(movieDetails.runtime)}</span>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Overview</h2>
                                    <p className="text-sm leading-6 text-slate-300">{movieDetails?.overview}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold">Popularity:</h3>
                                        <p className="text-sm text-slate-300">{movieDetails?.popularity}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Production Companies:</h3>
                                        <p className="text-sm text-slate-300">{movieDetails?.production_companies.map((i) => i.name).join(", ")}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Budget:</h3>
                                        <p className="text-sm text-slate-300">${movieDetails?.budget?.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Revenue:</h3>
                                        <p className="text-sm text-slate-300">${movieDetails?.revenue?.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Vote Count:</h3>
                                        <p className="text-sm text-slate-300">{movieDetails?.vote_count}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Vote Average:</h3>
                                        <p className="text-sm text-slate-300">{movieDetails?.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' p-10 bg-gray-50'>
                            <h1 className=' text-xl font-semibold'>Movie Cast</h1>
                            <div className=' px-12 my-5'>
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className="w-full px-7 "
                                >
                                    <CarouselContent>


                                        {
                                            cast?.slice(0, 10)?.map((item, index) => (
                                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                                    <div className="p-1">
                                                        <div className='p-2 rounded-sm border shadow-sm hover:bg-gray-100'>
                                                            <div className="flex flex-col aspect-square items-center justify-center p-0">
                                                                <div>
                                                                    {
                                                                        item?.profile_path ?
                                                                            <Image
                                                                                src={`${TMDB_IMAGE_BASE}w500${item?.profile_path}`}
                                                                                alt={''}
                                                                                width={100}
                                                                                height={100}
                                                                                className=' w-40 h-40 object-contain'
                                                                            ></Image> :
                                                                            <CircleUserRound className=' w-32 h-32' />
                                                                    }
                                                                </div>
                                                                <span className="text-base font-semibold">{item?.name}</span>
                                                                {item?.character && <p className='text-sm'>{" as "} {item?.character}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            ))
                                        }
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                            </div>
                        </div>
                        <div className=' p-10 bg-gray-50'>
                            <h1 className=' text-xl font-semibold'>Movie Crew</h1>
                            <div className=' px-12 my-5'>
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className="w-full px-7 "
                                >
                                    <CarouselContent>


                                        {
                                            crew?.slice(0, 10)?.map((item, index) => (
                                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                                    <div className="p-1">
                                                        <div className='p-2 rounded-sm border shadow-sm hover:bg-gray-100'>
                                                            <div className="flex flex-col aspect-square items-center justify-center p-0">
                                                                <div>
                                                                    {
                                                                        item?.profile_path ?
                                                                            <Image
                                                                                src={`${TMDB_IMAGE_BASE}w500${item?.profile_path}`}
                                                                                alt={''}
                                                                                width={100}
                                                                                height={100}
                                                                                className=' w-40 h-40 object-contain'
                                                                            ></Image> :
                                                                            <CircleUserRound className=' w-32 h-32' />
                                                                    }
                                                                </div>
                                                                <span className="text-base font-semibold">{item?.name}</span>
                                                                <p className='text-sm'> {item?.department}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            ))
                                        }
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                            </div>
                        </div>
                        <div className=' bg-gray-50 px-20 pb-20 gap-3 grid-cols-2 grid'>
                            {
                                movieVideo?.message?.results?.slice(0, 2).map((i, index) => (
                                    <React.Fragment key={index}>
                                        <Video ytKey={i.key} name={i.name} />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </>
            }

        </>
    )
}

export default MovieDetails