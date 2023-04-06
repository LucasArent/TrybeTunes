import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    checked: false,
    load: false,
  };

  async newInput({ target }) { // usando componentDidMount simplesmente não via se existia um checkbox para cada musica
    const { audio } = this.props;
    const verify = target.checked;
    this.setState({
      checked: verify,
      load: true,
    });
    await addSong(audio); // import da api
    this.setState({
      load: false,
    });
  }

  render() {
    const { trackName, trackId } = this.props; // objetos recebidos pela API, trackId
    const { checked, load } = this.state;
    return (
      <section>
        {load ? (
          <p><strong>Carregando...</strong></p>
        ) : (
          <div>
            <p id="find-track-component">{trackName}</p>
            <audio data-testid="audio-component" controls key={ trackId }>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>music</code>
            </audio>
            Favorita
            <input
              type="checkbox"
              id="label"
              className="checkbox-music"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.newInput.bind(this) }
              checked={ checked }
            />
          </div>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
