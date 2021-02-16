import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import api from './middleware/api';
import reducers from './reducers';

// Enable redux devtools when chrome-extension is installed
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default initialState => {
    return createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(api, thunk))
    );
};
