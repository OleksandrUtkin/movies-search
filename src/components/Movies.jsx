import React from 'react';

const Movies = ({movies}) => {
    const prePathPoster = 'http://image.tmdb.org/t/p/w92';

    if(!movies) return <p>Loading...</p>;
    return (
        <ul className='movies-ul'>
            {movies.filter((movie) => movie.title && movie.poster_path && movie.release_date).map((movie, index) => {
                return (
                    <li key={movie.title+index} className='movie'>
                        <div className="movie__poster-wrap">
                            <img src={prePathPoster + movie.poster_path} alt="movie.title"/>
                        </div>
                        <div className="movie__description">
                            <h3 className='movie__title'>{movie.title}</h3>
                            <p className='movie__year'>{movie.release_date}</p>
                            <div className="movie__genres"></div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
};

export default Movies;
