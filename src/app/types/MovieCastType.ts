export interface MovieCastResponse {
    data: {
        _id: string;
        cast: MovieCast[];
        crew: MovieCrew[];
    };

}

export interface MovieCast {
    adult: boolean,
    cast_id: number,
    character: string,
    credit_id: string,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    order: number,
    original_name: string,
    popularity: number,
    profile_path: string
}


export interface MovieCrew {
    adult: boolean,
    credit_id: string,
    department: string,
    gender: number,
    id: number,
    job: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string
}

interface belongs_to_collection {
    backdrop_path: string | null;
    id: number;
    name: string;
    poster_path: string | null;
}
interface genres {
    id: number;
    name: string;
}

interface production_companies {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface MovieDetails {
    data: MovieDetails
}

export interface MovieDetails {
    _id: string;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: belongs_to_collection
    budget: number;
    genres: genres[];
    homepage?: string;
    id: number;
    imdb_id?: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: production_companies[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline?: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
