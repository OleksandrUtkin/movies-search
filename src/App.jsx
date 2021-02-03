import React, {useEffect, useState} from 'react';
import Sort from "./components/Sort";
import Movies from "./components/Movies";
import axios from "axios";
import movieAPIkey from './movieConfig';

function App() {

    const [sortMovieBy, setSortMovieBy] = useState('release_data.desc');
    const [page, setPage] = useState(1);

    useEffect(() => {
       axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPIkey}&language=en-US&sort_by=${sortMovieBy}&page=${page}`)
           .then((response) => console.log(response.data));
    }, []);

    return (
        <>
            <Sort/>
            <Movies/>
        </>
    );
}

export default App;
