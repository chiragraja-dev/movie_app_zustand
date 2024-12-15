"use client"
import React, { useEffect, useState } from 'react'
import { useMovieStore } from "@/app/store/useMovie"
import { MovieDetails } from '@/app/types/MovieListType'
import MovieCard from './_component/MovieCard'

import Pagination from '@/components/ui/pagination'
import { useRouter, useSearchParams } from 'next/navigation'

const Movies = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [page, setPage] = useState<number>(parseInt(searchParams.get('page') ?? "1") ?? 1)
    const { movieList, fetchMovieList } = useMovieStore()

    const fetchMovieListData = () => {

        fetchMovieList(page)
    }

    function handlePageChange(i: number) {
        router.push(`?page=${page}`)
        setPage(i)
    }

    useEffect(() => {
        fetchMovieListData()
    }, [page])

    const totalPages = movieList?.pagination?.total_pages ?? 1
    return (
        <>
            <div className=' grid grid-cols-5 p-9 gap-4'>
                {movieList?.data?.map((item: MovieDetails, index: number) => (
                    <React.Fragment key={index}>
                        <MovieCard item={item} />
                    </React.Fragment>
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>

    )
}

export default Movies