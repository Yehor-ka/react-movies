import React, { Component } from 'react';
import { fetchAPI, API_URL, API_KEY_3 } from '../../../api/api';
import MovieItem from '../../Movies/MovieItem';

export class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: [],
    };
  }

  componentDidMount() {
    fetchAPI(
      `${API_URL}/movie/${this.props.match.params.id}?api_key=${API_KEY_3}&language=ru-RU`,
    ).then((res) => {
      this.setState({
        movie: res,
      });
      console.log(this.state.movie);
    });
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieItem item={movie} />
    );
  }
}

export default MoviePage;
