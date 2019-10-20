import React from 'react';

const h1Style = {
    fontSize: '72px',
    background:
        'linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(0,67,138,0.95) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};

export default function Header() {
    return (
        <header>
            <h1 style={h1Style}>Welcome to sofaTorrent</h1>
        </header>
    );
}
