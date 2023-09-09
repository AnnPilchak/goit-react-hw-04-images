import { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import getPhotos from "api/photos";

import {Container} from "./App.styled"

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);

      try {
        const response = await getPhotos(query, page);
        const { data } = response;

        if (data.totalHits === 0) {
          setError('No results');
        }

        setResults(prevResults => [...prevResults, ...data.hits]);
        setTotalResults(data.totalHits);
      } catch {
        setError('Something went wrong. Try reloading the page');
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') {
      loadImages();
    } else {
      setError('Please, enter search query');
    }
  }, [page, query]);

  const getSearchQuery = newSearchQuery => {
    if (newSearchQuery !== query) {
      setQuery(newSearchQuery);
      setPage(1);
      setResults([]);
    }
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <Container>
        <Searchbar onSubmit={getSearchQuery} />
        <ImageGallery
        images={results}
        totalImages={totalResults}
        loadingStatus={isLoading}
        errorMessage={error}
        onClick={handleLoadMoreClick}/>
      </Container>
    );
}

export default App;