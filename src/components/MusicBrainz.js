import React, { useState } from 'react';
import MusicBrainzApi from '../api/musicbrainz';
import MusicBrainzSearch from './Search/MusicBrainzSearch';
import MusicBrainzSearchResult from './SearchResult/MusicBrainzSearchResult';

const MusicBrainz = ({ visible, favourites, setFavourites }) => {
  const [searchResults, setSearchResults] = useState(null);

  const searchArtist = (term) => {
    MusicBrainzApi.get("/artist", {
      params: {
        query: term,
        limit: "10"
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
        favourites={ favourites }
        setFavourites={ setFavourites }
      />
    </div>
  );
}

export default MusicBrainz;