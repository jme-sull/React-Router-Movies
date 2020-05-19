import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';

//components
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);


  //fetch data
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }

    getMovies();
  }, []);



  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  return (
    <div>

    <SavedList list={savedList} />

    <Switch> 
          <Route exact path = '/'>
            <MovieList movies = {movieList}/> 
          </Route>

          <Route path = '/movies/:id' >
            <Movie />
          </Route>

    </Switch> 
    </div>
  );
};

export default App;
