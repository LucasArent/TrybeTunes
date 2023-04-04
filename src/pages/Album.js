import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';

class Album extends Component {
  state = {
    openMusic: [],
    album: '',
    artistName: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const openMusic = await musicsAPI(id);

    const [benningMusic, ...otherMusic] = openMusic;

    this.setState({
      openMusic: [...otherMusic],
      album: benningMusic.collectionName,
      artistName: benningMusic.artistName,
    });
  }

  listMusicas = (openmusic) => openmusic.map((getmusic, home) => (
    <li key={ `${getmusic.tracks}-${home}` }>
      <p>{getmusic.trackName}</p>
      <audio controls data-testid="audio-component">
        <source src={ getmusic.previewUrl } type="audio/mpeg" />
        <track src={ getmusic.trackName } kind="captions" label="English" default />
        Audio.
      </audio>
    </li>
  ));

  render() {
    const { openMusic,
      album,
      artistName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{album}</p>
        <li>{this.listMusicas(openMusic)}</li>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
