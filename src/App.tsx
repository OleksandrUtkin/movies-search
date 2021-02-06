import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Movies from "./components/Movies";
import axios from "axios";
import movieAPIkey from "./movieConfig";
import Pagination from "./components/Pagination";

const App: React.FC = () => {
  const [genreFilterId, setGenreFilterId] = useState<number | false>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genresList, setGenresList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesPagesValue, setMoviesPagesValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const moviesPages: number[] = [];

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieAPIkey}&language=en-US`
      )
      .then((response) => setGenresList(response.data.genres));
  }, []);

  useEffect(() => {
    const getData = async () => {
      setError(false);
      setIsLoading(true);
      const genreFilterIdValue = genreFilterId
        ? `&with_genres=${genreFilterId}`
        : "";
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${movieAPIkey}&language=en-US&sort_by=primary_release_date.desc&page=${currentPage}${genreFilterIdValue}`
        );
        setMovies(response.data.results);
        setMoviesPagesValue(response.data.total_pages);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    getData();
  }, [currentPage, genreFilterId]);

  for (let i = 1; i <= moviesPagesValue; i++) moviesPages.push(i);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movies.length) return <p>No movies found</p>;

  return (
    <>
      <Filter
        genresList={genresList}
        setGenreFilterId={setGenreFilterId}
        setCurrentPage={setCurrentPage}
      />
      <Movies movies={movies} genresList={genresList} />
      {moviesPages.length > 1 && (
        <Pagination
          moviesPages={moviesPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default App;
