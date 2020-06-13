import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFaves: false,
      genres: [],
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
    let data = [];
    axios.get('/genres')
      .then(res => {
        res.data.forEach(genre => {
          data.push(genre);
        })
        this.setState({
          genres: data,
          currentGenre: {id: data[0].id, name: data[0].name}
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
            return (<option key={genre.id} name={genre.id} value={genre.name}>{genre.name}</option>)
          })}
        </select>
        <br/><br/>
        <button onClick={() => this.props.getMovies(this.state.currentGenre)}>Search</button>

      </div>
    );
  }
}

export default Search;