import React from 'react';
import './Tracklist.css';
import { Track } from '../Track/Track';

export class Tracklist extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((song) => {
                    return <Track key={song.id} track={song} />;
                })}    
            </div>
        );
    }
}