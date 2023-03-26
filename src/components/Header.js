import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    logUser: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      logUser: name,
    });
  }

  render() {
    const { logUser } = this.state;
    return (
      <div className="hub">
        <header data-testid="header-component">
          <div className="navegation-links">
            <div>
              <Link data-testid="link-to-search" to="/search">seach</Link>
              <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">profile</Link>
            </div>
          </div>
          <div>
            <h2 data-testid="header-user-name">{ logUser }</h2>
          </div>
        </header>
        { !logUser && <p className="loading">Carregando...</p> }
        {}
      </div>
    );
  }
}

export default Header;

// eu tentei implemntar o import import { Link } from 'react-router-dom'; na linha 3, mas o link pediu para que ficasse depois do  import { getUser } from '../services/userAPI';

/* ideia de como puxar o nome para quando a pessoa voltasse ao site
function getMsg() {
  const name = document.getElementById("name").value;

  const mnsg = "Oi ${name}! Obrigado por voltar ao site.";

  document.getElementById("mnsg").innerHTML = mnsg;
}
</script>
*/
