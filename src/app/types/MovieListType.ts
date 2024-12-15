export interface MovieListResponse {
    data: MovieDetails[];
    pagination: { current_page: number, page_limit: number, total_items: number, total_pages: number }
}

export interface MovieDetails {
    _id: string,
    adult: boolean,
    backdrop_path: string,
    filter_type: string,
    genre_ids: string[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    region: string,
    release_date: string,
    scraped_at: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number

}

export interface MovieResponseByType {
    data: MovieDetails[];
    pagination: {
        current_page: number,
        page_page_size: number,
        total_items: number,
        total_pages: number
    },
}


export interface MovieApiResponse {
    message: {
        _id: string;
        id: number;
        results: MovieResult[];
    };
    status: number;
}

export interface MovieResult {
    id: string;
    iso_3166_1: string;
    iso_639_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}

