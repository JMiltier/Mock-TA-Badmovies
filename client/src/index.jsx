import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };

    // you might have to do something important here!
    // BIND IT!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  componentDidMount() {
    this.getMovies({id: 0, name: 'All'})
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    // * the genre is an object of {id: ,name: }
    // * console.log('trying to get genre', genre);
    axios({
      method: 'GET',
      url: '/search',
      params: {
        id: genre.id
      }})
      .then(res => {
        this.setState({
          movies: res.data
        })
      })
      .catch(err => console.error('error in index.jsx for searching movies', err));
  }

  saveMovie(movieId) {
    // same as above but do something diff
    // console.log('about to save movie of id', movieId)
    this.state.movies.forEach(movie => {
      if (movie.id === movieId) {
        this.setState({
          favorites: this.state.favorites.concat(movie)
        })
      }
    })
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies}
                  showFaves={this.state.showFaves} addFave={this.saveMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));