import axiosClient from "@/lib/axiosClient";
import { MovieCast, MovieCastResponse, MovieCrew } from "../types/MovieCastType";

export class MovieCastAPI {
    static async fetchMovieCast(
        movieId: string
    ): Promise<{ cast: MovieCast[]; crew: MovieCrew[] }> {
        const response = await axiosClient.get<MovieCastResponse>('/get-movie-cast', {
            params: { id: movieId },
        });
        const { cast, crew } = response.data.data;
        return { cast, crew };
    }
}
