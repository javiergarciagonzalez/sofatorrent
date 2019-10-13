import React from 'react';

export default function Form() {
    return (
        <form action="api/search" method="POST">
            <input type="text" name="search" />
            <input type="submit" value="Search" />
        </form>
    );
}
