import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong /* getFavoriteSongs */ } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    load: false,
    checked: false,
    // favAudios: [],
  };

  async componentDidMount() {
    const { verify } = this.props;
    this.setState({
      checked: verify,
      // favAudios: await getFavoriteSongs(),
    });
  }

  newInput = async ({ target }) => {
    const checking = target.checked;
    this.setState(
      { checked: checking },
      await this.addSong(),
      // await this.addOrRemoveSong(),
    );
  };

  addSong = async () => {
    const { checked } = this.state;
    const { trackId } = this.props;
    this.setState({ load: true });
    await (checked ? removeSong(trackId) : addSong(trackId));
    // const favAudios = await getFavoriteSongs();
    this.setState({ load: false });
  };

  render() {
    const { trackName, trackId } = this.props; // objetos recebidos pela API, trackId
    const { checked, load } = this.state;
    // const isFavorite = favAudios.some((song) => song.trackId === trackId);
    const musicList = [
      { id: 1, name: 'music1' },
      { id: 2, name: 'music2' },
      { id: 3, name: 'music3' },
    ];
    return (
      <section>
        {load ? <p><strong>Carregando...</strong></p> : (
          <div>
            <p>{ trackName }</p>
            <ul>
              {musicList.map((audio) => (
                <li key={ audio.id } id="squares">{audio.name}</li>
              ))}
            </ul>
            <audio
              data-testid="audio-component"
              controls
              key={ trackId }
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            Favorita
            <input
              type="checkbox"
              id="label"
              className="checkbox-music"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.newInput }
              checked={ checked /* || isFavorite */ }
            />
          </div>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  verify: PropTypes.bool,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;

// lista para criar squares pras capas e afins mais bonitos
