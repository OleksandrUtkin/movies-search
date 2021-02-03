import React, {useEffect, useState} from 'react';
import Sort from "./components/Sort";
import Movies from "./components/Movies";
import axios from "axios";
import movieAPIkey from './movieConfig';

function App() {

    const [sortMovieBy, setSortMovieBy] = useState('primary_release_date.desc');
    const [responsePage, setResponsePage] = useState(1);
    const [genresList, setGenresList] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${movieAPIkey}&language=en-US`)
            .then(response => setGenresList(response.data.genres));
    }, []);

    console.log(genresList);

    useEffect(() => {
       axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPIkey}&language=en-US&sort_by=${sortMovieBy}&page=${responsePage}`)
           .then((response) => setMovies(response.data.results))
           // .then(() => console.log(movies))
    }, [responsePage]);

    // console.log(movies);

    return (
        <>
            <Sort/>
            <Movies movies={movies} />
        </>
    );
}

export default App;
