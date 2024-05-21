import { IPublicMovie } from "src/features/movies/interfaces/public-movie.interface"

export interface IListPublicMovies {
    count: number
    next?: any
    previous?: any
    results: IPublicMovie[]
}