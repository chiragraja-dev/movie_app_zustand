"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { MovieDetails } from '@/app/types/MovieListType'
import { useRouter } from 'next/navigation'

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL
interface MovieCardProps {
    item: MovieDetails;
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
    const router = useRouter()
    return (
        <div>
            <Card className="rounded-md group relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-4 z-10">
                    <p className="text-sm text-white text-center line-clamp-5">{item?.overview}</p>
                    <Button onClick={() => router.push(`movies/${item.id}`)} className="mt-3 w-full rounded-sm bg-white text-black hover:text-white hover:border border-gray-800">View Details</Button>
                </div>
                <div className="relative z-0">
                    <CardHeader className="p-0">
                        <Image
                            src={`${TMDB_IMAGE_BASE}/w500${item.poster_path}`}
                            alt={item?.title || ""}
                            width={100}
                            height={100}
                            className="w-full h-[300px] rounded-t-md"
                        />
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="font-semibold text-base h-12">{item?.title}</p>
                        <p className="text-xs">{item?.original_title}</p>
                    </CardContent>

                </div>
            </Card>
        </div>
    )
}

export default MovieCard