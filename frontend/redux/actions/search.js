import { CALL_API, ABORT_API } from '../middleware/api';
import {
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIE_SUCCESS,
    SEARCH_FOR_MOVIE_FAILURE,
    CLEAR_RESULTS_LIST
} from '../actionTypes';

const MINIMUM_SEARCH_TERM_LENGTH = 2;

export const clearResultsList = () => dispatch => {
    dispatch({
        type: CLEAR_RESULTS_LIST
    });
    dispatch({
        [ABORT_API]: {
            requestType: SEARCH_FOR_MOVIE
        }
    });
};

export const searchForMovie = searchTerm => dispatch => {
    if (searchTerm.length < MINIMUM_SEARCH_TERM_LENGTH) {
        dispatch(clearResultsList());
        return;
    }

    dispatch({
        [CALL_API]: {
            types: [
                SEARCH_FOR_MOVIE,
                SEARCH_FOR_MOVIE_SUCCESS,
                SEARCH_FOR_MOVIE_FAILURE
            ],
            endpoint: `/api/search/${searchTerm}`,
            payload: {
                searchTerm
            }
        }
    });
};
export default { searchForMovie };
