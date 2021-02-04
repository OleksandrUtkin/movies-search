import React, {useEffect, useState} from 'react';
import Filter from "./components/Filter";
import Movies from "./components/Movies";
import axios from "axios";
import movieAPIkey from './movieConfig';
import Pagination from "./components/Pagination";

function App() {
    const [genreFilterId, setGenreFilterId] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [genresList, setGenresList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [moviesPagesValue, setMoviesPagesValue] = useState(null);
    const moviesPages = [];

    for (let i = 1; i <= moviesPagesValue; i++) moviesPages.push(i);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${movieAPIkey}&language=en-US`)
            .then(response => setGenresList(response.data.genres));
    }, []);

    useEffect(() => {
        console.log(currentPage);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPIkey}&language=en-US&sort_by=primary_release_date.desc&page=${currentPage}${genreFilterId ? `&with_genres=${genreFilterId}` : ''}`)
           .then(response => {
               setMovies(response.data.results);
               setMoviesPagesValue(response.data.total_pages);
               console.log(response)
           })
    }, [currentPage, genreFilterId]);

    if(!movies.length) return <p>Loading...</p>;

    return (
        <>
            <Filter
                genresList={genresList}
                setGenreFilterId={setGenreFilterId}
                setCurrentPage={setCurrentPage}
            />
            <Movies
                movies={movies}
                genresList={genresList}
            />
            {moviesPages.length > 0 && <Pagination
                moviesPages={moviesPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />}
        </>
    );
}

export default App;
