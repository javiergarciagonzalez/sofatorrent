import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CircularProgress } from '@material-ui/core';

function SearchResults({ results, isLoading, error }) {
    if (isLoading) {
        return <CircularProgress />;
    }

    if (error !== '') {
        return <p>{error}</p>;
    }

    return (
        <ul>
            {results.map(result => (
                <li
                    key={`movie-${Math.random()
                        .toString(12)
                        .substr(4, 9)}`}
                >
                    <a href={result.link}>{result.title}</a>
                </li>
            ))}
        </ul>
    );
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            link: PropTypes.string,
            size: PropTypes.string
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({ ...state.search });

export default connect(mapStateToProps)(SearchResults);
