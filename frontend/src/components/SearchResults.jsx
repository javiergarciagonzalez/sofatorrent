import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import MoviesPerProvider from './MoviesPerProvider';

function SearchResults({ results, isLoading, error }) {
    if (isLoading) {
        return <CircularProgress />;
    }

    if (error !== '') {
        return <p>{error}</p>;
    }

    return (
        <>
            {results.map(moviesProvider => (
                <MoviesPerProvider
                    key={moviesProvider.name}
                    moviesProvider={moviesProvider}
                />
            ))}
        </>
    );
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            movies: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string,
                    link: PropTypes.string,
                    size: PropTypes.string
                })
            )
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({ ...state.search });

export default connect(mapStateToProps)(SearchResults);
