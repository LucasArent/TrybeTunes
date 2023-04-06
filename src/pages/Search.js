import React from 'react';
import About from '../components/About';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    Offbt: true,
    moreAlbuns: [],
    isLoading: false,
    titleArtists: '',
  };

  changeInput = ({ target }) => {
    const { id, value } = target;
    const response = target.type === 'checkbox' ? target.checked : value;
    this.setState(
      {
        [id]: response,
      },
      this.verify,
    );
  };

  searchAlbum = async (event) => {
    event.preventDefault();
    const { input } = this.state;
    this.setState({ isLoading: true });
    const findAlbum = await searchAlbumsAPI(input); // import da api
    this.setState({
      input: '',
      Offbt: true,
      isLoading: false,
      moreAlbuns: [...findAlbum],
      titleArtists: input,
    });
    this.setState({ isLoading: false });
  };

  verify = () => {
    const { input } = this.state;
    const checkText = input.length < 2;
    const isDisable = !!checkText;
    this.setState({ Offbt: isDisable });
  };

  render() {
    const { Offbt, isLoading, moreAlbuns, titleArtists } = this.state;
    return (
      <div data-testid="page-search">
        {isLoading ? (
          <h1>Carregando...</h1>
        ) : (
          <div>
            <Header />
            <form onSubmit={ this.searchAlbum }>
              <input
                data-testid="search-artist-input"
                type="text"
                id="input"
                onChange={ this.changeInput }
                placeholder="Digite o nome do artista"
              />
              <button
                data-testid="search-artist-button"
                className="tryButton" // ia colocar uma cor nele pra testar mas já está funcionando
                id="artist-button"
                disabled={ Offbt }
                type="submit"
              >
                Pesquisar
              </button>
            </form>
            <p>{`Resultado de álbuns de: ${titleArtists}`}</p>
            <div>
              {moreAlbuns.length > 0 ? (
                moreAlbuns.map((album, index) => (
                  <About
                    key={ index }
                    artistName={ album.artistName }
                    tagId={ album.collectionName }
                    collectionId={ album.collectionId }
                    checked={ album.checked }
                  />
                ))
              ) : (
                <p>Nenhum álbum foi encontrado</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;

/* por algum motivo, eu sofri MUITO com o u2, linha 62, com o nome pro resultados dos albuns,
usando o metodo constructor, não ia, de jeito nenhum, passava no avaiador mas no lint de jeito nenhum, enfim, assim:

<p>{`Resultado de álbuns de: ${titleArtistic}`}</p>  PASSA
<p>Resultado de álbuns de: ${titleArtistic}</p>      NÃO PASSA */
