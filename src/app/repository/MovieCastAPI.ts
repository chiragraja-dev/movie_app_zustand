import axiosClient from "@/lib/axiosClient";

export class MovieDetailsAPI {
    static async fetchMovieData(
        movieId: string
    ): Promise<{ cast: MovieCast[]; crew: MovieCrew[] }> {
        const response = await axiosClient.get<MovieCastResponse>('/get-movie-cast', {
            params: { id: movieId },
        });
        const { cast, crew } = response.data.data;
        return { cast, crew };
    }
}
