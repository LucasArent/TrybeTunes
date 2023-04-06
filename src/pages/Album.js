import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    audios: [],
    artistName: '',
    load: false,
    tagId: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const trackMusic = await getMusics(id); // import da api
    const tagMusic = trackMusic.slice(1);
    this.setState({
      audios: tagMusic,
      tagId: trackMusic[0].collectionName,
      artistName: trackMusic[0].artistName,
    });
  }

  render() {
    const { audios, tagId, artistName, load } = this.state;
    const opAudio = audios.length > 0
      && audios.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          trackId={ music.trackId }
        />
      ));
    return (
      <div data-testid="page-album">
        <Header />
        <label id="album-page">
          <p data-testid="album-name">{tagId}</p>
          <p data-testid="artist-name">{artistName}</p>
          <p>{load ? <p><strong>Carregando...</strong></p> : opAudio}</p>
          <li> music1 </li> 
          <li> music2 </li>
          <li> music3 </li>
        </label>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;

// lista para criar squares pras capas e afins mais bonitos
