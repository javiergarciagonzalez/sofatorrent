import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createPreparedStore from './redux/store';
import App from './components/App';

import './style/index.scss';

const initialState = {
    search: {
        results: [],
        isLoading: false,
        error: '',
        searchTerm: ''
    }
};
const store = createPreparedStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
