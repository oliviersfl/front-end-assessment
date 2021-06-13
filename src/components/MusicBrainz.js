import React, { useState } from 'react';
import MusicBrainzApi from '../api/musicbrainz';
import MusicBrainzSearch from './Search/MusicBrainzSearch';
import MusicBrainzSearchResult from './SearchResult/MusicBrainzSearchResult';

const MusicBrainz = ({ visible }) => {
  const [searchResults, setSearchResults] = useState(null);

  const searchArtist = (term) => {
    MusicBrainzApi.get("/artist", {
      params: {
        query: term
      }
    }).then((response) => {
      setSearchResults(response.data);
    }, (error) => {
      
    });
  }

  return (
    <div className={ "ui segment content" + (!visible ? " hidden" : "") }>
      <MusicBrainzSearch onFormSubmit={ searchArtist }/>
      <MusicBrainzSearchResult
        artists={ (searchResults != null && searchResults.artists) && searchResults.artists }
      />
    </div>
  );
}

export default MusicBrainz;