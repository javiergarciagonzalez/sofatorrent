import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import * as searchActions from '../redux/actions/search';

const DEBOUNCE_WAIT = 500;

function Form({ searchForMovie }) {
    const search = debounce(term => searchForMovie(term), DEBOUNCE_WAIT);
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
                    search(value);
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
