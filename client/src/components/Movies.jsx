import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: this.props.movies
    };

    this.addHandle = this.addHandle.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)
  addHandle(movieId) {
    // console.log(movieId)
    this.props.addFave(movieId)
  }

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop
  // "showFaves" is false (search results) or true (fave list) (within index.jsx)
  deleteHandle(e) {

  }

  render() {
    return (
      <ul className="movies">
        {/* Make this list dynamic! */}
        {this.props.movies.map(movie => {
          return(
            <li key={movie.id} className="movie_item" onClick={()=>{this.addHandle(movie.id)}}>
              <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}/>
              <div className="movie_description">
                <h2>{movie.title}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average}</span>
                  </div>
                </section>
              </div>
            </li>
          )})}
      </ul>
    );
  }
}

export default Movies;

/*        in case I want to revert back :D
      <li className="movie_item">
          <img src="https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300" />
          <div className="movie_description">
            <h2>De Wae</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Year</span>
                <span>2018</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>10.0</span>
              </div>
            </section>
          </div>
        </li>
 */