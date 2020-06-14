import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFaves: false,
      genres: [{id: 0, name: 'All'}],
      currentGenre: 0
    };

    this.getGenres = this.getGenres.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
      .then(res => {
        res.data.forEach(genre => {
          this.setState({genres: this.state.genres.concat(genre)})
        }, () => {
          this.setState({
            currentGenre: this.state.genre[0]
          })
        })
      })
      .catch(err => console.error('error in Search.jsx for get movies', err));
  }

  selectHandler(event) {
    event.preventDefault();
    // could not get the element names to pass along the id
    this.state.genres.forEach(genre => {
      if (genre.name === event.target.value) {
        this.setState({
          currentGenre: genre
        })
      }
    })

  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.selectHandler}>
          {this.state.genres.map(genre => {
            return (<option key={genre.id} value={genre.name}>{genre.name}</option>)
          })}
        </select>
        <br/><br/>
        <button onClick={() => this.props.getMovies(this.state.currentGenre)}>Search</button>
      </div>
    );
  }
}

export default Search;