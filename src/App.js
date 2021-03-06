import React, { useEffect} from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
import { useDataLayerValue } from './DataLayer'


 const spotify = new SpotifyWebApi(); //this will communicate with spotify 

function App() {
  const [{user, token}, dispatch] = useDataLayerValue();

// useEffect runs the code based on a condition
useEffect(()=>{
  const hash = getTokenFromUrl();
  window.location.hash = "";
  let _token = hash.access_token;

  if (_token) {
    spotify.setAccessToken(_token);

    dispatch({
      type: 'SET_TOKEN',
      token: _token,
    });

  spotify.getPlaylist("37i9dQZEVXcX1srAF2jEn9").then((response) =>
  dispatch({
    type: "SET_DISCOVER_WEEKLY",
    discover_weekly: response,
  })
);
spotify.getMyTopArtists().then((response) =>
dispatch({
  type: "SET_TOP_ARTISTS",
  top_artists: response,
})
);

dispatch({
type: "SET_SPOTIFY",
spotify: spotify,
});

  spotify.getMe().then((user) => { 
    dispatch({
      type:"SET_USER",
       user,
    });
  });

  //fetching the user's playlist from the API
  spotify.getUserPlaylists().then((playlists) => {
    dispatch ({
      type: "SET_PLAYLISTS",
      playlists,
    });
  });

}
},[token, dispatch]);

  return (
  <div className="app">
    {!token && <Login /> }
    {token && <Player spotify={spotify} />}

      
    </div>
  );
}

export default App;
