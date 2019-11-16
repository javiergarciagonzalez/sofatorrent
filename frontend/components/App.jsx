import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Video from './Video';

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
            <Route path="/video" exact component={Video} />
        </div>
    );
}
