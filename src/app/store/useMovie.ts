import { create } from 'zustand';
import { MovieCastAPI } from '@/app/repository/MovieCastAPI';
import { MovieDetailsAPI } from '../repository/MovieDetailsAPI';
import { MovieCast, MovieCrew, MovieDetails } from '../types/MovieCastType';
import { MovieApiResponse, MovieListResponse } from '../types/MovieListType';
import { MovieListAPI } from '../repository/MovieListAPI';
// import { promises } from 'dns';

interface MovieStore {
    cast: MovieCast[] | null;
    crew: MovieCrew[] | null;
    isLoading: boolean;
    error: string | null;
    fetchMovieData: (movieId: string) => Promise<void>;
    movieList: MovieListResponse | null;
    movieListLoading: boolean;
    movieListError: string | null;
    fetchMovieList: (page: number) => Promise<void>;
    movieDetails: MovieDetails | null;
    loadingDetails: boolean;
    errorDetails: string | null
    fetchMovieDetails: (id: number) => Promise<void>;
    movieVideo: MovieApiResponse | null;
    loadingMovieVideo: boolean;
    errorMovieVideo: null;
    fetchMovieVideo: (id: number) => Promise<void>;

}

export const useMovieStore = create<MovieStore>((set, get) => ({
    cast: null,
    crew: null,
    isLoading: false,
    error: null,
    fetchMovieData: async (movieId: string) => {
        set({ isLoading: true, error: null });
        try {
            const { cast, crew } = await MovieCastAPI.fetchMovieCast(movieId)
            await get().fetchMovieVideo(parseInt(movieId));
            set({ cast, crew, isLoading: false })
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
        }
    },
    movieList: null,
    movieListLoading: false,
    movieListError: null,
    fetchMovieList: async (page: number) => {
        set({ movieListLoading: true, movieListError: null });
        try {
            const movieList = await MovieListAPI.fetchMovieList(page)
            const mappedMovieList: MovieListResponse = {
                data: movieList.data,
                pagination: {
                    current_page: movieList.pagination.current_page,
                    page_limit: movieList.pagination.page_page_size,
                    total_items: movieList.pagination.total_items,
                    total_pages: movieList.pagination.total_pages,
                },
            };
            set({ movieList: mappedMovieList, movieListLoading: true })
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
        }
    },
    movieDetails: null,
    loadingDetails: false,
    errorDetails: null,
    fetchMovieDetails: async (id: number) => {
        set({ loadingDetails: true, errorDetails: null });
        try {
            const details = await MovieDetailsAPI.fetchMovieDetails(id)
            set({ loadingDetails: false, movieDetails: details })
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
        }
    },
    errorMovieVideo: null,
    loadingMovieVideo: false,
    movieVideo: null,
    fetchMovieVideo: async (id: number) => {
        set({ loadingDetails: true, errorDetails: null });
        try {
            const video = await MovieListAPI.fetchMovieVideo(id)
            set({ loadingDetails: false, movieVideo: video })
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
        }
    }
}))
