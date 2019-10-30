import { CALL_API } from '../middleware/api';
import {
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIE_SUCCESS,
    SEARCH_FOR_MOVIE_FAILURE
} from '../actionTypes';

export const searchForMovie = searchTerm => {
    console.log('searching!');

    return dispatch => {
        dispatch({
            [CALL_API]: {
                types: [
                    SEARCH_FOR_MOVIE,
                    SEARCH_FOR_MOVIE_SUCCESS,
                    SEARCH_FOR_MOVIE_FAILURE
                ],
                endpoint: `/api/search/${searchTerm}`
            }
        });
    };
};
export default { searchForMovie };
