import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import WebTorrent from 'webtorrent';

let client;

const onTorrent = torrent => {
    const file = torrent.files.find(videoFile =>
        videoFile.name.endsWith('.mp4')
    );

    file.appendTo('.webtorrent-video');

    torrent.on('download', bytes => {
        const { downloadSpeed, downloaded, progress } = torrent;
        console.log(`just downloaded: ${bytes}`);
        console.log(`total downloaded: ${downloaded}`);
        console.log(`download speed: ${downloadSpeed}`);
        console.log(`progress: ${progress}`);
    });

    return torrent;
};

export default function WebTorrentVideo({ magnetLink }) {
    useEffect(() => {
        client = new WebTorrent();
    }, []);

    useEffect(() => {
        if (magnetLink === '') return null;

        const torrent = client.add(
            'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
            onTorrent
        );

        return function cleanUp() {
            torrent.destroy();
        };
    }, [magnetLink]);
    return <div className="webtorrent-video" />;
}

WebTorrentVideo.propTypes = {
    magnetLink: PropTypes.string
};

WebTorrentVideo.defaultProps = {
    magnetLink: ''
};
