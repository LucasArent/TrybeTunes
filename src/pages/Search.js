import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    tileArtistic: '',
    isLoading: false,
    albums: [],
    error: null,
  };

  handleChange = (event) => {
    this.setState({
      tileArtistic: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { tileArtistic } = this.state;

    try {
      this.setState({ isLoading: true });

      const albums = await searchAlbumsAPI(tileArtistic);

      this.setState({
        albums,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.message,
      });
    }
  };

  renderAlbums = () => {
    const { albums } = this.state;

    if (albums.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }

    return (
      <div>
        {albums.map((album) => (
          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h2>{album.collectionName}</h2>
            <p>{album.artistName}</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { tileArtistic, isLoading, error } = this.state;
    const disabledButton = tileArtistic.length < 2; // verificar se tem 2 ou mais caracteres

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="search-artist-input">Pesquisar</label>
          <input
            type="text"
            id="search-artist-input"
            name="search-artist-input"
            data-testid="search-artist-input"
            value={ tileArtistic }
            onChange={ this.handleChange }
          />
          <button
            id="findArt"
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabledButton }
          >
            Pesquisar
          </button>
        </form>

        {isLoading && <p>Carregando...</p>}

        {error && <p>Ocorreu um erro ao buscar os álbuns. Por favor, tente novamente.</p>}

        {!isLoading && !error && (
          <div>
            {tileArtistic && (
              <p>
                Resultado de álbuns de:
                {' '}
                {tileArtistic}
              </p>
            )}
            {this.renderAlbums()}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
