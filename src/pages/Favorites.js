import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favAudios: [],
    load: true,
  };

  async componentDidMount() {
    try {
      const favAudios = await getFavoriteSongs();
      this.setState({ favAudios, load: false });
    } catch (error) {
      console.error(error);
    }
  }

  removeAudio = async (trackId) => {
    this.setState({ load: true });
    await removeSong(trackId);
    const favAudios = await getFavoriteSongs();
    this.setState({ favAudios, load: false });
    /* const musicList = [
      { id: 1, name: 'music1' },
      { id: 2, name: 'music2' },
      { id: 3, name: 'music3' },
    ]; */
  };

  render() {
    const { favAudios, load } = this.state;

    return (
      <label>
        {' '}
        Favorita
        <div data-testid="page-favorites">
          <Header>Favoritas</Header>
          {load ? (
            <p>Carregando...</p>
          ) : (
            <ul>
              {favAudios.map((audio) => (
                <li key={ audio.trackId }>
                  <MusicCard
                    trackName={ audio.trackName }
                    trackId={ audio.trackId }
                    verify
                    onRemoveSong={ this.removeAudio }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>
    );
  }
}

export default Favorites;
