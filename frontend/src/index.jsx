import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createPreparedStore from './redux/store';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';

import './style/index.scss';

const initialState = {
    search: {
        results: [],
        isLoading: false,
        error: '',
        term: ''
    }
};
const store = createPreparedStore(initialState);

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('app')
);
