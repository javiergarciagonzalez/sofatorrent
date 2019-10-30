import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function SearchResults({ results }) {
    if (results.length === 0) {
        return null;
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
    ).isRequired
};

const mapStateToProps = state => ({ results: state.search.results });

export default connect(mapStateToProps)(SearchResults);
