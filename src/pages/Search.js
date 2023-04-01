import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    tileArtistic: '',
  };

  handleChange = (event) => {
    this.setState({
      tileArtistic: event.target.value,
    });
  };

  render() {
    const { tileArtistic } = this.state;
    const DisabeButton = tileArtistic.length < 2; // verificar se o input tem 2 ou mais caracteres

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            pesquisar
          </label>
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
            disabled={ DisabeButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
