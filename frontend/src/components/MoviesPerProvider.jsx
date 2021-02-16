import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MoviesPerProvider({ moviesProvider }) {
    return (
        <>
            <h3>{moviesProvider.name}</h3>
            <ul>
                {moviesProvider.movies.map(movie => (
                    <li
                        key={`movie-${Math.random()
                            .toString(12)
                            .substr(4, 9)}`}
                    >
                        <p>Link:</p>
                        <Link to={{ pathname: '/player', link: movie.link }}>
                            {movie.title}
                        </Link>
                        <p>Size: {movie.size}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

MoviesPerProvider.propTypes = {
    moviesProvider: PropTypes.shape({
        name: PropTypes.string,
        movies: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                link: PropTypes.string,
                size: PropTypes.string
            })
        )
    }).isRequired
};
