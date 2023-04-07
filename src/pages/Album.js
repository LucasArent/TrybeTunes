import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    tagId: [],
    artistName: '',
    fav: [],
    collectionName: '',
    playlist: [], // novo estado para armazenar as faixas da playlist
  };

  componentDidMount() {
    this.getMusics();
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    const favSaved = await getFavoriteSongs();
    const { tagId } = this.state;
    const shareLink = (url) => {
      navigator.clipboard.writeText(url); // vi em um shorts do youtube, e pareceu interessante
      console.log('copiado para compartilhar');
    };
    const fav = tagId.map((track) => {
      const verify = favSaved.some(
        (artistSaved) => artistSaved.trackId === track.trackId,
      );
      return { ...track, verify };
    });
    this.setState({
      fav,
      shareLink,
    });
  };

  getMusics = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musics = await getMusics(id);
    const tagId = musics.filter((_album, index) => index !== 0);
    const { artistName } = musics[0];
    const { collectionName } = musics[0];
    this.setState({
      tagId,
      artistName,
      collectionName,
    });
  };

  addToPlaylist = (track) => {
    this.setState((prevState) => ({
      playlist: [...prevState.playlist, track], // adiciona a faixa ao estado da playlist
    }));
  };

  render() {
    const { fav, artistName, collectionName, shareLink } = this.state;
    return (
      <div data-testid="page-album">
        <Header id="colletion-albom-name">Colletion</Header>
        <p data-testid="album-name">{collectionName}</p>
        <p data-testid="artist-name">{artistName}</p>
        {fav.map((audio) => (
          <MusicCard
            key={ audio.trackId }
            trackName={ audio.trackName }
            trackId={ audio.trackId }
            verify={ audio.verify }
            shareLink={ () => shareLink(
              `https://media.tenor.com/eaDPAe9OLSoAAAAd/cat-kissing.gif/${audio.trackId}`, // link suspeito ;)
            ) }
            addToPlaylist={ () => this.addToPlaylist(audio) }
            // botão para adicionar a faixa à playlist
          >
            {' '}
          </MusicCard>
        ))}
        <p>Sua Playlist:</p>
        <ul>{/* ... */}</ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
