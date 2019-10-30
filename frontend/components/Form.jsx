import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as searchActions from '../redux/actions/search';

function Form({ searchForMovie }) {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
            }}
        >
            <input
                type="text"
                name="search"
                onChange={event => {
                    const { value } = event.target;

                    searchForMovie(value);
                }}
            />
        </form>
    );
}

Form.propTypes = {
    searchForMovie: PropTypes.func.isRequired
};

export default connect(
    null,
    { ...searchActions }
)(Form);
