import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import WebTorrent from 'webtorrent';
import { BrowserRouter as Router } from 'react-router-dom';
import createPreparedStore from './redux/store';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';

import './style/index.scss';

if (WebTorrent.WEBRTC_SUPPORT) {
    // WebRTC is supported
    console.log('Webtorrent supported!');
} else {
    // Use a fallback
    console.log('Webtorrent NOT supported!');
}
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
    <ErrorBoundary>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('app')
);
