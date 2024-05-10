import React from 'react';
import './Track.css';

export class Track extends React.Component {
    renderAction() {
        if(this.props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}