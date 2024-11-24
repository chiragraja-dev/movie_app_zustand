"use client"
import { useMovieStore } from '@/app/store/useMovie';
import React, { useEffect } from 'react'

const Movies = () => {
    const { cast, crew, isLoading, error, fetchMovieData } = useMovieStore();

    useEffect(() => {
        fetchMovieData('864692'); // Example movie ID
    }, []);

    console.log(cast, "----", crew)
    return (
        <div>

        </div>
    )
}

export default Movies