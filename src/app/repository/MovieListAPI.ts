import axiosClient from "@/lib/axiosClient";
import { MovieApiResponse, MovieDetails, MovieResponseByType } from "../types/MovieListType";
// import { promises } from "dns";

export class MovieListAPI {
    static async fetchMovieList(page: number): Promise<MovieResponseByType> {
        const response = await axiosClient.get<MovieResponseByType>('/get-movies',
            {
                params: { page: page },
            });
        debugger
        return response.data;
    }

    static async fetchMovieId(id: number): Promise<MovieDetails> {
        const response = await axiosClient.get<MovieDetails>('/get-movie-by-id', { params: { id: id } });
        return response.data
    }

    static async fetchMoviesByType(movieType: string, page: number): Promise<MovieResponseByType> {
        const response = await axiosClient.get<MovieResponseByType>('/get-movie-by-type', {
            params: { type: movieType, page: page }
        })

        const result: MovieResponseByType = { ...response.data };
        return result
    }

    static async fetchMovieVideo(movieId: number): Promise<MovieApiResponse> {
        const response = await axiosClient.get<MovieApiResponse>('/get-movie-video', {
            params: { id: movieId }
        })
        const results: MovieApiResponse = response.data
        return results
    }
}