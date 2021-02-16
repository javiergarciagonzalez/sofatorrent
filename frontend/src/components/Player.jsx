import React from 'react';
import PropTypes from 'prop-types';

import WebTorrentVideo from './WebTorrentVideo';

export default function Player(props) {
    const { location } = props;
    const { link } = location;
    return (
        <div>
            {link}
            <WebTorrentVideo magnetLink={link} />
        </div>
    );
}

Player.propTypes = {
    location: PropTypes.shape({
        link: PropTypes.string
    }).isRequired
};
