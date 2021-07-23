import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class MovieItem extends Component {
    render() {
        const { item } = this.props;
        const imagePath = item.backdrop_path || item.poster_path

        return (
            <div className="card">
                <img 
                    className="card-img-top card-img--height" 
                    src={imagePath ? `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}` : 'https://via.placeholder.com/150'}
                    alt={item.title}
                />
                <div className="card-body">
                    <Link style={{textDecoration: 'none', fontWeight: '600'}} className="card-title" to={`/movie/${item.id}`}>
                        {item.title}
                    </Link>
                    <div className="card-text">
                        Рейтинг: {item.vote_average}
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieItem
