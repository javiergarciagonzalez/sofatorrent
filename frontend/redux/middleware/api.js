// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

// Action key that carries API abort info interpreted by this Redux middleware.
export const ABORT_API = 'ABORT_API';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const fetchWrapper = (requestType, endpoint, options = {}) => {
    // if an abort controller is present for this type, execute it. It does not matter
    // whether the fetch is still running; Abort Controllers are idempotent.
    if (fetchWrapper.AbortControllers[requestType] && !options.keep) {
        fetchWrapper.AbortControllers[requestType].abort();
    }

    // register abort controllers per RequestAction type; each of these types can be
    // considered a re-emit of the intended API interaction and as such should abort
    // the previous invocation of this command
    fetchWrapper.AbortControllers[requestType] = new AbortController();
    const { signal } = fetchWrapper.AbortControllers[requestType];

    return fetch(endpoint, { ...options, signal }).then(response => {
        // clean up abort controller
        delete fetchWrapper.AbortControllers[requestType];
        return response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        });
    });
};
fetchWrapper.AbortControllers = {};

function invokeNextAction(action, response, payload, next, actionWith) {
    if (typeof action === 'function') {
        const resultAction = action(response, payload);

        return next(resultAction);
    }

    return next(
        actionWith({
            type: action,
            response,
            payload
        })
    );
}

function invokeFailure(action, payload, next, actionWith) {
    const error = 'Something went wrong, please try again';

    if (typeof action === 'function') {
        const resultAction = action(error, payload);
        return next(resultAction);
    }

    return next(
        actionWith({
            type: action,
            error,
            payload
        })
    );
}

function callApi(store, action, next) {
    const callAPI = action[CALL_API];
    const { endpoint } = callAPI;
    const { types, payload, options } = callAPI;

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (
        !types.every(
            type => typeof type === 'string' || typeof type === 'function'
        )
    ) {
        throw new Error('Expected action types to be strings or functions.');
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    const actionWith = data => {
        const finalAction = { ...action, ...data };
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [requestType, successType, failureType] = types;

    invokeNextAction(requestType, {}, payload, next, actionWith);

    return fetchWrapper(requestType, endpoint, options).then(
        response => {
            return invokeNextAction(
                successType,
                response,
                payload,
                next,
                actionWith
            );
        },
        error => {
            // silently ignores aborts since a new API call has already been triggered
            // and emitting it would break the spinner and loading flow
            if (error.name === 'AbortError') {
                return null;
            }

            return invokeFailure(failureType, payload, next, actionWith);
        }
    );
}

function abortApi(action) {
    const { requestType } = action[ABORT_API];

    if (fetchWrapper.AbortControllers[requestType]) {
        fetchWrapper.AbortControllers[requestType].abort();
    }
}

// A Redux middleware that interprets actions with CALL_API and ABORT_API info
// specified. Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];
    const abortAPI = action[ABORT_API];

    if (callAPI) {
        return callApi(store, action, next);
    }

    if (abortAPI) {
        return abortApi(action);
    }

    return next(action);
};
