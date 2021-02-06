import React from 'react';

interface PropsTypes {
    movies: Array<any>
    genresList: { id: number, name: string }[]
}

const Movies : React.FC<PropsTypes> = ({movies, genresList}) => {
    const prePathPoster = 'http://image.tmdb.org/t/p/w92';

    return (
        <ul className='movies-ul'>
            {movies.filter((movie) => movie.title && movie.poster_path && movie.release_date && movie.genre_ids.length)
                .slice(0, 10)
                .map((movie, index) => {
                return (
                    <li key={movie.title+index} className='movie'>
                        <div className="movie__poster-wrap">
                            <img src={prePathPoster + movie.poster_path} alt="movie.title"/>
                        </div>
                        <div className="movie__description">
                            <h3 className='movie__title'>{movie.title}</h3>
                            <p className='movie__year'>{movie.release_date}</p>
                            <ul className="movie__genres">
                                {genresList.filter(genre => movie.genre_ids.includes(genre.id)).map(genre =>
                                    <li key={genre.name}>{genre.name}</li>
                                )}
                            </ul>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
};

export default Movies;
