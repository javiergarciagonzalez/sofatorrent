import React from 'react';
import PropTypes from 'prop-types';

export default function Video(props) {
    const { location } = props;
    const { link } = location;
    return (
        <div>
            Component TODO
            {link}
        </div>
    );
}

Video.propTypes = {
    location: PropTypes.shape({
        link: PropTypes.string
    }).isRequired
};
