import { create } from 'zustand';
import { MovieDetailsAPI } from '@/app/repository/MovieCastAPI';

interface MovieStore {
    cast: MovieCast[] | null;
    crew: MovieCrew[] | null;
    isLoading: boolean;
    error: string | null;
    fetchMovieData: (movieId: string) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
    cast: null,
    crew: null,
    isLoading: false,
    error: null,
    fetchMovieData: async (movieId: string) => {
        set({ isLoading: true, error: null });
        try {
            const { cast, crew } = await MovieDetailsAPI.fetchMovieData(movieId)
            set({ cast, crew, isLoading: false })
        } catch (error: any) {
            set({ error: error, isLoading: false })
        }
    }
}))