/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { API_URL, API_KEY_3 } from '../../api/api'
import MoviesList from './MoviesList';

export default Component => class MovieList extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: []
        }
    }

    getMovies = (filters, page) => {
        const { sort_by } = filters
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}`;
        fetch(link)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    movies: data.results
                });
            });
    }

    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page)
            
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.filters.sort_by !== this.props.filters.sort_by) {
            this.props.onChangePage(1)
            this.getMovies(this.props.filters, 1)
        }

        if(prevProps.page !== this.props.page) {
            this.getMovies(this.props.filters, this.props.page)
        }
    }

    render() {
        const { movies } = this.state;
        return (
            <Component movies={movies} />
        );
    }
}

