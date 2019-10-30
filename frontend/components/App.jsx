import React from 'react';

import Header from './Header';
import Form from './Form';
import SearchResults from './SearchResults';

const appStyle = {
    margin: '0 auto',
    textAlign: 'center',
    width: '70%'
};

export default function App() {
    return (
        <div className="main" style={appStyle}>
            <Header />
            <Form />
            <SearchResults />
        </div>
    );
}
