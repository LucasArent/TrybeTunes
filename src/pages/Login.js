import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Falei com um colega e recomendou usar o useHistory, vi no site dev.to
import { createUser } from '../services/userAPI';

function Login() {
  const [name, setName] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const history = useHistory();

  const nameMin3 = 3; // Tive muito problema com numero magico, pesquisei na barra de pesquisa do slack da trybe e achei uma pessoa da turma 21 que deu uma dica de como resolver

  const hSubmmit = async (event) => {
    event.preventDefault();
    setIsLoad(true);
    await createUser({ name });
    setIsLoad(false);
    history.push('/search');
  };

  const hChangeName = (event) => {
    setName(event.target.value);
  };

  const Validation = name.length >= nameMin3;

  return (
    <div data-testid="page-login">
      <form onSubmit={ hSubmmit }>
        <label htmlFor="login-name-input">Nome:</label>
        <input
          type="text"
          id="login-name-input"
          data-testid="login-name-input"
          value={ name }
          onChange={ hChangeName }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ !Validation || isLoad }
        >
          {isLoad ? 'Carregando...' : ' Entrar '}
        </button>
      </form>
    </div>
  );
}

export default Login;
