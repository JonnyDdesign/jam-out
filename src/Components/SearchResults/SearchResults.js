import React from 'react';
import { Track } from '../Track/Track';
import './SearchResults.css';

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Track tracks={this.props.searchResults} />
            </div>
        );
    }
}