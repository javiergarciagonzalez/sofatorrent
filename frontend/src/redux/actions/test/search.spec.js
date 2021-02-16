import { clearResultsList, searchForMovie } from '../search';
import { CALL_API, ABORT_API } from '../../middleware/api';
import {
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIE_SUCCESS,
    SEARCH_FOR_MOVIE_FAILURE,
    CLEAR_RESULTS_LIST
} from '../../actionTypes';

const searchTypes = [
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIE_SUCCESS,
    SEARCH_FOR_MOVIE_FAILURE
];

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

getStateMock.mockReturnValue({
    results: [],
    isLoading: false,
    error: '',
    term: ''
});

const createRequest = term => ({
    [CALL_API]: {
        endpoint: `/api/search/${term}`,
        payload: { term },
        types: searchTypes
    }
});

jest.useFakeTimers();

describe('Map', () => {
    afterEach(() => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
    });
    test('should return results when searching for Batman movies', () => {
        const term = 'batman';

        expect(searchForMovie(term)(dispatchMock, getStateMock));
        expect(dispatchMock).toHaveBeenCalledWith(createRequest(term));
        expect(dispatchMock.mock.calls.length).toBe(1);
    });

    test('should not return results when searching for less than minimun search length', () => {
        const term = 'a';

        expect(searchForMovie(term)(dispatchMock, getStateMock));
        expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
        expect(dispatchMock.mock.calls.length).toBe(1);
    });

    test('should effectively clear the search results', () => {
        expect(clearResultsList()(dispatchMock, getStateMock));
        expect(dispatchMock).toHaveBeenCalledWith({
            type: CLEAR_RESULTS_LIST
        });
        expect(dispatchMock).toHaveBeenCalledWith({
            [ABORT_API]: {
                requestType: SEARCH_FOR_MOVIE
            }
        });
        expect(dispatchMock.mock.calls.length).toBe(2);
    });
});
