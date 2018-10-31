import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

/* client/src/App.js */
class App extends Component {
  constructor(){
    
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
    console.log(params);
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }
  getUserInfo(){
    spotifyApi.getMe()
      .then((response) => {
        this.setState({
          userID: response.id
        });
        
      })
  }
  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>}
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          Hello {this.state.userID}!
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { <div>
          {this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
              {this.getUserInfo()}        </button>}
          </div>
        }
        
      </div>
    );
  }
}

export default App;