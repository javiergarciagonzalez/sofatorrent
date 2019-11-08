import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';

const appStyle = {
    margin: '0 auto',
    textAlign: 'center',
    width: '70%'
};

export default function App() {
    return (
        <div className="main" style={appStyle}>
            <Header />
            <Route path="/" exact component={Home} />
        </div>
    );
}
