import axiosClient from "@/lib/axiosClient";
import { MovieDetails } from "../types/MovieCastType"

export class MovieDetailsAPI {
    static async fetchMovieDetails(
        movieId: number
    ): Promise<MovieDetails> {
        const res = await axiosClient.get<MovieDetails>('get-movie-details',
            {
                params: { id: movieId }
            })
        return res.data.data
    }
}