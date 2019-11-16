import {
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIE_SUCCESS,
    SEARCH_FOR_MOVIE_FAILURE
} from '../actionTypes';

const initialState = {
    results: [],
    isLoading: false,
    error: '',
    term: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_FOR_MOVIE:
            return { ...state, isLoading: true, error: '' };
        case SEARCH_FOR_MOVIE_SUCCESS: {
            const results = action.response;

            let error = '';
            if (results.length === 0) {
                error = `Unable to find results for '${action.payload.term}''`;
            }

            return {
                ...state,
                results,
                isLoading: false,
                error
            };
        }
        case SEARCH_FOR_MOVIE_FAILURE:
            return {
                ...state,
                results: [],
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}
